#!/bin/sh
set -eu

if [ -z "${SEED_SCRIPTS:-}" ]; then
  echo "SEED_SCRIPTS is required (space-separated paths relative to apps/cms)."
  exit 1
fi

for script_path in $SEED_SCRIPTS; do
  echo "Running seed: ${script_path}"
  pnpm --filter @marketeconomy/cms exec tsx "${script_path}"
done
