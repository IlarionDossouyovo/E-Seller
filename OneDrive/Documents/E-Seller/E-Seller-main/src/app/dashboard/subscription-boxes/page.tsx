'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Package, DollarSign, Users, Clock, Plus, Edit, Trash2, Eye, MoreVertical, CheckCircle, AlertTriangle } from 'lucide-react'

const boxes = [
  { id: 'BOX-001', name: 'Tech Starter Box', price: 49.99, products: 5, status: 'active', subscribers: 234, image: '📦' },
  { id: 'BOX-002', name: 'Beauty Essentials', price: 39.99, products: 4, status: 'active', subscribers: 189, image: '💄' },
  { id: 'BOX-003', name: 'Home Premium', price: 79.99, products: 8, status: 'paused', subscribers: 56, image: '🏠' },
  { id: 'BOX-004', name: 'Fitness Pro Box', price: 59.99, products: 6, status: 'active', subscribers: 123, image: '💪' },
]

const products = [
  { id: 'P1', name: 'Wireless Earbuds', value: 79.99, inBox: true },
  { id: 'P2', name: 'Phone Case', value: 24.99, inBox: true },
  { id: 'P3', name: 'USB Cable', value: 12.99, inBox: true },
  { id: 'P4', name: 'Screen Protector', value: 9.99, inBox: false },
  { id: 'P5', name: 'Car Charger', value: 19.99, inBox: false },
]

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400',
  paused: 'bg-yellow-500/20 text-yellow-400',
  draft: 'bg-gray-500/20 text-gray-400',
}

export default function SubscriptionBoxesPage() {
  const [selectedBox, setSelectedBox] = useState(boxes[0])
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    totalBoxes: boxes.length,
    activeBoxes: boxes.filter(b => b.status === 'active').length,
    totalSubscribers: boxes.reduce((sum, b) => sum + b.subscribers, 0),
    avgValue: '$57.49',
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Box className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Subscription Boxes</h1>
            <p className="text-gray-400">Create and manage monthly boxes</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalBoxes}</p>
          <p className="text-sm text-gray-400">Total Boxes</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.activeBoxes}</p>
          <p className="text-sm text-gray-400">Active</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">{stats.totalSubscribers}</p>
          <p className="text-sm text-gray-400">Subscribers</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.avgValue}</p>
          <p className="text-sm text-gray-400">Avg Box Value</p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Box List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">My Boxes</h2>
            <button className="px-3 py-1.5 bg-violet-500 rounded-lg text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" /> New Box
            </button>
          </div>
          {boxes.map((box) => (
            <motion.button
              key={box.id}
              onClick={() => setSelectedBox(box)}
              whileHover={{ scale: 1.02 }}
              className={`w-full p-4 glass-card text-left ${selectedBox.id === box.id ? 'border-violet-500 border-2' : ''}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{box.image}</span>
                <div>
                  <p className="font-semibold">{box.name}</p>
                  <p className="text-sm text-gray-400">{box.products} products</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">${box.price}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[box.status]}`}>{box.status}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Selected Box Details */}
        <div className="md:col-span-2 space-y-4">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedBox.image}</span>
                <div>
                  <h3 className="text-xl font-semibold">{selectedBox.name}</h3>
                  <p className="text-gray-400">{selectedBox.products} products • {selectedBox.subscribers} subscribers</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-white/5 rounded-lg flex items-center gap-1">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button className="px-3 py-2 bg-white/5 rounded-lg flex items-center gap-1">
                  <Eye className="w-4 h-4" /> Preview
                </button>
              </div>
            </div>

            <h4 className="font-semibold mb-3">Products in Box</h4>
            <div className="space-y-2">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-5 h-5 ${product.inBox ? 'text-green-400' : 'text-gray-600'}`} />
                    <span>{product.name}</span>
                  </div>
                  <span className="text-green-400">${product.value}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-white/5 rounded-lg text-center">
                <p className="text-sm text-gray-400">Box Cost</p>
                <p className="font-semibold">$147.95</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg text-center">
                <p className="text-sm text-gray-400">Your Price</p>
                <p className="font-semibold">${selectedBox.price}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg text-center">
                <p className="text-sm text-gray-400">Profit/Box</p>
                <p className="font-semibold text-green-400">${(selectedBox.price - 147.95).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}