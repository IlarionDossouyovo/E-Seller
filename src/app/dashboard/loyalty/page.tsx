'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Gift, 
  Star, 
  Users, 
  DollarSign,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

type Member = {
  id: number
  name: string
  avatar: string
  points: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  totalSpent: number
  joinedDate: string
  rewards: number
}

const mockMembers: Member[] = [
  { id: 1, name: 'Sarah Johnson', avatar: '👩', points: 4500, tier: 'platinum', totalSpent: 2450, joinedDate: '2023-06-15', rewards: 12 },
  { id: 2, name: 'Mike Chen', avatar: '👨', points: 2100, tier: 'gold', totalSpent: 1200, joinedDate: '2023-08-20', rewards: 8 },
  { id: 3, name: 'Emma Wilson', avatar: '👩‍🦰', points: 850, tier: 'silver', totalSpent: 650, joinedDate: '2024-01-10', rewards: 3 },
  { id: 4, name: 'James Brown', avatar: '👨‍🦱', points: 320, tier: 'bronze', totalSpent: 280, joinedDate: '2024-03-05', rewards: 1 },
  { id: 5, name: 'Lisa Anderson', avatar: '👩', points: 5800, tier: 'platinum', totalSpent: 3800, joinedDate: '2023-04-20', rewards: 18 },
]

const rewards = [
  { name: '10% Off Next Order', points: 500, uses: 45 },
  { name: 'Free Shipping', points: 750, uses: 32 },
  { name: '$20 Off $100+', points: 1500, uses: 18 },
  { name: 'Free Product', points: 3000, uses: 8 },
  { name: 'Exclusive Item', points: 5000, uses: 3 },
]

const stats = [
  { label: 'Total Members', value: '156', icon: Users },
  { label: 'Active This Month', value: '89', icon: Star },
  { label: 'Points Redeemed', value: '12,450', icon: Gift },
  { label: 'Revenue from Loyalty', value: '$4,230', icon: DollarSign },
]

export default function LoyaltyPage() {
  const [members] = useState<Member[]>(mockMembers)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm flex items-center gap-1"><Star className="w-3 h-3" /> Platinum</span>
      case 'gold':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1"><Star className="w-3 h-3" /> Gold</span>
      case 'silver':
        return <span className="px-3 py-1 rounded-full bg-gray-400/20 text-gray-300 text-sm flex items-center gap-1"><Star className="w-3 h-3" /> Silver</span>
      case 'bronze':
        return <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm flex items-center gap-1"><Star className="w-3 h-3" /> Bronze</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Loyalty Program</h1>
              <p className="text-gray-400">Manage rewards and member points</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Reward
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <stat.icon className="w-5 h-5 text-pink-400 mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Members & Rewards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Members */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Top Members</h3>
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-white placeholder-gray-500"
            />
          </div>
          <div className="space-y-3">
            {filteredMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{member.avatar}</span>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.points.toLocaleString()} points</p>
                  </div>
                </div>
                {getTierBadge(member.tier)}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Available Rewards</h3>
          <div className="space-y-3">
            {rewards.map((reward, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5"
              >
                <div>
                  <p className="font-medium">{reward.name}</p>
                  <p className="text-sm text-gray-400">{reward.points.toLocaleString()} points</p>
                </div>
                <div className="text-right">
                  <p className="text-electron-blue font-bold">{reward.uses}</p>
                  <p className="text-xs text-gray-400">times redeemed</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tier Benefits */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Tier Benefits</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { tier: 'Bronze', color: 'from-orange-500 to-orange-700', benefits: ['1x points', 'Birthday reward', 'Member-only deals'] },
            { tier: 'Silver', color: 'from-gray-400 to-gray-600', benefits: ['1.25x points', 'Free shipping', 'Early access'] },
            { tier: 'Gold', color: 'from-yellow-500 to-yellow-700', benefits: ['1.5x points', 'Priority support', 'Exclusive products'] },
            { tier: 'Platinum', color: 'from-purple-500 to-pink-700', benefits: ['2x points', 'Free returns', 'VIP events'] },
          ].map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl bg-gradient-to-br ${tier.color} opacity-80`}
            >
              <h4 className="font-bold mb-3">{tier.tier}</h4>
              <ul className="space-y-2 text-sm">
                {tier.benefits.map((b, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}