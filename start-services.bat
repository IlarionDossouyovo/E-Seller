@echo off
echo ========================================
echo   E-Seller Docker Services
echo ========================================
echo.

echo [1/3] Starting PostgreSQL Database...
docker-compose up -d postgres

echo.
echo [2/3] Starting Ollama (AI)...
docker-compose up -d ollama

echo.
echo [3/3] Starting N8n (Automation)...
docker-compose up -d n8n

echo.
echo ========================================
echo   Services Started!
echo ========================================
echo.
echo Services:
echo   - PostgreSQL:  localhost:5432
echo   - Ollama AI:   localhost:11434
echo   - N8n:         localhost:5678
echo.
echo Database:
echo   - User:     eseller
echo   - Password: eseller_password
echo   - Database: eseller
echo.
echo To stop: docker-compose down
echo To view logs: docker-compose logs -f
echo.
pause
