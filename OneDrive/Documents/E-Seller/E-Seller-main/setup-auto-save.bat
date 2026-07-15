@echo off
REM Script de configuration de la sauvegarde automatique Windows
REM Planifie une tâche pour sauvegarder toutes les heures

echo === Configuration Auto-Save E-Seller ===

REM Créer la tâche planifiée
schtasks /create /tn "E-Seller Auto-Save" /tr "powershell.exe -ExecutionPolicy Bypass -File \"%~dp0auto-save.ps1\"" /sc hourly /st 09:00 /f

if %ERRORLEVEL% equ 0 (
    echo.
    echo ✓ Tâche planifiée créée avec succès!
    echo La sauvegarde automatique aura lieu toutes les heures.
    echo.
    echo Pour voir les tâches: schtasks /query /tn "E-Seller Auto-Save"
    echo Pour supprimer: schtasks /delete /tn "E-Seller Auto-Save" /f
) else (
    echo.
    echo ✗ Erreur lors de la création de la tâche
)

pause
