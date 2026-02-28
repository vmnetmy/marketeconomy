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

## Job configuration

The `cms-migrate` job should match the CMS service in these areas:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `GCS_BUCKET`
- `GCS_PROJECT_ID`
- Cloud SQL instance attachment
- Service account

If the CMS service changes, update the job to match.
