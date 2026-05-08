# Migrations

## Overview
Payload migrations are created locally and run on the production VPS during deployment.

## Create a migration

From the repo root:

```bash
pnpm -C apps/cms payload migrate:create --name <migration-name>
```

This generates a new file under:

- `apps/cms/src/migrations/`

Commit the migration files before deploying.

## Run migrations on production

Deployments run migrations automatically through `scripts/deploy-production.sh`.
For a manual migration-only run, execute the Payload migration command on the production VPS:

```bash
cd /srv/apps/marketeconomy/current
set -a
. /srv/apps/marketeconomy/shared/.env
set +a
pnpm --filter @marketeconomy/cms payload migrate
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

- Repo latest migration name is `20260325_095003` (see `apps/cms/src/migrations/index.ts`).
- If the latest applied migration is not `20260325_095003`, there are pending migrations.

## Safe workflow (migrations + seeds)

1. Backup production database.
2. Run migrations in staging first using the same application code and environment shape as production.
3. Run migrations in production through `pnpm deploy:production` or the manual VPS command above.
4. Verify schema and migration state (queries above).
5. Run seed scripts only after migrations are confirmed.

## Avoid interactive schema prompts

Interactive "create/rename" prompts appear when the running schema does not match
the migrations/code. Avoid them by:

- Always running `pnpm payload migrate` before any seeds.
- Ensuring `payload_migrations` latest equals the repo latest.
- Do not run seed scripts against a DB that has not been migrated to the current code.
