# Seeds

## Overview
Seed scripts are run on production using a Cloud Run Job, similar to migrations.

## Build the seed image

```bash
gcloud builds submit --config cloudbuild.seed.yaml .
```

The job image is:

- `us-central1-docker.pkg.dev/marketeconomy/cms/cms-seed:latest`

## Run seed job on production

We use a Cloud Run Job named `cms-seed`. Configure the job to match the CMS
service in these areas:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `GCS_BUCKET`
- `GCS_PROJECT_ID`
- Cloud SQL instance attachment
- Service account

Set the seed scripts to run via env var `SEED_SCRIPTS` (space-separated paths
relative to `apps/cms`).

Example: seed the About page

```bash
gcloud run jobs execute cms-seed \
  --region us-central1 \
  --project marketeconomy \
  --update-env-vars SEED_SCRIPTS="src/seed/seedAbout.ts" \
  --wait
```
