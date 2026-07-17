# E-Seller - Script de Mise a Jour (PowerShell)
# Copier ce fichier dans le dossier E-Seller sur OneDrive

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MISE A JOUR E-SELLER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$ProjectPath = $PSScriptRoot
Set-Location $ProjectPath

# Etape 1: Installer les dependances
Write-Host "[1/5] Installation des dependances..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) { Write-Host "ERREUR!" -ForegroundColor Red; exit 1 }

# Etape 2: Generation Prisma
Write-Host "[2/5] Generation Prisma..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) { Write-Host "ERREUR!" -ForegroundColor Red; exit 1 }

# Etape 3: Synchronisation GitHub
Write-Host "[3/5] Synchronisation GitHub..." -ForegroundColor Yellow
git pull origin production-ready-2026
if ($LASTEXITCODE -ne 0) { Write-Host "ERREUR!" -ForegroundColor Red; exit 1 }

# Etape 4: Nettoyage du cache
Write-Host "[4/5] Nettoyage du cache..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }

# Etape 5: Build du projet
Write-Host "[5/5] Build du projet..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "ERREUR!" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  MISE A JOUR TERMINEE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Verifier si .env.local existe
if (-not (Test-Path ".env.local")) {
    Write-Host "[INFO] Creation de .env.local depuis .env.production..." -ForegroundColor Yellow
    Copy-Item ".env.production" ".env.local"
    Write-Host "[OK] Fichier .env.local cree!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Lancer le serveur: npm run dev" -ForegroundColor Cyan
