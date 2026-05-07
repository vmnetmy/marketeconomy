#!/usr/bin/env bash
set -euo pipefail

export PATH=/usr/local/bin:/usr/bin:/bin

APP_ROOT="${APP_ROOT:-/srv/apps/marketeconomy}"
SHARED_DIR="${APP_ROOT}/shared"
ENV_FILE="${ENV_FILE:-${SHARED_DIR}/.env}"
BACKUP_ROOT="${BACKUP_ROOT:-/srv/backups/marketeconomy}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
UPLOADS_DIR="${UPLOADS_DIR:-${SHARED_DIR}/uploads}"
TIMESTAMP="$(date -u +%Y%m%d%H%M%S)"
BACKUP_DIR="${BACKUP_ROOT}/${TIMESTAMP}"

log() {
  printf '[backup-production] %s\n' "$*"
}

set -a
source "${ENV_FILE}"
set +a

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required in ${ENV_FILE}." >&2
  exit 1
fi

install -d "${BACKUP_DIR}"

log "Dumping PostgreSQL database."
pg_dump --format=custom --no-owner --no-acl --file="${BACKUP_DIR}/postgres.dump" "${DATABASE_URL}"

if [ -d "${UPLOADS_DIR}" ]; then
  log "Archiving uploads from ${UPLOADS_DIR}."
  tar -C "${UPLOADS_DIR}" -czf "${BACKUP_DIR}/uploads.tar.gz" .
else
  log "Uploads directory does not exist yet: ${UPLOADS_DIR}."
fi

sha256sum "${BACKUP_DIR}"/* > "${BACKUP_DIR}/SHA256SUMS"

find "${BACKUP_ROOT}" -mindepth 1 -maxdepth 1 -type d -mtime "+${RETENTION_DAYS}" -exec rm -rf {} +

log "Backup complete: ${BACKUP_DIR}"
