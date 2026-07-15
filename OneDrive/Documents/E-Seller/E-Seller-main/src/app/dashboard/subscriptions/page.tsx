'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, DollarSign, Users, TrendingUp, Calendar, CreditCard, Clock, CheckCircle, XCircle, RefreshCw, AlertTriangle, MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react'

const subscriptions = [
  { id: 'SUB-001', customer: 'John Smith', email: 'john@example.com', plan: 'Gold', price: 49.99, billing: 'monthly', status: 'active', nextBilling: '2024-05-12', startDate: '2024-01-12', payments: 3 },
  { id: 'SUB-002', customer: 'Marie Dubois', email: 'marie@example.fr', plan: 'Silver', price: 29.99, billing: 'monthly', status: 'active', nextBilling: '2024-05-08', startDate: '2024-02-08', payments: 2 },
  { id: 'SUB-003', customer: 'Hans Mueller', email: 'hans@example.de', plan: 'Bronze', price: 19.99, billing: 'monthly', status: 'paused', nextBilling: '2024-05-15', startDate: '2024-03-15', payments: 1 },
  { id: 'SUB-004', customer: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Gold', price: 49.99, billing: 'monthly', status: 'active', nextBilling: '2024-05-10', startDate: '2024-01-10', payments: 3 },
  { id: 'SUB-005', customer: 'Mike Chen', email: 'mike@example.cn', plan: 'Gold', price: 499.99, billing: 'yearly', status: 'active', nextBilling: '2025-04-12', startDate: '2024-04-12', payments: 1 },
]

const plans = [
  { id: 'bronze', name: 'Bronze', price: 19.99, period: 'month', features: ['5 products', 'Basic analytics', 'Email support'], color: 'amber' },
  { id: 'silver', name: 'Silver', price: 29.99, period: 'month', features: ['25 products', 'Advanced analytics', 'Priority support', 'API access'], color: 'gray' },
  { id: 'gold', name: 'Gold', price: 49.99, period: 'month', features: ['Unlimited products', 'Full analytics', '24/7 support', 'API access', 'Custom integrations'], color: 'yellow' },
  { id: 'enterprise', name: 'Enterprise', price: 199.99, period: 'month', features: ['Everything in Gold', 'Dedicated manager', 'Custom solutions', 'SLA'], color: 'purple' },
]

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400',
  paused: 'bg-yellow-500/20 text-yellow-400',
  cancelled: 'bg-red-500/20 text-red-400',
}

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [filter, setFilter] = useState('all')

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    mrr: subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + (s.plan === 'Gold' ? 49.99 : s.plan === 'Silver' ? 29.99 : 19.99), 0),
    arr: 0,
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Subscriptions</h1>
              <p className="text-gray-400">Manage recurring revenue</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center gap-2">
            <Package className="w-4 h-4" /> Create Plan
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">Total Subs</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.active}</p>
          <p className="text-sm text-gray-400">Active</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">${stats.mrr.toFixed(2)}</p>
          <p className="text-sm text-gray-400">MRR</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">${(stats.mrr * 12).toFixed(2)}</p>
          <p className="text-sm text-gray-400">ARR</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['overview', 'plans', 'analytics', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-cyan-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Plans */}
          <div className="grid md:grid-cols-4 gap-4">
            {plans.map((plan, i) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card p-6 border-2 ${
                plan.id === 'gold' ? 'border-yellow-500/50' : 'border-transparent'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${
                    plan.color === 'amber' ? 'text-amber-400' :
                    plan.color === 'gray' ? 'text-gray-400' :
                    plan.color === 'yellow' ? 'text-yellow-400' :
                    'text-purple-400'
                  }`}>{plan.name}</h3>
                  {plan.id === 'gold' && <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs">Popular</span>}
                </div>
                <p className="text-3xl font-bold mb-1">${plan.price}</p>
                <p className="text-sm text-gray-400 mb-4">/{plan.period}</p>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2 bg-white/5 rounded-xl">Edit</button>
              </motion.div>
            ))}
          </div>

          {/* Subscriptions List */}
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr className="text-left text-sm text-gray-400">
                  <th className="p-4">Subscriber</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Billing</th>
                  <th className="p-4">Next Billing</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub, i) => (
                  <motion.tr key={sub.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{sub.customer}</p>
                        <p className="text-sm text-gray-400">{sub.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        sub.plan === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                        sub.plan === 'Silver' ? 'bg-gray-500/20 text-gray-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>{sub.plan}</span>
                    </td>
                    <td className="p-4 font-semibold">${sub.price}</td>
                    <td className="p-4 text-gray-400">{sub.billing}</td>
                    <td className="p-4 text-gray-400">{sub.nextBilling}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[sub.status]}`}>{sub.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-white/10 rounded"><Eye className="w-4 h-4" /></button>
                        <button className="p-1 hover:bg-white/10 rounded"><Pencil className="w-4 h-4" /></button>
                        <button className="p-1 hover:bg-white/10 rounded"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">MRR Growth</h3>
            <div className="h-48 flex items-end gap-2">
              {[65, 78, 82, 95, 102, 115, 125, 140].map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: `${value}%` }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Churn Analysis</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <p className="font-medium text-green-400">Retention Rate: 94%</p>
                <p className="text-sm text-gray-400">Only 6% churn in last 90 days</p>
              </div>
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                <p className="font-medium text-yellow-400">Churn Reasons</p>
                <p className="text-sm text-gray-400">Too expensive: 40%, Not enough features: 30%, Switched to competitor: 20%, Other: 10%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}