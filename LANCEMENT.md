# 🚀 E-SELLER - GUIDE DE LANCEMENT COMPLET

## 1️⃣ LANCER TOUS LES SERVICES

### Methode 1: Script Automatique

Telecharge `start-all-systems.bat` et lance-le!

### Methode 2: Manuel

Ouvre **4 terminals** et lance dans chacun:

```
Terminal 1: Docker Desktop
(Clique sur l'icone Docker)

Terminal 2: Ollama
> ollama serve

Terminal 3: Ngrok
> ngrok http 11434

Terminal 4: Test
> curl http://localhost:11434/api/tags
```

---

## 2️⃣ VERIFIER QUE TOUT FONCTIONNE

| Service | Test |
|---------|------|
| Ollama | `curl localhost:11434/api/tags` |
| Ngrok | `curl localhost:4040/api/status` |
| E-Seller | https://e-seller-v3.vercel.app |

---

## 3️⃣ TESTER LE MOOTEUR AI

Va sur: https://e-seller-v3.vercel.app/dashboard/products

Cherche: "Montre pour femme"

Verifie que ca retourne des produits (pas juste mock data)

---

## 4️⃣ AUTOMATISATIONS ACTIVES

- Schedule: Every Hour
- Action: API Request vers E-Seller
- Resultat: Sauvegarde automatique

---

## 5️⃣ MOYENS DE PAIEMENT (Optionnel)

### Pour avoir VRAI AI (pas mock):

| Provider | Prix | Configuration |
|----------|------|----------------|
| **OpenAI** | $10/mois | API Key |
| **OpenHands** | Credit | API Key |

---

## 6️⃣ RESUME DES URLS

| Service | URL |
|---------|-----|
| Site E-Seller | https://e-seller-v3.vercel.app |
| Dashboard | /dashboard/products |
| Ollama | http://localhost:11434 |
| Ngrok | https://swiftness-heave-smirk.ngrok-free.dev |

---

## ⚡ DEMARRAGE RAPIDE

```batch
start-all-systems.bat
```

Puis attends 30 secondes et teste!