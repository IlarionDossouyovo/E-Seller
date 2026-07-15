@echo off
REM ==============================================
REM E-SELLER - Script de Mise a Jour Windows
REM ==============================================

echo.
echo ===========================================
echo 🚀 E-Seller Update Script
echo ===========================================
echo.

REM ==============================================
REM 1. Mise a jour du code source
REM ==============================================
echo 📥 Step 1: Updating code from GitHub...
echo -------------------------------------------
git fetch origin
git pull origin main

if %errorlevel% neq 0 (
    echo ❌ Failed to update code
    pause
    exit /b 1
)
echo ✅ Code updated successfully
echo.

REM ==============================================
REM 2. Installation des dependances
REM ==============================================
echo 📦 Step 2: Installing dependencies...
echo -------------------------------------------
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed
echo.

REM ==============================================
REM 3. Nettoyage du cache
REM ==============================================
echo 🧹 Step 3: Cleaning cache...
echo -------------------------------------------
if exist ".next" (
    rmdir /s /q .next
)
echo ✅ Cache cleaned
echo.

REM ==============================================
REM 4. Verification des services
REM ==============================================
echo 🔍 Step 4: Checking services...
echo -------------------------------------------

REM Verifier Ollama
curl -s http://localhost:11434/api/tags >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Ollama is running
) else (
    echo ⚠️  Ollama is not running. Start with: ollama serve
)

REM Verifier PostgreSQL
pg_isready -h localhost -p 5432 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ PostgreSQL is running
) else (
    echo ⚠️  PostgreSQL is not running
)
echo.

REM ==============================================
REM 5. Build de l'application
REM ==============================================
echo 🔨 Step 5: Building application...
echo -------------------------------------------
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)
echo ✅ Build completed successfully
echo.

REM ==============================================
REM Fin
REM ==============================================
echo 🎉 Update Complete!
echo ===========================================
echo.
echo To start the application, run:
echo   npm run dev
echo.
echo Or for production:
echo   npm start
echo.
echo Access the dashboard at:
echo   http://localhost:3000
echo.
echo AI Command Center:
echo   http://localhost:3000/dashboard/founder/ai-command-center
echo.
pause
