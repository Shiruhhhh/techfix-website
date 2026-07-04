<#
.SYNOPSIS
  Push current code to dev branch.
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
        Write-Host "No changes to commit."
    }

    git push origin dev
    if (-not $?) { throw "push dev failed" }

    Write-Host "dev updated and pushed." -ForegroundColor Green
}
finally {
    $current = git rev-parse --abbrev-ref HEAD
    if ($current -ne $startBranch) {
        git checkout $startBranch
    }
}
