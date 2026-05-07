#!/usr/bin/env bash
set -euo pipefail

key="${1:-${DEPLOY_PUBLIC_KEY:-}}"

if [ -z "${key}" ]; then
  echo "Usage: DEPLOY_PUBLIC_KEY='<ssh-ed25519 ...>' $0" >&2
  echo "   or: $0 '<ssh-ed25519 ...>'" >&2
  exit 1
fi

install -d -o marketeco -g marketeco -m 700 /home/marketeco/.ssh
touch /home/marketeco/.ssh/authorized_keys
chown marketeco:marketeco /home/marketeco/.ssh/authorized_keys
chmod 600 /home/marketeco/.ssh/authorized_keys

if ! grep -qxF "${key}" /home/marketeco/.ssh/authorized_keys; then
  printf '%s\n' "${key}" >> /home/marketeco/.ssh/authorized_keys
fi

install -d -o marketeco -g marketeco /srv/apps/marketeconomy

if [ ! -d /srv/apps/marketeconomy/repo/.git ]; then
  sudo -u marketeco git clone https://github.com/vmnetmy/marketeconomy /srv/apps/marketeconomy/repo
fi

sudo -u marketeco bash -lc 'cd /srv/apps/marketeconomy/repo && git fetch origin main && git checkout main && git pull --ff-only origin main'

echo "SSH_AUTH_KEYS"
ls -ld /home/marketeco/.ssh
ls -l /home/marketeco/.ssh/authorized_keys
grep -nF "${key}" /home/marketeco/.ssh/authorized_keys

echo "REPO"
sudo -u marketeco bash -lc 'cd /srv/apps/marketeconomy/repo && git rev-parse --short HEAD && git log -1 --oneline && grep -n deploy:production package.json && test -f scripts/deploy-production.sh && echo deploy_script_present'
