#!/usr/bin/env bash
set -euo pipefail

export PATH=/usr/local/bin:/usr/bin:/bin

APP_ROOT="${APP_ROOT:-/srv/apps/marketeconomy}"
APP_USER="${APP_USER:-marketeco}"
APP_GROUP="${APP_GROUP:-marketeco}"
CURRENT_LINK="${APP_ROOT}/current"
RELEASES_DIR="${APP_ROOT}/releases"
TARGET_RELEASE="${1:-}"

log() {
  printf '[rollback-production] %s\n' "$*"
}

if [ ! -d "${RELEASES_DIR}" ]; then
  echo "Release directory does not exist: ${RELEASES_DIR}" >&2
  exit 1
fi

current_target=""
if [ -L "${CURRENT_LINK}" ]; then
  current_target="$(readlink -f "${CURRENT_LINK}")"
fi

if [ -z "${TARGET_RELEASE}" ]; then
  TARGET_RELEASE="$(
    find "${RELEASES_DIR}" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' \
      | sort -r \
      | while read -r release; do
          path="${RELEASES_DIR}/${release}"
          if [ "${path}" != "${current_target}" ]; then
            printf '%s\n' "${path}"
            break
          fi
        done
  )"
fi

if [ -z "${TARGET_RELEASE}" ]; then
  echo "No previous release found." >&2
  exit 1
fi

case "${TARGET_RELEASE}" in
  /*) ;;
  *) TARGET_RELEASE="${RELEASES_DIR}/${TARGET_RELEASE}" ;;
esac

if [ ! -d "${TARGET_RELEASE}" ]; then
  echo "Target release does not exist: ${TARGET_RELEASE}" >&2
  exit 1
fi

if [ ! -d "${TARGET_RELEASE}/apps/cms/.next/standalone/apps/cms" ]; then
  echo "Target release is missing the CMS standalone build." >&2
  exit 1
fi

if [ ! -d "${TARGET_RELEASE}/apps/web/.next/standalone/apps/web" ]; then
  echo "Target release is missing the web standalone build." >&2
  exit 1
fi

ln -sfn "${TARGET_RELEASE}" "${CURRENT_LINK}"
chown -h "${APP_USER}:${APP_GROUP}" "${CURRENT_LINK}"

sudo /bin/systemctl restart marketeconomy-cms.service
sudo /bin/systemctl restart marketeconomy-web.service

log "Rolled back current to ${TARGET_RELEASE}."
log "Database migrations are not reversed by this script."
