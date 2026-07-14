@echo off
REM ============================================
REM E-SELLER - Configuration Ollama (Windows)
REM ============================================

echo.
echo ========================================
echo   E-SELLER - Configuration Ollama
echo ========================================
echo.

REM Verifier si Ollama est installe
where ollama > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Ollama n'est pas installe!
    echo.
    echo Veuillez installer Ollama depuis: https://ollama.com
    echo.
    pause
    exit /b 1
)

echo [1/4] Verification des modeles installes...
echo.
ollama list
echo.

echo [2/4] Verification des modeles requis...
set "MISSING_MODELS=0"

REM llama3.2
ollama list | findstr "llama3.2" > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Telechargement de llama3.2...
    ollama pull llama3.2
    if %ERRORLEVEL% EQU 0 (
        echo      OK - llama3.2 telecharge
    ) else (
        set "MISSING_MODELS=1"
    )
) else (
    echo      OK - llama3.2 deja present
)

REM llama3.1:8b
ollama list | findstr "llama3.1:8b" > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Telechargement de llama3.1:8b...
    ollama pull llama3.1:8b
    if %ERRORLEVEL% EQU 0 (
        echo      OK - llama3.1:8b telecharge
    ) else (
        set "MISSING_MODELS=1"
    )
) else (
    echo      OK - llama3.1:8b deja present
)

REM qwen2.5-coder:7b
ollama list | findstr "qwen2.5-coder:7b" > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Telechargement de qwen2.5-coder:7b...
    ollama pull qwen2.5-coder:7b
    if %ERRORLEVEL% EQU 0 (
        echo      OK - qwen2.5-coder:7b telecharge
    ) else (
        set "MISSING_MODELS=1"
    )
) else (
    echo      OK - qwen2.5-coder:7b deja present
)

REM phi3:mini
ollama list | findstr "phi3:mini" > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Telechargement de phi3:mini...
    ollama pull phi3:mini
    if %ERRORLEVEL% EQU 0 (
        echo      OK - phi3:mini telecharge
    ) else (
        set "MISSING_MODELS=1"
    )
) else (
    echo      OK - phi3:mini deja present
)

REM nomic-embed-text
ollama list | findstr "nomic-embed-text" > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Telechargement de nomic-embed-text...
    ollama pull nomic-embed-text
    if %ERRORLEVEL% EQU 0 (
        echo      OK - nomic-embed-text telecharge
    ) else (
        set "MISSING_MODELS=1"
    )
) else (
    echo      OK - nomic-embed-text deja present
)

echo.
echo [3/4] Configuration des variables d'environnement...
REM Creer .env.local si pas existant
if not exist ".env.local" (
    copy .env.example .env.local
    echo      OK - .env.local cree
) else (
    echo      OK - .env.local existant
)

REM Verifier/ajouter les variables Ollama
findstr /C:"OLLAMA_HOST" .env.local > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo. >> .env.local
    echo # Ollama (Local AI) >> .env.local
    echo OLLAMA_HOST=http://localhost:11434 >> .env.local
    echo OLLAMA_MODEL=llama3.2 >> .env.local
    echo      OK - Variables Ollama ajoutees
) else (
    echo      OK - Variables Ollama deja presentes
)

echo.
echo [4/4] Verification du serveur Ollama...
curl -s http://localhost:11434/api/tags > nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo      OK - Ollama serveur en cours d'execution
) else (
    echo [INFO] Demarrage du serveur Ollama...
    start "" ollama serve
    timeout /t 3 /nobreak > nul
    curl -s http://localhost:11434/api/tags > nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo      OK - Ollama serveur demarre
    ) else (
        echo [ERREUR] Impossible de demarrer Ollama
    )
)

echo.
echo ========================================
echo   CONFIGURATION TERMINEE
echo ========================================
echo.
echo Modeles installes:
ollama list
echo.
echo Prochaines etapes:
echo   1. Lancer E-Seller: npm run dev
echo   2. Acceder a: http://localhost:3000
echo   3. Dashboard IA: http://localhost:3000/dashboard/seller-stack
echo.
pause
