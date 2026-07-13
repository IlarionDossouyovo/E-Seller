'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Wrench, 
  Settings, 
  Database, 
  Cpu, 
  HardDrive,
  Download,
  Upload,
  RefreshCw,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Package,
  Lock
} from 'lucide-react'
import Link from 'next/link'

const tasks = [
  { id: 1, name: 'Backup Base de Données', status: 'completed', lastRun: 'Il y a 4h', icon: Database },
  { id: 2, name: 'Nettoyage Logs', status: 'completed', lastRun: 'Il y a 6h', icon: RefreshCw },
  { id: 3, name: 'Vérification Sécurité', status: 'completed', lastRun: 'Il y a 12h', icon: Shield },
  { id: 4, name: 'Optimisation DB', status: 'scheduled', nextRun: 'Demain 2h00', icon: Database },
  { id: 5, name: 'Mise à jour Packages', status: 'pending', nextRun: 'Semaine prochaine', icon: Package },
]

const resources = [
  { name: 'CPU', usage: 45, icon: Cpu, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { name: 'Mémoire', usage: 3.2, total: 8, unit: 'GB', icon: HardDrive, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { name: 'Disque', usage: 45, total: 100, unit: '%', icon: Database, color: 'text-green-400', bg: 'bg-green-500/20' },
  { name: 'Docker', containers: 4, icon: Package, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
]

const updates = [
  { package: 'next', current: '14.1.0', latest: '14.2.0', priority: 'high' },
  { package: 'react', current: '18.2.0', latest: '18.3.0', priority: 'medium' },
  { package: 'stripe', current: '21.0.0', latest: '22.0.0', priority: 'low' },
]

const securityAudit = [
  { item: 'Vérification certificats SSL', status: 'pass', date: 'Il y a 24h' },
  { item: 'Scan vulnérabilités', status: 'pass', date: 'Il y a 24h' },
  { item: 'Permissions fichiers', status: 'pass', date: 'Il y a 24h' },
  { item: 'Ports ouverts', status: 'warning', date: 'Il y a 12h' },
]

const stats = [
  { label: 'Uptime', value: '99.9%', icon: Clock, color: 'text-green-400', bg: 'bg-green-500/20' },
  { label: 'Backups ce mois', value: '30', icon: Download, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { label: 'Mises à jour dispo', value: '3', icon: RefreshCw, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { label: 'Conteneurs', value: '4', icon: Package, color: 'text-purple-400', bg: 'bg-purple-500/20' },
]

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'security'>('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-600 flex items-center justify-center">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Maintenance Director</h1>
            <p className="text-slate-400">Gestion système et maintenance</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30">
            <RefreshCw className="w-4 h-4" />
            Vérifier Updates
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
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { id: 'overview', label: 'Aperçu', icon: Settings },
          { id: 'tasks', label: 'Tâches', icon: Clock },
          { id: 'security', label: 'Sécurité', icon: Shield },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id 
                ? 'bg-slate-500/20 text-slate-300 border border-slate-500/30' 
                : 'bg-slate-800/50 text-slate-400 border border-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resources */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              Ressources Système
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {resources.map((resource) => (
                <div key={resource.name} className="p-4 bg-slate-900/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <resource.icon className={`w-5 h-5 ${resource.color}`} />
                    <span className="text-slate-400 text-sm">{resource.name}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {resource.usage}{resource.unit || '%'}
                    {resource.total && <span className="text-slate-500 text-sm"> / {resource.total}{resource.unit || '%'}</span>}
                  </p>
                  {resource.containers && (
                    <p className="text-slate-500 text-xs">{resource.containers} conteneurs actifs</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Updates */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-yellow-400" />
              Mises à Jour Disponibles
            </h2>
            <div className="space-y-3">
              {updates.map((update) => (
                <div key={update.package} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{update.package}</p>
                    <p className="text-slate-500 text-xs">v{update.current} → v{update.latest}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    update.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    update.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {update.priority}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
              Mettre à jour tout
            </button>
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-5 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Tâches Planifiées
            </h2>
            <button className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 text-sm">
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
          </div>
          <div className="p-5 space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    task.status === 'completed' ? 'bg-green-500/20' :
                    task.status === 'scheduled' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
                  }`}>
                    <task.icon className={`w-5 h-5 ${
                      task.status === 'completed' ? 'text-green-400' :
                      task.status === 'scheduled' ? 'text-blue-400' : 'text-yellow-400'
                    }`} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{task.name}</p>
                    <p className="text-slate-500 text-xs">
                      {task.status === 'completed' ? task.lastRun : task.nextRun}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  task.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {task.status === 'completed' ? 'Terminé' :
                   task.status === 'scheduled' ? 'Planifié' : 'En attente'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Audit de Sécurité
            </h2>
            <div className="space-y-3">
              {securityAudit.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.status === 'pass' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    )}
                    <span className="text-slate-300">{item.item}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.status === 'pass' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.status === 'pass' ? 'OK' : 'Attention'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-400" />
              Actions de Sécurité
            </h2>
            <div className="space-y-3">
              <button className="w-full p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-green-500 text-left flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-medium">Lancer Audit Complet</p>
                  <p className="text-slate-500 text-xs">Vérification vulnérabilités</p>
                </div>
              </button>
              <button className="w-full p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-blue-500 text-left flex items-center gap-3">
                <Download className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">Créer Backup</p>
                  <p className="text-slate-500 text-xs">Sauvegarde complète</p>
                </div>
              </button>
              <button className="w-full p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-yellow-500 text-left flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-medium">Appliquer Patches</p>
                  <p className="text-slate-500 text-xs">Mettre à jour dépendances</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 bg-slate-800/50 rounded-xl border border-slate-700 p-5">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Actions Rapides
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/dashboard" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-blue-500 text-left">
            <Settings className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white font-medium">Dashboard</p>
          </Link>
          <Link href="/dashboard/seller-stack" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500 text-left">
            <Wrench className="w-5 h-5 text-purple-400 mb-2" />
            <p className="text-white font-medium">Seller Stack</p>
          </Link>
          <Link href="/dashboard/health" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-rose-500 text-left">
            <Shield className="w-5 h-5 text-rose-400 mb-2" />
            <p className="text-white font-medium">Santé</p>
          </Link>
          <Link href="/dashboard/founder/ai-command-center" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-amber-500 text-left">
            <Zap className="w-5 h-5 text-amber-400 mb-2" />
            <p className="text-white font-medium">Command Center</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
