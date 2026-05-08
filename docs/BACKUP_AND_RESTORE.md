# Backup and Restore

## Scope

Production backup coverage must include:

- Local PostgreSQL database.
- Local CMS media uploads.
- Local dataset uploads.

Default production paths:

```text
/srv/apps/marketeconomy/shared/.env
/srv/apps/marketeconomy/shared/uploads
/srv/backups/marketeconomy
```

## Create a backup

Run on the production server:

```bash
cd /srv/apps/marketeconomy/current
pnpm backup:production
```

The script creates:

```text
/srv/backups/marketeconomy/<timestamp>/postgres.dump
/srv/backups/marketeconomy/<timestamp>/uploads.tar.gz
/srv/backups/marketeconomy/<timestamp>/SHA256SUMS
```

Default retention is 14 days. Override it when needed:

```bash
RETENTION_DAYS=30 pnpm backup:production
```

Backups should also be copied off-server. The production server should not be the only copy.

## Upload storage

Production media and dataset uploads live on the VPS under shared storage:

```bash
MEDIA_UPLOAD_DIR=/srv/apps/marketeconomy/shared/uploads/media
DATASET_UPLOAD_DIR=/srv/apps/marketeconomy/shared/uploads/datasets
```

These directories are included in `uploads.tar.gz` during production backups.

## Restore database

Stop the app services before a full restore:

```bash
sudo systemctl stop marketeconomy-web.service
sudo systemctl stop marketeconomy-cms.service
```

Restore the PostgreSQL dump to a clean database:

```bash
pg_restore --clean --if-exists --no-owner --no-acl --dbname "$DATABASE_URL" /srv/backups/marketeconomy/<timestamp>/postgres.dump
```

## Restore uploads

Restore uploads into shared storage:

```bash
mkdir -p /srv/apps/marketeconomy/shared/uploads
tar -C /srv/apps/marketeconomy/shared/uploads -xzf /srv/backups/marketeconomy/<timestamp>/uploads.tar.gz
```

Then restart services:

```bash
sudo systemctl start marketeconomy-cms.service
sudo systemctl start marketeconomy-web.service
```

Run smoke tests after restore:

```bash
cd /srv/apps/marketeconomy/current
pnpm smoke:production
```

## Verification

At least once per quarter, restore the latest backup into a non-production PostgreSQL database and a temporary uploads directory, then confirm:

- `pg_restore` exits successfully.
- CMS API can read pages, events, and media records.
- Representative media files exist in restored uploads.
- `pnpm smoke:production` passes against production after normal service restart.
