@echo off
echo ========================================
echo  E-SELLER STARTUP SCRIPT
echo  Launch all systems at once
echo ========================================
echo.

echo [1/4] Starting Docker Desktop...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
timeout /t 10 /nobreak

echo [2/4] Starting Ollama...
start cmd /k "ollama serve"
timeout /t 5 /nobreak

echo [3/4] Starting Ngrok tunnel...
start cmd /k "ngrok http 11434"
timeout /t 5 /nobreak

start http://localhost:5678

echo.
echo ========================================
echo All systems starting!
echo ========================================
echo.
echo Wait 10 seconds then check:
echo - Ollama: http://localhost:11434
echo - Ngrok: http://localhost:4040
echo - E-Seller: https://e-seller-v3.vercel.app
echo.
pause