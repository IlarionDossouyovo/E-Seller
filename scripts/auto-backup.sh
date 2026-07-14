#!/bin/bash

# Auto Backup Script for E-Seller
# This script creates automatic backups of the project

# Configuration
PROJECT_DIR="/workspace/project/E-Seller"
BACKUP_DIR="$PROJECT_DIR/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_$DATE"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create the backup
echo "Creating backup: $BACKUP_NAME"
cd "$PROJECT_DIR"

# Backup src directory
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    src/ \
    package.json \
    package-lock.json \
    tsconfig.json \
    next.config.js \
    tailwind.config.ts \
    prisma/ 2>/dev/null

# Keep only last 10 backups
cd "$BACKUP_DIR"
ls -t | tail -n +11 | xargs -r rm -f

echo "Backup created: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
echo "Total backups: $(ls -1 *.tar.gz 2>/dev/null | wc -l)"
