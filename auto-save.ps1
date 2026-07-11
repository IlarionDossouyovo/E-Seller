# E-Seller Auto-Save - PowerShell
# Sauvegarde automatique toutes les heures

param(
    [string]$Message = "Sauvegarde automatique $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

$ErrorActionPreference = "Stop"

Write-Host "=== E-Seller Auto-Save ===" -ForegroundColor Green

# Chemin du projet
$ProjectPath = $PSScriptRoot
Set-Location $ProjectPath

# Vérifier git
try {
    git rev-parse --is-inside-work-tree | Out-Null
} catch {
    Write-Host "Erreur: Pas un dépôt Git" -ForegroundColor Red
    exit 1
}

# Ajouter les modifications
Write-Host "Ajout des modifications..." -ForegroundColor Yellow
git add -A

# Vérifier s'il y a des changements
$status = git status --porcelain
if (-not $status) {
    Write-Host "Aucune modification à sauvegarder" -ForegroundColor Yellow
    exit 0
}

# Commit
Write-Host "Commit: $Message" -ForegroundColor Yellow
git commit -m $Message

# Push
Write-Host "Push vers GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Sauvegarde réussie!" -ForegroundColor Green
} else {
    Write-Host "✗ Erreur lors du push" -ForegroundColor Red
    exit 1
}
