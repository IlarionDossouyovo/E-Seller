#!/bin/bash

# E-Seller Ollama Setup Script
# Installs and configures Ollama for local AI

set -e

echo "🤖 Setting up Ollama for E-Seller..."

# Check if Ollama is installed
if command -v ollama &> /dev/null; then
    echo "✅ Ollama is already installed"
else
    echo "📦 Installing Ollama..."
    curl -fsSL https://ollama.com/install.sh | sh
fi

# Start Ollama serve in background
if ! curl -s http://localhost:11434/api/tags &> /dev/null; then
    echo "🚀 Starting Ollama server..."
    nohup ollama serve > /tmp/ollama.log 2>&1 &
    
    # Wait for server to start
    echo "⏳ Waiting for Ollama to start..."
    for i in {1..30}; do
        if curl -s http://localhost:11434/api/tags &> /dev/null; then
            echo "✅ Ollama server is running!"
            break
        fi
        sleep 1
    done
else
    echo "✅ Ollama server is already running"
fi

# Pull models
echo "📥 Pulling AI models..."
echo "   → llama3.2 (default)"
ollama pull llama3.2 2>/dev/null || echo "   ⚠️ Could not pull llama3.2"

echo "   → mistral (fast)"
ollama pull mistral 2>/dev/null || echo "   ⚠️ Could not pull mistral"

echo "   → codellama (code assistance)"
ollama pull codellama 2>/dev/null || echo "   ⚠️ Could not pull codellama"

# List installed models
echo ""
echo "📋 Installed models:"
ollama list

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Usage:"
echo "  curl -X POST http://localhost:3000/api/ollama \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"model\": \"llama3.2\", \"message\": \"Hello!\"}'"
echo ""
echo "Or run directly:"
echo "  ollama run llama3.2"