# Operations

## Cloud Run services

List services:

```bash
gcloud run services list --project marketeconomy
```

Describe CMS service:

```bash
gcloud run services describe marketeconomy-cms --region us-central1 --project marketeconomy
```

## Cloud Run jobs

List jobs:

```bash
gcloud run jobs list --region us-central1 --project marketeconomy
```

Describe migration job:

```bash
gcloud run jobs describe cms-migrate --region us-central1 --project marketeconomy
```

## Logs

Open migration logs:

```bash
gcloud logging read \
  'resource.type="cloud_run_job" resource.labels.job_name="cms-migrate" resource.labels.location="us-central1"' \
  --project marketeconomy --limit 50 --format='value(textPayload)'
```

Open CMS service logs:

```bash
gcloud logging read \
  'resource.type="cloud_run_revision" resource.labels.service_name="marketeconomy-cms" resource.labels.location="us-central1"' \
  --project marketeconomy --limit 50 --format='value(textPayload)'
```

## Cache behavior

The web app uses a 60 second revalidation window in `apps/web/src/lib/cms.ts`.
If content updates are slow to appear, allow one minute, then hard refresh the page.
