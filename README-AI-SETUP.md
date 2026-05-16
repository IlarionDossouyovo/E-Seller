# E-Seller - Automatic AI Service Starter

## Pour demarrer l'AI local:

### Option 1: Script automatique (recommandee)

1. Telecharge `E-Seller-startup.bat`
2. Double-clique pour lancer
3. Le script verifie et demarre automatiquement:
   - Docker (si installe)
   - Ollama
   - Ngrok

### Option 2: Manuel

```powershell
# Terminal 1: Ollama
ollama serve

# Terminal 2: Ngrok
ngrok http 11434
```

---

## Pour AI cloud (sans PC allume):

Configure OpenAI dans Vercel:

1. Va sur https://platform.openai.com/api-keys
2. Cree une cle API
3. Va sur https://vercel.com/dashboard
4. Choisis ton projet E-Seller
5. Settings → Environment Variables
6. Ajoute:
   - `OPENAI_API_KEY` = ta-cle-api