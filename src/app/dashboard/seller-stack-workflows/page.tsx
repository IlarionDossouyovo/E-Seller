'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Workflow,
  Play,
  Pause,
  Plus,
  Settings,
  Trash2,
  Edit,
  Copy,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Zap,
  ArrowRight,
  Timer,
  Database,
  Mail,
  MessageSquare,
  ShoppingCart,
  Package,
  Users,
  FileText,
  Bell,
  Link2,
  RefreshCw,
  Filter,
  Search,
  ChevronDown,
  MoreVertical,
  Eye,
  Download,
  Upload,
  BarChart3,
  Activity,
  Server,
  Bot,
  Sparkles,
  ArrowLeft,
  ArrowDown,
  Check
} from 'lucide-react'
import Link from 'next/link'

// Types
interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'draft'
  trigger: string
  actions: number
  lastRun: string
  nextRun: string | null
  successRate: number
  runs: number
}

interface WorkflowRun {
  id: string
  workflowId: string
  workflowName: string
  status: 'success' | 'failed' | 'running'
  startTime: string
  duration: string
  steps: number
  errors: number
}

interface Trigger {
  id: string
  name: string
  icon: React.ElementType
  description: string
  category: string
}

interface Action {
  id: string
  name: string
  icon: React.ElementType
  description: string
  category: string
}

// Données de démonstration
const workflows: Workflow[] = [
  { id: 'WF001', name: 'Bienvenue Nouveau Client', description: 'Envoie un email de bienvenue aux nouveaux clients', status: 'active', trigger: 'Nouveau client', actions: 3, lastRun: 'Il y a 5 min', nextRun: 'Dans 1h', successRate: 98.5, runs: 1245 },
  { id: 'WF002', name: 'Panier Abandonné', description: 'Relance les clients avec panier abandonné', status: 'active', trigger: 'Panier abandonné', actions: 4, lastRun: 'Il y a 15 min', nextRun: 'Dans 30 min', successRate: 45.2, runs: 892 },
  { id: 'WF003', name: 'Mise à jour stock', description: 'Alerte quand le stock est faible', status: 'active', trigger: 'Stock faible', actions: 2, lastRun: 'Il y a 1h', nextRun: 'Dans 2h', successRate: 99.1, runs: 456 },
  { id: 'WF004', name: 'Avis produit', description: 'Demande un avis après livraison', status: 'paused', trigger: 'Commande livrée', actions: 2, lastRun: 'Il y a 3 jours', nextRun: null, successRate: 67.8, runs: 234 },
  { id: 'WF005', name: 'Upsell post-achat', description: 'Suggestions de produits complémentaires', status: 'active', trigger: 'Achat confirmé', actions: 5, lastRun: 'Il y a 10 min', nextRun: 'Dans 20 min', successRate: 34.5, runs: 1567 },
  { id: 'WF006', name: 'Réengagement inactif', description: 'Rcontacte les clients inactifs depuis 30 jours', status: 'draft', trigger: 'Client inactif', actions: 3, lastRun: 'Jamais', nextRun: null, successRate: 0, runs: 0 },
]

const recentRuns: WorkflowRun[] = [
  { id: 'R001', workflowId: 'WF001', workflowName: 'Bienvenue Nouveau Client', status: 'success', startTime: 'Il y a 5 min', duration: '2.3s', steps: 3, errors: 0 },
  { id: 'R002', workflowId: 'WF002', workflowName: 'Panier Abandonné', status: 'failed', startTime: 'Il y a 15 min', duration: '5.1s', steps: 2, errors: 1 },
  { id: 'R003', workflowId: 'WF005', workflowName: 'Upsell post-achat', status: 'success', startTime: 'Il y a 10 min', duration: '1.8s', steps: 5, errors: 0 },
  { id: 'R004', workflowId: 'WF003', workflowName: 'Mise à jour stock', status: 'success', startTime: 'Il y a 1h', duration: '0.8s', steps: 2, errors: 0 },
  { id: 'R005', workflowId: 'WF002', workflowName: 'Panier Abandonné', status: 'running', startTime: 'Maintenant', duration: 'En cours', steps: 1, errors: 0 },
]

const triggers: Trigger[] = [
  { id: 'T1', name: 'Nouveau client', icon: Users, description: 'Déclenché quand un nouveau client s\'inscrit', category: 'Clients' },
  { id: 'T2', name: 'Panier abandonné', icon: ShoppingCart, description: 'Déclenché quand un panier est abandonné', category: 'Panier' },
  { id: 'T3', name: 'Commande passée', icon: Package, description: 'Déclenché quand une commande est confirmée', category: 'Commandes' },
  { id: 'T4', name: 'Paiement reçu', icon: CheckCircle, description: 'Déclenché quand un paiement est réussi', category: 'Paiements' },
  { id: 'T5', name: 'Stock faible', icon: AlertTriangle, description: 'Déclenché quand le stock descend sous le seuil', category: 'Inventaire' },
  { id: 'T6', name: 'Client inactif', icon: Clock, description: 'Déclenché après X jours d\'inactivité', category: 'Clients' },
]

const actions: Action[] = [
  { id: 'A1', name: 'Envoyer un email', icon: Mail, description: 'Envoie un email au client', category: 'Communication' },
  { id: 'A2', name: 'Envoyer un SMS', icon: MessageSquare, description: 'Envoie un SMS au client', category: 'Communication' },
  { id: 'A3', name: 'Ajouter au segment', icon: Users, description: 'Ajoute le client à un segment', category: 'Segmentation' },
  { id: 'A4', name: 'Mettre à jour le stock', icon: Package, description: 'Met à jour la quantité en stock', category: 'Inventaire' },
  { id: 'A5', name: 'Créer une tâche', icon: CheckCircle, description: 'Crée une tâche pour l\'équipe', category: 'Gestion' },
  { id: 'A6', name: 'Notifier sur Slack', icon: Bell, description: 'Envoie une notification Slack', category: 'Communication' },
  { id: 'A7', name: 'Appeler un webhook', icon: Link2, description: 'Appelle une URL externe', category: 'Intégration' },
  { id: 'A8', name: 'Attendre', icon: Timer, description: 'Attend X secondes/minutes/heures', category: 'Logique' },
]

const stats = [
  { label: 'Workflows Actifs', value: '12', icon: Play, change: '+3' },
  { label: 'Exécutions Totales', value: '4,567', icon: Activity, change: '+892' },
  { label: 'Taux de Réussite', value: '94.5%', icon: CheckCircle, change: '+2.3%' },
  { label: 'Temps Moyen', value: '2.3s', icon: Timer, change: '-0.5s' },
]

export default function SellerStackWorkflowsPage() {
  const [activeTab, setActiveTab] = useState<'workflows' | 'runs' | 'builder'>('workflows')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)

  const filteredWorkflows = workflows.filter(wf => {
    const matchesSearch = wf.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        wf.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || wf.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Actif' }
      case 'paused': return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'En pause' }
      case 'draft': return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Brouillon' }
      case 'success': return { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Succès' }
      case 'failed': return { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Échec' }
      case 'running': return { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'En cours' }
      default: return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: status }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Workflow className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Seller Stack Workflows</h1>
            <p className="text-slate-400">Automatisation des processus métier</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => alert('Créer un nouveau workflow!')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4" />
            Nouveau Workflow
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800/50 rounded-xl p-5 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-orange-400" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { id: 'workflows', label: 'Workflows', icon: Workflow },
          { id: 'runs', label: 'Exécutions', icon: Play },
          { id: 'builder', label: 'Constructeur', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id 
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'workflows' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher un workflow..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="paused">En pause</option>
              <option value="draft">Brouillon</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-400 hover:text-white">
              <Filter className="w-4 h-4" />
              Plus de filtres
            </button>
          </div>

          {/* Workflows List */}
          <div className="grid gap-4">
            {filteredWorkflows.map((workflow, i) => {
              const badge = getStatusBadge(workflow.status)
              return (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 hover:border-orange-500/30 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        workflow.status === 'active' ? 'bg-green-500/20' : 
                        workflow.status === 'paused' ? 'bg-yellow-500/20' : 'bg-gray-500/20'
                      }`}>
                        <Workflow className={`w-6 h-6 ${
                          workflow.status === 'active' ? 'text-green-400' : 
                          workflow.status === 'paused' ? 'text-yellow-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-white">{workflow.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${badge.bg} ${badge.text}`}>
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-3">{workflow.description}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            Déclencheur: {workflow.trigger}
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowRight className="w-4 h-4" />
                            {workflow.actions} actions
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            {workflow.successRate}% succès
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => alert(`Exécuter: ${workflow.name}`)}
                        className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => alert(`Mettre en pause: ${workflow.name}`)}
                        className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-yellow-400"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => alert(`Modifier: ${workflow.name}`)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => alert(`Dupliquer: ${workflow.name}`)}
                        className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => alert(`Supprimer: ${workflow.name}`)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-sm text-slate-500">
                    <span>Dernière exécution: {workflow.lastRun}</span>
                    <span>{workflow.runs} exécutions</span>
                    {workflow.nextRun && <span>Prochaine: {workflow.nextRun}</span>}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'runs' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-5 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Historique des Exécutions</h2>
          </div>
          <div className="divide-y divide-slate-700">
            {recentRuns.map((run) => {
              const badge = getStatusBadge(run.status)
              return (
                <div key={run.id} className="p-5 flex items-center justify-between hover:bg-slate-700/30">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      run.status === 'success' ? 'bg-green-500/20' :
                      run.status === 'failed' ? 'bg-red-500/20' : 'bg-blue-500/20'
                    }`}>
                      {run.status === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> :
                       run.status === 'failed' ? <XCircle className="w-5 h-5 text-red-400" /> :
                       <Activity className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{run.workflowName}</p>
                      <p className="text-slate-500 text-sm">{run.startTime} • {run.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                    <span className="text-slate-400 text-sm">{run.steps} étapes</span>
                    {run.errors > 0 && <span className="text-red-400 text-sm">{run.errors} erreurs</span>}
                    <button onClick={() => alert(`Voir les détails de l'exécution ${run.id}`)} className="p-2 hover:bg-slate-600 rounded-lg">
                      <Eye className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Triggers */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Déclencheurs
            </h3>
            <div className="space-y-3">
              {triggers.map((trigger) => (
                <div 
                  key={trigger.id} 
                  onClick={() => alert(`Ajouter le déclencheur: ${trigger.name}`)}
                  className="p-3 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-yellow-500/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <trigger.icon className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium text-sm">{trigger.name}</p>
                      <p className="text-slate-500 text-xs">{trigger.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flow Canvas */}
          <div className="lg:col-span-1 bg-slate-800/50 rounded-xl border border-slate-700 p-5">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-orange-400" />
              Flux de Travail
            </h3>
            <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-lg">
              <Workflow className="w-12 h-12 text-slate-600 mb-4" />
              <p className="text-slate-500 text-center mb-4">
                Glissez les déclencheurs et actions ici<br/>pour créer votre workflow
              </p>
              <button onClick={() => alert('Commencer la construction du workflow!')} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white">
                Commencer
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" />
              Actions
            </h3>
            <div className="space-y-3">
              {actions.map((action) => (
                <div 
                  key={action.id} 
                  onClick={() => alert(`Ajouter l'action: ${action.name}`)}
                  className="p-3 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-blue-500/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium text-sm">{action.name}</p>
                      <p className="text-slate-500 text-xs">{action.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 bg-slate-800/50 rounded-xl border border-slate-700 p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Actions Rapides
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/dashboard/seller-stack" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-blue-500 text-left">
            <ArrowLeft className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white font-medium">Seller Stack</p>
          </Link>
          <Link href="/dashboard/ai-automations" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500 text-left">
            <Bot className="w-5 h-5 text-purple-400 mb-2" />
            <p className="text-white font-medium">Automations</p>
          </Link>
          <Link href="/dashboard/emails" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-pink-500 text-left">
            <Mail className="w-5 h-5 text-pink-400 mb-2" />
            <p className="text-white font-medium">Emails</p>
          </Link>
          <button onClick={() => alert('Exporter les workflows!')} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-green-500 text-left">
            <Download className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-white font-medium">Exporter</p>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard/seller-stack" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à Seller Stack
        </Link>
        
        <div className="flex items-center gap-2">
          <Link href="/dashboard/health" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            Santé
          </Link>
          <Link href="/dashboard/maintenance" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            Maintenance
          </Link>
          <Link href="/dashboard/founder/ai-command-center" className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg text-amber-400 transition-colors">
            Command Center
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
