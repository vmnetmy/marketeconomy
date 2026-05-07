#!/usr/bin/env bash
set -euo pipefail

cd /srv/apps/marketeconomy/current/apps/cms
password="$(awk '$1 == "no-reply@marketeconomy.org" { print $2; exit }' /root/marketeconomy.org-mailbox-credentials.txt)"

for host in 127.0.0.1 v2571.securen.net mail.marketeconomy.org; do
for port in 25 587 465; do
  echo "TEST_HOST=${host} TEST_PORT=${port}"
  SMTP_HOST="${host}" SMTP_PORT="${port}" SMTP_PASS="${password}" node - <<'NODE'
const nodemailer = require('nodemailer')
const port = Number(process.env.SMTP_PORT)
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: 'no-reply@marketeconomy.org',
    pass: process.env.SMTP_PASS,
  },
})

transport.verify()
  .then(() => console.log('OK'))
  .catch((error) => console.log('FAIL', {
    code: error.code,
    command: error.command,
    message: error.message,
    reason: error.reason,
    host: error.host,
    port: error.port,
  }))
NODE
done
done
