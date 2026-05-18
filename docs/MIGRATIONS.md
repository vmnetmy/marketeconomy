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

- Check the latest migration name in `apps/cms/src/migrations/index.ts`.
- If the latest applied migration is not the repo latest, there are pending migrations.

## Payload migration rule

Do not mix schema DDL and Payload content operations in the same migration.

Bad pattern:

```ts
export async function up({ db, payload }) {
  await db.execute(sql`
    CREATE TABLE ...
    ALTER TABLE ...
  `)

  await payload.create(...)
  await payload.update(...)
}
```

Why this can fail:

- Payload/Drizzle runs the migration inside a database transaction.
- The schema migration holds PostgreSQL locks until the transaction commits.
- `payload.create()` and `payload.update()` can open another database connection.
- That second connection may wait on tables locked by the same migration transaction.
- The result can be a deploy that hangs until SSH or GitHub Actions times out.

Correct pattern:

```ts
// 20260518_130900.ts
export async function up({ db }) {
  await db.execute(sql`
    CREATE TABLE ...
    ALTER TABLE ...
  `)
}
```

```ts
// 20260518_131000.ts
export async function up({ payload }) {
  await payload.create(...)
  await payload.update(...)
}
```

Operational notes:

- Keep schema migrations and content/data migrations as separate ordered migrations.
- If a migration creates tables used by Payload APIs, run Payload API writes only in the next migration.
- Make content migrations idempotent: check if records already exist before creating them.
- Avoid long-running media/file operations inside schema migrations.
- Do not recombine split schema/content migrations during cleanup.

If deploy hangs at `payload migrate`, check PostgreSQL locks:

```sql
select
  pid,
  usename,
  state,
  wait_event_type,
  wait_event,
  now() - query_start as age,
  left(query, 160) as query
from pg_stat_activity
where datname = current_database()
order by query_start nulls last;
```

If one migration connection is `idle in transaction` and another is `active` waiting on `Lock`, suspect schema/content mixing.

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
