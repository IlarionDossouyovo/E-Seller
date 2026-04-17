'use client'

import { motion } from 'framer-motion'
import { Users, Filter } from 'lucide-react'

export default function CustomerSegmentsPage() {
  const segments = [
    { name: 'VIP Customers', count: 45, revenue: '$12K' },
    { name: 'At Risk', count: 23, revenue: '$2.3K' },
    { name: 'New Buyers', count: 67, revenue: '$4.5K' },
  ]
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Customer Segments</h1><p className="text-gray-400">Audience groups</p></div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {segments.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="font-semibold text-lg mb-2">{s.name}</h3>
            <p className="text-2xl font-bold text-purple-400">{s.count}</p>
            <p className="text-sm text-gray-400">{s.revenue}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}