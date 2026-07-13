# E-Seller Services - Commandes de Verification

## 1️⃣ VERIFIER LES SERVICES

```powershell
# Docker
docker ps

# Ollama
curl http://localhost:11434/api/tags

curl http://localhost:5678

# Ngrok
curl http://localhost:4040/api/status
```

---

## 2️⃣ LANCER LES SERVICES

```powershell
# Terminal 1: Ollama
ollama serve

# Terminal 2: Ngrok
ngrok http 11434


# Terminal 4: OpenHands local
docker run -d -p 3000:3000 ghcr.io/openhandsai/openhands:latest
```

---

## 3️⃣ SAUVEGARDER MES PLANS/CONVERSATIONS

### Option A: Dashboard OpenHands
- Va sur: http://localhost:3000
- Chaque conversation est sauvegardee automatiquement

### Option B: Export Manuel
Dans le dashboard:
1. Ouvre une conversation
2. Clique "Export" ou "Download"
3. Fichier .zip avec tout l'historique

### Option C: Script automatique
```powershell
# Sauvegarder toutes les conversations
$date = Get-Date -Format "yyyy-MM-dd"
$folder = "C:\Backups\E-Seller\$date"
mkdir $folder -Force

# Copie les fichiers locaux
Copy-Item "C:\chemin\vers\workspace\*" $folder -Recurse
```

---

## 4️⃣ AUTOMATISER AVEC WINDOWS

### Planification (Tache Planifiee)
```powershell
# Creer une tache qui demarre Ollama au demarrage
schtasks /create /tn "Ollama" /tr "powershell -Command ollama serve" /sc onlogon /ri 1

# Demarrer ngrok automatiquement
schtasks /create /tn "Ngrok" /tr "ngrok http 11434" /sc onlogon /ri 1
```

---

## 5️⃣ ORDER DE LANCEMENT

```
1. Docker Desktop (manuel)
2. ollama serve (terminal)
3. ngrok http 11434 (terminal)
4. E-Seller sur Vercel
```

---

## 💡 RACCOURCI UTILE

Cree un fichier `.bat` sur ton bureau:
```bat
@echo off
start "" ollama serve
start "" ngrok http 11434
start http://localhost:5678
start https://e-seller-v3.vercel.app/dashboard/products
```

Clique dessus et tous tes services demarrent!