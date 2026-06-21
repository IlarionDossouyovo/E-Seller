# 🤖 STATUT DES SERVICES E-SELLER

## 🌐 Vérification des Services

### Sur Ta Machine (PowerShell)

```powershell
# Test Ollama
Invoke-WebRequest -Uri http://localhost:11434/api/tags -Method Get

# Test PostgreSQL
docker ps | findstr postgres

# Test E-Seller
Invoke-WebRequest -Uri http://localhost:3000 -Method Get
```

---

## 📊 Résumé des Services

| Service | URL | Statut Local |
|---------|-----|-------------|
| **E-Seller App** | http://localhost:3000 | ✅ En cours |
| **Ollama IA** | http://localhost:11434 | À vérifier |
| **PostgreSQL** | localhost:5432 | À vérifier |
| **N8N** | http://localhost:5678 | Optionnel |

---

## 🔧 Commandes Docker

```powershell
# Voir tous les conteneurs
docker ps -a

# Statut d'un conteneur spécifique
docker ps | findstr ollama
docker ps | findstr postgres
```

---

## 🌐 Vérification en Ligne

Ouvre dans ton navigateur :
- **http://localhost:3000/dashboard/seller-stack**

---

## ⚠️ Si un Service ne Fonctionne Pas

```powershell
# Redémarrer Ollama
docker restart ollama-eseller

# Redémarrer PostgreSQL
docker restart postgres-eseller
```

---

*Document généré le 21 Juin 2026*