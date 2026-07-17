@echo off
chcp 65001 >nul
title E-Seller - Mise a Jour

echo ========================================
echo   MISE A JOUR E-SELLER
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Installation des dependances...
call npm install
if errorlevel 1 goto error

echo.
echo [2/5] Generation Prisma...
call npx prisma generate
if errorlevel 1 goto error

echo.
echo [3/5] Synchronisation GitHub...
call git pull origin production-ready-2026
if errorlevel 1 goto error

echo.
echo [4/5] Nettoyage du cache...
if exist ".next" rmdir /s /q ".next"

echo.
echo [5/5] Build du projet...
call npm run build
if errorlevel 1 goto error

echo.
echo ========================================
echo   MISE A JOUR TERMINE!
echo ========================================
echo.
echo Lancer le serveur: npm run dev
pause
exit /b 0

:error
echo.
echo ERREUR! Verifiez les messages ci-dessus.
pause
exit /b 1
