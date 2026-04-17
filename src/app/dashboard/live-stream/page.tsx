'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Users, MessageSquare, DollarSign } from 'lucide-react'

export default function LiveStreamPage() {
  const [activeTab, setActiveTab] = useState('streams')
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Live Stream</h1><p className="text-gray-400">Shoppable live video</p></div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4"><p className="text-2xl font-bold text-purple-400">3</p><p className="text-sm text-gray-400">Live Now</p></motion.div>
      </div>
    </div>
  )
}