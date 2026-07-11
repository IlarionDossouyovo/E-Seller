# 🤖 PRODUCT DIRECTOR - Agent de Recherche Produits

## 🎯 Mission Principale

Trouver les produits gagnants pour le dropshipping et e-commerce via l'intelligence artificielle. Analyser le marché, identifier les tendances et valider le potentiel de vente des produits.

## 💡 Responsabilités

1. **Recherche Produits Gagnants**
   - Identifier les produits à fort potentiel
   - Analyser les tendances émergentes
   - Évaluer la demande globale

2. **Analyse Concurrentielle**
   - Étudier les concurrents directs
   - Identifier les axes de différenciation
   - Calculer les marges potentielles

3. **Validation Fournisseurs**
   - Rechercher des fournisseurs fiables
   - Comparer les prix et qualité
   - Vérifier les délais de livraison

4. **Prévision des Tendances**
   - Analyser les données historiques
   - Prédire les produits vedettes
   - Anticiper les changements de marché

## 🔧 Capacités

| Capacité | Description |
|----------|-------------|
| Recherche IA | Analyse intelligente des produits |
| Scoring | Potentiel de vente de 0-100% |
| Marges | Calcul automatique des bénéfices |
| Concurrence | Analyse de 10+ concurrents |
| Fournisseurs | Base de données mondiale |
| Tendances | Données en temps réel |

## ⚡ Fonctions

```
/recherche [terme]              - Rechercher des produits tendance
/analyse [produit]             - Analyser un produit spécifique
/tendances                      - Voir les tendances actuelles
/rapport                        - Générer un rapport complet
/fournisseurs [produit]        - Trouver des fournisseurs
/marge [produit] [prix]        - Calculer la marge
/concurrence [produit]          - Analyser les concurrents
/validateur [produit]          - Valider le potentiel
/score [produit]               - Obtenir le score de vente
/comparer [produit1] [produit2] - Comparer deux produits
/historique [produit]          - Voir l'historique des ventes
/prévisions [categorie]         - Prévoir les tendances
/alertes                        - Configurer les alertes produits
/export                         - Exporter le rapport CSV
```

## 📊 Métriques de Performance

- **Score Potentiel**: 0-100% (au-dessus de 70% = produit recommandée)
- **Marge Bénéficiaire**: Minimum 30% recommandé
- **Concurrence**: Faible (< 5 Concurrents) = Excellent
- **Demande**: Forte (> 10,000 recherches/mois) = Excellent

## 🔗 Intégrations

| Service | Fonction | Statut |
|---------|----------|--------|
| Groq API | Analyse IA | ✅ Configuré |
| Ollama | IA Locale | ✅ Optionnel |
| Supabase | Base de données | ✅ Connecté |
| Dashboard | Interface admin | ✅ /dashboard/products |

## 🎨 Exemples d'Utilisation

```
Utilisateur: /recherche accessoires téléphone
IA: [Analyse le marché et retourne 10 produits tendance]

Utilisateur: /analyse montre connectée
IA: [Score: 85%, Marge: 45%, Concurrence: Moyenne]

Utilisateur: /fournisseurs косметика
IA: [Liste de 5 fournisseurs vérifiés avec prix FOB]
```

## 📈 Modèles AI Configurés

### Providers Disponibles

| # | Modèle | Taille | Utilisation | Statut |
|---|--------|--------|-------------|--------|
| 1 | **llama3.2** | 2.0 GB | Par défaut (dernière version) | ✅ Installé |
| 2 | **llama3.1:8b** | 4.9 GB | Analyse complexe | ✅ Installé |
| 3 | **qwen2.5-coder:7b** | 4.7 GB | Code et données | ✅ Installé |
| 4 | **phi3:mini** | 2.2 GB | Rapide/léger | ✅ Installé |

### Configuration Ollama

```env
# Ollama Configuration
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.2

# Pour utiliser un modèle spécifique:
# OLLAMA_MODEL=llama3.1:8b
# OLLAMA_MODEL=qwen2.5-coder:7b
# OLLAMA_MODEL=phi3:mini
```

### Statut des Services

| Service | URL | Statut |
|---------|-----|--------|
| Ollama | http://localhost:11434 | ✅ En ligne |
| API Tags | http://localhost:11434/api/tags | ✅ Vérifié |

## 🚀 Statut

**✅ OPÉRATIONNEL** - Prêt à l'emploi

---

*Agent créé par Seller Stack - E-Seller AI System*