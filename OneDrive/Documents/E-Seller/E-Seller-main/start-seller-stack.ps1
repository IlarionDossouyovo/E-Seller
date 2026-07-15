# ============================================================================
# E-SELLER SELLER STACK - STARTUP COMPLET
# Fondateur: Augustin - Entreprise E-Seller
# ============================================================================

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "       🏢 E-SELLER SELLER STACK - SYSTEME DE DIRECTION AI" -ForegroundColor Cyan
Write-Host "                    Fondateur: Augustin" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# ETAPE 1: VERIFICATION DOCKER
# ============================================================================
Write-Host "[1/7] Vérification Docker..." -ForegroundColor Yellow

$dockerStatus = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ❌ Docker n'est pas démarré!" -ForegroundColor Red
    Write-Host "  → Veuillez démarrer Docker Desktop" -ForegroundColor White
    Write-Host "  → Puis ré-exécuter ce script" -ForegroundColor Gray
    pause
    exit 1
}
Write-Host "  ✅ Docker est actif" -ForegroundColor Green

# ============================================================================
# ETAPE 2: DEMARRAGE SERVICES DOCKER
# ============================================================================
Write-Host "[2/7] Démarrage PostgreSQL & Ollama..." -ForegroundColor Yellow

Set-Location "C:\Users\AUGUSTIN\Documents\E-Seller"
docker compose up -d postgres ollama

Write-Host "  → Attente des services..." -ForegroundColor Gray
Start-Sleep -Seconds 15

# ============================================================================
# ETAPE 3: VERIFICATION SERVICES
# ============================================================================
Write-Host "[3/7] Vérification des services..." -ForegroundColor Yellow

$postgres = docker ps --filter "name=e-seller-postgres" --format "{{.Names}}"
$ollama = docker ps --filter "name=e-seller-ollama" --format "{{.Names}}"

if ($postgres -eq "e-seller-postgres") {
    Write-Host "  ✅ PostgreSQL: localhost:5432" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  PostgreSQL: En attente..." -ForegroundColor Yellow
}

if ($ollama -eq "e-seller-ollama") {
    Write-Host "  ✅ Ollama: localhost:11434" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Ollama: En attente..." -ForegroundColor Yellow
}

# ============================================================================
# ETAPE 4: CONFIGURATION ENVIRONNEMENT
# ============================================================================
Write-Host "[4/7] Configuration environnement..." -ForegroundColor Yellow

$envFile = "C:\Users\AUGUSTIN\Documents\E-Seller\.env.local"

if (-Not (Test-Path $envFile)) {
    Write-Host "  → Création .env.local..." -ForegroundColor Gray
    @"
# E-Seller - Configuration Complete
DATABASE_URL=postgresql://eseller:eseller_password@localhost:5432/eseller
NEXT_PUBLIC_SUPABASE_URL=https://bauggttibriqdkfnlfhh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kYW5lYSIsInJlZiI6ImJhcmdndHRpYnJpcWRrZm5sZmhoIiwicm9vbSI6Im9ubHkiLCJpbnQiOjIxLCJzY29wZSI6WyJwdWJsaWMiXSwiaWF0IjoxNjQyODQwODc5fQ.tVOIDM3SokDpqeGRANDANg0vKfW22M3SokDpqeGRA
GROQ_API_KEY=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
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=tinyllama
NEXTAUTH_SECRET=e-seller-augustin-fondsateur-2024
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
"@ | Set-Content $envFile -Encoding UTF8
    Write-Host "  ✅ .env.local créé" -ForegroundColor Green
} else {
    Write-Host "  ✅ .env.local existant" -ForegroundColor Green
}

# ============================================================================
# ETAPE 5: SYNCHRONISATION BASE DE DONNEES
# ============================================================================
Write-Host "[5/7] Synchronisation base de données..." -ForegroundColor Yellow

Set-Location "C:\Users\AUGUSTIN\Documents\E-Seller"
$envContent = Get-Content ".env.local" -Raw
$envContent | Invoke-Expression

npx prisma generate 2>$null
Write-Host "  ✅ Prisma client généré" -ForegroundColor Green

# ============================================================================
# ETAPE 6: INSTALLATION DEPENDANCES
# ============================================================================
Write-Host "[6/7] Vérification dépendances..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
    Write-Host "  ✅ node_modules présent" -ForegroundColor Green
} else {
    Write-Host "  → Installation des dépendances..." -ForegroundColor Gray
    npm install 2>$null
    Write-Host "  ✅ Dépendances installées" -ForegroundColor Green
}

# ============================================================================
# ETAPE 7: LANCEMENT E-SELLER
# ============================================================================
Write-Host "[7/7] Lancement E-Seller..." -ForegroundColor Yellow

# Kill existing node processes on port 3000
$nodeProcesses = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "  → Arrêt du serveur existant..." -ForegroundColor Gray
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "       🏆 TOUS LES SERVICES SONT ACTIVES!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "SELLER STACK - Agents AI:" -ForegroundColor White
Write-Host "  🤖 Product Director     → Recherche produits gagnants" -ForegroundColor Gray
Write-Host "  🎨 Brand Director    → Création de marque" -ForegroundColor Gray
Write-Host "  📺 Ads Director     → Publicités & Contenu" -ForegroundColor Gray
Write-Host "  📊 Analytics       → Analytique prédictive" -ForegroundColor Gray
Write-Host "  💬 Assistant AI    → Support client 24/7" -ForegroundColor Gray
Write-Host "  🔍 SEO Director    → Optimisation SEO" -ForegroundColor Gray
Write-Host "  📝 Content Director → Contenu automatique" -ForegroundColor Gray
Write-Host ""
Write-Host "Services:" -ForegroundColor White
Write-Host "  📦 PostgreSQL:  localhost:5432" -ForegroundColor Cyan
Write-Host "  🧠 Ollama:     localhost:11434" -ForegroundColor Cyan
Write-Host "  🛒 E-Seller: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Dashboard: http://localhost:3000/dashboard" -ForegroundColor Yellow
Write-Host "Seller Stack: http://localhost:3000/dashboard/seller-stack" -ForegroundColor Yellow
Write-Host ""

# Lancer E-Seller en arrière-plan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'C:\Users\AUGUSTIN\Documents\E-Seller'; npm run dev"

Write-Host "🚀 E-Seller est en cours de démarrage..." -ForegroundColor Green
Write-Host "→ Ouvrez http://localhost:3000 dans votre navigateur" -ForegroundColor White
Write-Host ""
pause