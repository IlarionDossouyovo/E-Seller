# 🔄 E-SELLER - Démarrage Automatique au Boot

## Option 1 : Via le Menu Démarrer (Windows)

1. **Ouvre** le dossier de démarrage :
   ```
   shell:startup
   ```

2. **Crée** un raccourci vers `auto-start.bat`

---

## Option 2 : Via le Planificateur de Tâches

### Créer la tâche

```powershell
# PowerShell (en admin)

# Créer la tâche planifiée
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c cd C:\Users\AUGUSTIN\Documents\E-Seller\seller-stack && auto-start.bat"
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -Action $action -Trigger $trigger -Settings $settings -TaskName "E-SELLER Auto-Start" -Description "Démarre automatiquement E-SELLER au démarrage"
```

---

## Option 3 : Via Docker Desktop (Recommandé)

### Paramètres Docker Desktop

1. **Ouvre** Docker Desktop
2. **Va dans** Settings > General
3. **Coche** "Start Docker Desktop when you log in"

---

## Option 4 : Via Ollama comme Service

### Créer un service Windows pour Ollama

```powershell
# PowerShell (en admin)
docker run -d --name ollama ^
  --restart unless-stopped ^
  -p 11434:11434 ^
  -v ollama-models:/root/.ollama ^
  ollama/ollama
```

---

## ✅ Résumé des Méthodes

| Méthode | Facilité | Automatique |
|--------|---------|------------|
| Menu Startup | ⭐⭐⭐⭐⭐ | Au login |
| Planificateur | ⭐⭐⭐ | Au login |
| Docker Desktop | ⭐⭐⭐⭐⭐ | Au login |

---

## 🚀 Pour Démarrer Manuellement

```powershell
# PowerShell
cd C:\Users\AUGUSTIN\Documents\E-Seller\seller-stack
.\auto-start.bat
```

---

## 🌐 Après Démarrage

| Service | URL |
|---------|-----|
| **E-Seller** | http://localhost:3000 |
| **Ollama** | http://localhost:11434 |
| **PostgreSQL** | localhost:5432 |

---

*Document généré le 21 Juin 2026*