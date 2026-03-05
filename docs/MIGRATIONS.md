# Migrations

## Overview
Payload migrations are created locally, then run on production using a Cloud Run Job.

## Create a migration

From the repo root:

```bash
pnpm -C apps/cms payload migrate:create --name <migration-name>
```

This generates a new file under:

- `apps/cms/src/migrations/`

Commit the migration files before deploying.

## Run migrations on production

We use a Cloud Run Job named `cms-migrate`.

### Build the migration image

```bash
# Build and push the migration image

gcloud builds submit --config cloudbuild.migrate.yaml .
```

The job image is:

- `us-central1-docker.pkg.dev/marketeconomy/cms/cms-migrate:latest`

### Run the job

```bash
# Execute migrations on production

gcloud run jobs execute cms-migrate --region us-central1 --project marketeconomy --wait
```

## Verify migration state (production)

Run these queries against the production Postgres database to confirm migration state.

Check that the migrations table exists:

```sql
SELECT to_regclass('public.payload_migrations') IS NOT NULL AS exists;
```

List applied migrations:

```sql
SELECT name, created_at
FROM payload_migrations
ORDER BY created_at ASC;
```

Find the latest applied migration:

```sql
SELECT name, created_at
FROM payload_migrations
ORDER BY created_at DESC
LIMIT 1;
```

Compare the latest applied migration with the repo latest:

- Repo latest migration name is `20260305_143020` (see `apps/cms/src/migrations/index.ts`).
- If the latest applied migration is not `20260305_143020`, there are pending migrations.

## Safe workflow (migrations + seeds)

1. Backup production database.
2. Run migrations in staging first (using the same migration image and env as prod).
3. Run migrations in production via the `cms-migrate` Cloud Run Job.
4. Verify schema and migration state (queries above).
5. Run seed scripts only after migrations are confirmed.

## Avoid interactive schema prompts

Interactive "create/rename" prompts appear when the running schema does not match
the migrations/code. Avoid them by:

- Always running `pnpm payload migrate` (via `cms-migrate` job) before any seeds.
- Ensuring `payload_migrations` latest equals the repo latest.
- Do not run seed scripts against a DB that has not been migrated to the current code.

## Job configuration

The `cms-migrate` job should match the CMS service in these areas:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `GCS_BUCKET`
- `GCS_PROJECT_ID`
- Cloud SQL instance attachment
- Service account

If the CMS service changes, update the job to match.
