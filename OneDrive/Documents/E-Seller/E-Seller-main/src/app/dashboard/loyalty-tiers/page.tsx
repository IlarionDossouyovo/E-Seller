'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Users, Star, Gift, Plus, Settings, ChevronRight } from 'lucide-react'

const tiers = [
  { name: 'Bronze', minSpend: 0, color: 'from-amber-700 to-amber-900', members: 245, perks: ['5% discount', 'Free shipping'] },
  { name: 'Silver', minSpend: 500, color: 'from-gray-300 to-gray-500', members: 89, perks: ['10% discount', 'Free shipping', 'Early access'] },
  { name: 'Gold', minSpend: 2000, color: 'from-yellow-400 to-amber-500', members: 34, perks: ['15% discount', 'Free shipping', 'Priority support', 'Exclusive products'] },
  { name: 'Platinum', minSpend: 5000, color: 'from-cyan-400 to-blue-500', members: 12, perks: ['20% discount', 'Free express', 'VIP support', 'Free returns'] },
]

export default function LoyaltyTiersPage() {
  const [activeTab, setActiveTab] = useState('tiers')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Loyalty Tiers</h1>
              <p className="text-gray-400">Membership levels</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Tier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{tiers.length}</p>
          <p className="text-sm text-gray-400">Tier Levels</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">380</p>
          <p className="text-sm text-gray-400">Total Members</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">$89K</p>
          <p className="text-sm text-gray-400">Tier Revenue</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-cyan-400">34%</p>
          <p className="text-sm text-gray-400">Retention Lift</p>
        </motion.div>
      </div>

      <div className="flex gap-2">
        {['tiers', 'members', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-yellow-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'tiers' && (
        <div className="grid md:grid-cols-4 gap-4">
          {tiers.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card p-6 bg-gradient-to-br ${tier.color} border border-white/20`}>
              <Crown className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-xl text-white mb-2">{tier.name}</h3>
              <p className="text-white/70 text-sm mb-4">${tier.minSpend}+ spent</p>
              <div className="flex items-center gap-2 mb-4 text-white/70 text-sm">
                <Users className="w-4 h-4" /> {tier.members} members
              </div>
              <div className="space-y-1 mb-4">
                {tier.perks.map((perk, j) => (
                  <p key={j} className="text-white/80 text-sm flex items-center gap-1"><ChevronRight className="w-3 h-3" />{perk}</p>
                ))}
              </div>
              <button className="w-full py-2 bg-white/20 rounded-lg text-sm text-white">Edit</button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}