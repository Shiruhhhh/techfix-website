# Keeping the deploy scripts up to date

There are 3 scripts: `deploy-dev.ps1`, `deploy-main.ps1`, `migrate-db.ps1`.
`deploy-main.ps1` calls `migrate-db.ps1` internally — check both together.

Run this check whenever the deploy flow might have changed (new build step,
new migration command, new deploy target, renamed npm script, schema
change, etc).

## 1. Verify scripts still match the codebase

Check each of these against current repo state:

- `backend/package.json` scripts — do `db:migrate:local`,
  `db:migrate:remote`, and `deploy` still exist with those exact names?
  Any new required step (e.g. a build/typecheck step before
  `wrangler deploy`)?
- `backend/wrangler.toml` — still one Worker, one D1 binding? If a second
  Worker, KV namespace, or R2 bucket was added with its own deploy/migrate
  step, `migrate-db.ps1` and/or `deploy-main.ps1` need a matching step.
- `backend/migrations/` — still plain numbered `.sql` files applied via
  `wrangler d1 migrations apply`? If the migration tool/convention changed,
  update the "Writing a new migration" section in `README.md` too.
- `frontend` — still deployed via Cloudflare Pages auto-build from `main`
  push (no manual frontend deploy command)? If Pages was replaced by a
  manual `wrangler pages deploy` or similar, `deploy-main.ps1` needs that
  step added explicitly.
- Branch names — still `dev` and `main`? Still the same merge direction
  (`dev` → `main`)?
- Anything else excluded from git on purpose (check `.gitignore` and
  `tasks/`) — still just `tasks/`, `.env`, `frontend/.env`? If a new
  secret file or generated folder was added, add it to the `:(exclude)`
  list in `deploy-dev.ps1` and `deploy-main.ps1`.

If all of the above still match what the 3 scripts do — they're up to
date, stop here.

## 2. If anything is out of date — update procedure

Do not edit `deploy-dev.ps1`, `deploy-main.ps1`, or `migrate-db.ps1`
directly. Backup first, always in this order:

1. Get current timestamp in `yyyyMMddHHmmss` format.
2. Copy all 3 files into `backup/`, renamed `<original-name>-<timestamp>.ps1`
   (example timestamp `20260628134323`):
   - `deploy-dev.ps1` → `backup/deploy-dev-20260628134323.ps1`
   - `deploy-main.ps1` → `backup/deploy-main-20260628134323.ps1`
   - `migrate-db.ps1` → `backup/migrate-db-20260628134323.ps1`
3. Only after all 3 backups exist on disk, edit the live script(s) in
   place — even if only one of the 3 actually needs changes, back up all
   3 together (keeps backup sets aligned to one timestamp).
4. Update `README.md` in this folder to reflect the new behavior.

PowerShell snippet for the backup step:

```powershell
$ts = Get-Date -Format "yyyyMMddHHmmss"
Copy-Item "deploy-dev.ps1"   "backup/deploy-dev-$ts.ps1"
Copy-Item "deploy-main.ps1" "backup/deploy-main-$ts.ps1"
Copy-Item "migrate-db.ps1"  "backup/migrate-db-$ts.ps1"
```

Never skip the backup step, even for a one-line change — it is the only
rollback path since these scripts push to real branches and deploy to
production Cloudflare resources.
