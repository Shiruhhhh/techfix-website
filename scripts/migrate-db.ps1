<#
.SYNOPSIS
  Apply pending D1 migrations: local first, then remote (only if local succeeds).
#>
param(
    [switch]$RemoteOnly,
    [switch]$LocalOnly
)

$ErrorActionPreference = "Stop"
$repoRoot = git rev-parse --show-toplevel
Push-Location (Join-Path $repoRoot "backend")

try {
    if (-not $RemoteOnly) {
        Write-Host "Applying migrations locally..." -ForegroundColor Cyan
        npm run db:migrate:local
        if (-not $?) { throw "local migration failed" }
    }

    if (-not $LocalOnly) {
        Write-Host "Applying migrations to remote D1..." -ForegroundColor Cyan
        npm run db:migrate:remote
        if (-not $?) { throw "remote migration failed" }
    }

    Write-Host "Migrations applied." -ForegroundColor Green
}
finally {
    Pop-Location
}
