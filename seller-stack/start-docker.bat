@echo off
title Seller Stack - Demarrage
cd /d %~dp0..

echo ========================================
echo   SELLER STACK - Demarrage
echo ========================================

echo.
echo Arret des anciens conteneurs...
docker stop eseller-n8n postgres-eseller 2>nul
docker rm eseller-n8n postgres-eseller 2>nul

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
echo Demarrage N8N...
docker run -d --name eseller-n8n ^
  -p 5678:5678 ^
  -e N8N_BASIC_AUTH_ACTIVE=false ^
  -e N8N_HOST=0.0.0.0 ^
  -e N8N_PORT=5678 ^
  -e WEBHOOK_URL=http://localhost:5678 ^
  n8nio/n8n

echo.
echo ========================================
echo   SERVICES OPERATIONNELS
echo ========================================
echo.
echo   N8N:        http://localhost:5678
echo   PostgreSQL: localhost:5432
echo   Ollama:     http://localhost:11434
echo.
echo Copiez ce lien pour acceder au dashboard:
echo   http://localhost:5678
echo.
pause