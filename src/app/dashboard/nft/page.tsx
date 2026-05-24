'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Award, Star, Users, Wallet, Droplet, Sparkles, Plus, Settings, Trophy, Crown, Gem, Box, Lock, Download, ExternalLink } from 'lucide-react'

const badges = [
  { id: 'B1', name: 'First Purchase', description: 'Make your first order', rarity: 'common', earned: true, icon: '🛒' },
  { id: 'B2', name: 'Big Spender', description: 'Spend over $500', rarity: 'rare', earned: true, icon: '💰' },
  { id: 'B3', name: 'Loyal Customer', description: '10+ orders', rarity: 'epic', earned: true, icon: '👑' },
  { id: 'B4', name: 'VIP Member', description: 'Spend over $2000', rarity: 'legendary', earned: false, icon: '⭐' },
  { id: 'B5', name: 'Referral Champion', description: 'Refer 5 friends', rarity: 'epic', earned: true, icon: '🤝' },
  { id: 'B6', name: 'Early Bird', description: 'First 100 users', rarity: 'legendary', earned: false, icon: '🐦' },
]

const rewards = [
  { id: 'R1', name: '$10 Off', cost: 500, type: 'discount', available: true },
  { id: 'R2', name: 'Free Shipping', cost: 300, type: 'shipping', available: true },
  { id: 'R3', name: '$50 Gift Card', cost: 2000, type: 'giftcard', available: true },
  { id: 'R4', name: 'Exclusive NFT', cost: 5000, type: 'nft', available: false },
]

const members = [
  { id: 'M1', name: 'GoldMember_1', tokens: 2450, tier: 'Gold', badges: 5 },
  { id: 'M2', name: 'Platinum_Pro', tokens: 5200, tier: 'Platinum', badges: 8 },
  { id: 'M3', name: 'Diamond Elite', tokens: 8900, tier: 'Diamond', badges: 12 },
]

export default function NFTLoyaltyPage() {
  const [activeTab, setActiveTab] = useState('badges')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">NFT Loyalty Program</h1>
              <p className="text-gray-400">Token-based rewards</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-purple-500/20 rounded-xl">
              <p className="text-sm text-gray-400">Your Tokens</p>
              <p className="font-bold text-purple-400">1,250</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{badges.filter(b => b.earned).length}/{badges.length}</p>
          <p className="text-sm text-gray-400">Badges Earned</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">1,250</p>
          <p className="text-sm text-gray-400">Token Balance</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-pink-400">$890</p>
          <p className="text-sm text-gray-400">RewardsRedeemed</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-gold-400">5</p>
          <p className="text-sm text-gray-400">Referrals</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['badges', 'rewards', 'leaderboard', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-purple-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'badges' && (
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <motion.div key={badge.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`glass-card p-4 text-center ${!badge.earned ? 'opacity-50' : ''}`}>
              <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl ${
                badge.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                badge.rarity === 'epic' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                badge.rarity === 'rare' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                'bg-gradient-to-br from-gray-500 to-slate-600'
              }`}>{badge.icon}</div>
              <h4 className="font-semibold mb-1">{badge.name}</h4>
              <p className="text-sm text-gray-400 mb-2">{badge.description}</p>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                badge.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                badge.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                badge.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>{badge.rarity}</span>
              {badge.earned && (
                <div className="mt-2 flex items-center justify-center gap-1 text-green-400 text-sm">
                  <Gem className="w-4 h-4" /> Earned
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward, i) => (
            <motion.div key={reward.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card p-6 ${!reward.available ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">🎁</span>
                <span className={`px-2 py-1 rounded-full text-xs ${reward.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {reward.available ? 'Available' : 'Sold Out'}
                </span>
              </div>
              <h4 className="font-semibold text-lg mb-2">{reward.name}</h4>
              <div className="flex items-center gap-2 mb-4">
                <Gem className="w-4 h-4 text-purple-400" />
                <span className="font-bold">{reward.cost} tokens</span>
              </div>
              <button disabled={!reward.available} className={`w-full py-2 rounded-xl ${reward.available ? 'bg-purple-500' : 'bg-white/5 cursor-not-allowed'}`}>
                Redeem
              </button>
            </motion.div>
          ))}

          <div className="glass-card p-6 border-2 border-dashed border-purple-500/30 flex flex-col items-center justify-center">
            <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="font-semibold mb-1">New Reward</h4>
            <p className="text-sm text-gray-400 mb-2">Coming soon</p>
            <button className="px-4 py-1 bg-white/5 rounded-lg text-sm">Notify Me</button>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="glass-card overflow-hidden max-w-2xl">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Rank</th>
                <th className="p-4">Member</th>
                <th className="p-4">Tokens</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Badges</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, i) => (
                <motion.tr key={member.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {i === 0 && <Crown className="w-5 h-5 text-yellow-400" />}
                      {i === 1 && <Trophy className="w-5 h-5 text-gray-300" />}
                      {i === 2 && <Trophy className="w-5 h-5 text-amber-600" />}
                      {i > 2 && <span className="w-5 h-5 flex items-center justify-center">{i + 1}</span>}
                    </div>
                  </td>
                  <td className="p-4 font-medium">{member.name}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1">
                      <Gem className="w-4 h-4 text-purple-400" />
                      {member.tokens.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.tier === 'Diamond' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' :
                      member.tier === 'Platinum' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                      'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                    }`}>{member.tier}</span>
                  </td>
                  <td className="p-4">{member.badges}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-xl">
          <h3 className="font-semibold mb-4">Loyalty Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Droplet className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">Token Reward Rate</p>
                  <p className="text-sm text-gray-400">1 token per $1 spent</p>
                </div>
              </div>
              <button className="px-4 py-1 bg-white/10 rounded-lg text-sm">1:1</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-medium">Bonus Tiers</p>
                  <p className="text-sm text-gray-400">2x on Silver, 3x on Gold</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-purple-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Referral Bonuses</p>
                  <p className="text-sm text-gray-400">100 tokens per referral</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-purple-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}