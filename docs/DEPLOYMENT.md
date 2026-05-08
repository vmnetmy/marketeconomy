# Deployment

## Current production

Production runs on the Yeahhost dedicated server:

- Web: `https://marketeconomy.org`
- CMS: `https://cms.marketeconomy.org/admin`
- App root: `/srv/apps/marketeconomy`
- Active app path: `/srv/apps/marketeconomy/current`
- Source checkout: `/srv/apps/marketeconomy/repo`
- Releases: `/srv/apps/marketeconomy/releases/<timestamp>`
- Shared env and uploads: `/srv/apps/marketeconomy/shared`

GCP deployment paths have been retired. Production deploys only through GitHub Actions or the VPS deployment script.

## GitHub Actions deployment

`.github/workflows/production.yml` runs `pnpm build` for pull requests and pushes. The CI build points the web app at `https://cms.marketeconomy.org` so static prerendering has a CMS API available.

Pushes to `main` deploy over SSH to the dedicated server, then run production smoke tests on the server.

Required GitHub environment or repository secrets:

- `PROD_SSH_HOST`
- `PROD_SSH_KEY`
- `PROD_SSH_PORT` optional, defaults to `22`
- `PROD_SSH_USER` optional, defaults to `marketeco`

The SSH key should allow the deployment user to update the source checkout and run the production scripts. Store the private key only in GitHub secrets.

Before the first GitHub Actions deploy, bootstrap `/srv/apps/marketeconomy/repo` on the server. The legacy `/srv/apps/marketeconomy/current` checkout may not contain the deployment scripts yet.

## Manual production deploy

Run this on the production server:

```bash
cd /srv/apps/marketeconomy/current
pnpm deploy:production
```

The deployment script:

- Updates `/srv/apps/marketeconomy/repo` from `main`.
- Creates a timestamped release under `/srv/apps/marketeconomy/releases`.
- Installs dependencies from the lockfile.
- Builds CMS and web.
- Copies `.next/static` and `public` into each standalone runtime.
- Runs Payload migrations.
- Switches `/srv/apps/marketeconomy/current` to the new release.
- Restarts `marketeconomy-cms.service` and `marketeconomy-web.service`.

Run smoke tests after every deploy:

```bash
cd /srv/apps/marketeconomy/current
pnpm smoke:production
```

Smoke artifacts are written to `smoke-results/` and must not be committed.

## Rollback

Rollback switches the `current` symlink to the previous release and restarts the app services:

```bash
cd /srv/apps/marketeconomy/current
pnpm rollback:production
```

To roll back to a specific release:

```bash
pnpm rollback:production 20260507093000
```

Rollback does not reverse database migrations. For database rollback, restore from a tested PostgreSQL backup.

## Local media storage

Production has shared local upload directories available:

```text
/srv/apps/marketeconomy/shared/uploads/media
/srv/apps/marketeconomy/shared/uploads/datasets
```

Use these environment variables when local storage is active:

```bash
MEDIA_UPLOAD_DIR=/srv/apps/marketeconomy/shared/uploads/media
DATASET_UPLOAD_DIR=/srv/apps/marketeconomy/shared/uploads/datasets
NEXT_PUBLIC_MEDIA_URL=https://marketeconomy.org/media
```
