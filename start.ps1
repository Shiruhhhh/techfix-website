# Inicia backend (wrangler dev) e frontend (vite) em paralelo, prefixando logs por origem.
$root = $PSScriptRoot

function Start-Logged($name, $color, $path, $cmd) {
    Start-Job -Name $name -ScriptBlock {
        param($path, $cmd)
        Set-Location $path
        Invoke-Expression $cmd 2>&1
    } -ArgumentList $path, $cmd | Out-Null
}

Start-Logged "Backend" "Yellow" (Join-Path $root "backend") "npm run dev"
Start-Logged "Frontend" "Green" (Join-Path $root "frontend") "npm run dev -- --host"
Start-Logged "Portal" "Magenta" (Join-Path $root "portal") "npm run dev"

$colors = @{ Backend = "Yellow"; Frontend = "Green"; Portal = "Magenta" }

function Stop-AllServices {
    Write-Host "`nA parar servicos..." -ForegroundColor Cyan
    Get-Job | Stop-Job -ErrorAction SilentlyContinue
    Get-Job | Remove-Job -Force -ErrorAction SilentlyContinue

    foreach ($port in 8787, 5173, 8000) {
        Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
            Select-Object -ExpandProperty OwningProcess -Unique |
            ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
    }
}

try {
    while ($true) {
        foreach ($job in Get-Job) {
            $lines = Receive-Job -Job $job
            foreach ($line in $lines) {
                Write-Host "[$($job.Name)] " -ForegroundColor $colors[$job.Name] -NoNewline
                Write-Host $line
            }
        }
        Start-Sleep -Milliseconds 200
    }
}
finally {
    Stop-AllServices
}
