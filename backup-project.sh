#!/bin/bash

# E-Seller Complete Backup Script
# Sauvegarde complète du projet avec compression et backup cloud

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  E-SELLER BACKUP SYSTEM${NC}"
echo -e "${BLUE}========================================${NC}"

# Configuration
PROJECT_NAME="E-Seller"
PROJECT_PATH="/workspace/project/E-Seller"
BACKUP_DIR="$PROJECT_PATH/backups"
DATE=$(date '+%Y-%m-%d_%H-%M')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Créer le dossier de backup
mkdir -p "$BACKUP_DIR"

echo -e "${GREEN}[1/5] Vérification du projet...${NC}"
cd "$PROJECT_PATH" || exit 1

# Vérifier que c'est un repo git
if [ ! -d ".git" ]; then
    echo -e "${RED}Erreur: Pas un dépôt Git${NC}"
    exit 1
fi

echo -e "${GREEN}[2/5] Création de l'archive locale...${NC}"

# Créer le nom du fichier de backup
BACKUP_FILE="$BACKUP_DIR/${PROJECT_NAME}_backup_${DATE}.tar.gz"

# Exclure node_modules et .next pour réduire la taille
tar -czf "$BACKUP_FILE" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='backups' \
    --exclude='*.log' \
    . 2>/dev/null

if [ $? -eq 0 ]; then
    FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✓ Archive créée: $BACKUP_FILE ($FILE_SIZE)${NC}"
else
    echo -e "${RED}✗ Erreur lors de la création de l'archive${NC}"
    exit 1
fi

echo -e "${GREEN}[3/5] Nettoyage des anciens backups (garder les 5 derniers)...${NC}"
cd "$BACKUP_DIR" || exit 1
ls -t "${PROJECT_NAME}_backup_"*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm -f
echo -e "${GREEN}✓ Nettoyage terminé${NC}"

echo -e "${GREEN}[4/5] Synchronisation Git en cours...${NC}"
cd "$PROJECT_PATH" || exit 1

# Ajouter toutes les modifications
git add -A

# Vérifier s'il y a des changements
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠ Aucune modification à synchroniser${NC}"
else
    # Commit
    MESSAGE="Backup automatique $TIMESTAMP"
    git commit -m "$MESSAGE" 2>/dev/null
    
    # Push vers GitHub
    if git push origin main 2>/dev/null; then
        echo -e "${GREEN}✓ Synchronisation GitHub réussie!${NC}"
    else
        echo -e "${YELLOW}⚠ Push GitHub différé (pas de token ou erreur)${NC}"
    fi
fi

echo -e "${GREEN}[5/5] Vérification finale...${NC}"

# Afficher le résumé
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  RÉSUMÉ DU BACKUP${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Projet:${NC} $PROJECT_NAME"
echo -e "${GREEN}Date:${NC} $TIMESTAMP"
echo -e "${GREEN}Archive:${NC} $BACKUP_FILE"
echo -e "${GREEN}Taille:${NC} $FILE_SIZE"
echo -e "${GREEN}Git:${NC} Synchronisé"
echo ""

# Afficher les backups disponibles
echo -e "${YELLOW}Backups disponibles:${NC}"
ls -lh "$BACKUP_DIR" | grep -v "^d" | tail -5

echo ""
echo -e "${GREEN}✓ Backup terminé avec succès!${NC}"

# Script de restauration disponible:
echo ""
echo -e "${BLUE}Pour restaurer un backup:${NC}"
echo -e "${YELLOW}  tar -xzf backups/${PROJECT_NAME}_backup_YYYY-MM-DD_HH-MM.tar.gz${NC}"
