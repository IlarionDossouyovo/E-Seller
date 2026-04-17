'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Plus, Settings, Play, Pause, Clock, ShoppingBag } from 'lucide-react'

const deals = [
  { id: 'D1', name: 'Buy 1 Get 1 Free', type: 'bogo', product: 'Wireless Earbuds', status: 'active', uses: 156, maxUses: 500 },
  { id: 'D2', name: '50% Off Second', type: 'percent', product: 'Phone Cases', status: 'active', uses: 89, maxUses: 200 },
]

export default function BogoDealsPage() {
  const [activeTab, setActiveTab] = useState('deals')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">BOGO Deals</h1>
              <p className="text-gray-400">Buy One Get One offers</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Deal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{deals.length}</p>
          <p className="text-sm text-gray-400">Active Deals</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-pink-400">245</p>
          <p className="text-sm text-gray-400">Uses</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">$12,450</p>
          <p className="text-sm text-gray-400">Revenue</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">67%</p>
          <p className="text-sm text-gray-400">Usage Rate</p>
        </motion.div>
      </div>

      <div className="flex gap-2">
        {['deals', 'create', 'analytics'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-pink-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'deals' && (
        <div className="grid md:grid-cols-3 gap-4">
          {deals.map((deal, i) => (
            <motion.div key={deal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="w-8 h-8 text-pink-400" />
                <span className={`px-2 py-1 rounded-full text-xs ${deal.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{deal.status}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{deal.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{deal.product}</p>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(deal.uses / deal.maxUses) * 100}%` }} className="h-full bg-gradient-to-r from-pink-500 to-rose-500" />
              </div>
              <p className="text-sm text-gray-400">{deal.uses}/{deal.maxUses} uses</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}