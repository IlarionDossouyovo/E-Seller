#!/bin/bash

# ==============================================
# E-SELLER - Script de Mise à Jour Automatique
# ==============================================

echo "🚀 Starting E-Seller Update..."
echo "=========================================="

# Couleurs pour le terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher un message de succès
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Fonction pour afficher un message d'avertissement
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Fonction pour afficher une erreur
error() {
    echo -e "${RED}❌ $1${NC}"
}

# ==============================================
# 1. Mise à jour du code source
# ==============================================
echo ""
echo "📥 Step 1: Updating code from GitHub..."
echo "-------------------------------------------"

# Récupérer les dernières modifications
git fetch origin
git pull origin main

if [ $? -eq 0 ]; then
    success "Code updated successfully"
else
    error "Failed to update code"
    exit 1
fi

# ==============================================
# 2. Installation des dépendances
# ==============================================
echo ""
echo "📦 Step 2: Installing dependencies..."
echo "-------------------------------------------"

npm install

if [ $? -eq 0 ]; then
    success "Dependencies installed"
else
    error "Failed to install dependencies"
    exit 1
fi

# ==============================================
# 3. Nettoyage du cache
# ==============================================
echo ""
echo "🧹 Step 3: Cleaning cache..."
echo "-------------------------------------------"

rm -rf .next
success "Cache cleaned"

# ==============================================
# 4. Mise à jour des modèles Ollama
# ==============================================
echo ""
echo "🤖 Step 4: Updating Ollama models..."
echo "-------------------------------------------"

# Mettre à jour les modèles IA
echo "Updating llama3.2..."
ollama pull llama3.2 2>/dev/null

echo "Updating llama3.1:8b..."
ollama pull llama3.1:8b 2>/dev/null

echo "Updating qwen2.5-coder:7b..."
ollama pull qwen2.5-coder:7b 2>/dev/null

echo "Updating phi3:mini..."
ollama pull phi3:mini 2>/dev/null

success "Ollama models updated"

# ==============================================
# 5. Vérification des services
# ==============================================
echo ""
echo "🔍 Step 5: Checking services..."
echo "-------------------------------------------"

# Vérifier Ollama
curl -s http://localhost:11434/api/tags > /dev/null 2>&1
if [ $? -eq 0 ]; then
    success "Ollama is running"
else
    warning "Ollama is not running. Start with: ollama serve"
fi

# Vérifier PostgreSQL
pg_isready -h localhost -p 5432 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    success "PostgreSQL is running"
else
    warning "PostgreSQL is not running"
fi

# ==============================================
# 6. Build de l'application
# ==============================================
echo ""
echo "🔨 Step 6: Building application..."
echo "-------------------------------------------"

npm run build

if [ $? -eq 0 ]; then
    success "Build completed successfully"
else
    error "Build failed"
    exit 1
fi

# ==============================================
# 7. Démarrage de l'application
# ==============================================
echo ""
echo "🎉 Update Complete!"
echo "=========================================="
echo ""
echo "To start the application, run:"
echo "  npm run dev"
echo ""
echo "Or for production:"
echo "  npm start"
echo ""
echo "Access the dashboard at:"
echo "  http://localhost:3000"
echo ""
echo "AI Command Center:"
echo "  http://localhost:3000/dashboard/founder/ai-command-center"
echo ""
