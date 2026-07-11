#!/bin/bash

# E-Seller Auto-Save Script
# Sauvegarde automatique du projet toutes les heures

# Couleurs pour l'affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== E-Seller Auto-Save ===${NC}"

# Aller dans le dossier du projet
cd "$(dirname "$0")"

# Vérifier si c'est un repo git
if [ ! -d ".git" ]; then
    echo -e "${RED}Erreur: Ce n'est pas un dépôt Git${NC}"
    exit 1
fi

# Ajouter toutes les modifications
echo -e "${YELLOW}Ajout des modifications...${NC}"
git add -A

# Vérifier s'il y a des changements
if git diff --staged --quiet; then
    echo -e "${YELLOW}Aucune modification à sauvegarder${NC}"
    exit 0
fi

# Demander le message de commit
MESSAGE="${1:-Sauvegarde automatique $(date '+%Y-%m-%d %H:%M')}"

# Commit
echo -e "${YELLOW}Commit: $MESSAGE${NC}"
git commit -m "$MESSAGE"

# Push vers GitHub
echo -e "${YELLOW}Push vers GitHub...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Sauvegarde réussie!${NC}"
else
    echo -e "${RED}✗ Erreur lors du push${NC}"
    exit 1
fi
