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
  { id: 1, name: 'Sophie Martin', avatar: '👩', points: 4500, tier: 'platinum', totalSpent: 2450, joinedDate: '2023-06-15', rewards: 12 },
  { id: 2, name: 'Marc Dubois', avatar: '👨', points: 2100, tier: 'gold', totalSpent: 1200, joinedDate: '2023-08-20', rewards: 8 },
  { id: 3, name: 'Emma Bernard', avatar: '👩‍🦰', points: 850, tier: 'silver', totalSpent: 650, joinedDate: '2024-01-10', rewards: 3 },
  { id: 4, name: 'Jacques Petit', avatar: '👨‍🦱', points: 320, tier: 'bronze', totalSpent: 280, joinedDate: '2024-03-05', rewards: 1 },
  { id: 5, name: 'Claire Moreau', avatar: '👩', points: 5800, tier: 'platinum', totalSpent: 3800, joinedDate: '2023-04-20', rewards: 18 },
]

const rewards = [
  { name: '10% sur prochaine commande', points: 500, uses: 45 },
  { name: 'Livraison gratuite', points: 750, uses: 32 },
  { name: '20 EUR pour 100 EUR+', points: 1500, uses: 18 },
  { name: 'Produit gratuit', points: 3000, uses: 8 },
  { name: 'Article exclusif', points: 5000, uses: 3 },
]

const stats = [
  { label: 'Total Membres', value: '156', icon: Users },
  { label: 'Actifs ce Mois', value: '89', icon: Star },
  { label: 'Points Utilises', value: '12 450', icon: Gift },
  { label: 'Revenu Fidelite', value: '4 230 EUR', icon: DollarSign },
]

export default function LoyaltyPage() {
  const [members] = useState<Member[]>(mockMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState<string | null>(null)

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm flex items-center gap-1"><Star className="w-3 h-3" /> Platine</span>
      case 'gold':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1"><Star className="w-3 h-3" /> Or</span>
      case 'silver':
        return <span className="px-3 py-1 rounded-full bg-gray-400/20 text-gray-300 text-sm flex items-center gap-1"><Star className="w-3 h-3" /> Argent</span>
      case 'bronze':
        return <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm flex items-center gap-1"><Star className="w-3 h-3" /> Bronze</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-pink-500/20 via-rose-500/10 to-transparent border border-pink-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Programme de Fidelite</h1>
              <p className="text-gray-300">Gerez les recompenses et points membres</p>
            </div>
          </div>
          <button onClick={() => { setNotification('Ajout recompense...'); setTimeout(() => { setNotification('Formulaire ouvert!'); setTimeout(() => setNotification(null), 2000) }, 1000) }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Ajouter Recompense
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
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Members & Rewards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Members */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Meilleurs Membres</h3>
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher membres..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setNotification('Recherche: ' + e.target.value); setTimeout(() => setNotification(null), 1000) }}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 flex-1 outline-none focus:border-electron-blue"
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
                    <p className="font-medium text-white">{member.name}</p>
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
          <h3 className="text-lg font-semibold mb-4 text-white">Recompenses Disponibles</h3>
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
                  <p className="font-medium text-white">{reward.name}</p>
                  <p className="text-sm text-gray-400">{reward.points.toLocaleString()} points</p>
                </div>
                <div className="text-right">
                  <p className="text-electron-blue font-bold">{reward.uses}</p>
                  <p className="text-xs text-gray-400">utilisations</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tier Benefits */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Avantages des Niveaux</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { tier: 'Bronze', color: 'from-orange-500 to-orange-700', benefits: ['1x points', 'Cadeau anniversaire', 'Offres membres'] },
            { tier: 'Argent', color: 'from-gray-400 to-gray-600', benefits: ['1.25x points', 'Livraison gratuite', 'Acces prioritaire'] },
            { tier: 'Or', color: 'from-yellow-500 to-yellow-700', benefits: ['1.5x points', 'Support prioritaire', 'Produits exclusifs'] },
            { tier: 'Platine', color: 'from-purple-500 to-pink-700', benefits: ['2x points', 'Retours gratuits', 'Evenements VIP'] },
          ].map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl bg-gradient-to-br ${tier.color} opacity-80`}
            >
              <h4 className="font-bold mb-3 text-white">{tier.tier}</h4>
              <ul className="space-y-2 text-sm">
                {tier.benefits.map((b, j) => (
                  <li key={j} className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-4 h-4" /> {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}
