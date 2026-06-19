# SELLER STACK - Commandes Windows

## 📁 Emplacement du Projet
```
C:\Users\AUGUSTIN\OneDrive\Documents\E-Seller
```

---

## 1️⃣ COMMANDES DE DÉMARRAGE

### Ouvrir PowerShell ou CMD dans le dossier:
```cmd
cd C:\Users\AUGUSTIN\OneDrive\Documents\E-Seller
```

### Démarrer tous les services:
```cmd
# Terminal 1: Docker Desktop (manuel)
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

# Terminal 2: Ollama
ollama serve

# Terminal 3: N8N
docker run -d --name eseller-n8n -p 5678:5678 n8nio/n8n
```

---

## 2️⃣ VÉRIFIER LES SERVICES

```cmd
# Docker
docker ps

# Ollama
curl http://localhost:11434/api/tags

# N8N
curl http://localhost:5678

# PostgreSQL
docker ps | findstr postgres
```

---

## 3️⃣ COMMANDES SELLER STACK

### Health Check:
```cmd
C:\Users\AUGUSTIN\OneDrive\Documents\E-Seller\seller-stack\health-check.bat
```

### Démarrer Docker Stack:
```cmd
C:\Users\AUGUSTIN\OneDrive\Documents\E-Seller\seller-stack\start-docker.bat
```

---

## 4️⃣ ACCÈS

| Service | URL |
|---------|-----|
| **Dashboard** | http://localhost:3000/dashboard/seller-stack |
| **N8N** | http://localhost:5678 |
| **Ollama** | http://localhost:11434 |
| **PostgreSQL** | localhost:5432 |

---

## 5️⃣ DÉMO N8N

Importer workflow N8N:
1. Aller sur http://localhost:5678
2. Workflows → Import from File
3. Choisir: `seller-stack\automation\product-research.json`

---

## 💡 RACCOURCI BUREAU

Créer `start-seller-stack.bat`:
```bat
@echo off
title Seller Stack
cd C:\Users\AUGUSTIN\OneDrive\Documents\E-Seller

echo Demarrage des services...
start "" ollama serve
timeout /t 3
docker run -d --name eseller-n8n -p 5678:5678 n8nio/n8n

echo.
echo === Seller Stack Demarre ===
echo N8N: http://localhost:5678
echo Ollama: http://localhost:11434
echo.
pause
```