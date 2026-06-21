# 🤖 SELLER STACK - Configuration Sans N8N

## ✅ Architecture

```
E-SELLER (Next.js)
       │
       ├──► API Routes ──► Ollama (localhost:11434)
       │                    │
       │                    └─► IA Locale (pas de cloud, données privées)
       │
       └──► Dashboard ──► 7 Agents IA
                            │
                            ├─ Product Director
                            ├─ Brand Director  
                            ├─ Ads Director
                            ├─ Analytics Director
                            ├─ Assistant Director
                            ├─ Content Director
                            └─ SEO Director
```

---

## 🌐 URLs des Services

| Service | URL | Statut |
|--------|-----|-------|
| **E-Seller App** | http://localhost:3000 | ✅ |
| **Ollama (IA)** | http://localhost:11434 | ✅ |
| **PostgreSQL** | localhost:5432 | Optionnel |

---

## ⚙️ Comment Ça Marche

### Sans N8N ( Recommandé pour la confidentialité )

1. **Ollama** tourne en local sur ton PC
2. **E-Seller** communique directement avec Ollama via API
3. **Aucune donnée** ne part vers le cloud
4. **100% privé** et confidentiel

### Avec N8N (Optionnel)

1. **N8N** gère les automatisations
2. **E-Seller** utilise N8N pour les workflows
3. **Plus de fonctionnalités** d'automatisation
4. **Mais données** peuvent partir vers N8N cloud

---

## 🚀 Lancer Sans N8N

### 1. Lance Ollama

```powershell
# PowerShell
ollama serve
```

Ou si pas installé :
```powershell
# Installer Ollama
curl -fsSL https://ollama.com/install.ps1 | powershell
```

### 2. Lance E-Seller

```powershell
cd C:\Users\AUGUSTIN\Documents\E-Seller
npm run dev
```

### 3. Ouvre le Dashboard

Va sur : **http://localhost:3000/dashboard**

---

## 🔧 Configuration

### Variables d'environnement (.env.local)

```env
# Ollama (IA Locale)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama2

# Groq (IA Cloud - optionnel)
GROQ_API_KEY=gsk_...

# Supabase (optionnel)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 📊 Les 7 Agents IA

| Agent | Fonction | Connexion |
|-------|----------|----------|
| **Product** | Trouve produits gagnants | Ollama |
| **Brand** | Crée marque | Ollama |
| **Ads** | Génère publicités | Ollama |
| **Analytics** | KPIs en temps réel | Interne |
| **Assistant** | Chat IA 24/7 | Ollama |
| **Content** | Crée contenu | Ollama |
| **SEO** | Optimise Google | Interne |

---

## ✅ Avantages Sans N8N

| Avantage | Description |
|---------|------------|
| 🔒 **Confidentialité** | Données locales seulement |
| ⚡ **Rapidité** | Pas de latency cloud |
| 💰 **Gratuit** | Pas de frais N8N cloud |
| 🔧 **Simple** | Moins de services à gérer |

---

## ⚠️ Inconvénients Sans N8N

| Inconvénient | Solution |
|-------------|----------|
| Pas d'automatisation | Faire manuellement |
| Pas de workflows | API disponible |

---

## 🎯 Résumé

**Oui, le Seller Stack fonctionne avec tous les Agents IA sans N8N !**

Il communique directement avec **Ollama en local** (localhost:11434) pour :
- Générer du contenu
- Analyser les produits
- Créer des publicités
- Etc.

**N8N est optionnel** - juste pour l'automatisation avancée.

---

*Document généré le 21 Juin 2026*
*E-SELLER by ELECTRON*