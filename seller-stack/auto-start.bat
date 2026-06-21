# 🚀 E-SELLER AUTO-START SYSTEM
# Démarrage automatique de tous les services

# @echo off
# titre E-SELLER Auto-Start
title E-SELLER Auto-Start System

# ========================================
# E-SELLER - Démarrage Automatique
# ========================================

echo.
echo ========================================
echo    E-SELLER - Auto-Start System
echo ========================================
echo.

# Changement vers le dossier E-Seller
cd /d %~dp0..

echo [1/4] Verification Docker...
docker info >nul 2>&1
if errorlevel 1 (
    echo    ERREUR: Docker n'est pas demarre!
    echo    Veuillez lancer Docker Desktop puis reessayer.
    pause
    exit /b 1
)
echo    OK: Docker est demarre

echo.
echo [2/4] Arret des anciens conteneurs...
docker stop eseller-n8n postgres-eseller ollama-eseller 2>nul
docker rm eseller-n8n postgres-eseller ollama-eseller 2>nul

echo.
echo [3/4] Demarrage PostgreSQL...
docker run -d --name postgres-eseller ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=E-Seller2024 ^
  -e POSTGRES_DB=eseller ^
  -e PGDATA=/var/lib/postgresql/data/pgdata ^
  -v eseller-pgdata:/var/lib/postgresql/data ^
  -p 5432:5432 ^
  postgres:16-alpine
echo    OK: PostgreSQL demarre sur port 5432

echo.
echo [4/4] Demarrage Ollama...
docker run -d --name ollama-eseller ^
  -v ollama-models:/root/.ollama ^
  -p 11434:11434 ^
  ollama/ollama
echo    OK: Ollama demarre sur port 11434

echo.
echo ========================================
echo    TOUS LES SERVICES OPERATIONNELS
echo ========================================
echo.
echo    PostgreSQL:  localhost:5432
echo    Ollama:     localhost:11434
echo.
echo    E-SELLER:   http://localhost:3000
echo.
echo [5/4] Lancement E-Seller (optionnel)...
start npm run dev

echo.
echo ========================================
echo    DEMARRAGE TERMINE!
echo ========================================
echo.
echo Vous pouvez acceder a:
echo   - E-Seller: http://localhost:3000
echo   - N8N:     http://localhost:5678 (si installe)
echo.
pause