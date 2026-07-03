# Deploy scripts

PowerShell scripts for syncing/deploying TechFix (the iServices-style phone
repair shop site: React/Vite/AntD frontend on Cloudflare Pages, Hono backend
on Cloudflare Workers + D1).

All scripts are non-interactive (no `Read-Host` prompts) — safe to run from
automation or a fresh Claude session with no prior context. They find the
repo root themselves via `git rev-parse --show-toplevel`, so **run them
from anywhere inside the repo**, e.g.:

```powershell
powershell -File "tasks/scripts/deploy-dev.ps1"
```

or `cd tasks/scripts` first and use `./deploy-dev.ps1`. Both forms work.

`deploy-dev.ps1` and `deploy-main.ps1` exclude `tasks/`, `.env`,
`frontend/.env` from `git add`, so secrets and this scripts folder are
never staged or committed by them. (They're also already in
`.gitignore` — the exclude is belt-and-suspenders.)

## `deploy-dev.ps1`

Pushes current work to `dev`.

- Switches to `dev` if not already on it.
- Stages all changes except `tasks/`, `.env`, `frontend/.env`.
- Commits (message via `-Message "..."`, default `"wip: dev sync"`) if there
  are staged changes.
- Pushes `origin dev`.
- Restores original branch in `finally`, even on error.

Usage:
```powershell
./deploy-dev.ps1
./deploy-dev.ps1 -Message "add contact form validation"
```

## `deploy-main.ps1`

Full production deploy: dev → main → Cloudflare.

- Does everything `deploy-dev.ps1` does (commit + push `dev`).
- Checks out `main`, merges `dev` (`--no-edit`), pushes `origin main`.
  - Cloudflare Pages auto-deploys the frontend from this push — no manual
    step needed for the frontend.
- Calls `migrate-db.ps1` (applies D1 migrations local, then remote — see
  below). If a migration fails, `main` is already pushed but the Worker is
  NOT redeployed — fix the migration, then re-run `migrate-db.ps1` and
  `wrangler deploy` manually, no need to redo the whole script.
- Deploys the Worker (`backend`: `npm run deploy`, i.e. `wrangler deploy`).
- Always returns to `dev` at the end (`finally`), even on error.

Order matters: code merge → DB migration → Worker deploy. The Worker is
deployed last so it never runs against a D1 schema it doesn't expect yet.

Usage:
```powershell
./deploy-main.ps1
./deploy-main.ps1 -Message "release: catalog v2"
```

Requires on the machine running it: `git` remote auth already configured,
`wrangler` already logged in to Cloudflare. Neither script handles login —
if either is missing, the relevant step fails loudly and the script stops
(`$ErrorActionPreference = "Stop"`).

## `migrate-db.ps1`

Applies pending D1 migrations: local first, then remote — only runs remote
if local succeeds, so a broken migration never reaches production data.
Called automatically by `deploy-main.ps1`; also runnable standalone.

- `./migrate-db.ps1` — local then remote.
- `./migrate-db.ps1 -LocalOnly` — local only (test a new migration first).
- `./migrate-db.ps1 -RemoteOnly` — remote only (e.g. local DB already current).

"Local" = the D1 emulator on your machine (`wrangler dev` reads from it).
"Remote" = the real production D1 database. Always safe to run
`-LocalOnly` repeatedly while writing/testing a migration; only run
without `-LocalOnly` (or with `-RemoteOnly`) when you're sure the
migration is correct, since remote changes the live site's data.

### Writing a new migration (D1/SQLite gotchas learned the hard way)

Migration files live in `backend/migrations/`, named `NNNN_description.sql`
(4-digit, zero-padded, next unused number). A lettered suffix
(`0008b_...`) has been used once for a same-day follow-up fix to the
migration right before it — only do this if it's truly a correction to the
prior numbered file, not a new feature.

D1 is SQLite under the hood, with real limits that don't show up until you
run them:

- **No non-constant `DEFAULT` in `ALTER TABLE ... ADD COLUMN`** — e.g.
  `DEFAULT (datetime('now'))` fails. Add the column nullable with no
  default, then a separate `UPDATE` to backfill.
- **`CHECK` constraints can't be altered.** To change one, rebuild the
  table: `CREATE TABLE x_new (...)`, `INSERT INTO x_new SELECT * FROM x`,
  `DROP TABLE x`, `ALTER TABLE x_new RENAME TO x`.
- **Single `INSERT` statements have a size limit.** Large seed/data
  migrations must be split into multiple `INSERT` statements (~500 rows
  each worked) rather than one giant statement.
- Always test with `-LocalOnly` before running remote.

## `backup/`

Holds timestamped copies of these scripts made before edits. See
`UPDATE.md` for the required backup-then-edit procedure.

## Failure behavior (all scripts)

Every script sets `$ErrorActionPreference = "Stop"` and wraps its body in
`try { } finally { }`. On any failure (git conflict, push rejected because
remote has new commits, wrangler not logged in, migration error, etc):

- The script stops immediately at the failing step — it does not continue
  to later steps or retry.
- The `finally` block still runs (e.g. `deploy-dev.ps1`/`deploy-main.ps1`
  restore the original branch via `git checkout`), but only for git branch
  state — nothing already pushed/deployed is rolled back automatically.
- Read the PowerShell error text; it names the failing command
  (`throw "..."` messages match the step that failed, e.g. `"push main
  failed"`). Fix that one thing, then re-run — scripts are safe to re-run
  since each step is idempotent or checks state first (e.g. "no changes to
  commit" instead of erroring).
