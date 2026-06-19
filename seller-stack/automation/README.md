# 🔄 AUTOMATION HUB - N8N Orchestrator

## Vue d'Ensemble

L'Automation Hub orchestre tous les départements de Seller Stack via N8N.

---

## Workflows

### 1. Product Research (Every Hour)
```
Schedule (1h) → AI Research → Save to DB → Notify
```

### 2. Brand Generation (On Demand)
```
Webhook → Brand AI → Save Assets → Notify
```

### 3. Ads Generation (On Demand)
```
Webhook → Ads AI → Save Scripts → Notify
```

### 4. Analytics Report (Daily)
```
Schedule (Daily 9AM) → Fetch KPIs → Generate Report → Email
```

### 5. Content Generation (On Demand)
```
Webhook → Content AI → Save to CMS → Notify
```

### 6. SEO Audit (Weekly)
```
Schedule (Weekly) → Crawl Site → Generate Report → Notify
```

---

## Configuration

### Services
| Service | URL |
|---------|-----|
| Ollama | http://localhost:11434 |
| E-Seller API | https://e-seller-v3.vercel.app/api |
| Supabase | postgresql://... |

### Environment Variables
```
OLLAMA_HOST=http://localhost:11434
E_SELLER_API=https://e-seller-v3.vercel.app
SUPABASE_URL=postgresql://...
```

---

## Statut

✅ Workflows actifs:
- Product Research (每小时)
- Analytics Report (quotidien)

---

*Créé par Seller Stack*