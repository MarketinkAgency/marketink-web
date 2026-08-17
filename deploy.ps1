# MarketINK - publicar
#
# Uso:  .\deploy.ps1                 (mensaje automatico)
#       .\deploy.ps1 "mi mensaje"
#
# Compila para verificar, guarda en GitHub y despliega a produccion.
#
# POR QUE NO USA $ErrorActionPreference = "Stop":
# git y npx escriben su progreso normal en stderr. Con "Stop", PowerShell
# trata esa salida como un error fatal y mata el script a mitad de camino
# sin decir nada util. Durante semanas eso hizo que "npx vercel --prod"
# nunca se ejecutara: el deploy salia igual porque el webhook de GitHub lo
# recogia, y el dia que el webhook no disparo, no quedo nada publicado.
# Aqui cada paso se juzga por su codigo de salida, que es el unico dato
# que de verdad dice si funciono.

param([string]$msg = "")

Set-Location -Path $PSScriptRoot
$ErrorActionPreference = "Continue"

function Paso($texto) {
  Write-Host ""
  Write-Host "-> $texto" -ForegroundColor Red
}

function Aviso($texto) { Write-Host "   $texto" -ForegroundColor DarkGray }

function Morir($texto) {
  Write-Host ""
  Write-Host $texto -ForegroundColor Yellow
  Write-Host "Copiale el error de arriba a Claude y lo arregla." -ForegroundColor Yellow
  exit 1
}

if ([string]::IsNullOrWhiteSpace($msg)) {
  $msg = "Actualizacion " + (Get-Date -Format "yyyy-MM-dd HH:mm")
}

# Un candado olvidado por un proceso muerto bloquea todo commit futuro.
# Si no hay ningun git vivo, sobra.
$lock = Join-Path $PSScriptRoot ".git\index.lock"
if (Test-Path $lock) {
  if (Get-Process git -ErrorAction SilentlyContinue) {
    Morir "Hay otro git corriendo. Cierra VS Code o espera y vuelve a intentar."
  }
  Aviso "Quitando un candado viejo de git"
  Remove-Item $lock -Force
}

Paso "Instalando dependencias"
npm install --silent
if ($LASTEXITCODE -ne 0) { Morir "Fallo npm install." }

Paso "Compilando para verificar que no hay errores"
npm run build
if ($LASTEXITCODE -ne 0) { Morir "EL BUILD FALLO. No se subio nada." }

Paso "Guardando en GitHub"
git add -A
git commit -m "$msg" 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { Aviso "(sin cambios nuevos que guardar)" }

git push 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { Morir "Fallo el push a GitHub." }

$sha = (git rev-parse --short HEAD).Trim()
Aviso "Commit $sha guardado en GitHub"

# El despliegue se hace aqui, explicitamente. El webhook de GitHub puede
# hacerlo tambien, y entonces sobra un build; eso cuesta un minuto. No
# hacerlo cuando el webhook falla cuesta una entrega a un cliente.
Paso "Desplegando a produccion"
$salida = npx vercel --prod --yes 2>&1
$salida | ForEach-Object { Write-Host $_ }
if ($LASTEXITCODE -ne 0) { Morir "FALLO EL DESPLIEGUE. Lo de arriba sigue sin publicarse." }

$url = ($salida | Select-String -Pattern "https://[^\s]+\.vercel\.app" -AllMatches |
        ForEach-Object { $_.Matches.Value } | Select-Object -Last 1)

Write-Host ""
Write-Host "PUBLICADO." -ForegroundColor Green
if ($url) { Write-Host "  $url" -ForegroundColor Green }
Write-Host "  https://www.marketinkagency.com" -ForegroundColor Green
Write-Host ""
