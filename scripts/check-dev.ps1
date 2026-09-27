# Waits a few seconds, then shows the Vite log and probes the dev server.
Start-Sleep -Seconds 3
$log = Join-Path $PSScriptRoot '..\frontend\vite-dev.log'
Write-Output '--- vite-dev.log ---'
Get-Content $log
Write-Output '--- probe http://localhost:5173 ---'
try {
  $r = Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing -TimeoutSec 5
  Write-Output "HTTP $($r.StatusCode) - dev server is responding"
} catch {
  Write-Output "not responding: $($_.Exception.Message)"
}
