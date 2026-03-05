#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-marketeconomy}"
REGION="${REGION:-us-central1}"
MIGRATE_JOB="${MIGRATE_JOB:-cms-migrate}"
BUILD_IMAGE="${BUILD_IMAGE:-true}"

if [[ "${CONFIRM:-}" != "yes" ]]; then
  echo "Refusing to run. Set CONFIRM=yes to proceed."
  exit 1
fi

if [[ $# -lt 1 ]]; then
  echo "Provide at least one seed script path, e.g. src/seed/seedAbout.ts"
  exit 1
fi

command -v gcloud >/dev/null || { echo "gcloud is required."; exit 1; }
command -v psql >/dev/null || { echo "psql is required."; exit 1; }
command -v node >/dev/null || { echo "node is required."; exit 1; }

if [[ "${BUILD_IMAGE}" == "true" ]]; then
  gcloud builds submit --config cloudbuild.migrate.yaml .
fi

gcloud run jobs execute "${MIGRATE_JOB}" \
  --region "${REGION}" \
  --project "${PROJECT_ID}" \
  --wait

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is required to verify migration state."
  exit 1
fi

REPO_LATEST_MIGRATION="$(
  node -e "const fs=require('fs'); const s=fs.readFileSync('apps/cms/src/migrations/index.ts','utf8'); const m=[...s.matchAll(/name:\\s*'([^']+)'/g)]; console.log(m.at(-1)?.[1]||'');"
)"

if [[ -z "${REPO_LATEST_MIGRATION}" ]]; then
  echo "Failed to determine repo latest migration."
  exit 1
fi

psql "${DATABASE_URL}" -v ON_ERROR_STOP=1 <<'SQL'
SELECT to_regclass('public.payload_migrations') IS NOT NULL AS payload_migrations_exists;
SELECT to_regclass('public.pages') IS NOT NULL AS pages_exists;
SELECT to_regclass('public._pages_v') IS NOT NULL AS pages_versions_exists;
SELECT to_regclass('public.in_the_news') IS NOT NULL AS in_the_news_exists;
SELECT to_regclass('public._in_the_news_v') IS NOT NULL AS in_the_news_versions_exists;
SELECT to_regclass('public.policy_briefs') IS NOT NULL AS policy_briefs_exists;
SELECT to_regclass('public._policy_briefs_v') IS NOT NULL AS policy_briefs_versions_exists;
SELECT to_regclass('public.events') IS NOT NULL AS events_exists;
SELECT to_regclass('public._events_v') IS NOT NULL AS events_versions_exists;
SELECT to_regclass('public.event_reports') IS NOT NULL AS event_reports_exists;
SELECT to_regclass('public._event_reports_v') IS NOT NULL AS event_reports_versions_exists;
SELECT to_regclass('public.leadership') IS NOT NULL AS leadership_exists;
SELECT to_regclass('public.media') IS NOT NULL AS media_exists;
SELECT to_regclass('public.users') IS NOT NULL AS users_exists;
SQL

DB_LATEST_MIGRATION="$(
  psql "${DATABASE_URL}" -Atc "SELECT name FROM payload_migrations ORDER BY created_at DESC LIMIT 1;"
)"

if [[ "${DB_LATEST_MIGRATION}" != "${REPO_LATEST_MIGRATION}" ]]; then
  echo "Migration mismatch. DB latest: ${DB_LATEST_MIGRATION:-<none>}, repo latest: ${REPO_LATEST_MIGRATION}"
  exit 1
fi

for script_path in "$@"; do
  pnpm --filter @marketeconomy/cms exec tsx "${script_path}"
done
