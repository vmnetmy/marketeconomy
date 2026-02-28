# Deployment

## Overview
This project deploys two Cloud Run services.

- CMS service: `marketeconomy-cms`
- Web service: `marketeconomy-web`

Builds are done with Cloud Build configs in the repo root.

## CMS deploy

From the repo root:

```bash
# Build and push the CMS image

gcloud builds submit --config cloudbuild.cms.yaml .
```

The Cloud Build config builds the image and pushes to:

- `us-central1-docker.pkg.dev/marketeconomy/cms/cms:latest`

Cloud Run picks up the new image according to your current service settings.

## Web deploy

From the repo root:

```bash
# Build and push the Web image

gcloud builds submit --config cloudbuild.web.yaml .
```

The Cloud Build config builds the image and pushes to:

- `us-central1-docker.pkg.dev/marketeconomy/web/web:latest`

Cloud Run picks up the new image according to your current service settings.

## Confirm deploy

- CMS URL: `https://cms.marketeconomy.org`
- Web URL: `https://marketeconomy.org`

Tip: allow a few minutes for Cloud Run to roll out and for cache to refresh.
