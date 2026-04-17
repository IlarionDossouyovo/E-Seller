'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Clock, Timer, Users, ShoppingBag, TrendingUp, AlertTriangle, Play, Pause, Edit, Trash2, Plus, BarChart3, DollarSign, Globe } from 'lucide-react'

const flashSales = [
  { id: 'F1', name: 'Weekend Special', product: 'Wireless Earbuds', originalPrice: 49.99, salePrice: 24.99, sold: 145, total: 200, status: 'active', endsIn: '2h 30m', visitors: 1234 },
  { id: 'F2', name: 'Flash Friday', product: 'Smart Watch', originalPrice: 299.99, salePrice: 149.99, sold: 23, total: 50, status: 'active', endsIn: '4h 15m', visitors: 567 },
  { id: 'F3', name: 'Daily Deal', product: 'Phone Case', originalPrice: 24.99, salePrice: 9.99, sold: 200, total: 200, status: 'ended', endsIn: 'Ended', visitors: 2345 },
]

export default function FlashSalesPage() {
  const [activeTab, setActiveTab] = useState('sales')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Flash Sales</h1>
              <p className="text-gray-400">Time-limited offers</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Sale
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{flashSales.length}</p>
          <p className="text-sm text-gray-400">Active Sales</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-orange-400">168</p>
          <p className="text-sm text-gray-400">Items Sold</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-orange-400">$4,145</p>
          <p className="text-sm text-gray-400">Revenue</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">4,146</p>
          <p className="text-sm text-gray-400">Visitors</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['sales', 'schedule', 'analytics'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-orange-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'sales' && (
        <div className="grid md:grid-cols-3 gap-4">
          {flashSales.map((sale, i) => (
            <motion.div key={sale.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  sale.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}>{sale.status}</span>
                {sale.status === 'active' && (
                  <div className="flex items-center gap-1 text-orange-400">
                    <Timer className="w-4 h-4" />
                    <span className="text-sm font-mono">{sale.endsIn}</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-lg mb-1">{sale.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{sale.product}</p>
              
              <div className="flex items-end gap-2 mb-4">
                <span className="text-2xl font-bold text-green-400">${sale.salePrice}</span>
                <span className="text-sm text-gray-400 line-through">${sale.originalPrice}</span>
                <span className="text-sm text-orange-400">-{Math.round((1 - sale.salePrice / sale.originalPrice) * 100)}%</span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Sold</span>
                  <span>{sale.sold}/{sale.total}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(sale.sold / sale.total) * 100}%` }}
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {sale.visitors} visitors</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">Edit</button>
                {sale.status === 'active' ? (
                  <button className="flex-1 py-2 bg-orange-500 rounded-lg text-sm">End Sale</button>
                ) : (
                  <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">Duplicate</button>
                )}
              </div>
            </motion.div>
          ))}

          <div className="glass-card p-6 border-2 border-dashed border-red-500/30 flex flex-col items-center justify-center text-center">
            <Zap className="w-12 h-12 text-orange-400 mb-3" />
            <h3 className="font-semibold mb-2">Create Flash Sale</h3>
            <p className="text-sm text-gray-400 mb-4">Set up a time-limited offer</p>
            <button className="px-4 py-2 bg-orange-500 rounded-xl">Create Sale</button>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Scheduled Sales</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="font-medium">Monday Flash Sale</p>
                  <p className="text-sm text-gray-400">Every Monday at 12:00 PM</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="font-medium">Weekend Special</p>
                  <p className="text-sm text-gray-400">Saturdays & Sundays</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Sales Performance</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <p className="text-green-400 font-medium">87% Sell-through Rate</p>
                <p className="text-sm text-gray-400">Average for flash sales</p>
              </div>
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <p className="text-blue-400 font-medium">3.2x Traffic Boost</p>
                <p className="text-sm text-gray-400">Average visitor increase</p>
              </div>
              <div className="p-4 bg-orange-500/20 border border-orange-500/30 rounded-xl">
                <p className="text-orange-400 font-medium">$24.50 AOV</p>
                <p className="text-sm text-gray-400">Average order value</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}