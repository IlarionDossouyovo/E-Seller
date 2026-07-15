'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Ticket, Users, Clock, Plus, Settings, Play, Pause, CheckCircle, XCircle, Copy, ExternalLink, Mail, AlertTriangle, BarChart3 } from 'lucide-react'

const raffles = [
  { id: 'R1', name: 'Limited Edition Drop', product: 'Exclusive Sneaker', spots: 100, entrants: 234, winnerCount: 10, status: 'active', endsIn: '2d 4h' },
  { id: 'R2', name: 'VIP Access', product: 'Premium Subscription', spots: 50, entrants: 89, winnerCount: 50, status: 'ended', endsIn: 'Ended' },
]

export default function RaffleWaitlistPage() {
  const [activeTab, setActiveTab] = useState('raffles')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Raffle & Waitlist</h1>
              <p className="text-gray-400">Limited spots & waiting lists</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Raffle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{raffles.length}</p>
          <p className="text-sm text-gray-400">Active Raffles</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-amber-400">323</p>
          <p className="text-sm text-gray-400">Total Entrants</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">60</p>
          <p className="text-sm text-gray-400">Winners Drawn</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">156</p>
          <p className="text-sm text-gray-400">Waitlist</p>
        </motion.div>
      </div>

      <div className="flex gap-2">
        {['raffles', 'entrants', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-amber-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'raffles' && (
        <div className="grid md:grid-cols-3 gap-4">
          {raffles.map((raffle, i) => (
            <motion.div key={raffle.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs ${raffle.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{raffle.status}</span>
                {raffle.status === 'active' && <Clock className="w-4 h-4 text-amber-400" />}
              </div>
              <h3 className="font-semibold text-lg mb-2">{raffle.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{raffle.product}</p>
              <div className="flex justify-between text-sm mb-4">
                <span><span className="font-bold text-amber-400">{raffle.spots}</span> spots</span>
                <span><span className="font-bold">{raffle.entrants}</span> entrants</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(raffle.entrants / raffle.spots) * 100}%` }} className="h-full bg-gradient-to-r from-amber-500 to-orange-500" />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">View</button>
                <button className="flex-1 py-2 bg-amber-500 rounded-lg text-sm">Draw</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}