@echo off
REM ============================================
REM E-SELLER - SAUVEGARDE RAPIDE
REM ============================================

echo.
echo ============================================
echo  SAUVEGARDE E-SELLER
echo ============================================
echo.

cd /d "%~dp0"

echo Sauvegarde en cours...

git add -A

git commit -m "Sauvegarde automatique %date% %time%" 2>nul

if %errorlevel% equ 0 (
    echo Commit reussi!
    git push origin main
    if %errorlevel% equ 0 (
        echo.
        echo ============================================
        echo  SAUVEGARDE TERMINEE AVEC SUCCES
        echo ============================================
    ) else (
        echo Erreur lors du push vers GitHub
    )
) else (
    echo Aucune modification a sauvegarder
)

echo.
pause
