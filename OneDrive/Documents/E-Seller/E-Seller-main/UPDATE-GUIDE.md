# 📚 GUIDE DE MISE À JOUR - E-SELLER

Ce document contient toutes les commandes nécessaires pour mettre à jour le programme E-Seller.

---

## 🚀 Commandes de Base

### 1. Mettre à jour le code depuis GitHub

```bash
# Se positionner dans le dossier du projet
cd /workspace/project/E-Seller

# Récupérer les dernières modifications
git pull origin main

# Ou si vous travaillez sur une branche
git pull origin feature/remove-n8n-add-health-maintenance
```

### 2. Installer les dépendances

```bash
# Installer les packages npm
npm install

# Ou avec yarn
yarn install

# Ou avec pnpm
pnpm install
```

### 3. Lancer l'application

```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

---

## 🔄 Commandes de Mise à Jour Standards

### Mettre à jour les dépendances npm

```bash
# Voir les mises à jour disponibles
npm outdated

# Mettre à jour tous les packages
npm update

# Mettre à jour un package spécifique
npm update [nom-du-package]
```

### Mettre à jour Next.js

```bash
# Mettre à jour vers la dernière version
npx create-next-app@latest . --typescript --tailwind --eslint

# Ou utiliser npm-check-updates
npx npm-check-updates -u
npm install
```

---

## 🐳 Commandes Docker

### Mettre à jour les conteneurs

```bash
# Arrêter les conteneurs
docker-compose down

# Mettre à jour les images
docker-compose pull

# Recréer les conteneurs
docker-compose up -d

# Rebuild sans cache
docker-compose build --no-cache
```

### Commandes Docker utiles

```bash
# Voir les conteneurs actifs
docker ps

# Logs en temps réel
docker-compose logs -f

# Redémarrer un service
docker-compose restart [service]

# Accéder au shell d'un conteneur
docker exec -it [conteneur] sh
```

---

## 🤖 Commandes Ollama (IA Locale)

### Mettre à jour Ollama

```bash
# Vérifier la version
ollama --version

# Mettre à jour Ollama
ollama pull llama3.2
ollama pull llama3.1:8b
ollama pull qwen2.5-coder:7b
ollama pull phi3:mini

# Voir les modèles installés
ollama list
```

### Redémarrer Ollama

```bash
# Arrêter Ollama
pkill ollama

# Relancer Ollama
ollama serve

# En arrière-plan
ollama serve > /dev/null 2>&1 &
```

---

## 🗄️ Commandes Base de Données

### Sauvegarde PostgreSQL

```bash
# Créer une sauvegarde
pg_dump -U postgres -d eseller > backup_$(date +%Y%m%d).sql

# Restaurer une sauvegarde
psql -U postgres -d eseller < backup_20240101.sql
```

---

## 📦 Commandes de Déploiement

### Déploiement Production

```bash
# Build de production
npm run build

# Démarrer en production
NODE_ENV=production npm start
```

### Avec PM2 (Process Manager)

```bash
# Installer PM2
npm install -g pm2

# Démarrer l'application
pm2 start npm --name "eseller" -- start

# Redémarrer
pm2 restart eseller

# Voir les logs
pm2 logs eseller

# Statut
pm2 status
```

---

## 🔧 Commandes de Maintenance

### Nettoyer le projet

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install

# Nettoyer le cache Next.js
rm -rf .next
npm run build

# Supprimer les logs
rm -rf logs/*.log
```

### Vérifier la santé des services

```bash
# Vérifier Ollama
curl http://localhost:11434/api/tags

# Vérifier PostgreSQL
pg_isready -h localhost -p 5432

# Vérifier l'API Next.js
curl http://localhost:3000/api/status
```

---

## 📝 Commandes Git

### Mettre à jour depuis une branche

```bash
# Basculer sur main
git checkout main

# Récupérer les dernières modifications
git pull origin main

# Fusionner une branche
git merge feature/remove-n8n-add-health-maintenance

# Supprimer une branche locale
git branch -d [nom-branche]

# Supprimer une branche distante
git push origin --delete [nom-branche]
```

### Créer une nouvelle fonctionnalité

```bash
# Créer une nouvelle branche
git checkout -b feature/[nom-fonctionnalite]

# Ajouter les fichiers modifiés
git add .

# Créer un commit
git commit -m "feat: Description de la fonctionnalité"

# Pousser vers GitHub
git push -u origin feature/[nom-fonctionnalite]
```

---

## 🆘 Commandes de Dépannage

### Problèmes courants

```bash
# Erreur de permission
chmod -R 755 .

# Erreur de cache
rm -rf .next
npm run dev

# Erreur de modules
rm -rf node_modules
npm install

# Erreur de base de données
# Redémarrer PostgreSQL
docker-compose restart postgres
```

### Logs et diagnostic

```bash
# Voir les logs de l'application
tail -f logs/development.log

# Voir les erreurs npm
npm audit

# Vérifier les variables d'environnement
cat .env.local
```

---

## 📋 Checklist de Mise à Jour

- [ ] Sauvegarder la base de données
- [ ] Créer une branche Git
- [ ] Mettre à jour le code (`git pull`)
- [ ] Installer les dépendances (`npm install`)
- [ ] Tester en local (`npm run dev`)
- [ ] Build de production (`npm run build`)
- [ ] Déployer
- [ ] Vérifier les services
- [ ] Tester les fonctionnalités

---

## 🔗 Liens Utiles

| Service | URL |
|---------|-----|
| Repository GitHub | https://github.com/IlarionDossouyovo/E-Seller |
| Pull Request | https://github.com/IlarionDossouyovo/E-Seller/pull/5 |
| Documentation | https://docs.eseller.com |

---

*Dernière mise à jour: 2026-07-13*
