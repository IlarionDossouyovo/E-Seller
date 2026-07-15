@echo off
title Seller Stack - Demarrage
cd /d %~dp0..

echo ========================================
echo   SELLER STACK - Demarrage
echo ========================================

echo.
echo Arret des anciens conteneurs...

echo.
echo Demarrage PostgreSQL...
docker run -d --name postgres-eseller ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=E-Seller2024 ^
  -e POSTGRES_DB=eseller ^
  -p 5432:5432 ^
  postgres:16-alpine

timeout /t 3

echo.
  -p 5678:5678 ^
  -e WEBHOOK_URL=http://localhost:5678 ^

echo.
echo ========================================
echo   SERVICES OPERATIONNELS
echo ========================================
echo.
echo   PostgreSQL: localhost:5432
echo   Ollama:     http://localhost:11434
echo.
echo Copiez ce lien pour acceder au dashboard:
echo   http://localhost:5678
echo.
pause