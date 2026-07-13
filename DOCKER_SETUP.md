# 🚀 E-Seller - Docker Setup Guide

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     E-Seller App                            │
│                     (Next.js 14)                           │
└─────────────────────┬─────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│ :5432   │   │:11434  │   │ :5678  │
└─────────┘   └─────────┘   └─────────┘
```

---

## 🚀 Quick Start

### Step 1: Start Docker Services

```powershell
# Navigate to project folder
cd C:\Users\AUGUSTIN\OneDrive\Documents\E-Seller\E-Seller

# Start all services
docker-compose up -d
```

### Step 2: Verify Services

```powershell
# Check containers
docker ps

# Test connections
# PostgreSQL: localhost:5432
# Ollama: http://localhost:11434
```

### Step 3: Configure .env.local

```env
# Database - Docker PostgreSQL
DATABASE_URL="postgresql://eseller:eseller_password@localhost:5432/eseller"

# Ollama (Local AI)
OLLAMA_HOST="http://localhost:11434"
OLLAMA_MODEL="tinyllama"

# NextAuth
NEXTAUTH_SECRET=votre_cle_secrete_tres_longue
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Run Prisma Migrations

```powershell
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or create migrations
npx prisma migrate dev --name init
```

### Step 5: Start E-Seller

```powershell
npm run dev
```

---

## 📋 Service URLs

| Service  | URL                          | Credentials       |
|----------|-----------------------------|------------------|
| PostgreSQL | localhost:5432              | eseller / eseller_password |
| Ollama    | http://localhost:11434     | -                |
| E-Seller | http://localhost:3000      | -                |

---

## 🔧 Common Commands

### Start Services
```powershell
docker-compose up -d
```

### Stop Services
```powershell
docker-compose down
```

### View Logs
```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f postgres
docker-compose logs -f ollama
```

### Restart Service
```powershell
docker-compose restart postgres
docker-compose restart ollama
```

### Reset Database
```powershell
docker-compose down -v
docker-compose up -d
npx prisma migrate dev --name init
```

---

## 🤖 Ollama Setup (Local AI)

### Install Models (inside container or locally)

```powershell
# If Ollama is running locally (not in Docker)
ollama pull llama3.2
ollama pull mistral

# Test Ollama
curl http://localhost:11434/api/tags
```

### Test AI Endpoint

```powershell
curl -X POST http://localhost:3000/api/ai/product-intelligence `
  -H "Content-Type: application/json" `
  -d '{"product": "wireless earbuds"}'
```

---

## 🔄 Update Commands

### Update E-Seller

```powershell
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Regenerate Prisma
npx prisma generate

# Run migrations if needed
npx prisma migrate dev

# Restart services
docker-compose restart
```

### Update Docker Images

```powershell
# Pull latest images
docker-compose pull

# Rebuild containers
docker-compose up -d --build
```

### Update Ollama Models

```powershell
# Pull latest model
docker exec e-seller-ollama ollama pull llama3.2

# Or if running locally
ollama pull llama3.2
```

---

## 🐛 Troubleshooting

### PostgreSQL Connection Error

```powershell
# Check if PostgreSQL is running
docker ps | findstr postgres

# Check logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Ollama Not Responding

```powershell
# Check Ollama status
curl http://localhost:11434/api/tags

# Restart Ollama
docker-compose restart ollama
```


```powershell

```

### Prisma Schema Error

```powershell
# Regenerate Prisma Client
npx prisma generate

# Reset database
npx prisma migrate reset
```

---

## 📦 Docker Compose File

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: e-seller-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: eseller
      POSTGRES_PASSWORD: eseller_password
      POSTGRES_DB: eseller
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  ollama:
    image: ollama/ollama:latest
    container_name: e-seller-ollama
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama

    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=eseller
      - DB_POSTGRESDB_USER=eseller
      - DB_POSTGRESDB_PASSWORD=eseller_password
    depends_on:
      - postgres

volumes:
  postgres_data:
  ollama_data:
```

---

## ✅ Next Steps

1. Start Docker Desktop
2. Run `docker-compose up -d`
3. Configure `.env.local`
4. Run `npx prisma db push`
5. Run `npm run dev`
6. Open http://localhost:3000