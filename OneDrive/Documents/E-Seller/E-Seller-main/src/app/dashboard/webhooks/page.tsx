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
  { id: 1, name: 'Order Notifications', url: 'https://api.example.com/webhooks/orders', events: ['order.created', 'order.updated', 'order.completed'], status: 'active', lastTriggered: '2 min ago', successRate: 99.5 },
  { id: 2, name: 'Inventory Sync', url: 'https://api.example.com/webhooks/inventory', events: ['product.stock_changed'], status: 'active', lastTriggered: '15 min ago', successRate: 98.2 },
  { id: 3, name: 'Customer CRM', url: 'https://api.example.com/webhooks/customers', events: ['customer.created', 'customer.updated'], status: 'active', lastTriggered: '1 hour ago', successRate: 100 },
  { id: 4, name: 'Payment Alerts', url: 'https://api.example.com/webhooks/payments', events: ['payment.success', 'payment.failed'], status: 'inactive', lastTriggered: '2 days ago', successRate: 97.8 },
]

const availableEvents = [
  { category: 'Orders', icon: ShoppingCart, events: ['order.created', 'order.updated', 'order.completed', 'order.cancelled'] },
  { category: 'Products', icon: Package, events: ['product.created', 'product.updated', 'product.deleted', 'product.stock_changed'] },
  { category: 'Customers', icon: Users, events: ['customer.created', 'customer.updated', 'customer.deleted'] },
  { category: 'Payments', icon: DollarSign, events: ['payment.success', 'payment.failed', 'payment.refunded'] },
]

const recentDeliveries = [
  { event: 'order.created', timestamp: '2024-04-09 14:30:00', status: 'success', duration: '245ms' },
  { event: 'product.stock_changed', timestamp: '2024-04-09 14:28:00', status: 'success', duration: '180ms' },
  { event: 'customer.created', timestamp: '2024-04-09 14:25:00', status: 'success', duration: '320ms' },
  { event: 'payment.failed', timestamp: '2024-04-09 14:20:00', status: 'failed', duration: '45ms' },
]

export default function WebhooksPage() {
  const [webhooks] = useState<WebhookEvent[]>(mockWebhooks)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Webhook className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Webhooks</h1>
              <p className="text-gray-400">Configure real-time HTTP callbacks</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Webhook
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Webhooks', value: '4', icon: Webhook },
          { label: 'Total Requests', value: '12,450', icon: Bell },
          { label: 'Success Rate', value: '98.5%', icon: CheckCircle },
          { label: 'Avg Response', value: '245ms', icon: Clock },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <stat.icon className="w-5 h-5 text-amber-400 mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Webhooks List */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Configured Webhooks</h3>
        <div className="space-y-4">
          {webhooks.map((webhook, i) => (
            <motion.div key={webhook.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{webhook.name}</h4>
                  <p className="text-sm text-gray-400 font-mono">{webhook.url}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${webhook.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {webhook.status}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 text-red-400">
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
                  <span>Last: {webhook.lastTriggered}</span>
                  <span className={`${webhook.successRate >= 99 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {webhook.successRate}% success
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Available Events */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Available Events</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {availableEvents.map((cat, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 mb-3">
                <cat.icon className="w-5 h-5 text-electron-blue" />
                <h4 className="font-medium">{cat.category}</h4>
              </div>
              <div className="space-y-2">
                {cat.events.map((event, j) => (
                  <div key={j} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 font-mono text-xs">{event}</span>
                    <button className="text-electron-blue text-xs hover:underline">Add</button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Deliveries</h3>
        <div className="space-y-2">
          {recentDeliveries.map((delivery, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                {delivery.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span className="font-mono text-sm">{delivery.event}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{delivery.timestamp}</span>
                <span>{delivery.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}