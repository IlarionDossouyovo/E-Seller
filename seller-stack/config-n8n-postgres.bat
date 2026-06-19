@echo off
title Seller Stack - Configuration N8N PostgreSQL
cd /d C:\Users\AUGUSTIN\OneDrive\Documents\E-Seller

echo ========================================
echo   Configuration N8N - PostgreSQL
echo ========================================
echo.

echo Etape 1: Redemarrage de N8N avec configuration DB...
echo.

docker stop eseller-n8n-new 2>nul
docker rm eseller-n8n-new 2>nul

docker run -d --name eseller-n8n-new ^
  -p 5679:5678 ^
  -e N8N_BASIC_AUTH_ACTIVE=false ^
  -e N8N_LICENSE_KEY=9a0305b1-3e9b-48e6-be60-9f8fda967109 ^
  -e DB_TYPE=postgresdb ^
  -e DB_POSTGRESDB_HOST=postgres-eseller ^
  -e DB_POSTGRESDB_DATABASE=eseller ^
  -e DB_POSTGRESDB_USER=postgres ^
  -e DB_POSTGRESDB_PASSWORD=E-Seller2024 ^
  -e DB_POSTGRESDB_PORT=5432 ^
  --link postgres-eseller:postgres-eseller ^
  n8nio/n8n

echo.
echo === Configuration terminee ===
echo.
echo   N8N: http://localhost:5679
echo   Database: eseller (connectee)
echo.
echo ========================================
pause