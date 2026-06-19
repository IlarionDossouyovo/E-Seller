#!/bin/bash
# Seller Stack - Start All Services (Docker Compose)

echo "🚀 Démarrage de Seller Stack avec Docker..."

# Stop existing containers
echo "🛑 Arrêt des anciens conteneurs..."
sudo docker stop eseller-db eseller-n8n 2>/dev/null
sudo docker rm eseller-db eseller-n8n 2>/dev/null

# Start PostgreSQL
echo "📦 Démarrage PostgreSQL..."
sudo docker run -d --name eseller-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=E-Seller2024 \
  -e POSTGRES_DB=eseller \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:16-alpine

sleep 3

# Start N8N
echo "🔄 Démarrage N8N..."
sudo docker run -d --name eseller-n8n \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=false \
  -e N8N_HOST=0.0.0.0 \
  -e N8N_PORT=5678 \
  -e WEBHOOK_URL=http://localhost:5678 \
  -e DB_TYPE=postgresdb \
  -e DB_POSTGRESDB_HOST=eseller-db \
  -e DB_POSTGRESDB_DATABASE=eseller \
  -e DB_POSTGRESDB_USER=postgres \
  -e DB_POSTGRESDB_PASSWORD=E-Seller2024 \
  --link eseller-db:eseller-db \
  n8nio/n8n

sleep 3

# Start Ollama if not running
if ! pgrep -x "ollama" > /dev/null; then
    echo "🤖 Démarrage Ollama..."
    ollama serve > /tmp/ollama.log 2>&1 &
    sleep 3
fi

echo ""
echo "=== ✅ Seller Stack Opérationnel ==="
echo ""
echo "Services:"
echo "  📦 PostgreSQL:  postgresql://localhost:5432/eseller"
echo "  🔄 N8N:       http://localhost:5678"
echo "  🤖 Ollama:     http://localhost:11434"
echo ""
echo "Identifiants DB:"
echo "  User: postgres"
echo "  Pass: E-Seller2024"
echo "  DB:   eseller"