#!/usr/bin/env bash
set -euo pipefail

DOMAIN="marketeconomy.org"
OWNER="marketeco"
HOME_DIR="/home/${OWNER}"
MAILBOX_DIR="${HOME_DIR}/mail/${DOMAIN}"
ETC_DIR="${HOME_DIR}/etc/${DOMAIN}"
CREDENTIALS_FILE="/root/${DOMAIN}-mailbox-credentials.txt"
SYNC_SCRIPT="/usr/local/sbin/sync-project-maildomains"

if ! id "${OWNER}" >/dev/null 2>&1; then
  echo "Missing Linux user: ${OWNER}" >&2
  exit 1
fi

owner_uid="$(id -u "${OWNER}")"
owner_gid="$(id -g "${OWNER}")"
today_days="$(( $(date +%s) / 86400 ))"

chmod 711 "${HOME_DIR}"
install -d -o "${OWNER}" -g mail -m 750 "${HOME_DIR}/etc" "${ETC_DIR}"
install -d -o "${OWNER}" -g "${OWNER}" -m 751 "${HOME_DIR}/mail" "${MAILBOX_DIR}"
touch "${ETC_DIR}/passwd" "${ETC_DIR}/shadow" "${ETC_DIR}/quota"
chown "${OWNER}:mail" "${ETC_DIR}/passwd" "${ETC_DIR}/quota"
chown "${OWNER}:${OWNER}" "${ETC_DIR}/shadow"
chmod 640 "${ETC_DIR}/passwd" "${ETC_DIR}/shadow" "${ETC_DIR}/quota"

if [ ! -f "${ETC_DIR}/_privs.json" ]; then
  printf '{"quota":0}\n' > "${ETC_DIR}/_privs.json"
fi
chown "${OWNER}:${OWNER}" "${ETC_DIR}/_privs.json"
chmod 600 "${ETC_DIR}/_privs.json"

if [ ! -f "${CREDENTIALS_FILE}" ]; then
  install -o root -g root -m 600 /dev/null "${CREDENTIALS_FILE}"
fi

ensure_line_mapping() {
  local file="$1"
  local key="$2"
  local value="$3"

  [ -f "${file}" ] || touch "${file}"
  cp -a "${file}" "${file}.pre-${DOMAIN}" 2>/dev/null || true
  awk -F: -v key="${key}" '$1 != key { print }' "${file}" > "${file}.tmp"
  printf '%s: %s\n' "${key}" "${value}" >> "${file}.tmp"
  sort -u "${file}.tmp" > "${file}"
  rm -f "${file}.tmp"
}

ensure_list_contains() {
  local file="$1"
  local value="$2"

  [ -f "${file}" ] || touch "${file}"
  cp -a "${file}" "${file}.pre-${DOMAIN}" 2>/dev/null || true
  grep -vxF "${value}" "${file}" > "${file}.tmp" || true
  printf '%s\n' "${value}" >> "${file}.tmp"
  sort -u "${file}.tmp" > "${file}"
  rm -f "${file}.tmp"
}

ensure_list_excludes() {
  local file="$1"
  local value="$2"

  [ -f "${file}" ] || touch "${file}"
  cp -a "${file}" "${file}.pre-${DOMAIN}" 2>/dev/null || true
  grep -vxF "${value}" "${file}" > "${file}.tmp" || true
  mv "${file}.tmp" "${file}"
}

ensure_line_mapping "/etc/userdomains" "${DOMAIN}" "${OWNER}"
ensure_line_mapping "/etc/trueuserdomains" "${DOMAIN}" "${OWNER}"
ensure_line_mapping "/etc/domainusers" "${OWNER}" "${DOMAIN}"
ensure_list_contains "/etc/localdomains" "${DOMAIN}"
ensure_list_excludes "/etc/remotedomains" "${DOMAIN}"

if [ ! -f "/etc/valiases/${DOMAIN}" ]; then
  printf '*: ":fail: No Such User Here"\n' > "/etc/valiases/${DOMAIN}"
fi
chown "${OWNER}:mail" "/etc/valiases/${DOMAIN}"
chmod 640 "/etc/valiases/${DOMAIN}"

create_mailbox() {
  local local_part="$1"
  local quota_bytes="$2"
  local address="${local_part}@${DOMAIN}"
  local mailbox_home="${MAILBOX_DIR}/${local_part}"
  local password
  local hash
  local needs_password="0"

  if ! grep -q "^${local_part}:" "${ETC_DIR}/passwd"; then
    printf '%s:x:%s:%s::%s:/home/%s\n' \
      "${local_part}" "${owner_uid}" "${owner_gid}" "${mailbox_home}" "${OWNER}" >> "${ETC_DIR}/passwd"
    printf '%s:%s\n' "${local_part}" "${quota_bytes}" >> "${ETC_DIR}/quota"
    needs_password="1"
  fi

  if ! awk -v address="${address}" '$1 == address { found=1 } END { exit found ? 0 : 1 }' "${CREDENTIALS_FILE}"; then
    needs_password="1"
  fi

  if [ "${needs_password}" = "1" ]; then
    password="$(openssl rand -base64 24 | tr -d '\n' | tr '/+' 'AZ' | cut -c1-24)"
    hash="$(printf '%s' "${password}" | openssl passwd -6 -stdin)"

    grep -v "^${local_part}:" "${ETC_DIR}/shadow" > "${ETC_DIR}/shadow.tmp" || true
    printf '%s:%s:%s::::::\n' "${local_part}" "${hash}" "${today_days}" >> "${ETC_DIR}/shadow.tmp"
    mv "${ETC_DIR}/shadow.tmp" "${ETC_DIR}/shadow"

    awk -v address="${address}" '$1 != address { print }' "${CREDENTIALS_FILE}" > "${CREDENTIALS_FILE}.tmp" || true
    printf '%s %s\n' "${address}" "${password}" >> "${CREDENTIALS_FILE}.tmp"
    mv "${CREDENTIALS_FILE}.tmp" "${CREDENTIALS_FILE}"
  fi

  install -d -o "${OWNER}" -g "${OWNER}" -m 751 "${mailbox_home}"
  for dir in cur new tmp \
    .Archive/cur .Archive/new .Archive/tmp \
    .Drafts/cur .Drafts/new .Drafts/tmp \
    .Junk/cur .Junk/new .Junk/tmp \
    .Sent/cur .Sent/new .Sent/tmp \
    .Trash/cur .Trash/new .Trash/tmp
  do
    install -d -o "${OWNER}" -g "${OWNER}" -m 751 "${mailbox_home}/${dir}"
  done

  if [ ! -s "${mailbox_home}/maildirsize" ]; then
    printf '%sS\n0 0\n' "${quota_bytes}" > "${mailbox_home}/maildirsize"
    chown "${OWNER}:${OWNER}" "${mailbox_home}/maildirsize"
    chmod 600 "${mailbox_home}/maildirsize"
  fi
}

create_mailbox "admin" "5368709120"
create_mailbox "info" "5368709120"
create_mailbox "no-reply" "1073741824"

chown "${OWNER}:mail" "${ETC_DIR}/passwd" "${ETC_DIR}/quota"
chown "${OWNER}:${OWNER}" "${ETC_DIR}/shadow"
chmod 640 "${ETC_DIR}/passwd" "${ETC_DIR}/shadow" "${ETC_DIR}/quota"
chmod 600 "${CREDENTIALS_FILE}"

cat > "${SYNC_SCRIPT}" <<'SCRIPT'
#!/usr/bin/env bash
set -euo pipefail

ensure_line_mapping() {
  local file="$1"
  local key="$2"
  local value="$3"
  [ -f "${file}" ] || touch "${file}"
  awk -F: -v key="${key}" '$1 != key { print }' "${file}" > "${file}.tmp"
  printf '%s: %s\n' "${key}" "${value}" >> "${file}.tmp"
  sort -u "${file}.tmp" > "${file}"
  rm -f "${file}.tmp"
}

ensure_list_contains() {
  local file="$1"
  local value="$2"
  [ -f "${file}" ] || touch "${file}"
  grep -vxF "${value}" "${file}" > "${file}.tmp" || true
  printf '%s\n' "${value}" >> "${file}.tmp"
  sort -u "${file}.tmp" > "${file}"
  rm -f "${file}.tmp"
}

ensure_list_excludes() {
  local file="$1"
  local value="$2"
  [ -f "${file}" ] || touch "${file}"
  grep -vxF "${value}" "${file}" > "${file}.tmp" || true
  mv "${file}.tmp" "${file}"
}

ensure_line_mapping "/etc/userdomains" "marketeconomy.org" "marketeco"
ensure_line_mapping "/etc/trueuserdomains" "marketeconomy.org" "marketeco"
ensure_line_mapping "/etc/domainusers" "marketeco" "marketeconomy.org"
ensure_list_contains "/etc/localdomains" "marketeconomy.org"
ensure_list_excludes "/etc/remotedomains" "marketeconomy.org"
SCRIPT
chmod 750 "${SYNC_SCRIPT}"
chown root:root "${SYNC_SCRIPT}"

/usr/local/cpanel/scripts/restartsrv_exim >/dev/null 2>&1 || systemctl restart exim || true
/usr/local/cpanel/scripts/restartsrv_dovecot >/dev/null 2>&1 || systemctl restart dovecot || true

echo "Created or verified mailboxes: admin@${DOMAIN}, info@${DOMAIN}, no-reply@${DOMAIN}"
echo "Root-only credentials file: ${CREDENTIALS_FILE}"
echo "Mail domain sync script: ${SYNC_SCRIPT}"
