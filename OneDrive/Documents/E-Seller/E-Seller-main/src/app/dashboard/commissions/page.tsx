'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Percent, TrendingUp, Users, Store, Settings, Download, Filter, Search, Edit, Trash2 } from 'lucide-react'

const commissions = [
  { id: 'C1', tier: 'Bronze', salesMin: 0, salesMax: 999, commission: 8, vendors: 45, revenue: 23400 },
  { id: 'C2', tier: 'Silver', salesMin: 1000, salesMax: 4999, commission: 10, vendors: 28, revenue: 45600 },
  { id: 'C3', tier: 'Gold', salesMin: 5000, salesMax: 19999, commission: 12, vendors: 15, revenue: 67800 },
  { id: 'C4', tier: 'Platinum', salesMin: 20000, salesMax: 999999, commission: 15, vendors: 7, revenue: 89000 },
]

const transactions = [
  { id: 'T1', vendor: 'TechGear Pro', order: 'ORD-V001', amount: 79.99, commission: 7.99, tier: 'Bronze', date: '2024-04-12' },
  { id: 'T2', vendor: 'Fashion Hub', order: 'ORD-V002', amount: 299.99, commission: 29.99, tier: 'Silver', date: '2024-04-12' },
  { id: 'T3', vendor: 'Home Essentials', order: 'ORD-V003', amount: 149.99, commission: 14.99, tier: 'Bronze', date: '2024-04-11' },
  { id: 'T4', vendor: 'Beauty Box', order: 'ORD-V004', amount: 89.99, commission: 8.99, tier: 'Bronze', date: '2024-04-11' },
  { id: 'T5', vendor: 'TechGear Pro', order: 'ORD-V005', amount: 599.99, commission: 59.99, tier: 'Gold', date: '2024-04-10' },
]

export default function CommissionsPage() {
  const [search, setSearch] = useState('')
  const [editingTier, setEditingTier] = useState<string | null>(null)

  const stats = {
    totalRevenue: transactions.reduce((sum, t) => sum + t.commission, 0),
    totalVendors: commissions.reduce((sum, c) => sum + c.vendors, 0),
    avgCommission: '10.7%',
    pendingPayouts: '$4,560.00',
  }

  const handleExport = () => {
    alert('Exporting commission report...')
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Percent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Commission Management</h1>
              <p className="text-gray-400">Manage vendor tiers and commissions</p>
            </div>
          </div>
          <button onClick={handleExport} className="px-4 py-2 bg-white/5 rounded-xl flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
          <p className="text-sm text-gray-400">Total Commission</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.totalVendors}</p>
          <p className="text-sm text-gray-400">Active Vendors</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.avgCommission}</p>
          <p className="text-sm text-gray-400">Avg Commission</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.pendingPayouts}</p>
          <p className="text-sm text-gray-400">Pending Payouts</p>
        </motion.div>
      </div>

      {/* Commission Tiers */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Commission Tiers</h2>
          <button className="px-4 py-2 bg-blue-500 rounded-xl flex items-center gap-2">
            <Settings className="w-4 h-4" /> Configure
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {commissions.map((tier, i) => (
            <motion.div key={tier.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card p-4 border-2 ${editingTier === tier.id ? 'border-blue-500' : 'border-transparent'}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-lg font-bold ${
                  tier.tier === 'Bronze' ? 'text-amber-600' :
                  tier.tier === 'Silver' ? 'text-gray-300' :
                  tier.tier === 'Gold' ? 'text-yellow-400' :
                  'text-purple-400'
                }`}>{tier.tier}</h3>
                <button onClick={() => setEditingTier(editingTier === tier.id ? null : tier.id)} className="p-1 hover:bg-white/10 rounded">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              
              {editingTier === tier.id ? (
                <div className="space-y-2 mb-3">
                  <div>
                    <label className="text-xs text-gray-400">Min Sales</label>
                    <input type="number" defaultValue={tier.salesMin} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Max Sales</label>
                    <input type="number" defaultValue={tier.salesMax} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Commission %</label>
                    <input type="number" defaultValue={tier.commission} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm" />
                  </div>
                </div>
              ) : (
                <div className="mb-3">
                  <p className="text-3xl font-bold">{tier.commission}%</p>
                  <p className="text-sm text-gray-400">${tier.salesMin.toLocaleString()} - ${tier.salesMax.toLocaleString()}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm pt-3 border-t border-white/5">
                <span className="text-gray-400">{tier.vendors} vendors</span>
                <span className="text-green-400">${tier.revenue.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-semibold">Recent Commission Transactions</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm" />
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm">
              <option value="">All Tiers</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="text-left text-sm text-gray-400">
              <th className="p-4">ID</th>
              <th className="p-4">Vendor</th>
              <th className="p-4">Order</th>
              <th className="p-4">Order Amount</th>
              <th className="p-4">Commission</th>
              <th className="p-4">Tier</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5">
                <td className="p-4 font-mono text-sm">{t.id}</td>
                <td className="p-4 font-medium">{t.vendor}</td>
                <td className="p-4 font-mono text-sm">{t.order}</td>
                <td className="p-4">${t.amount.toFixed(2)}</td>
                <td className="p-4 text-green-400 font-semibold">+${t.commission.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    t.tier === 'Bronze' ? 'bg-amber-500/20 text-amber-400' :
                    t.tier === 'Silver' ? 'bg-gray-500/20 text-gray-400' :
                    t.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>{t.tier}</span>
                </td>
                <td className="p-4 text-gray-400">{t.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}