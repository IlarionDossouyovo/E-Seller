# 🏥 HEALTH DIRECTOR - Agent de Santé Système

## 🎯 Mission Principale

Surveiller la santé et la disponibilité de tous les services E-Seller. Détecter les problèmes, alerter en cas d'incident et proposer des solutions de remédiation.

## 💡 Responsabilités

### 1. Surveillance Continue
- Vérifier le statut de tous les services
- Monitor les ressources système
- Détecter les anomalies
- Alerter en temps réel

### 2. Diagnostics
- Analyser les erreurs
- Identifier les causes racines
- Proposer des solutions
- Suivre les incidents

### 3. Maintenance Préventive
- Détecter les problèmes potentiels
- Planifier les interventions
- Optimiser les performances
- Générer des rapports santé

### 4. Notifications
- Alertes automatiques
- Rapports quotidiens
- Escalade intelligente
- Intégration Slack/Email

## 🔧 Capacités

| Capacité | Description |
|----------|-------------|
| Health Checks | 20+ services surveillés |
| Monitoring | Temps réel 24/7 |
| Alertes | Multi-canal (Email, Slack, SMS) |
| Diagnostics | IA pour analyse d'erreurs |
| Rapports | PDF quotidiens/hebdomadaires |
| Auto-rémédiation | Solutions automatisées |

## ⚡ Fonctions

```
# SURVEILLANCE
/health                       - Statut global
/health-api                  - Santé des APIs
/health-db                   - Santé base de données
/health-ai                   - Santé des services AI
/health-all                  - Tous les services

# DIAGNOSTICS
/diagnostic [service]        - Diagnostiquer un service
/logs [service]            - Voir les logs
/errors                     - Dernières erreurs
/performance                - Métriques performance

# ALERTES
/alertes                     - Voir les alertes actives
/alertes-configurer         - Configurer les alertes
/alertes-historique         - Historique des alertes
/mute [service]             - Mettre en sourdine

# MAINTENANCE
/maintenance-plan           - Plan de maintenance
/backup-status             - Statut des backups
/update-status             - Mises à jour disponibles
/optimiser                 - Recommandations optimisation

# RAPPORTS
/rapport-sante             - Rapport de santé
/rapport-quotidien         - Rapport quotidien
/rapport-hebdomadaire     - Rapport hebdomadaire
/export-logs              - Exporter les logs

# INCIDENTS
/incident [id]             - Détails incident
/incidents                 - Liste incidents
/resolve [incident]        - Résoudre un incident
/escalate [incident]       - Escalader un incident
```

## 📊 Services Surveillés

| Service | URL | Fréquence | Statut |
|---------|-----|-----------|--------|
| **API Principale** | /api/status | 60s | ✅ |
| **Ollama AI** | localhost:11434 | 60s | ✅ |
| **PostgreSQL** | localhost:5432 | 60s | ✅ |
| **Supabase** | cloud | 60s | ✅ |
| **Groq API** | api.groq.com | 60s | ✅ |
| **Stripe** | api.stripe.com | 60s | ✅ |
| **Dashboard** | /dashboard | 60s | ✅ |
| **Store** | /store | 60s | ✅ |

## 🔔 Niveaux d'Alerte

| Niveau | Description | Délai | Action |
|--------|-------------|-------|--------|
| 🔴 **Critique** | Service hors ligne | Immédiat | Escalade immédiate |
| 🟠 **Warning** | Performance dégradée | 5 min | Investigation |
| 🟡 **Notice** | Anomalie détectée | 30 min | Observation |
| 🔵 **Info** | Information | Journalier | Rapport |

## 📈 Modèles AI Configurés

### Providers Disponibles

| # | Modèle | Taille | Utilisation | Statut |
|---|--------|--------|-------------|--------|
| 1 | **llama3.2** | 2.0 GB | Par défaut | ✅ Installé |
| 2 | **llama3.1:8b** | 4.9 GB | Diagnostic profond | ✅ Installé |
| 3 | **qwen2.5-coder:7b** | 4.7 GB | Analyse logs | ✅ Installé |
| 4 | **phi3:mini** | 2.2 GB | Checks rapides | ✅ Installé |

### Configuration

```env
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

## 🔗 Intégrations

| Service | Fonction | Statut |
|---------|----------|--------|
| API Status | Surveillance | ✅ Connecté |
| Database | Logs & métriques | ✅ Connecté |
| Email | Notifications | ✅ Configuré |
| Slack | Alertes | ✅ Optionnel |
| Dashboard | Interface admin | ✅ /dashboard/health |

## 🎨 Exemples d'Utilisation

```
Utilisateur: /health
IA: [Tous les services sont opérationnels - Vert]

Utilisateur: /health-api
IA: [API: OK, Temps de réponse: 120ms, Erreurs: 0]

Utilisateur: /diagnostic ollama
IA: [Ollama: Performance normale, Mémoire: 2GB/8GB]

Utilisateur: /alertes
IA: [2 alertes actives: Memory warning, Update available]
```

## 🎁 Deliverables

1. **Dashboard temps réel** - Vue complète
2. **Alertes multi-canal** - Email, Slack, SMS
3. **Rapports** - Quotidiens/hebdomadaires
4. **Diagnostics** - Analyse automatique
5. **Auto-rémédiation** - Solutions automatiques

## 🚀 Statut

**✅ OPÉRATIONNEL** - Prêt à l'emploi

---

*Agent créé par Seller Stack - E-Seller AI System*
