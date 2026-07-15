'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Clock, 
  Percent, 
  DollarSign,
  TrendingUp,
  Plus,
  Calendar,
  Tag,
  ShoppingCart,
  Users,
  BarChart3,
  Settings
} from 'lucide-react'

type Promotion = {
  id: number
  name: string
  type: 'flash_sale' | 'discount' | 'bogo' | 'free_shipping'
  discount: string
  code?: string
  status: 'active' | 'scheduled' | 'ended'
  startDate: string
  endDate: string
  uses: number
  limit: number
  revenue: number
}

const mockPromotions: Promotion[] = [
  { id: 1, name: 'Spring Sale 20% Off', type: 'discount', discount: '20%', code: 'SPRING20', status: 'active', startDate: '2024-04-01', endDate: '2024-04-15', uses: 145, limit: 500, revenue: 4500 },
  { id: 2, name: 'Buy 2 Get 1 Free', type: 'bogo', discount: 'B2G1', code: 'B2G1FREE', status: 'active', startDate: '2024-04-05', endDate: '2024-04-20', uses: 89, limit: 200, revenue: 2800 },
  { id: 3, name: 'Free Shipping Weekend', type: 'free_shipping', discount: 'Free Ship', code: 'FREESHIP', status: 'scheduled', startDate: '2024-04-20', endDate: '2024-04-22', uses: 0, limit: 1000, revenue: 0 },
  { id: 4, name: 'Flash Sale 50% Off', type: 'flash_sale', discount: '50%', code: 'FLASH50', status: 'ended', startDate: '2024-03-25', endDate: '2024-03-26', uses: 312, limit: 100, revenue: 8900 },
]

const stats = [
  { label: 'Active Promotions', value: '3', icon: Zap },
  { label: 'Total Revenue', value: '$16,200', icon: DollarSign },
  { label: 'Codes Used', value: '546', icon: Tag },
  { label: 'Conversion Rate', value: '+23%', icon: TrendingUp },
]

export default function PromotionsPage() {
  const [promotions] = useState<Promotion[]>(mockPromotions)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1"><Zap className="w-3 h-3" /> Active</span>
      case 'scheduled':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1"><Clock className="w-3 h-3" /> Scheduled</span>
      case 'ended':
        return <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm">Ended</span>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flash_sale': return <Zap className="w-5 h-5" />
      case 'discount': return <Percent className="w-5 h-5" />
      case 'bogo': return <ShoppingCart className="w-5 h-5" />
      case 'free_shipping': return <ShoppingCart className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Flash Sales & Promotions</h1>
              <p className="text-gray-400">Create and manage promotional campaigns</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Promotion
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
            <stat.icon className="w-5 h-5 text-orange-400 mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Promotion Types */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { type: 'flash_sale', name: 'Flash Sale', icon: Zap, desc: 'Limited time offers' },
          { type: 'discount', name: 'Percentage Off', icon: Percent, desc: 'Percent discounts' },
          { type: 'bogo', name: 'Buy One Get One', icon: ShoppingCart, desc: 'BOGO offers' },
          { type: 'free_shipping', name: 'Free Shipping', icon: ShoppingCart, desc: 'Shipping deals' },
        ].map((item, i) => (
          <motion.div
            key={item.type}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 text-center cursor-pointer hover:border-electron-blue/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center mx-auto mb-3">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Active Promotions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Promotions</h3>
        <div className="space-y-4">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    promo.type === 'flash_sale' ? 'bg-red-500/20' :
                    promo.type === 'discount' ? 'bg-blue-500/20' :
                    promo.type === 'bogo' ? 'bg-green-500/20' : 'bg-purple-500/20'
                  }`}>
                    {getTypeIcon(promo.type)}
                  </div>
                  <div>
                    <p className="font-medium">{promo.name}</p>
                    <p className="text-sm text-gray-400">{promo.discount} {promo.code && `(Code: ${promo.code})`}</p>
                  </div>
                </div>
                {getStatusBadge(promo.status)}
              </div>
              
              <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{promo.startDate} - {promo.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{promo.uses} / {promo.limit} uses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{Math.round(promo.uses / promo.limit * 100)}% conversion</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-green-400">${promo.revenue.toLocaleString()} revenue</span>
                </div>
              </div>

              <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-electron-blue to-electron-purple"
                  style={{ width: `${(promo.uses / promo.limit) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Promotion Form */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Create New Promotion</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Promotion Name</label>
            <input type="text" placeholder="Enter promotion name" className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Discount Type</label>
            <select className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white">
              <option>Percentage Off</option>
              <option>Fixed Amount</option>
              <option>Buy One Get One</option>
              <option>Free Shipping</option>
            </select>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Discount Value</label>
            <input type="number" placeholder="20" className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Promo Code (optional)</label>
            <input type="text" placeholder="PROMO20" className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Start Date</label>
            <input type="date" className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">End Date</label>
            <input type="date" className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white" />
          </div>
        </div>
        <button className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity">
          Create Promotion
        </button>
      </div>
    </div>
  )
}