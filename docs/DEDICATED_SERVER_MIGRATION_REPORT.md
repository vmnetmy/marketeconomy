# Dedicated Server Migration Report

This report summarizes the current `marketeconomy.org` migration to the Yeahhost dedicated server and the next engineering work that should happen inside this repository.

## Current Production Architecture

- Public web: `https://marketeconomy.org` and `https://www.marketeconomy.org`
- CMS: `https://cms.marketeconomy.org/admin`
- Server IP: `218.208.89.59`
- Server hostname: `v2571.securen.net`
- OS/control panel: AlmaLinux 8.10 with cPanel/WHM
- App Linux user: `marketeco`
- App root on server: `/srv/apps/marketeconomy/current`
- Shared production env file: `/srv/apps/marketeconomy/shared/.env`
- Database: local PostgreSQL database `marketeco_prod`
- Process manager: systemd
- Public proxy: Apache reverse proxy to local Node services

## Services Deployed

- `marketeconomy-cms.service`
  - Runs Payload CMS / Next standalone server.
  - Binds locally on `127.0.0.1:3010`.
  - Public route is proxied through Apache at `cms.marketeconomy.org`.

- `marketeconomy-web.service`
  - Runs the public Next standalone app.
  - Binds locally on `127.0.0.1:3011`.
  - Public routes are proxied through Apache at `marketeconomy.org` and `www.marketeconomy.org`.

- `postgresql.service`
  - Runs local PostgreSQL.
  - Exposed only locally.

## Data Migration Completed

- The previous authoritative database was the GCP Cloud SQL instance in project `marketeconomy`.
- A Cloud SQL export was created and restored into the dedicated server PostgreSQL database.
- Payload migrations were run successfully after restore.
- CMS API checks confirm that pages and events are available from the migrated database.
- GCP runtime resources have been retired; current production authority is the dedicated server.

## DNS and SSL Completed

- `marketeconomy.org` points to `218.208.89.59`.
- `www.marketeconomy.org` resolves to the production web app.
- `cms.marketeconomy.org` points to `218.208.89.59`.
- Web and CMS HTTPS certificates are installed through Let's Encrypt.
- Certbot renewal has a deploy hook to reload/restart Apache after certificate renewal.

## Email Status

- Local mailboxes were created under the isolated Linux user `marketeco`, not under the `offshor5` cPanel user.
- Current mailboxes:
  - `admin@marketeconomy.org`
  - `info@marketeconomy.org`
  - `no-reply@marketeconomy.org`
- Dovecot authentication works.
- Local Exim delivery works.
- Outbound mail to Gmail was accepted with DKIM signing as `marketeconomy.org:default`.
- DNS now includes MX, SPF, DKIM, and DMARC records.
- Remaining provider-side task: PTR/rDNS for `218.208.89.59` should be set to `v2571.securen.net`.

Do not commit mailbox passwords, database credentials, `.env` files, or server-only mail setup scripts to this repository.

## Production Deployment Script

This repository now includes:

```bash
scripts/deploy-production.sh
scripts/rollback-production.sh
```

Run on the production server as the deployment user:

```bash
pnpm deploy:production
```

What it does:

- Loads `/srv/apps/marketeconomy/shared/.env`.
- Updates the source checkout at `/srv/apps/marketeconomy/repo`.
- Creates a timestamped release under `/srv/apps/marketeconomy/releases`.
- Installs dependencies using the lockfile.
- Generates the Payload import map.
- Builds the CMS.
- Copies `.next/static` and `public` into the CMS standalone runtime directory.
- Runs Payload migrations.
- Builds the web app using the local CMS URL.
- Copies `.next/static` and `public` into the web standalone runtime directory.
- Switches `/srv/apps/marketeconomy/current` to the new release.
- Restarts `marketeconomy-cms.service` and `marketeconomy-web.service`.

The standalone asset copy is required. Without it, the HTML can return 200 while browser CSS/JS/font assets return 404.

## Production Smoke Test

This repository now includes:

```bash
scripts/smoke-production.js
```

Run from the repository root:

```bash
pnpm smoke:production
```

What it checks:

- Desktop rendering of `https://marketeconomy.org/`
- Mobile rendering of `https://marketeconomy.org/`
- CMS login page rendering at `https://cms.marketeconomy.org/admin`
- Main public routes
- CMS API routes
- Browser console errors
- Page errors
- 4xx/5xx asset responses
- Broken images

Smoke artifacts are written to:

```text
smoke-results/
```

This directory is ignored by Git.

## Latest Smoke Test Result

After fixing standalone static asset deployment:

- Web desktop rendered correctly.
- Web mobile rendered correctly.
- CMS admin login rendered correctly.
- Web, CMS, PostgreSQL, Exim, and Dovecot services were active.
- No recent web/CMS systemd warning logs were present.
- Public routes returned `200`.
- CMS `pages` and `events` API endpoints returned `200`.

## Next Engineering Steps

1. Treat `scripts/deploy-production.sh` as the production deployment source of truth.

   If the server copy changes, update this repository first, then deploy from the repository. Avoid hand-editing the server script without back-porting the change.

2. Add CI/CD around the deployment script.

   Recommended flow:

   - Build and test on pull requests.
   - Deploy only from `main`.
   - Use SSH to run deployment on the dedicated server as the restricted project user.
   - Store SSH keys and secrets in the CI provider secret store, not in Git.
   - Run `pnpm smoke:production` after deployment.

3. Add a rollback strategy.

   Current deployment uses the working tree at `/srv/apps/marketeconomy/current`. The next improvement should use timestamped releases:

   ```text
   /srv/apps/marketeconomy/releases/<timestamp>
   /srv/apps/marketeconomy/current -> /srv/apps/marketeconomy/releases/<timestamp>
   ```

   Keep the previous release so rollback is a symlink switch plus service restart.

4. Formalize production environment variables.

   Maintain a committed `.env.example` with required keys only. Keep actual values only in `/srv/apps/marketeconomy/shared/.env` or a secrets manager.

   Important keys include:

   - `DATABASE_URL`
   - `PAYLOAD_SECRET`
   - `CMS_URL`
   - `NEXT_PUBLIC_CMS_URL`
   - `NEXT_PUBLIC_MEDIA_URL`
   - `WEB_URL`
   - `NEXT_PUBLIC_WEB_URL`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `EMAIL_FROM`
   - `ADMIN_NOTIFICATIONS_EMAIL`

5. Add database backup and restore runbooks.

   The production database is now local PostgreSQL. The team should document:

   - Daily `pg_dump` backup schedule.
   - Retention policy.
   - Off-server backup destination.
   - Restore procedure.
   - Periodic restore test.

6. Maintain local media storage and include it in backups.

   Decision: migrate CMS media to local server storage under shared production storage:

   ```text
   /srv/apps/marketeconomy/shared/uploads/media
   /srv/apps/marketeconomy/shared/uploads/datasets
   ```

   Production backups must include both the PostgreSQL dump and shared uploads.

7. Complete mail deliverability hardening.

   Provider-side PTR/rDNS is still pending:

   ```text
   218.208.89.59 -> v2571.securen.net
   ```

   After provider confirmation, re-test outbound delivery to Gmail, Yahoo, and Outlook.

8. Add monitoring.

   Minimum checks:

   - HTTP 200 for web and CMS.
   - systemd service status.
   - PostgreSQL availability.
   - disk usage.
   - certificate expiry.
   - failed Exim queue volume.

9. Create CMS admin ownership process.

   Confirm who owns the initial Payload admin account and password recovery process. Do not store admin credentials in Git or shared docs.

10. Keep GCP retired.

   Cloud Build, Firebase, Cloud Run, Artifact Registry, and GCS deployment paths have been removed from this repository. Future production deployment should remain on the VPS workflow unless a new migration plan is explicitly approved.
