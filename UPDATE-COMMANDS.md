# 📦 COMMANDES DE MISE À JOUR - E-SELLER

Guide complet pour maintenir votre projet E-Seller à jour.

---

## 🚀 MISE À JOUR RAPIDE (5 min)

```bash
# 1. Aller dans le dossier projet
cd /chemin/vers/E-Seller

# 2. Mettre à jour les dépendances npm
npm install

# 3. Mettre à jour Prisma
npx prisma generate

# 4. Synchroniser GitHub
git pull origin main

# 5. Redémarrer le serveur
pkill -f "next dev" || true
npm run dev
```

---

## 🔄 MISE À JOUR COMPLÈTE

### 1. Mettre à jour les dépendances

```bash
# Mettre à jour tous les packages vers les dernières versions
npm update

# Installer les dernières versions majeures (peut casser la compatibilité)
npm install latest
```

### 2. Mettre à jour Prisma

```bash
# Mettre à jour le client Prisma
npx prisma generate

# Appliquer les nouvelles migrations
npx prisma migrate dev

# Voir le status de la DB
npx prisma studio
```

### 3. Mettre à jour Docker

```bash
# Mettre à jour les images Docker
docker compose pull

# Redémarrer les services
docker compose down
docker compose up -d
```

### 4. Mettre à jour Ollama (IA Locale)

```bash
# Mettre à jour le container Ollama
docker pull ollama/ollama
docker restart ollama-eseller

# Mettre à jour les modèles
ollama pull llama3.2
ollama pull llama3.1:8b
ollama pull qwen2.5-coder:7b
ollama pull phi3:mini
```

### 5. Synchroniser Git

```bash
# Pull les dernières modifications
git pull origin main

# Voir les changements
git status
git log --oneline -5
```

---

## 🛠️ MAINTENANCE

### Nettoyer le projet

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install

# Supprimer le cache Next.js
rm -rf .next

# Supprimer le cache npm
npm cache clean --force
```

### Rebuild complet

```bash
# Nettoyer et reconstruire
rm -rf .next node_modules
npm install
npm run build
```

---

## 💾 SAUVEGARDE & RESTAURATION

### Sauvegarde manuelle

```bash
# Sauvegarde rapide (Git only)
./auto-save.sh

# Sauvegarde complète (archive + Git)
./backup-project.sh
```

### Restauration depuis archive

```bash
# Extraire l'archive
tar -xzf backups/E-Seller_backup_YYYY-MM-DD_HH-MM.tar.gz

# Ou restaurer avec Git
git checkout -- .
```

### Restauration complète

```bash
# Cloner fresh depuis GitHub
cd ..
rm -rf E-Seller
git clone https://github.com/IlarionDossouyovo/E-Seller.git
cd E-Seller
npm install
npx prisma generate
```

---

## 🐳 COMMANDES DOCKER

```bash
# Voir les containers
docker ps -a

# Voir les logs
docker logs e-seller-postgres
docker logs e-seller-ollama

# Redémarrer un service
docker restart e-seller-postgres
docker restart e-seller-ollama

# Arrêter tous les services
docker-compose down

# Supprimer les volumes (⚠️ perte de données)
docker-compose down -v
```

---

## 🤖 COMMANDES OLLAMA

```bash
# Vérifier le status
curl http://localhost:11434/api/tags

# Tester un modèle
curl -X POST http://localhost:11434/api/chat \
  -d '{"model": "llama3.2", "messages": [{"role": "user", "content": "Hello"}]}'

# Voir les modèles installés
ollama list

# Supprimer un modèle
ollama delete llama3.2
```

---

## 📋 SCRIPT DE MISE À JOUR AUTOMATIQUE

Créer `update.sh`:

```bash
#!/bin/bash
echo "=== Mise à jour E-Seller ==="

cd "$(dirname "$0")"

# Sauvegarde
echo "1. Sauvegarde en cours..."
./backup-project.sh

# Mise à jour npm
echo "2. Mise à jour npm..."
npm install

# Prisma
echo "3. Mise à jour Prisma..."
npx prisma generate

# Git
echo "4. Synchronisation Git..."
git pull origin main

# Restart
echo "5. Redémarrage..."
pkill -f "next dev" || true
npm run dev &

echo "=== Terminé! ==="
```

```bash
# Rendre executable
chmod +x update.sh

# Lancer
./update.sh
```

---

## 🔔 CONTRÔLE QUOTIDIEN

```bash
# Vérifier les mises à jour disponibles
npm outdated

# Voir les failles de sécurité
npm audit

# Voir le status des services
curl -s http://localhost:3000 > /dev/null && echo "E-Seller: OK"
curl -s http://localhost:11434/api/tags > /dev/null && echo "Ollama: OK"
docker ps | grep postgres && echo "PostgreSQL: OK"
```

---

## 📌 NOTES IMPORTANTES

1. **Toujours faire une sauvegarde avant mise à jour**
2. **Tester en local avant de pousser en production**
3. **Vérifier la compatibilité des versions**
4. **Consulter le CHANGELOG.md pour les changements**

---

## 📞 EN CAS DE PROBLÈME

```bash
# Réinstaller depuis zéro
rm -rf node_modules .next package-lock.json
npm install

# Réinitialiser la base de données
npx prisma migrate reset

# Reset Git (⚠️)
git reset --hard origin/main
```

---

*Document généré pour E-Seller v3.2*
