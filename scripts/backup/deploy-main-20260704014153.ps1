<#
.SYNOPSIS
  Deploy dev into main: push dev, merge into main, push main, deploy backend
  Worker to Cloudflare (Pages auto-deploys from the main push), restore dev.
  Never touches /tasks or .env files (both already gitignored, kept untracked).
#>
param(
    [string]$Message
)

$ErrorActionPreference = "Stop"
$repoRoot = git rev-parse --show-toplevel
Set-Location $repoRoot

$startBranch = git rev-parse --abbrev-ref HEAD

try {
    if ($startBranch -ne "dev") {
        git checkout dev
        if (-not $?) { throw "checkout dev failed" }
    }

    git add -A -- . ":(exclude)tasks" ":(exclude).env" ":(exclude)frontend/.env"

    $status = git status --porcelain
    if ($status) {
        $msg = $Message
        if ([string]::IsNullOrWhiteSpace($msg)) { $msg = "wip: dev sync" }
        git commit -m $msg
        if (-not $?) { throw "commit failed" }
    } else {
        Write-Host "No changes to commit on dev."
    }

    git push origin dev
    if (-not $?) { throw "push dev failed" }

    git checkout main
    if (-not $?) { throw "checkout main failed" }

    git merge dev --no-edit
    if (-not $?) { throw "merge dev into main failed" }

    git push origin main
    if (-not $?) { throw "push main failed" }

    Write-Host "main updated from dev. Pages will auto-deploy frontend." -ForegroundColor Green

    & (Join-Path $PSScriptRoot "migrate-db.ps1")
    if (-not $?) { throw "migration failed" }

    Write-Host "Deploying Worker..." -ForegroundColor Cyan
    Push-Location (Join-Path $repoRoot "backend")
    try {
        npm run deploy
        if (-not $?) { throw "wrangler deploy failed" }
    }
    finally {
        Pop-Location
    }

    Write-Host "Backend deployed to Cloudflare." -ForegroundColor Green
}
finally {
    git checkout dev
    Write-Host "Back on dev." -ForegroundColor Cyan
}
