# Starts the frontend Vite dev server in the background and logs to frontend/vite-dev.log
$frontend = Join-Path $PSScriptRoot '..\frontend'
Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', 'npm run dev > vite-dev.log 2>&1' -WorkingDirectory $frontend -WindowStyle Hidden
Write-Output "started"
