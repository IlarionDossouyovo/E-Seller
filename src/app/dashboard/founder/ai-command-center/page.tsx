'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  BarChart3,
  Palette,
  Megaphone,
  Search,
  FileText,
  Globe,
  MessageSquare,
  Crown,
  Send,
  Loader2,
  Copy,
  Check,
  Terminal,
  Brain,
  Sparkles,
  Settings,
  Command,
  TrendingUp,
  ShoppingCart,
  Heart,
  Wrench,
  Shield,
  Activity,
  Server,
  Database,
  Cpu,
  AlertTriangle,
  Zap,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Mail,
  Factory,
  Package,
  HardDrive
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { agentModelConfig, availableModels } from '@/lib/agents-config'

// Model selection helpers
const getModelInfo = (modelName: string) => {
  const models = Object.values(availableModels)
  return models.find(m => m.name === modelName) || models[0]
}

const getModelBadge = (agentId: string) => {
  const config = (agentModelConfig as Record<string, any>)[agentId]
  if (!config) return { model: 'llama3.2:latest', size: '2.0 GB' }
  const info = getModelInfo(config.model)
  return { model: config.model, size: info?.size || '2.0 GB' }
}

interface Agent {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  bgGradient: string
  commands: Command[]
  capabilities: string[]
  dashboardUrl: string
}

interface Command {
  command: string
  description: string
  example: string
}

const agents: Agent[] = [
  {
    id: 'product-director',
    name: 'Product Director',
    description: 'Trouve les produits gagnants pour le dropshipping et e-commerce via IA',
    icon: Search,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    dashboardUrl: '/dashboard/products',
    capabilities: [
      'Recherche produits tendance via AI',
      'Analyse de la concurrence',
      'Prévision des tendances marché',
      'Validation des fournisseurs',
      'Score de potentiel produit',
      'Analyse des marges bénéficiaires'
    ],
    commands: [
      { command: '/recherche [terme]', description: 'Rechercher des produits tendance', example: '/recherche accessoires téléphone' },
      { command: '/analyse [produit]', description: 'Analyser un produit spécifique', example: '/analyse montre connectée' },
      { command: '/tendances', description: 'Voir les tendances actuelles', example: '/tendances' },
      { command: '/rapport', description: 'Générer un rapport complet', example: '/rapport' },
      { command: '/fournisseurs [produit]', description: 'Trouver des fournisseurs', example: '/fournisseurs косметика' },
      { command: '/marge [produit]', description: 'Calculer la marge', example: '/marge tee-shirt' }
    ]
  },
  {
    id: 'brand-director',
    name: 'Brand Director',
    description: 'Crée l\'identité de marque complète pour vos produits',
    icon: Palette,
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-pink-500/20',
    dashboardUrl: '/dashboard/brand-kit',
    capabilities: [
      'Génération noms de marque',
      'Création logos conceptuels',
      'Palettes de couleurs',
      'Charte graphique complète',
      'Packaging design',
      'Storytelling de marque'
    ],
    commands: [
      { command: '/marque [produit]', description: 'Créer un nom de marque', example: '/marque косметика naturelle' },
      { command: '/couleurs [style]', description: 'Générer palette de couleurs', example: '/couleurs minimaliste' },
      { command: '/logo [description]', description: 'Créer concept de logo', example: '/logo entreprise eco-friendly' },
      { command: '/charte', description: 'Générer charte complète', example: '/charte' },
      { command: '/packaging [produit]', description: 'Design packaging', example: '/packaging косметика' },
      { command: '/story [marque]', description: 'Créer le storytelling', example: '/story marque solaire' }
    ]
  },
  {
    id: 'ads-director',
    name: 'Ads Director',
    description: 'Génère des publicités haute conversion pour TikTok, Facebook, Instagram',
    icon: Megaphone,
    color: 'text-orange-400',
    bgGradient: 'from-orange-500/20 to-red-500/20',
    dashboardUrl: '/dashboard/ads',
    capabilities: [
      'Scripts vidéo TikTok',
      'Publicités Facebook/Instagram',
      'Contenu UGC authentique',
      'Hooks accrocheurs',
      'A/B testing des créations',
      'Copywriting publicitaire'
    ],
    commands: [
      { command: '/tiktok [produit]', description: 'Script vidéo TikTok', example: '/tiktok montre fitness' },
      { command: '/facebook [produit]', description: 'Pub Facebook', example: '/facebook cream visage' },
      { command: '/instagram [produit]', description: 'Contenu Instagram', example: '/instagram robe été' },
      { command: '/ugc [produit]', description: 'Contenu UGC', example: '/ugc produit beauté' },
      { command: '/hooks', description: 'Générer des hooks', example: '/hooks' },
      { command: '/scripts [produit]', description: 'Scripts complets', example: '/scripts accessoire phone' }
    ]
  },
  {
    id: 'analytics-director',
    name: 'Analytics Director',
    description: 'Analyse les métriques et fournit des insights prédictifs en temps réel',
    icon: BarChart3,
    color: 'text-green-400',
    bgGradient: 'from-green-500/20 to-emerald-500/20',
    dashboardUrl: '/dashboard/analytics',
    capabilities: [
      'KPIs temps réel',
      'Prévisions des ventes',
      'Rapports automatiques',
      'Alertes sur anomalies',
      'Analyse concurrentielle',
      'Tableaux de bord personnalisés'
    ],
    commands: [
      { command: '/kpis', description: 'Voir les KPIs', example: '/kpis' },
      { command: '/rapport', description: 'Générer rapport', example: '/rapport' },
      { command: '/previsions', description: 'Prévisions ventes', example: '/previsions' },
      { command: '/alertes', description: 'Voir les alertes', example: '/alertes' },
      { command: '/tendances', description: 'Analyse tendances', example: '/tendances' },
      { command: '/concurrents', description: 'Analyse concurrents', example: '/concurrents' }
    ]
  },
  {
    id: 'assistant-director',
    name: 'Assistant Director',
    description: 'Support client 24/7 et conseils business pour entrepreneurs',
    icon: MessageSquare,
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-amber-500/20',
    dashboardUrl: '/dashboard/ai-assistant',
    capabilities: [
      'Support client instantané',
      'Conseils business personnalisés',
      'Résolution de problèmes',
      'Automatisation des tâches',
      'Formation équipe',
      'Gestion objections'
    ],
    commands: [
      { command: '/aide [question]', description: 'Obtenir de l\'aide', example: '/aide comment augmenter les ventes' },
      { command: '/conseils [sujet]', description: 'Conseils business', example: '/conseils marketing digital' },
      { command: '/support', description: 'Support client', example: '/support' },
      { command: '/formation', description: 'Formation équipe', example: '/formation' },
      { command: '/objections', description: 'Gérer les objections', example: '/objections prix' },
      { command: '/stratégie', description: 'Conseil stratégique', example: '/stratégie croissance' }
    ]
  },
  {
    id: 'content-director',
    name: 'Content Director',
    description: 'Génère tout le contenu pour votre e-commerce',
    icon: FileText,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/20 to-blue-500/20',
    dashboardUrl: '/dashboard/blog',
    capabilities: [
      'Descriptions produits SEO',
      'Articles de blog',
      'Emails marketing',
      'Scripts de vente',
      'Contenus réseaux sociaux',
      'Newsletters'
    ],
    commands: [
      { command: '/description [produit]', description: 'Description produit', example: '/description montre automatique' },
      { command: '/blog [sujet]', description: 'Article blog', example: '/blog tendances été 2024' },
      { command: '/email [type]', description: 'Email marketing', example: '/email relance panier' },
      { command: '/vente [produit]', description: 'Script de vente', example: '/vente косметика' },
      { command: '/social [produit]', description: 'Contenu social', example: '/social nouvelle collection' },
      { command: '/newsletter', description: 'Newsletter', example: '/newsletter mensuel' }
    ]
  },
  {
    id: 'seo-director',
    name: 'SEO Director',
    description: 'Optimise votre site pour les moteurs de recherche',
    icon: Globe,
    color: 'text-red-400',
    bgGradient: 'from-red-500/20 to-orange-500/20',
    dashboardUrl: '/dashboard/seo',
    capabilities: [
      'Recherche mots-clés',
      'Optimisation contenu',
      'Backlinks stratégiques',
      'Audit technique SEO',
      'Analyse concurrentielle SEO',
      'Suivi des positions'
    ],
    commands: [
      { command: '/keywords [terme]', description: 'Mots-clés', example: '/keywords косметика bio' },
      { command: '/audit', description: 'Audit SEO complet', example: '/audit' },
      { command: '/optimiser [page]', description: 'Optimiser page', example: '/optimiser page produit' },
      { command: '/backlinks', description: 'Analyse backlinks', example: '/backlinks' },
      { command: '/technique', description: 'Audit technique', example: '/technique' },
      { command: '/positions', description: 'Suivi positions', example: '/positions' }
    ]
  },
  {
    id: 'health-director',
    name: 'Health Director',
    description: 'Surveille la santé et disponibilité de tous les services E-Seller',
    icon: Heart,
    color: 'text-rose-400',
    bgGradient: 'from-rose-500/20 to-red-500/20',
    dashboardUrl: '/dashboard/health',
    capabilities: [
      'Health Checks - 20+ services',
      'Monitoring temps réel 24/7',
      'Diagnostics IA',
      'Alertes multi-canal',
      'Rapports automatiques',
      'Auto-rémédiation'
    ],
    commands: [
      { command: '/health', description: 'Statut global', example: '/health' },
      { command: '/health-api', description: 'Santé des APIs', example: '/health-api' },
      { command: '/health-db', description: 'Santé base de données', example: '/health-db' },
      { command: '/diagnostic [service]', description: 'Diagnostiquer service', example: '/diagnostic ollama' },
      { command: '/alertes', description: 'Voir les alertes', example: '/alertes' },
      { command: '/performance', description: 'Métriques performance', example: '/performance' }
    ]
  },
  {
    id: 'maintenance-director',
    name: 'Maintenance Director',
    description: 'Gère la maintenance préventive et corrective de la plateforme',
    icon: Wrench,
    color: 'text-slate-400',
    bgGradient: 'from-slate-500/20 to-zinc-500/20',
    dashboardUrl: '/dashboard/maintenance',
    capabilities: [
      'Mises à jour NPM/Docker',
      'Backups automatiques',
      'Optimisation performances',
      'Sécurité et vulnérabilités',
      'Gestion ressources système',
      'Rapports conformité'
    ],
    commands: [
      { command: '/update-check', description: 'Vérifier mises à jour', example: '/update-check' },
      { command: '/ressources', description: 'Utilisation ressources', example: '/ressources' },
      { command: '/backup', description: 'Créer backup', example: '/backup' },
      { command: '/security-audit', description: 'Audit sécurité', example: '/security-audit' },
      { command: '/optimiser', description: 'Optimiser système', example: '/optimiser' },
      { command: '/rapport-maintenance', description: 'Rapport maintenance', example: '/rapport-maintenance' }
    ]
  },
  {
    id: 'automation-director',
    name: 'Automation Director',
    description: 'Orchestre des chaînes automatisées pour optimiser les workflows',
    icon: Zap,
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    dashboardUrl: '/dashboard/ai-automations',
    capabilities: [
      'Chaînes automatisées multi-étapes',
      'Déclencheurs conditionnels',
      'Intégration API externe',
      'Planification tâches cron',
      'Gestion des webhooks',
      'Monitoring des flux'
    ],
    commands: [
      { command: '/automation-create [nom]', description: 'Créer une nouvelle automation', example: '/automation-create email-welcome' },
      { command: '/automation-run [id]', description: 'Exécuter une automation', example: '/automation-run product-research' },
      { command: '/automation-list', description: 'Lister toutes les automations', example: '/automation-list' },
      { command: '/automation-stop [id]', description: 'Arrêter une automation', example: '/automation-stop ad-campaign' },
      { command: '/trigger [evenement]', description: 'Déclencher un événement', example: '/trigger new-order' },
      { command: '/schedule [cron]', description: 'Planifier une tâche', example: '/schedule 0 9 * * 1' }
    ]
  },
  {
    id: 'chatbot-director',
    name: 'Chatbot Director',
    description: 'Gère le chatbot IA pour support client et ventes',
    icon: MessageSquare,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
    dashboardUrl: '/dashboard/ai-chatbot',
    capabilities: [
      'Support client automatique 24/7',
      'Gestion des conversations multi-langues',
      'Intégration CRM et_helpdesk',
      'Analyse sentiment client',
      'Escalade intelligente',
      'Rapports analytics chatbot'
    ],
    commands: [
      { command: '/chatbot-status', description: 'Statut du chatbot', example: '/chatbot-status' },
      { command: '/chatbot-enable', description: 'Activer le chatbot', example: '/chatbot-enable' },
      { command: '/chatbot-disable', description: 'Désactiver le chatbot', example: '/chatbot-disable' },
      { command: '/chatbot-response [trigger]', description: 'Ajouter une réponse', example: '/chatbot-response shipping' },
      { command: '/chatbot-analytics', description: 'Voir les analytics', example: '/chatbot-analytics' },
      { command: '/chatbot-train [donnees]', description: 'Entraîner le chatbot', example: '/chatbot-train nouveau-produit' }
    ]
  },
  {
    id: 'email-director',
    name: 'Email Marketing Director',
    description: 'Gère les campagnes email et automatisations',
    icon: Mail,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    dashboardUrl: '/dashboard/emails',
    capabilities: [
      'Campagnes email automatisées',
      'Séquences de nurturing',
      'Segmentation clients',
      'A/B testing emails',
      'Templates responsives',
      'Analytics email marketing'
    ],
    commands: [
      { command: '/email-campaign [nom]', description: 'Créer campagne email', example: '/email-campaign black-friday' },
      { command: '/email-sequence [nom]', description: 'Créer une séquence', example: '/email-sequence welcome' },
      { command: '/email-template [type]', description: 'Générer un template', example: '/email-template newsletter' },
      { command: '/email-send [campagne]', description: 'Envoyer une campagne', example: '/email-send promo-weekend' },
      { command: '/email-analytics', description: 'Voir les analytics', example: '/email-analytics' },
      { command: '/email-segment [critere]', description: 'Créer un segment', example: '/email-segmentachats-recents' }
    ]
  },
  {
    id: 'supplier-director',
    name: 'Supplier Director',
    description: 'Gère les fournisseurs et la chaîne d\'approvisionnement',
    icon: Factory,
    color: 'text-indigo-400',
    bgGradient: 'from-indigo-500/20 to-violet-500/20',
    dashboardUrl: '/dashboard/suppliers',
    capabilities: [
      'Recherche fournisseurs qualifiés',
      'Comparaison prix FOB/EXW',
      'Suivi des commandes',
      'Gestion des délais',
      'Évaluation fournisseurs',
      'Négociation automatique'
    ],
    commands: [
      { command: '/supplier-search [produit]', description: 'Rechercher fournisseurs', example: '/supplier-search textile' },
      { command: '/supplier-compare', description: 'Comparer fournisseurs', example: '/supplier-compare' },
      { command: '/supplier-order [id]', description: 'Passer commande', example: '/supplier-order SUP-001' },
      { command: '/supplier-track [commande]', description: 'Suivre commande', example: '/supplier-track CMD-123' },
      { command: '/supplier-rating', description: 'Évaluer fournisseurs', example: '/supplier-rating' },
      { command: '/supplier-negotiate [produit]', description: 'Négocier prix', example: '/supplier-negotiate electronics' }
    ]
  },
  {
    id: 'financial-director',
    name: 'Financial Director',
    description: 'Gère la finance, la comptabilité et les rapports',
    icon: CreditCard,
    color: 'text-green-400',
    bgGradient: 'from-green-500/20 to-lime-500/20',
    dashboardUrl: '/dashboard/finances',
    capabilities: [
      'Suivi des revenus/dépenses',
      'Prévisions financières',
      'Gestion de la trésorerie',
      'Rapports comptables',
      'Gestion des factures',
      'Analyse profitability'
    ],
    commands: [
      { command: '/finance-report', description: 'Rapport financier', example: '/finance-report' },
      { command: '/finance-cashflow', description: 'Trésorerie', example: '/finance-cashflow' },
      { command: '/finance-invoice [montant]', description: 'Créer facture', example: '/finance-invoice 1500' },
      { command: '/finance-forecast', description: 'Prévisions', example: '/finance-forecast' },
      { command: '/finance-expenses', description: 'Dépenses', example: '/finance-expenses' },
      { command: '/finance-profit', description: 'Analyse profit', example: '/finance-profit' }
    ]
  },
  {
    id: 'security-director',
    name: 'Security Director',
    description: 'Surveille la sécurité et la protection des données',
    icon: Shield,
    color: 'text-red-400',
    bgGradient: 'from-red-500/20 to-orange-500/20',
    dashboardUrl: '/dashboard/security',
    capabilities: [
      'Monitoring sécurité 24/7',
      'Détection des menaces',
      'Gestion des accès',
      'Audit sécurité',
      'Protection données GDPR',
      'Gestion des incidents'
    ],
    commands: [
      { command: '/security-audit', description: 'Audit sécurité', example: '/security-audit' },
      { command: '/security-scan', description: 'Scanner vulnérabilités', example: '/security-scan' },
      { command: '/security-alerts', description: 'Voir les alertes', example: '/security-alerts' },
      { command: '/security-users', description: 'Gérer utilisateurs', example: '/security-users' },
      { command: '/security-backups', description: 'Vérifier backups', example: '/security-backups' },
      { command: '/security-incident', description: 'Signaler incident', example: '/security-incident' }
    ]
  },
  {
    id: 'inventory-director',
    name: 'Inventory Director',
    description: 'Gère le stock et les inventaires produits',
    icon: Package,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/20 to-sky-500/20',
    dashboardUrl: '/dashboard/inventory',
    capabilities: [
      'Suivi stock en temps réel',
      'Alertes rupture de stock',
      'Prévision demande',
      'Gestion entrepôts',
      'Optimisation stocks',
      'Traçabilité produits'
    ],
    commands: [
      { command: '/inventory-status', description: 'Statut inventaire', example: '/inventory-status' },
      { command: '/inventory-low', description: 'Produits en rupture', example: '/inventory-low' },
      { command: '/inventory-add [produit]', description: 'Ajouter au stock', example: '/inventory-add SKU-001' },
      { command: '/inventory-forecast', description: 'Prévoir besoins', example: '/inventory-forecast' },
      { command: '/inventory-transfer', description: 'Transfert entrepôt', example: '/inventory-transfer' },
      { command: '/inventory-audit', description: 'Audit inventaire', example: '/inventory-audit' }
    ]
  }
]

const founder = {
  name: 'Augustin',
  role: 'Fondateur & CEO',
  avatar: '👑',
}

// Modèles Ollama installés
const installedModels = [
  { name: 'llama3.2:latest', size: '2.0 GB', status: 'installed', description: 'General purpose - Default model' },
  { name: 'llama3.1:8b', size: '4.9 GB', status: 'installed', description: 'Advanced reasoning - Complex analysis' },
  { name: 'qwen2.5-coder:7b', size: '4.7 GB', status: 'installed', description: 'Code & technical - Code generation' },
  { name: 'phi3:mini', size: '2.2 GB', status: 'installed', description: 'Fast & lightweight - Quick responses' },
  { name: 'nomic-embed-text:latest', size: '274 MB', status: 'installed', description: 'Embeddings - Text embeddings' },
]

// Services connectés pour le monitoring
const connectedServices = [
  { name: 'Ollama AI', url: 'http://localhost:11434', icon: Cpu, status: 'online', description: 'IA Locale - 5 modèles installés', models: installedModels },
  { name: 'PostgreSQL', url: 'localhost:5432', icon: Database, status: 'online', description: 'Base de données principale' },
  { name: 'Groq API', url: 'api.groq.com', icon: Zap, status: 'online', description: 'IA Cloud - Traitement language' },
  { name: 'Next.js App', url: 'http://localhost:3000', icon: Shield, status: 'online', description: 'Application principale' },
  { name: 'Stripe', url: 'api.stripe.com', icon: CreditCard, status: 'online', description: 'Paiements (Test Mode)' },
]

export default function AICommandCenter() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [activeTab, setActiveTab] = useState<'agents' | 'commands' | 'stats' | 'services'>('agents')
  const [commandInput, setCommandInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [response, setResponse] = useState('')
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  
  // Vérification d'authentification - Réservé au fondateur
  useEffect(() => {
    // Simuler vérification authentification
    // En production, vérifier via NextAuth/session
    const checkAuth = async () => {
      // Ici on vérifierait le rôle utilisateur
      // Pour démo, on autorise l'accès
      const isFounder = true // Simuler: session?.user?.role === 'FOUNDER'
      
      if (!isFounder) {
        // Rediriger si pas autorisé
        router.push('/dashboard?unauthorized=true')
      } else {
        setIsAuthorized(true)
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [router])

  // Afficher loading pendant vérification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Vérification des droits d'accès...</p>
        </div>
      </div>
    )
  }

  // Afficher message d'erreur si pas autorisé
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-2xl max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Accès Réservé</h1>
          <p className="text-slate-400">Cette page est exclusivement réservée au fondateur de l'entreprise.</p>
        </div>
      </div>
    )
  }

  const processCommand = async () => {
    if (!commandInput.trim()) return
    
    setIsProcessing(true)
    setResponse('')
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const input = commandInput.toLowerCase()
    let found = false
    
    for (const agent of agents) {
      for (const cmd of agent.commands) {
        if (input.startsWith(cmd.command.replace('/', ''))) {
          setResponse(`🤖 ${agent.name} répond:\n\nCommande "${cmd.command}" exécutée avec succès!\n\n📋 Résultat: ${cmd.description}\n\n💡 Suggestion: Essayez d'autres commandes comme ${agent.commands[0].command} ou ${agent.commands[1].command}`)
          found = true
          break
        }
      }
      if (found) break
    }
    
    if (!found) {
      setResponse(`🔍 Commande non reconnue.\n\nEssayez une de ces commandes:\n${agents.slice(0, 3).map(a => `• ${a.commands[0].command} - ${a.name}`).join('\n')}`)
    }
    
    setIsProcessing(false)
  }

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopiedCommand(cmd)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="bg-gradient-to-r from-amber-900/20 via-yellow-900/10 to-amber-900/20 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-amber-900" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">Centre de Commande IA</h1>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                    FONDATEUR
                  </span>
                </div>
                <p className="text-slate-400">Centre de commande - Tous les Agents AI</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">{founder.name}</p>
                <p className="text-amber-400 text-sm">{founder.role}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-2xl">
                {founder.avatar}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8 flex-wrap">
          {[
            { id: 'agents', label: '🤖 9 Agents', icon: Bot },
            { id: 'commands', label: '⚡ Commandes', icon: Command },
            { id: 'services', label: '🔗 Services', icon: Server },
            { id: 'stats', label: '📊 Statistiques', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${agent.bgGradient} rounded-2xl border border-slate-700/50 p-6 hover:border-slate-600 transition-all cursor-pointer group`}
                onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-slate-800/80 flex items-center justify-center ${agent.color}`}>
                    <agent.icon className="w-7 h-7" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">🤖 {agent.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{agent.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.slice(0, 3).map((cap, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800/60 rounded text-xs text-slate-300">
                      {cap}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedAgent?.id === agent.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-slate-700 space-y-2"
                    >
                      <h4 className="text-white text-sm font-medium">Toutes les capacités:</h4>
                      <ul className="space-y-1">
                        {agent.capabilities.map((cap, i) => (
                          <li key={i} className="text-slate-400 text-xs">• {cap}</li>
                        ))}
                      </ul>
                      <Link 
                        href={agent.dashboardUrl}
                        className="flex items-center justify-center gap-2 w-full py-2 mt-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Ouvrir le Dashboard
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'commands' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-green-400" />
                Terminal AI
              </h3>
              
              <div className="relative mb-4">
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && processCommand()}
                  placeholder="Tapez une commande..."
                  className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={processCommand}
                  disabled={isProcessing}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 rounded-lg disabled:opacity-50"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              {response && (
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono">{response}</pre>
                </div>
              )}

              <div className="mt-4">
                <p className="text-slate-500 text-sm mb-2">Commandes rapides:</p>
                <div className="flex flex-wrap gap-2">
                  {['/recherche accessoires', '/marque produit', '/kpis', '/audit', '/aide'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => setCommandInput(cmd)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Command className="w-5 h-5 text-purple-400" />
                Toutes les Commandes
              </h3>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {agents.map((agent) => (
                  <div key={agent.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <agent.icon className={`w-4 h-4 ${agent.color}`} />
                      <span className="text-slate-400 text-sm font-medium">🤖 {agent.name}</span>
                    </div>
                    <div className="space-y-1 ml-6">
                      {agent.commands.map((cmd) => (
                        <div key={cmd.command} className="flex items-center justify-between group">
                          <div className="flex items-center gap-2">
                            <code className="text-green-400 text-xs">{cmd.command}</code>
                            <span className="text-slate-500 text-xs">- {cmd.description}</span>
                          </div>
                          <button
                            onClick={() => copyCommand(cmd.command)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-700 rounded transition-all"
                          >
                            {copiedCommand === cmd.command ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-slate-500" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Agents Actifs', value: '9/9', icon: Bot, color: 'text-blue-400', bg: 'bg-blue-500/20' },
                { label: 'Commandes Aujourd\'hui', value: '24', icon: Command, color: 'text-green-400', bg: 'bg-green-500/20' },
                { label: 'Produits Analysés', value: '156', icon: ShoppingCart, color: 'text-purple-400', bg: 'bg-purple-500/20' },
                { label: 'Revenus IA', value: '€12.4k', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/20' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-900/50 rounded-xl border border-slate-700 p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Status des Agents
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center ${agent.color}`}>
                        <agent.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{agent.name}</p>
                        <p className="text-slate-500 text-xs">{agent.capabilities.length} capacités</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="text-green-400 text-xs">Actif</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 rounded-2xl border border-blue-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Server className="w-6 h-6 text-blue-400" />
                    Services Connectés
                  </h3>
                  <p className="text-slate-400 text-sm">Monitoring en temps réel de tous les services</p>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  5 Services en ligne
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectedServices.map((service, i) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-900/50 rounded-xl border border-slate-700 p-5 hover:border-green-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      service.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      <service.icon className={`w-6 h-6 ${
                        service.status === 'online' ? 'text-green-400' : 'text-red-400'
                      }`} />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      service.status === 'online' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {service.status === 'online' ? '● En ligne' : '○ Hors ligne'}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold mb-1">{service.name}</h4>
                  <p className="text-slate-400 text-xs mb-3">{service.description}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Link href={service.url} target="_blank" className="text-blue-400 hover:underline">
                      {service.url}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status des APIs */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Statut des APIs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'API Products', status: '200 OK', time: '45ms', color: 'text-green-400' },
                  { name: 'API Orders', status: '200 OK', time: '32ms', color: 'text-green-400' },
                  { name: 'API AI (Groq)', status: '200 OK', time: '120ms', color: 'text-green-400' },
                  { name: 'API Ollama', status: '200 OK', time: '890ms', color: 'text-yellow-400' },
                  { name: 'API Analytics', status: '200 OK', time: '56ms', color: 'text-green-400' },
                  { name: 'API Webhooks', status: '200 OK', time: '28ms', color: 'text-green-400' },
                ].map((api) => (
                  <div key={api.name} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300 text-sm">{api.name}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${api.color}`}>{api.status}</span>
                      <span className="text-slate-500 text-xs">{api.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center pb-8">
        <Link href="/dashboard/seller-stack" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Seller Stack
        </Link>
        
        <div className="flex items-center gap-2">
          <Link href="/dashboard/health" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            <Heart className="w-4 h-4 text-rose-400" />
            Health
          </Link>
          <Link href="/dashboard/maintenance" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            <Wrench className="w-4 h-4 text-slate-400" />
            Maintenance
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-colors">
            Dashboard Principal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
