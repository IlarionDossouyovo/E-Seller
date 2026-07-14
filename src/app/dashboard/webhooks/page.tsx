'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Webhook, 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  Copy, 
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Bell,
  ShoppingCart,
  Package,
  Users,
  DollarSign
} from 'lucide-react'

type WebhookEvent = {
  id: number
  name: string
  url: string
  events: string[]
  status: 'active' | 'inactive'
  lastTriggered: string
  successRate: number
}

const mockWebhooks: WebhookEvent[] = [
  { id: 1, name: 'Notifications Commandes', url: 'https://api.example.com/webhooks/orders', events: ['order.created', 'order.updated', 'order.completed'], status: 'active', lastTriggered: '2 min', successRate: 99.5 },
  { id: 2, name: 'Synchronisation Inventaire', url: 'https://api.example.com/webhooks/inventory', events: ['product.stock_changed'], status: 'active', lastTriggered: '15 min', successRate: 98.2 },
  { id: 3, name: 'CRM Clients', url: 'https://api.example.com/webhooks/customers', events: ['customer.created', 'customer.updated'], status: 'active', lastTriggered: '1 heure', successRate: 100 },
  { id: 4, name: 'Alertes Paiement', url: 'https://api.example.com/webhooks/payments', events: ['payment.success', 'payment.failed'], status: 'inactive', lastTriggered: '2 jours', successRate: 97.8 },
]

const availableEvents = [
  { category: 'Commandes', icon: ShoppingCart, events: ['order.created', 'order.updated', 'order.completed', 'order.cancelled'] },
  { category: 'Produits', icon: Package, events: ['product.created', 'product.updated', 'product.deleted', 'product.stock_changed'] },
  { category: 'Clients', icon: Users, events: ['customer.created', 'customer.updated', 'customer.deleted'] },
  { category: 'Paiements', icon: DollarSign, events: ['payment.success', 'payment.failed', 'payment.refunded'] },
]

const recentDeliveries = [
  { event: 'order.created', timestamp: '2024-04-09 14:30:00', status: 'success', duration: '245ms' },
  { event: 'product.stock_changed', timestamp: '2024-04-09 14:28:00', status: 'success', duration: '180ms' },
  { event: 'customer.created', timestamp: '2024-04-09 14:25:00', status: 'success', duration: '320ms' },
  { event: 'payment.failed', timestamp: '2024-04-09 14:20:00', status: 'failed', duration: '45ms' },
]

export default function WebhooksPage() {
  const [webhooks] = useState<WebhookEvent[]>(mockWebhooks)
  const [notification, setNotification] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Webhook className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Webhooks</h1>
              <p className="text-gray-300">Configurez les callbacks HTTP en temps reel</p>
            </div>
          </div>
          <button onClick={() => { setNotification('Ajout webhook...'); setTimeout(() => { setNotification('Formulaire ouvert!'); setTimeout(() => setNotification(null), 2000) }, 1000) }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Ajouter Webhook
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Webhooks Actifs', value: '4', icon: Webhook },
          { label: 'Total Requetes', value: '12 450', icon: Bell },
          { label: 'Taux Reussite', value: '98.5%', icon: CheckCircle },
          { label: 'Reponse Moy.', value: '245ms', icon: Clock },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <stat.icon className="w-5 h-5 text-amber-400 mb-2" />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Webhooks List */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Webhooks Configures</h3>
        <div className="space-y-4">
          {webhooks.map((webhook, i) => (
            <motion.div key={webhook.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-white">{webhook.name}</h4>
                  <p className="text-sm text-gray-400 font-mono">{webhook.url}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${webhook.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                    {webhook.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                  <button onClick={() => { setNotification('Parametres: ' + webhook.name); setTimeout(() => setNotification(null), 2000) }} className="p-2 rounded-lg hover:bg-white/10">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setNotification('Suppression: ' + webhook.name); setTimeout(() => setNotification(null), 2000) }} className="p-2 rounded-lg hover:bg-white/10 text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex gap-2">
                  {webhook.events.map((e, j) => (
                    <span key={j} className="px-2 py-0.5 rounded bg-white/5 text-xs">{e}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span>Dernier: {webhook.lastTriggered}</span>
                  <span className={`${webhook.successRate >= 99 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {webhook.successRate}% succes
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Available Events */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Evenements Disponibles</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {availableEvents.map((cat, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 mb-3">
                <cat.icon className="w-5 h-5 text-electron-blue" />
                <h4 className="font-medium text-white">{cat.category}</h4>
              </div>
              <div className="space-y-2">
                {cat.events.map((event, j) => (
                  <div key={j} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-mono text-xs">{event}</span>
                    <button onClick={() => { setNotification('Ajout: ' + event); setTimeout(() => setNotification(null), 2000) }} className="text-electron-blue text-xs hover:underline font-medium">Ajouter</button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Livraisons Recentes</h3>
        <div className="space-y-2">
          {recentDeliveries.map((delivery, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                {delivery.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span className="font-mono text-sm text-white">{delivery.event}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{delivery.timestamp}</span>
                <span>{delivery.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}
