'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Shield,
  Cloud,
  Wifi,
  ShoppingCart,
  CreditCard,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const services = [
  { name: 'API Principale', url: '/api/status', icon: Server, status: 'online', responseTime: '45ms', lastCheck: 'Il y a 30s' },
  { name: 'Ollama AI', url: 'http://localhost:11434', icon: Cpu, status: 'online', responseTime: '890ms', lastCheck: 'Il y a 15s' },
  { name: 'PostgreSQL', url: 'localhost:5432', icon: Database, status: 'online', responseTime: '12ms', lastCheck: 'Il y a 20s' },
  { name: 'Groq API', url: 'api.groq.com', icon: Zap, status: 'online', responseTime: '180ms', lastCheck: 'Il y a 10s' },
  { name: 'Stripe', url: 'api.stripe.com', icon: CreditCard, status: 'online', responseTime: '95ms', lastCheck: 'Il y a 25s' },
  { name: 'Dashboard', url: '/dashboard', icon: Shield, status: 'online', responseTime: '32ms', lastCheck: 'Il y a 5s' },
  { name: 'Store', url: '/store', icon: ShoppingCart, status: 'online', responseTime: '28ms', lastCheck: 'Il y a 8s' },
]

const alerts = [
  { id: 1, level: 'warning', message: 'Utilisation mémoire Ollama > 75%', time: 'Il y a 5 min', icon: AlertTriangle },
  { id: 2, level: 'info', message: 'Mise à jour disponible: Next.js 14.2.0', time: 'Il y a 2h', icon: RefreshCw },
  { id: 3, level: 'success', message: 'Backup automatique terminé', time: 'Il y a 4h', icon: CheckCircle },
]

const stats = [
  { label: 'Services en ligne', value: '7/7', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' },
  { label: 'Temps moyen réponse', value: '143ms', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { label: 'Alertes actives', value: '1', icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { label: 'Uptime 24h', value: '99.9%', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/20' },
]

const healthMetrics = [
  { name: 'CPU', current: 45, max: 100, status: 'good' },
  { name: 'Mémoire', current: 3.2, max: 8, unit: 'GB', status: 'warning' },
  { name: 'Disque', current: 45, max: 100, unit: '%', status: 'good' },
  { name: 'Réseau', current: 28, max: 100, unit: '%', status: 'good' },
]

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'alerts'>('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Health Director</h1>
            <p className="text-slate-400">Surveillance système en temps réel</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Système Opérationnel
          </span>
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
          { id: 'overview', label: 'Aperçu', icon: Activity },
          { id: 'services', label: 'Services', icon: Server },
          { id: 'alerts', label: 'Alertes', icon: AlertTriangle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id 
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
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
          {/* Health Metrics */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" />
              Métriques Système
            </h2>
            <div className="space-y-4">
              {healthMetrics.map((metric) => (
                <div key={metric.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">{metric.name}</span>
                    <span className="text-white">{metric.current}{metric.unit || '%'} / {metric.max}{metric.unit || '%'}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        metric.status === 'good' ? 'bg-green-500' : 
                        metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(metric.current / metric.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Alertes Récentes
            </h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    alert.level === 'warning' ? 'bg-yellow-500/20' :
                    alert.level === 'success' ? 'bg-green-500/20' : 'bg-blue-500/20'
                  }`}>
                    <alert.icon className={`w-4 h-4 ${
                      alert.level === 'warning' ? 'text-yellow-400' :
                      alert.level === 'success' ? 'text-green-400' : 'text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-slate-500 text-xs">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-5 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              Services Surveillés
            </h2>
            <button onClick={() => alert('Actualisation des services en cours...')} className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 text-sm">
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
          </div>
          <div className="p-5 space-y-3">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{service.name}</p>
                    <p className="text-slate-400 text-sm">{service.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">{service.responseTime}</p>
                    <p className="text-slate-500 text-xs">{service.lastCheck}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                    En ligne
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Gestion des Alertes
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    alert.level === 'warning' ? 'bg-yellow-500/20' :
                    alert.level === 'success' ? 'bg-green-500/20' : 'bg-blue-500/20'
                  }`}>
                    <alert.icon className={`w-5 h-5 ${
                      alert.level === 'warning' ? 'text-yellow-400' :
                      alert.level === 'success' ? 'text-green-400' : 'text-blue-400'
                    }`} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{alert.message}</p>
                    <p className="text-slate-500 text-xs">{alert.time}</p>
                  </div>
                </div>
                <button onClick={() => alert('Affichage des détails de l\'alerte...')} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 text-sm">
                  Détails
                </button>
              </div>
            ))}
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
            <Activity className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white font-medium">Dashboard</p>
          </Link>
          <Link href="/dashboard/seller-stack" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500 text-left">
            <Server className="w-5 h-5 text-purple-400 mb-2" />
            <p className="text-white font-medium">Seller Stack</p>
          </Link>
          <Link href="/dashboard/founder/ai-command-center" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-amber-500 text-left">
            <Shield className="w-5 h-5 text-amber-400 mb-2" />
            <p className="text-white font-medium">Command Center</p>
          </Link>
          <Link href="/dashboard/maintenance" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-green-500 text-left">
            <Zap className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-white font-medium">Maintenance</p>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard/seller-stack" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Seller Stack
        </Link>
        
        <div className="flex items-center gap-2">
          <Link href="/dashboard/maintenance" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            <Zap className="w-4 h-4 text-green-400" />
            Maintenance
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
