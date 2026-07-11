@echo off
REM E-Seller Auto-Save Script
REM Sauvegarde automatique du projet

echo === E-Seller Auto-Save ===

cd /d "%~dp0"

REM Vérifier si git est installé
where git >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Erreur: Git n'est pas installé
    exit /b 1
)

REM Ajouter toutes les modifications
echo Ajout des modifications...
git add -A

REM Vérifier s'il y a des changements
git diff --staged --quiet
if %ERRORLEVEL% neq 0 (
    echo Aucune modification a sauvegarder
    exit /b 0
)

REM Commit avec message automatique
set MESSAGE=Sauvegarde automatique %date% %time%
echo Commit: %MESSAGE%
git commit -m "%MESSAGE%"

REM Push vers GitHub
echo Push vers GitHub...
git push origin main

if %ERRORLEVEL% equ 0 (
    echo Sauvegarde reussie!
) else (
    echo Erreur lors du push
    exit /b 1
)
