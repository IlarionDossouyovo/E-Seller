@echo off
title Seller Stack - Health Check
cd /d C:\Users\AUGUSTIN\OneDrive\Documents\E-Seller

echo ========================================
echo   SELLER STACK - Health Check
echo ========================================
echo.

echo Ollama AI:
curl -s --max-time 5 http://localhost:11434/api/tags >nul 2>&1
if %errorlevel%==0 (
    echo   [OK] OpERATIONNEL
) else (
    echo   [ERREUR] Non demarre
)

echo.
echo N8N:
curl -s --max-time 5 http://localhost:5678 >nul 2>&1
if %errorlevel%==0 (
    echo   [OK] OpERATIONNEL
) else (
    echo   [ERREUR] Non demarre
)

echo.
echo PostgreSQL:
docker ps | findstr postgres-eseller >nul 2>&1
if %errorlevel%==0 (
    echo   [OK] OpERATIONNEL
) else (
    echo   [ERREUR] Non demarre
)

echo.
echo Docker:
docker ps
echo.
echo ========================================
pause