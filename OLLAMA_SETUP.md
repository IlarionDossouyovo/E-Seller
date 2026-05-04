# E-Seller + Ollama Integration Guide

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  E-Seller App                      │
│                  (Next.js 14)                      │
└──────────────────────┬──────────────────────────────┘
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
┌────────────┐ ┌───────┐ ┌────────────┐
│ Cloud AI    │ │Ollama │ │  Mock     │
│ (OpenAI)   │ │Local  │ │  Data     │
└────────────┘ └───────┘ └────────────┘
```

## 🚀 Quick Install

```bash
# 1. Install Ollama (one command)
curl -fsSL https://ollama.com/install.sh | sh

# 2. Start server
ollama serve

# 3. Pull models
ollama pull llama3.2
ollama pull mistral

# 4. Test
curl -X POST http://localhost:11434/api/chat \
  -d '{"model": "llama3.2", "messages": [{"role": "user", "content": "Hello"}]}'
```

## 📦 Required Models

| Model | Size | Purpose |
|-------|------|---------|
| `llama3.2` | 3.8GB | General AI, chat |
| `mistral` | 4.1GB | Fast responses |
| `codellama` | 3.8GB | Code generation |

## 🔧 Environment Variables

Add to `.env.local`:

```env
# Ollama (Local AI - no API costs!)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.2

# Cloud AI (fallback/backup)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
AI360_API_KEY=...
```

## 📡 API Endpoints Using Ollama

### 1. Product Intelligence
```bash
curl -X POST http://localhost:3000/api/ai/product-intelligence \
  -H "Content-Type: application/json" \
  -d '{"product": "wireless earbuds"}'
```

### 2. Business Assistant
```bash
curl -X POST http://localhost:3000/api/ai/business-assistant \
  -H "Content-Type: application/json" \
  -d '{"message": "Best products to sell in 2024?"}'
```

### 3. Branding Generator
```bash
curl -X POST http://localhost:3000/api/ai/branding-generator \
  -H "Content-Type: application/json" \
  -d '{"product": "fitness app", "style": "modern"}'
```

### 4. Market Analytics
```bash
curl http://localhost:3000/api/ai/market-analytics
```

## 🔄 Fallback Priority

The system automatically uses:
1. **Ollama** (local) - if running
2. **OpenAI** - if key provided
3. **Anthropic** - if key provided
4. **AI 360** - if key provided
5. **Mock Data** - always works

## 💰 Cost Comparison

| Provider | Cost | Speed |
|----------|------|-------|
| **Ollama** | Free | Fast (local) |
| OpenAI | $0.01/1K tokens | Fast |
| Anthropic | $0.015/1K tokens | Fast |
| AI 360 | Varies | Depends |

## 🚦 Production Setup

### Option 1: Local (Dev/Small)
```
Your Computer → Ollama → E-Seller
```

### Option 2: Server (Production)
```
Railway/Render/VPS → Ollama → E-Seller
```

### Option 3: Cloud (Enterprise)
```
Ollama Cloud → E-Seller → Vercel
```

## 📋 Deployment Checklist

- [ ] Install Ollama
- [ ] Pull models: `ollama pull llama3.2`
- [ ] Set `OLLAMA_HOST` in Vercel env vars
- [ ] Set `OLLAMA_MODEL=llama3.2`
- [ ] Test all endpoints
- [ ] Monitor usage

## 🔧 Vercel Configuration

Ollama cannot run on Vercel serverless. Options:

1. **Use Cloud AI only** on Vercel (OpenAI/Anthropic)
2. **Connect to remote Ollama** server
3. **Use Ollama Cloud** (https://cloud.ollama.com)

## 🆘 Troubleshooting

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama
pkill ollama
ollama serve

# Check logs
tail -f /tmp/ollama.log

# Re-pull model
ollama pull llama3.2 --force
```

## 📚 Resources

- [Ollama Docs](https://ollama.com/docs)
- [Model Library](https://ollama.com/library)
- [E-Seller GitHub](https://github.com/IlarionDossouyovo/E-Seller)