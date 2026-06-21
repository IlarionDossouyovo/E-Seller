#!/bin/bash
# E-SELLER Auto-Start System (Linux/Mac)

echo "========================================"
echo "   E-SELLER - Auto-Start System"
echo "========================================"
echo ""

# Change to script directory
cd "$(dirname "$0")/.."

echo "[1/4] Verification Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "ERREUR: Docker n'est pas demarre!"
    echo "Veuillez lancer Docker puis reessayer."
    exit 1
fi
echo "OK: Docker est demarre"

echo ""
echo "[2/4] Arret des anciens conteneurs..."
docker stop eseller-n8n postgres-eseller ollama-eseller 2>/dev/null
docker rm eseller-n8n postgres-eseller ollama-eseller 2>/dev/null

echo ""
echo "[3/4] Demarrage PostgreSQL..."
docker run -d --name postgres-eseller \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=E-Seller2024 \
  -e POSTGRES_DB=eseller \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v eseller-pgdata:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16-alpine
echo "OK: PostgreSQL demarre sur port 5432"

echo ""
echo "[4/4] Demarrage Ollama..."
docker run -d --name ollama-eseller \
  -v ollama-models:/root/.ollama \
  -p 11434:11434 \
  ollama/ollama
echo "OK: Ollama demarre sur port 11434"

echo ""
echo "========================================"
echo "   TOUS LES SERVICES OPERATIONNELS"
echo "========================================"
echo ""
echo "   PostgreSQL:  localhost:5432"
echo "   Ollama:     localhost:11434"
echo ""
echo "   E-SELLER:  http://localhost:3000"
echo ""

# Lancer E-Seller en arriere-plan
echo "[5/4] Lancement E-Seller..."
npm run dev &
echo "OK: E-Seller demarre"

echo ""
echo "========================================"
echo "   DEMARRAGE TERMINE!"
echo "========================================"
echo ""
echo "Vous pouvez acceder a:"
echo "   - E-Seller: http://localhost:3000"
echo "   - Ollama:  http://localhost:11434"
echo "   - N8N:    http://localhost:5678 (si installe)"
echo ""
read -p "Appuyez sur Entree pour continuer..."