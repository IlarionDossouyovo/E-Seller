#!/bin/bash
# Seller Stack - Service Health Check

echo "=== SELLER STACK - Health Check ==="
echo ""

# Check Ollama
echo "🤖 Ollama (AI):"
if curl -s --max-time 5 http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "   ✅ Opérationnel"
else
    echo "   ❌ Non démarré"
fi

# Check N8N
echo ""
echo "🔄 N8N (Automation):"
if curl -s --max-time 5 http://localhost:5678 > /dev/null 2>&1; then
    echo "   ✅ Opérationnel"
else
    echo "   ❌ Non démarré"
fi

# Check PostgreSQL
echo ""
echo "📦 PostgreSQL (Database):"
if sudo docker exec postgres-eseller pg_isready -U postgres > /dev/null 2>&1; then
    echo "   ✅ Opérationnel"
    sudo docker exec postgres-eseller psql -U postgres -d eseller -c "SELECT count(*) as tables FROM information_schema.tables;" 2>/dev/null | grep -v "count" || echo "   DB vide"
else
    echo "   ❌ Non démarré"
fi

# Check Docker
echo ""
echo "🐳 Docker:"
if sudo docker ps > /dev/null 2>&1; then
    echo "   ✅ Opérationnel"
    sudo docker ps --format "table {{.Names}}\t{{.Status}}" | head -5
else
    echo "   ❌ Non démarré"
fi

echo ""
echo "=== Vérification Terminée ==="