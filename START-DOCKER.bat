@echo off
echo ========================================
echo  E-SELLER DOCKER STARTUP
echo  Starting all services...
echo ========================================
echo.

:: Check Docker
where docker >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed
    echo Please install Docker Desktop from https://docker.com
    pause
    exit /b 1
)

:: Start Docker if not running
echo [1/4] Starting Docker...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
timeout /t 15 /nobreak

:: Start PostgreSQL and Ollama
echo [2/4] Starting PostgreSQL and Ollama...
docker compose up -d postgres ollama

:: Wait for services
echo [3/4] Waiting for services...
timeout /t 10 /nobreak

:: Check services
echo.
echo [4/4] Checking services...
docker ps

echo.
echo ========================================
echo  ALL SERVICES STARTED!
echo ========================================
echo.
echo Services:
echo   - PostgreSQL: localhost:5432
echo   - Ollama:    localhost:11434
echo   - E-Seller: http://localhost:3000
echo.
echo To start E-Seller app:
echo   npm run dev
echo.
pause