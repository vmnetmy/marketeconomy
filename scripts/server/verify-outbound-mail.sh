#!/usr/bin/env bash
set -euo pipefail

echo "PTR_FROM_SERVER"
dig @1.1.1.1 +time=2 +tries=1 +short -x 218.208.89.59 || true

echo
echo "ROUTE"
exim -bt no-reply@marketeconomy.org

echo
echo "OUTBOUND_TEST"
subject_id="$(date -u +%Y%m%d%H%M%S)"
printf 'Subject: MarketEconomy outbound verification %s\nFrom: no-reply@marketeconomy.org\nTo: nyshame@gmail.com\n\nDNS and SMTP verification test from marketeconomy.org.\n' "${subject_id}" \
  | exim -odf -v -f no-reply@marketeconomy.org nyshame@gmail.com >/tmp/marketeconomy-gmail-test.log 2>&1 || true

tail -100 /tmp/marketeconomy-gmail-test.log

echo
echo "RECENT_EXIM"
grep -E 'nyshame@gmail.com|marketeconomy.org' /var/log/exim_mainlog | tail -60
