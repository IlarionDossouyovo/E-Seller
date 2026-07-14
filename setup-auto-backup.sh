#!/bin/bash

# E-Seller Auto-Backup Setup
# Configure la sauvegarde automatique avec cron

BACKUP_SCRIPT="/workspace/project/E-Seller/backup-project.sh"
CRON_LOG="/workspace/project/E-Seller/cron-backup.log"

echo "=== Configuration Auto-Backup E-Seller ==="
echo ""

# Vérifier que le script de backup existe
if [ ! -f "$BACKUP_SCRIPT" ]; then
    echo "Erreur: Script de backup non trouvé: $BACKUP_SCRIPT"
    exit 1
fi

# Rendre le script exécutable
chmod +x "$BACKUP_SCRIPT"

# Créer le cron job (toutes les heures)
CRON_JOB="0 * * * * cd /workspace/project/E-Seller && /workspace/project/E-Seller/backup-project.sh >> $CRON_LOG 2>&1"

# Ajouter au crontab de l'utilisateur
(crontab -l 2>/dev/null | grep -v "backup-project.sh"; echo "$CRON_JOB") | crontab -

echo "✓ Sauvegarde automatique configurée!"
echo ""
echo "Fréquence: Toutes les heures"
echo "Script: $BACKUP_SCRIPT"
echo "Log: $CRON_LOG"
echo ""
echo "Commandes utiles:"
echo "  - Voir le cron:  crontab -l"
echo "  - Modifier:     crontab -e"
echo "  - Supprimer:    crontab -r"
echo "  - Tester:       $BACKUP_SCRIPT"
echo ""
echo "Pour une sauvegarde quotidienne à 2h00:"
echo "  crontab -l | sed 's/0 \* \* \* \*/0 2 * * */' | crontab -"
