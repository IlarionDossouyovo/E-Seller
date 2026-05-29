# 🚀 E-Seller - Installation Locale

## Prérequis

1. **Node.js 18+** : https://nodejs.org ( LTS )
2. **Git** : https://git-scm.com
3. **VS Code** (optionnel) : https://code.visualstudio.com

---

## Étape 1 : Cloner le projet

```powershell
# Ouvrir PowerShell ou Terminal
cd C:\Users\TonNom\OneDrive\Documents

git clone https://github.com/IlarionDossouyovo/E-Seller.git
cd E-Seller
```

---

## Étape 2 : Installer les dépendances

```powershell
npm install
```

---

## Étape 3 : Configuration variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Database - Supabase
NEXT_PUBLIC_SUPABASE_URL=https://bauggttibriqdkfnlfhh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ton_cle_anon

# Groq API (AI) - Deja configure avec la cle par defaut
GROQ_API_KEY=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

# NextAuth
NEXTAUTH_SECRET=une_cle_secrete_tres_longue
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Étape 4 : Lancer le projet

```powershell
npm run dev
```

Le site sera accessible sur : **http://localhost:3000**

---

## Commandes utiles

```powershell
# Mode developpement
npm run dev

# Build production (test local)
npm run build
npm run start

# Linter
npm run lint
```

---

## Résolution des problèmes

### Erreur "Module introuvable"
```powershell
rm -rf node_modules package-lock.json
npm install
```

### Erreur de port
```powershell
# Changer le port
npm run dev -- -p 3001
```

### Erreur "next: not found"
```powershell
npm install next
```

---

## Structure du projet

```
E-Seller/
├── src/
│   ├── app/           # Pages Next.js App Router
│   │   ├── api/      # API Routes
│   │   ├── store/   # Boutique
│   │   └── dashboard/ # Admin
│   ├── lib/         # Fonction utilitaires
│   └── components/  # Composants React
├── prisma/          # Base de donnees
└── public/         # Fichiers statiques
```

---

## URL importantes en local

| Route | Description |
|-------|-------------|
| http://localhost:3000 | Page d'accueil |
| http://localhost:3000/store | Boutique |
| http://localhost:3000/dashboard | Admin |
| http://localhost:3000/api/ai | API AI |

---

## Prochaines étapes optionnelles

### Installer SQLite pour les tests
```powershell
npm install sqlite3
```

### Installer Prisma Studio (interface BDD)
```powershell
npx prisma studio
```