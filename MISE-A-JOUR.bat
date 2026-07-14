@echo off
REM ============================================
REM E-SELLER - Script de Mise a Jour (Windows)
REM ============================================

echo.
echo ========================================
echo   E-SELLER - MISE A JOUR
echo ========================================
echo.

REM Verifier si onedrive est monte
set "ONEDRIVE_PATH=%USERPROFILE%\OneDrive\Documents\E-Seller"
if not exist "%ONEDRIVE_PATH%" (
    echo [INFO] Projet pas dans OneDrive, utilisation du dossier courant
    set "PROJECT_PATH=%CD%"
) else (
    echo [INFO] Detection du projet dans OneDrive
    set "PROJECT_PATH=%ONEDRIVE_PATH%"
)

echo [1/5] Changement vers le repertoire projet...
cd /d "%PROJECT_PATH%"
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Impossible de trouver le projet!
    pause
    exit /b 1
)
echo      OK - Projet: %PROJECT_PATH%

echo.
echo [2/5] Recuperation des dernieres modifications...
git pull origin main
if %ERRORLEVEL% NEQ 0 (
    echo [ATTENTION] Erreur lors de git pull - continuation quand meme
)

echo.
echo [3/5] Installation des dependances...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Erreur lors de npm install!
    pause
    exit /b 1
)
echo      OK - Dependencies installees

echo.
echo [4/5] Verification des variables d'environnement...
if not exist ".env.local" (
    echo [INFO] Creation de .env.local depuis .env.example
    copy .env.example .env.local
) else (
    echo      OK - .env.local existe deja
)

echo.
echo [5/5] Verification d'Ollama...
curl -s http://localhost:11434/api/tags > nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo      OK - Ollama est en cours d'execution
    curl -s http://localhost:11434/api/tags | findstr "llama3.2" > nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo      OK - Modele llama3.2 detecte
    ) else (
        echo [ATTENTION] Modele llama3.2 non trouve
    )
) else (
    echo [ATTENTION] Ollama n'est pas en cours d'execution!
    echo.
    echo Pour demarrer Ollama, executez:
    echo   ollama serve
    echo.
    echo Pour installer les modeles:
    echo   ollama pull llama3.2
    echo   ollama pull llama3.1:8b
    echo   ollama pull qwen2.5-coder:7b
    echo   ollama pull phi3:mini
)

echo.
echo ========================================
echo   MISE A JOUR TERMINEE
echo ========================================
echo.
echo Pour lancer E-Seller en mode developpement:
echo   npm run dev
echo.
echo Puis ouvrez: http://localhost:3000
echo.
echo Pour les agents IA, utilisez: http://localhost:3000/dashboard/seller-stack
echo.
pause
