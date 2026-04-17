'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Plus, Settings, Trash2, Edit, Save, DollarSign, ShoppingBag } from 'lucide-react'

const bundles = [
  { id: 'B1', name: 'Starter Pack', products: ['Earbuds', 'Case', 'Cable'], price: 69.99, originalPrice: 99.99, sales: 234 },
  { id: 'B2', name: 'Pro Bundle', products: ['Watch', 'Earbuds', 'Case'], price: 349.99, originalPrice: 449.99, sales: 89 },
]

export default function BundleBuilderPage() {
  const [activeTab, setActiveTab] = useState('bundles')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Bundle Builder</h1>
              <p className="text-gray-400">Create product packs</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Bundle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{bundles.length}</p>
          <p className="text-sm text-gray-400">Active Bundles</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">$18,245</p>
          <p className="text-sm text-gray-400">Bundle Revenue</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">323</p>
          <p className="text-sm text-gray-400">Bundles Sold</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-amber-400">30%</p>
          <p className="text-sm text-gray-400">Avg Savings</p>
        </motion.div>
      </div>

      <div className="flex gap-2">
        {['bundles', 'create', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-violet-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'bundles' && (
        <div className="grid md:grid-cols-3 gap-4">
          {bundles.map((bundle, i) => (
            <motion.div key={bundle.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <h3 className="font-semibold text-lg mb-2">{bundle.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{bundle.products.join(', ')}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-400">${bundle.price}</span>
                <span className="text-sm text-gray-400 line-through">${bundle.originalPrice}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{bundle.sales} sold</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">Edit</button>
                <button className="py-2 px-3 bg-white/5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}