# E-Seller - Docker Services Startup Script
# Run this in PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "E-SELLER DOCKER STARTUP" -ForegroundColor Cyan
Write-Host "Starting all services..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
$dockerStatus = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Docker is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop first" -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/4] Starting PostgreSQL and Ollama containers..." -ForegroundColor Yellow
docker compose up -d postgres ollama

Write-Host "[2/4] Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "[3/4] Verifying services..." -ForegroundColor Yellow
docker ps

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "ALL SERVICES STARTED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Services running:" -ForegroundColor White
Write-Host "  - PostgreSQL: localhost:5432" -ForegroundColor Gray
Write-Host "  - Ollama:     localhost:11434" -ForegroundColor Gray
Write-Host ""
Write-Host "To start E-Seller app, run:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
pause