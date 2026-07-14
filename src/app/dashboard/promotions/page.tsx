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
  { id: 1, name: 'Solde de Printemps -20%', type: 'discount', discount: '20%', code: 'PRINTEMPS20', status: 'active', startDate: '2024-04-01', endDate: '2024-04-15', uses: 145, limit: 500, revenue: 4500 },
  { id: 2, name: 'Acheter 2 Obtenir 1 Gratuit', type: 'bogo', discount: 'B2G1', code: 'B2G1FREE', status: 'active', startDate: '2024-04-05', endDate: '2024-04-20', uses: 89, limit: 200, revenue: 2800 },
  { id: 3, name: 'Week-end Livraison Offerte', type: 'free_shipping', discount: 'Free Ship', code: 'LIVRAISON', status: 'scheduled', startDate: '2024-04-20', endDate: '2024-04-22', uses: 0, limit: 1000, revenue: 0 },
  { id: 4, name: 'Flash Sale -50%', type: 'flash_sale', discount: '50%', code: 'FLASH50', status: 'ended', startDate: '2024-03-25', endDate: '2024-03-26', uses: 312, limit: 100, revenue: 8900 },
]

const stats = [
  { label: 'Promotions Actives', value: '3', icon: Zap },
  { label: 'Revenu Total', value: '16 200 EUR', icon: DollarSign },
  { label: 'Codes Utilises', value: '546', icon: Tag },
  { label: 'Taux Conversion', value: '+23%', icon: TrendingUp },
]

export default function PromotionsPage() {
  const [promotions] = useState<Promotion[]>(mockPromotions)
  const [notification, setNotification] = useState<string | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1 border border-green-500/30"><Zap className="w-3 h-3" /> Actif</span>
      case 'scheduled':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1 border border-yellow-500/30"><Clock className="w-3 h-3" /> Planifie</span>
      case 'ended':
        return <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm border border-gray-500/30">Termine</span>
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
      <div className="glass-card p-6 bg-gradient-to-r from-red-500/20 via-orange-500/10 to-transparent border border-red-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Flash Sales & Promotions</h1>
              <p className="text-gray-300">Creez et gerez vos campagnes promotionnelles</p>
            </div>
          </div>
          <button onClick={() => { setNotification('Nouvelle promotion...'); setTimeout(() => { setNotification('Formulaire ouvert!'); setTimeout(() => setNotification(null), 2000) }, 1000) }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
           Nouvelle Promotion
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
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Promotion Types */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { type: 'flash_sale', name: 'Flash Sale', icon: Zap, desc: 'Offres a temps limite' },
          { type: 'discount', name: 'Pourcentage', icon: Percent, desc: 'Remises en pourcentage' },
          { type: 'bogo', name: 'Offre speciale', icon: ShoppingCart, desc: 'Achetez 1 Obtenez 1' },
          { type: 'free_shipping', name: 'Livraison', icon: ShoppingCart, desc: 'Offres livraison' },
        ].map((item, i) => (
          <motion.div
            key={item.type}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => { setNotification(item.name); setTimeout(() => setNotification(null), 1500) }}
            className="glass-card p-6 text-center cursor-pointer hover:border-electron-blue/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center mx-auto mb-3">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-medium text-white">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Active Promotions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Promotions</h3>
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
                    <p className="font-medium text-white">{promo.name}</p>
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
                  <span>{promo.uses} / {promo.limit} utilisations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{Math.round(promo.uses / promo.limit * 100)}% conversion</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-green-400">{promo.revenue.toLocaleString()} EUR revenu</span>
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
        <h3 className="text-lg font-semibold mb-4 text-white">Creer une Promotion</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Nom de la Promotion</label>
            <input type="text" placeholder="Entrez le nom" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Type de Reduction</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
              <option>Pourcentage</option>
              <option>Montant Fixe</option>
              <option>Acheter 1 Obtenir 1</option>
              <option>Livraison Gratuite</option>
            </select>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Valeur de la Reduction</label>
            <input type="number" placeholder="20" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Code Promo (optionnel)</label>
            <input type="text" placeholder="PROMO20" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Date de Debut</label>
            <input type="date" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Date de Fin</label>
            <input type="date" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" />
          </div>
        </div>
        <button onClick={() => { setNotification('Promotion creee avec succes!'); setTimeout(() => setNotification(null), 2000) }} className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity font-medium">
          Creer la Promotion
        </button>
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
