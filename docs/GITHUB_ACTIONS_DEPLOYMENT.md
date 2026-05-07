# GitHub Commit, Push, and Production Deployment

This guide explains how developers should move code from local work to production for `marketeconomy.org`.

## Deployment Model

Production deployment is handled by GitHub Actions from the `main` branch.

The workflow file is:

```text
.github/workflows/production.yml
```

The workflow does this:

1. Runs the build job on pull requests and pushes.
2. Deploys only when changes are pushed to `main` or when the workflow is manually dispatched.
3. SSHes into the dedicated server as the restricted `marketeco` user.
4. Pulls the latest `main` branch on the server.
5. Runs:

```bash
pnpm deploy:production
```

6. Runs production smoke tests after deployment:

```bash
pnpm smoke:production
```

## Required GitHub Secrets

Add these under:

```text
GitHub repository -> Settings -> Secrets and variables -> Actions
```

Prefer using a protected GitHub Environment named:

```text
production
```

Required secrets:

```text
PROD_SSH_HOST=218.208.89.59
PROD_SSH_PORT=6262
PROD_SSH_USER=marketeco
PROD_SSH_KEY=<private SSH key used by GitHub Actions>
```

`PROD_SSH_KEY` must be the private key whose public key exists in:

```text
/home/marketeco/.ssh/authorized_keys
```

Do not use the server root password in GitHub Actions.

## One-Time SSH Key Setup

Generate a dedicated deploy key:

```bash
ssh-keygen -t ed25519 -C "github-actions-marketeconomy-production" -f ~/.ssh/marketeconomy_github_actions
```

Install the public key on the server for `marketeco`:

```bash
ssh-copy-id -i ~/.ssh/marketeconomy_github_actions.pub -p 6262 marketeco@218.208.89.59
```

If `ssh-copy-id` is unavailable, append the public key manually to:

```text
/home/marketeco/.ssh/authorized_keys
```

Permissions should be:

```bash
chmod 700 /home/marketeco/.ssh
chmod 600 /home/marketeco/.ssh/authorized_keys
chown -R marketeco:marketeco /home/marketeco/.ssh
```

Then add the private key content to the GitHub secret:

```bash
cat ~/.ssh/marketeconomy_github_actions
```

Paste the full private key into `PROD_SSH_KEY`.

## Server Repository Access

The server deploy script expects a production source checkout at:

```text
/srv/apps/marketeconomy/repo
```

That checkout must be able to pull from:

```text
https://github.com/vmnetmy/marketeconomy
```

If the repository is private, configure one of these:

- A read-only GitHub deploy key for the server.
- A GitHub machine user with read access.
- A GitHub token-based HTTPS origin, stored only on the server.

Do not commit GitHub tokens or SSH keys to this repository.

## Developer Workflow

Start from an up-to-date `main`:

```bash
git checkout main
git pull --ff-only origin main
```

Create a feature branch:

```bash
git checkout -b feature/short-description
```

Make changes, then run local checks:

```bash
pnpm install --frozen-lockfile
pnpm build
```

If the change affects production behavior, run the production smoke test against the current live site:

```bash
pnpm smoke:production
```

Review changed files:

```bash
git status
git diff
```

Commit:

```bash
git add <files>
git commit -m "Describe the change clearly"
```

Push the branch:

```bash
git push -u origin feature/short-description
```

Open a pull request into `main`.

## Pull Request Rules

Before merging:

- The GitHub Actions build job must pass.
- At least one developer should review the PR.
- Do not merge changes that include `.env`, credentials, generated passwords, database dumps, or mailbox credentials.
- For database schema changes, confirm the Payload migration impact.
- For public UI changes, review desktop and mobile screenshots.

## Production Deployment

Production deploys when the PR is merged into `main`.

The deploy job runs:

```bash
pnpm deploy:production
```

The deploy script:

- Creates a timestamped release under `/srv/apps/marketeconomy/releases`.
- Builds CMS and web.
- Runs Payload migrations.
- Copies Next standalone static assets.
- Switches `/srv/apps/marketeconomy/current` to the new release.
- Restarts `marketeconomy-cms.service`.
- Restarts `marketeconomy-web.service`.
- Keeps the latest 5 releases.

Watch the deployment in:

```text
GitHub -> Actions -> Production
```

After deploy, GitHub Actions runs a browser smoke test and uploads screenshots/reports as workflow artifacts.

## Manual Deployment

Use manual deployment only for controlled operations.

In GitHub:

```text
Actions -> Production -> Run workflow
```

Run it from `main`.

## Rollback

Rollback is available from the server:

```bash
cd /srv/apps/marketeconomy/current
pnpm rollback:production
```

Rollback switches `current` to the previous release and restarts the web and CMS services.

Important:

```text
Rollback does not reverse database migrations.
```

If a release includes destructive database migrations, plan the rollback separately before merging.

## Backups

A production backup script exists:

```bash
pnpm backup:production
```

It creates a PostgreSQL dump and archives uploads from the configured server paths.

The team should run backups before high-risk production releases.

## Smoke Test Expectations

The production smoke test should show:

```text
marketeconomy.org                  200
www.marketeconomy.org              200
cms.marketeconomy.org/admin        200
cms pages API                      200
cms events API                     200
consoleErrors                      0
pageErrors                         0
badResponses                       0
brokenImages                       0
```

Some aborted `_rsc=` prefetch requests can appear in Chromium. These are ignored by the script when they are normal Next.js navigation prefetch aborts.

If smoke test reports `404` for `/_next/static/...`, check `scripts/deploy-production.sh`. The standalone runtime must include:

```text
apps/cms/.next/standalone/apps/cms/.next/static
apps/web/.next/standalone/apps/web/.next/static
```

## Production Access Rules

- Use `marketeco` for deployment.
- Do not deploy as `root` from GitHub Actions.
- Do not give developer teams access to unrelated project users or mailboxes.
- Do not place secrets in GitHub workflow YAML.
- Store secrets only in GitHub Secrets, the server `.env`, or another approved secret store.

## Emergency Commands

Check services:

```bash
systemctl status marketeconomy-web
systemctl status marketeconomy-cms
systemctl status postgresql
```

View recent logs:

```bash
journalctl -u marketeconomy-web -u marketeconomy-cms --since "30 minutes ago" --no-pager
```

Run smoke test from local machine:

```bash
pnpm smoke:production
```

Run smoke test from server:

```bash
cd /srv/apps/marketeconomy/current
pnpm smoke:production
```
