'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Package } from 'lucide-react'

export default function InventoryAlertsPage() {
  const products = [
    { name: 'Earbuds Pro', stock: 5, threshold: 20 },
    { name: 'Watch Series X', stock: 12, threshold: 15 },
  ]
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Inventory Alerts</h1><p className="text-gray-400">Low stock notifications</p></div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
            <Package className="w-5 h-5 text-red-400 mb-2" />
            <p className="font-semibold">{p.name}</p>
            <p className="text-red-400 text-sm">Stock: {p.stock}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}