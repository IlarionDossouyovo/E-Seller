#!/bin/bash
# Seller Stack - Start All Services (Docker Compose)

echo "🚀 Démarrage de Seller Stack avec Docker..."

# Stop existing containers
echo "🛑 Arrêt des anciens conteneurs..."

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

  -p 5678:5678 \
  -e WEBHOOK_URL=http://localhost:5678 \
  -e DB_TYPE=postgresdb \
  -e DB_POSTGRESDB_HOST=eseller-db \
  -e DB_POSTGRESDB_DATABASE=eseller \
  -e DB_POSTGRESDB_USER=postgres \
  -e DB_POSTGRESDB_PASSWORD=E-Seller2024 \
  --link eseller-db:eseller-db \

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
echo "  🤖 Ollama:     http://localhost:11434"
echo ""
echo "Identifiants DB:"
echo "  User: postgres"
echo "  Pass: E-Seller2024"
echo "  DB:   eseller"