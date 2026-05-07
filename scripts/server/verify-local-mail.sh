#!/usr/bin/env bash
set -euo pipefail

domain="marketeconomy.org"
owner="marketeco"
address="admin@${domain}"
credentials_file="/root/${domain}-mailbox-credentials.txt"

echo "MAPS:"
grep -E "^(${domain}|${owner}):" /etc/userdomains /etc/trueuserdomains /etc/domainusers

echo
echo "LOCALREMOTE:"
grep -x "${domain}" /etc/localdomains || true
grep -x "${domain}" /etc/remotedomains || true

echo
echo "MAILBOX FILES:"
ls -ld "/home/${owner}/etc/${domain}" "/home/${owner}/mail/${domain}"
ls -l \
  "/home/${owner}/etc/${domain}/passwd" \
  "/home/${owner}/etc/${domain}/shadow" \
  "/home/${owner}/etc/${domain}/quota" \
  "/etc/valiases/${domain}"

echo
echo "EXIM ROUTE:"
exim -bt "${address}"

echo
echo "DOVECOT AUTH:"
password="$(awk -v address="${address}" '$1 == address { print $2; exit }' "${credentials_file}")"
if [ -z "${password}" ]; then
  echo "No stored password for ${address}" >&2
  exit 1
fi
doveadm auth test "${address}" "${password}"

echo
echo "DELIVERY:"
new_dir="/home/${owner}/mail/${domain}/admin/new"
before="$(find "${new_dir}" -type f | wc -l)"
printf 'Subject: local delivery test\nFrom: no-reply@%s\nTo: %s\n\nsetup test\n' "${domain}" "${address}" \
  | exim -odf -v "${address}" >/tmp/marketeconomy-exim-delivery-test.log 2>&1
after="$(find "${new_dir}" -type f | wc -l)"
echo "new_count_before=${before} new_count_after=${after}"
tail -20 /tmp/marketeconomy-exim-delivery-test.log
