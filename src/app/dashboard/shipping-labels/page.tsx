'use client'

import { motion } from 'framer-motion'
import { Truck, Plus, Printer } from 'lucide-react'

export default function ShippingLabelsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Shipping Labels</h1><p className="text-gray-400">Generate & print</p></div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4"><p className="text-2xl font-bold text-white">156</p><p className="text-sm text-gray-400">Labels</p></motion.div>
      </div>
    </div>
  )
}