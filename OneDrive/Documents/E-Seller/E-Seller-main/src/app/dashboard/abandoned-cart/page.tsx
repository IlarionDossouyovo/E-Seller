'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Mail, Clock, DollarSign } from 'lucide-react'

export default function AbandonedCartPage() {
  const carts = [{ email: 'john@email.com', items: 2, value: 89.99, time: '2h ago' }]
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Abandoned Cart</h1><p className="text-gray-400">Recover lost sales</p></div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4"><p className="text-2xl font-bold text-orange-400">156</p><p className="text-sm text-gray-400">Abandoned</p></motion.div>
      </div>
    </div>
  )
}