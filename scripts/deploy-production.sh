#!/usr/bin/env bash
set -euo pipefail

export PATH=/usr/local/bin:/usr/bin:/bin
export NODE_OPTIONS=--max-old-space-size=8192

APP_ROOT="${APP_ROOT:-/srv/apps/marketeconomy}"
APP_USER="${APP_USER:-marketeco}"
APP_GROUP="${APP_GROUP:-marketeco}"
SOURCE_DIR="${PRODUCTION_SOURCE_DIR:-${APP_ROOT}/repo}"
CURRENT_LINK="${APP_ROOT}/current"
RELEASES_DIR="${APP_ROOT}/releases"
SHARED_DIR="${APP_ROOT}/shared"
ENV_FILE="${ENV_FILE:-${SHARED_DIR}/.env}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
DEPLOY_REF="${DEPLOY_REF:-origin/${DEPLOY_BRANCH}}"
RELEASES_TO_KEEP="${RELEASES_TO_KEEP:-5}"
TIMESTAMP="$(date -u +%Y%m%d%H%M%S)"
RELEASE_DIR="${RELEASES_DIR}/${TIMESTAMP}"

log() {
  printf '[deploy-production] %s\n' "$*"
}

run_pnpm() {
  if [ -n "${PNPM_RUNNER:-}" ]; then
    local -a pnpm_runner
    read -r -a pnpm_runner <<< "${PNPM_RUNNER}"
    "${pnpm_runner[@]}" "$@"
    return
  fi

  pnpm "$@"
}

running_as_root() {
  [ "$(id -u)" -eq 0 ]
}

ensure_dir() {
  if running_as_root; then
    install -d -o "${APP_USER}" -g "${APP_GROUP}" "$@"
  else
    install -d "$@"
  fi
}

chown_if_root() {
  if running_as_root; then
    chown -R "${APP_USER}:${APP_GROUP}" "$@"
  fi
}

chown_symlink_if_root() {
  if running_as_root; then
    chown -h "${APP_USER}:${APP_GROUP}" "$@"
  fi
}

ensure_source_repo() {
  if [ -d "${SOURCE_DIR}/.git" ]; then
    return
  fi

  if [ -d "${CURRENT_LINK}/.git" ]; then
    log "Creating source checkout at ${SOURCE_DIR} from existing current checkout."
    ensure_dir "${SOURCE_DIR}"
    rmdir "${SOURCE_DIR}"
    git clone "${CURRENT_LINK}" "${SOURCE_DIR}"
    chown_if_root "${SOURCE_DIR}"
    return
  fi

  echo "Missing source checkout: ${SOURCE_DIR}" >&2
  echo "Create it with: git clone <repo-url> ${SOURCE_DIR}" >&2
  exit 1
}

fetch_source() {
  cd "${SOURCE_DIR}"
  git fetch origin "${DEPLOY_BRANCH}"
  git checkout "${DEPLOY_BRANCH}"
  git pull --ff-only origin "${DEPLOY_BRANCH}"
}

create_release() {
  ensure_dir "${RELEASES_DIR}" "${SHARED_DIR}/uploads/media" "${SHARED_DIR}/uploads/datasets"
  ensure_dir "${RELEASE_DIR}"

  cd "${SOURCE_DIR}"
  git archive "${DEPLOY_REF}" | tar -x -C "${RELEASE_DIR}"
  chown_if_root "${RELEASE_DIR}"
}

set -a
source "${ENV_FILE}"
set +a

sync_next_standalone_assets() {
  local app="$1"
  local app_dir="${RELEASE_DIR}/apps/${app}"
  local standalone_dir="${app_dir}/.next/standalone/apps/${app}"

  ensure_dir "${standalone_dir}/.next"
  rm -rf "${standalone_dir}/.next/static"
  cp -a "${app_dir}/.next/static" "${standalone_dir}/.next/static"

  if [ -d "${app_dir}/public" ]; then
    rm -rf "${standalone_dir}/public"
    cp -a "${app_dir}/public" "${standalone_dir}/public"
  fi

  chown_if_root "${standalone_dir}/.next/static"
  [ ! -d "${standalone_dir}/public" ] || chown_if_root "${standalone_dir}/public"
}

activate_release() {
  local previous=""
  if [ -L "${CURRENT_LINK}" ]; then
    previous="$(readlink -f "${CURRENT_LINK}")"
  elif [ -e "${CURRENT_LINK}" ]; then
    previous="${APP_ROOT}/legacy-current-${TIMESTAMP}"
    log "Moving existing current directory to ${previous}."
    mv "${CURRENT_LINK}" "${previous}"
  fi

  ln -sfn "${RELEASE_DIR}" "${CURRENT_LINK}"
  chown_symlink_if_root "${CURRENT_LINK}"

  log "Activated release ${RELEASE_DIR}."
  if [ -n "${previous}" ]; then
    log "Previous release: ${previous}"
  fi
}

cleanup_releases() {
  find "${RELEASES_DIR}" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' \
    | sort -r \
    | tail -n +"$((RELEASES_TO_KEEP + 1))" \
    | while read -r release; do
        [ -n "${release}" ] || continue
        rm -rf "${RELEASES_DIR}/${release}"
      done
}

ensure_source_repo
fetch_source
create_release

cd "${RELEASE_DIR}"
CI=true run_pnpm install --frozen-lockfile --prod=false

run_pnpm --filter @marketeconomy/cms generate:importmap
run_pnpm --filter @marketeconomy/cms build
sync_next_standalone_assets cms
run_pnpm --filter @marketeconomy/cms payload migrate

CMS_URL=http://127.0.0.1:3010 NEXT_PUBLIC_CMS_URL=https://cms.marketeconomy.org NEXT_PUBLIC_MEDIA_URL=https://marketeconomy.org/media run_pnpm --filter @marketeconomy/web build
sync_next_standalone_assets web

activate_release
sudo /bin/systemctl restart marketeconomy-cms.service
sudo /bin/systemctl restart marketeconomy-web.service
cleanup_releases

log "Deployment complete."
