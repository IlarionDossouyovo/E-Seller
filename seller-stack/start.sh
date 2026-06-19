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

# Start N8N if not running
if ! docker ps | grep -q n8n; then
    echo "🔄 Démarrage N8N..."
    sudo docker run -d --name n8n -p 5678:5678 \
        -e N8N_BASIC_AUTH_ACTIVE=false \
        -e N8N_HOST=0.0.0.0 \
        -e N8N_PORT=5678 \
        -e WEBHOOK_URL=http://localhost:5678 \
        n8nio/n8n > /dev/null 2>&1
    sleep 5
    echo "   ✅ N8N démarré"
else
    echo "   ℹ️ N8N déjà actif"
fi

echo ""
echo "=== Seller Stack Opérationnel ==="
echo ""
echo "Services:"
echo "  🤖 Ollama:    http://localhost:11434"
echo "  🔄 N8N:     http://localhost:5678"
echo "  🐳 Docker:   Vérifier avec 'docker ps'"
echo ""
echo "Dashboard E-Seller: https://e-seller-v3.vercel.app"