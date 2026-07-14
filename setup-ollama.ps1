# ============================================
# E-SELLER - Configuration Ollama (PowerShell)
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  E-SELLER - Configuration Ollama" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifier si Ollama est installe
$ollamaPath = Get-Command ollama -ErrorAction SilentlyContinue
if (-not $ollamaPath) {
    Write-Host "[ERREUR] Ollama n'est pas installe!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Veuillez installer Ollama depuis: https://ollama.com" -ForegroundColor Yellow
    Write-Host "Puis executez ce script a nouveau." -ForegroundColor Yellow
    Read-Host ""
    exit 1
}

Write-Host "[1/4] Verification des modeles installes..." -ForegroundColor Green
Write-Host ""
& ollama list
Write-Host ""

Write-Host "[2/4] Configuration des variables d'environnement..." -ForegroundColor Green

# Creer .env.local si pas existant
if (-not (Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
    Write-Host "      OK - .env.local cree" -ForegroundColor Green
} else {
    Write-Host "      OK - .env.local existant" -ForegroundColor Green
}

# Verifier/ajouter les variables Ollama
$envContent = Get-Content ".env.local" -Raw -ErrorAction SilentlyContinue
if ($envContent -notmatch "OLLAMA_HOST") {
    Add-Content -Path ".env.local" -Value ""
    Add-Content -Path ".env.local" -Value "# Ollama (Local AI)"
    Add-Content -Path ".env.local" -Value "OLLAMA_HOST=http://localhost:11434"
    Add-Content -Path ".env.local" -Value "OLLAMA_MODEL=llama3.2"
    Write-Host "      OK - Variables Ollama ajoutees" -ForegroundColor Green
} else {
    Write-Host "      OK - Variables Ollama deja presentes" -ForegroundColor Green
}

Write-Host ""
Write-Host "[3/4] Verification du serveur Ollama..." -ForegroundColor Green

try {
    $response = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -TimeoutSec 3 -ErrorAction Stop
    Write-Host "      OK - Ollama serveur en cours d'execution" -ForegroundColor Green
} catch {
    Write-Host "      INFO - Demarrage du serveur Ollama..." -ForegroundColor Yellow
    Start-Process -FilePath "ollama" -ArgumentList "serve" -WindowStyle Hidden
    Start-Sleep -Seconds 3
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -TimeoutSec 5
        Write-Host "      OK - Ollama serveur demarre" -ForegroundColor Green
    } catch {
        Write-Host "      ERREUR - Impossible de demarrer Ollama" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "[4/4] Test de l'API..." -ForegroundColor Green

try {
    $testBody = @{
        model = "llama3.2"
        messages = @(
            @{
                role = "user"
                content = "Hello"
            }
        )
        stream = $false
    } | ConvertTo-Json
    
    $testResponse = Invoke-RestMethod -Uri "http://localhost:11434/api/chat" -Method Post -Body $testBody -ContentType "application/json" -TimeoutSec 30
    Write-Host "      OK - Connexion a Ollama reussie!" -ForegroundColor Green
    Write-Host "      Reponse: $($testResponse.message.content.Substring(0, [Math]::Min(100, $testResponse.message.content.Length)))..." -ForegroundColor Gray
} catch {
    Write-Host "      ATTENTION - Test API echoue (normal si modele non charge)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CONFIGURATION TERMINEE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Modeles installes:" -ForegroundColor Green
& ollama list
Write-Host ""
Write-Host "Prochaines etapes:" -ForegroundColor Cyan
Write-Host "  1. Lancer E-Seller: npm run dev" -ForegroundColor White
Write-Host "  2. Acceder a: http://localhost:3000" -ForegroundColor White
Write-Host "  3. Dashboard IA: http://localhost:3000/dashboard/seller-stack" -ForegroundColor White
Write-Host ""
