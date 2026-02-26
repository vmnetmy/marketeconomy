# Market Economy (Monorepo)

This repository is a pnpm workspace with two apps:

- `apps/cms` — Payload CMS (API + Admin)
- `apps/web` — Next.js public site

## Requirements

- Node.js `^18.20.2` or `>=20.9.0`
- pnpm `^9` (workspace root is configured for pnpm)
- PostgreSQL database for the CMS

## Workspace Layout

```
apps/
  cms/   Payload CMS (API + Admin)
  web/   Next.js frontend
patches/ pnpm patches (Payload admin hydration fix)
```

## Install

```bash
pnpm install
```

## Environment Variables

Create `apps/cms/.env`:

```
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB
PAYLOAD_SECRET=change_me
```

Optional (web app, defaults to `http://localhost:3000`):

```
NEXT_PUBLIC_CMS_URL=http://localhost:3000
```

## Development

From the repo root:

```bash
pnpm dev
```

- CMS Admin: `http://localhost:3000/admin`
- Web: `http://localhost:3001`

## Useful Scripts

From the repo root:

- `pnpm dev` — run CMS + Web
- `pnpm dev:cms` — CMS only
- `pnpm dev:web` — Web only
- `pnpm build` — build all apps
- `pnpm lint` — lint all apps

From `apps/cms`:

- `pnpm dev` — run Payload admin/API
- `pnpm devsafe` — clean `.next` and restart (useful for admin hydration issues)
- `pnpm generate:types` — regenerate Payload types
- `pnpm generate:importmap` — regenerate admin import map

## CMS Features

- Page builder blocks (Hero, RichText, Cards, CTA, Media, FAQ, Content List, and more)
- Datasets collection with CSV/XLSX parsing
- DataViz block renders charts and tables on the web app
- Globals: Site Settings, Header, Footer, Updates Sidebar

## Web Features

- Dynamic pages by slug
- `/updates` editorial list with pagination
- `/updates/[slug]` post detail rendering
- DataViz block rendering (Nivo charts)

## Notes

- A pnpm patch is applied to `@payloadcms/next` to suppress a known admin hydration mismatch.
- If the admin UI shows hydration errors after changes, run:

```bash
pnpm -C apps/cms devsafe
```

## License

MIT
