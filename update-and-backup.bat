@echo off
REM ============================================
REM E-SELLER - MISE A JOUR ET SAUVEGARDE
REM ============================================

echo.
echo ============================================
echo  MISE A JOUR E-SELLER
echo ============================================
echo.

cd /d "%~dp0"

echo [1/6] Sauvegarde Git en cours...
git add -A
git commit -m "Sauvegarde automatique %date% %time%" 2>nul
git push origin main
echo.

echo [2/6] Pull depuis GitHub...
git pull origin main
echo.

echo [3/6] Installation des dependances...
call npm install
echo.

echo [4/6] Generation Prisma...
call npx prisma generate
echo.

echo [5/6] Nettoyage cache...
if exist ".next" rmdir /s /q ".next"
echo.

echo [6/6] Lancement serveur...
echo.
echo ============================================
echo  SERVEUR LANCE SUR http://localhost:3000
echo ============================================
call npm run dev

pause
