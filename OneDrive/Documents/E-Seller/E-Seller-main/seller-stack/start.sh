#!/bin/bash
# Seller Stack - Start All Services

echo "🚀 Démarrage de Seller Stack..."

# Start Ollama if not running
if ! pgrep -x "ollama" > /dev/null; then
    echo "🤖 Démarrage Ollama..."
    ollama serve > /tmp/ollama.log 2>&1 &
    sleep 3
    echo "   ✅ Ollama démarré"
else
    echo "   ℹ️ Ollama déjà actif"
fi

# Start Docker if not running
if ! docker ps > /dev/null 2>&1; then
    echo "🐳 Démarrage Docker..."
    sudo dockerd > /tmp/docker.log 2>&1 &
    sleep 5
    echo "   ✅ Docker démarré"
else
    echo "   ℹ️ Docker déjà actif"
fi

        -e WEBHOOK_URL=http://localhost:5678 \
    sleep 5
else
fi

echo ""
echo "=== Seller Stack Opérationnel ==="
echo ""
echo "Services:"
echo "  🤖 Ollama:    http://localhost:11434"
echo "  🐳 Docker:   Vérifier avec 'docker ps'"
echo ""
echo "Dashboard E-Seller: https://e-seller-v3.vercel.app"