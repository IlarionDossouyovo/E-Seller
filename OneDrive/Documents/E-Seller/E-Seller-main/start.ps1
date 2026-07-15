# E-SELLER - Script de Démarrage
# Fondateur: Augustin
cd C:\Users\AUGUSTIN\Documents\E-Seller

Write-Host "═══════════════════════════════════" -ForegroundColor Cyan
Write-Host "   🏢 E-SELLER SELLER STACK" -ForegroundColor Cyan
Write-Host "      Fondateur: Augustin" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Docker services
Write-Host "[1/4] Docker: PostgreSQL + Ollama..." -ForegroundColor Yellow
docker compose up -d postgres ollama
Start-Sleep -Seconds 12

# Verify
Write-Host "[2/4] Vérification..." -ForegroundColor Yellow
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Install deps if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "[3/4] Installation..." -ForegroundColor Yellow
    npm install
}

# Start
Write-Host "[4/4] Lancement E-Seller..." -ForegroundColor Yellow
npm run dev

Write-Host ""
Write-Host "Prêt! → http://localhost:3000" -ForegroundColor Green
Write-Host "Seller Stack → http://localhost:3000/dashboard/seller-stack" -ForegroundColor Cyan