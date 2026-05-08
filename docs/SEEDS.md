# Seeds

## Overview
Seed scripts run on the production VPS against the local production environment.

## Run seeds on production

Load the shared production environment, then run the seed script from the deployed release.

Example: seed the About page

```bash
cd /srv/apps/marketeconomy/current
set -a
. /srv/apps/marketeconomy/shared/.env
set +a
pnpm --filter @marketeconomy/cms exec tsx src/seed/seedAbout.ts
```
