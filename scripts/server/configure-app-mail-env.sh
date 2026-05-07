#!/usr/bin/env bash
set -euo pipefail

env_file="/srv/apps/marketeconomy/shared/.env"
credentials_file="/root/marketeconomy.org-mailbox-credentials.txt"
smtp_user="no-reply@marketeconomy.org"
smtp_pass="$(awk -v user="${smtp_user}" '$1 == user { print $2; exit }' "${credentials_file}")"

if [ -z "${smtp_pass}" ]; then
  echo "Missing SMTP password for ${smtp_user}" >&2
  exit 1
fi

backup="${env_file}.pre-mail-$(date +%Y%m%d%H%M%S)"
cp -a "${env_file}" "${backup}"

set_env() {
  local key="$1"
  local value="$2"

  if grep -q "^${key}=" "${env_file}"; then
    awk -v key="${key}" -v value="${value}" 'BEGIN{FS=OFS="="} $1 == key {$0 = key "=" value} {print}' \
      "${env_file}" > "${env_file}.tmp"
    mv "${env_file}.tmp" "${env_file}"
  else
    printf '%s=%s\n' "${key}" "${value}" >> "${env_file}"
  fi
}

set_env "SMTP_HOST" "v2571.securen.net"
set_env "SMTP_PORT" "587"
set_env "SMTP_USER" "${smtp_user}"
set_env "SMTP_PASS" "${smtp_pass}"
set_env "EMAIL_FROM" "${smtp_user}"
set_env "ADMIN_NOTIFICATIONS_EMAIL" "admin@marketeconomy.org"

chown marketeco:marketeco "${env_file}"
chmod 600 "${env_file}"

systemctl restart marketeconomy-cms
systemctl is-active --quiet marketeconomy-cms
echo "Updated ${env_file}; backup at ${backup}; restarted marketeconomy-cms"
