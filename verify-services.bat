@echo off
echo ========================================
echo  E-SELLER Verification Script
echo ========================================
echo.

REM === DOCKER ===
echo [1/5] Checking Docker...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running!
    goto :error
)
echo [OK] Docker is running

REM === OLLAMA ===
echo [2/5] Checking Ollama...
curl -s http://localhost:11434/api/tags >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Ollama not running on port 11434
) else (
    echo [OK] Ollama is running
)

REM === N8N ===
echo [3/5] Checking N8N...
curl -s http://localhost:5678 >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] N8N not running on port 5678
) else (
    echo [OK] N8N is running
)

REM === NGROK ===
echo [4/5] Checking Ngrok tunnel...
curl -s --max-time 3 https://localhost:4040/api/status >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Ngrok not running (run: ngrok http 11434)
) else (
    echo [OK] Ngrok tunnel active
)

REM === CONTAINER LIST ===
echo.
echo [5/5] Active Docker Containers:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo ========================================
echo Verification Complete!
echo ========================================
echo.
echo URLs:
echo - Ollama: http://localhost:11434
echo - N8N: http://localhost:5678
echo - Ngrok: http://localhost:4040
echo.
pause
exit /b 0

:error
echo.
echo Please start Docker Desktop and try again.
pause
exit /b 1