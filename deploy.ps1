# MarketINK — publicar
# Uso:  .\deploy.ps1            (mensaje automatico)
#       .\deploy.ps1 "mi mensaje"
#
# Hace todo: instala dependencias si cambiaron, compila para verificar,
# sube a GitHub y despliega a produccion en Vercel.

param([string]$msg = "")

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

function Paso($texto) {
  Write-Host ""
  Write-Host "-> $texto" -ForegroundColor Red
}

if ([string]::IsNullOrWhiteSpace($msg)) {
  $msg = "Actualizacion " + (Get-Date -Format "yyyy-MM-dd HH:mm")
}

Paso "Instalando dependencias"
npm install --silent
if ($LASTEXITCODE -ne 0) { Write-Host "Fallo npm install" -ForegroundColor Yellow; exit 1 }

Paso "Compilando para verificar que no hay errores"
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "EL BUILD FALLO. No se subio nada." -ForegroundColor Yellow
  Write-Host "Copiale el error de arriba a Claude y lo arregla." -ForegroundColor Yellow
  exit 1
}

Paso "Subiendo a GitHub"
git add .
git commit -m "$msg" 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Host "   (sin cambios que commitear)" -ForegroundColor DarkGray }
git push

Paso "Desplegando a produccion"
npx vercel --prod --yes

Write-Host ""
Write-Host "Listo. La URL de produccion esta arriba." -ForegroundColor Green
Write-Host ""
