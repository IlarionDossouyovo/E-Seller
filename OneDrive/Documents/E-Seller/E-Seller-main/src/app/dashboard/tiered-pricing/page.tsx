'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, Plus, Settings, DollarSign, Package } from 'lucide-react'

const tiers = [
  { qty: 10, discount: 5, name: '10+ units' },
  { qty: 50, discount: 10, name: '50+ units' },
  { qty: 100, discount: 15, name: '100+ units' },
  { qty: 500, discount: 20, name: '500+ units' },
]

export default function TieredPricingPage() {
  const [activeTab, setActiveTab] = useState('pricing')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Tiered Pricing</h1>
              <p className="text-gray-400">Quantity-based discounts</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Tier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{tiers.length}</p>
          <p className="text-sm text-gray-400">Pricing Tiers</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">$45,230</p>
          <p className="text-sm text-gray-400">Tiered Revenue</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-cyan-400">890</p>
          <p className="text-sm text-gray-400">Bulk Orders</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">12%</p>
          <p className="text-sm text-gray-400">Conversion Lift</p>
        </motion.div>
      </div>

      <div className="flex gap-2">
        {['pricing', 'products', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-teal-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'pricing' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Quantity</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Tier Name</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, i) => (
                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4">{tier.qty}+ units</td>
                  <td className="p-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">{tier.discount}% OFF</span></td>
                  <td className="p-4">{tier.name}</td>
                  <td className="p-4">{Math.floor(Math.random() * 500) + 50}</td>
                  <td className="p-4"><button className="px-3 py-1 bg-white/5 rounded-lg text-sm">Edit</button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}