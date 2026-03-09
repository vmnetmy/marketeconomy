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

Describe seed job:

```bash
gcloud run jobs describe cms-seed --region us-central1 --project marketeconomy
```

## Logs

Open migration logs:

```bash
gcloud logging read \
  'resource.type="cloud_run_job" resource.labels.job_name="cms-migrate" resource.labels.location="us-central1"' \
  --project marketeconomy --limit 50 --format='value(textPayload)'
```

Open seed logs:

```bash
gcloud logging read \
  'resource.type="cloud_run_job" resource.labels.job_name="cms-seed" resource.labels.location="us-central1"' \
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

## Content placeholders (skeletons)

Placeholders are controlled in the CMS and used as design placeholders until real content is published.

Global setting:
- CMS → Site Settings → Content Placeholders
  - Mode:
    - Off: placeholders never show
    - On: placeholders always show (even if content exists)
    - Only when content is empty (default): placeholders show only when content is missing
  - Label: short text displayed above placeholder sections

Per-page override:
- CMS → Pages → Placeholder Override (sidebar)
  - Use site setting (default)
  - Force placeholders
  - Disable placeholders

Notes:
- Overrides apply to Pages-based routes (`/`, `/about`, `/contact`, and other CMS pages).
- Collection pages (Events, In the News, Policy Briefs, Event Reports, Leadership) follow the global setting.
- Detail pages (`/events/[slug]`, `/in-the-news/[slug]`, etc.) will only show placeholders in
  “Only when content is empty” mode if the entire collection is empty.
