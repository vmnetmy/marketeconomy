#!/usr/bin/env bash
set -euo pipefail

domain="marketeconomy.org"
private_key="/var/cpanel/domain_keys/private/${domain}"
public_key="/var/cpanel/domain_keys/public/${domain}"

install -d -m 755 \
  /var/cpanel/domain_keys/private \
  /var/cpanel/domain_keys/public \
  /var/cpanel/domain_keys/validity_cache

if [ ! -s "${private_key}" ]; then
  openssl genrsa -out "${private_key}" 2048 >/dev/null 2>&1
  openssl rsa -in "${private_key}" -pubout -out "${public_key}" >/dev/null 2>&1
fi

chown root:mail "${private_key}"
chmod 640 "${private_key}"
chown root:root "${public_key}"
chmod 644 "${public_key}"
: > "/var/cpanel/domain_keys/validity_cache/${domain}"

/usr/local/cpanel/scripts/restartsrv_exim >/dev/null 2>&1 || systemctl restart exim

ls -l "${private_key}" "${public_key}"
echo "DKIM_DNS_VALUE_START"
awk '!/^-----/ { printf "%s", $0 } END { print "" }' "${public_key}" \
  | sed 's/^/v=DKIM1; k=rsa; p=/'
echo "DKIM_DNS_VALUE_END"
