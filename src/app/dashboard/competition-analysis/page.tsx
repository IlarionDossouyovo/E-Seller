'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, DollarSign, Star, Package, Globe, Users, AlertTriangle, ArrowUpRight, Eye, Download, RefreshCw, Store, Ruler, Clock } from 'lucide-react'

const competitors = [
  { 
    id: 'C1', 
    name: 'TechGear Official', 
    type: 'brand',
    price: 79.99, 
    rating: 4.8, 
    reviews: 2340, 
    sales: 12500,
    fulfillment: '2 days',
    shipping: 'Free',
    ads: 'High',
    position: 1 
  },
  { 
    id: 'C2', 
    name: 'Premium Tech Store', 
    type: 'seller',
    price: 69.99, 
    rating: 4.5, 
    reviews: 890, 
    sales: 4500,
    fulfillment: '3 days',
    shipping: '€4.99',
    ads: 'Medium',
    position: 2 
  },
  { 
    id: 'C3', 
    name: 'Budget Electronics', 
    type: 'seller',
    price: 49.99, 
    rating: 4.2, 
    reviews: 560, 
    sales: 2300,
    fulfillment: '1 day',
    shipping: 'Free',
    ads: 'Very High',
    position: 3 
  },
  { 
    id: 'C4', 
    name: 'Global Gadgets', 
    type: 'seller',
    price: 59.99, 
    rating: 4.4, 
    reviews: 1230, 
    sales: 6700,
    fulfillment: '5 days',
    shipping: '€2.99',
    ads: 'Low',
    position: 4 
  },
]

export default function CompetitionAnalysisPage() {
  const [search, setSearch] = useState('Wireless Earbuds')
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    avgPrice: (competitors.reduce((sum, c) => sum + c.price, 0) / competitors.length).toFixed(2),
    avgRating: (competitors.reduce((sum, c) => sum + c.rating, 0) / competitors.length).toFixed(1),
    totalReviews: competitors.reduce((sum, c) => sum + c.reviews, 0),
    totalSales: competitors.reduce((sum, c) => sum + c.sales, 0),
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Analyse Concurrentielle</h1>
              <p className="text-gray-400">Analysez vos concurrents</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-800 border border-gray-600 rounded-xl pl-10 pr-4 py-2 w-64 text-white placeholder-gray-400" />
            </div>
            <button onClick={() => alert('Données actualisées!')} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-xl text-white transition-all">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">€{stats.avgPrice}</p>
          <p className="text-sm text-gray-400">Prix Moyen</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.avgRating} ⭐</p>
          <p className="text-sm text-gray-400">Note Moyenne</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.totalReviews.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Avis Totaux</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{(stats.totalSales / 1000).toFixed(1)}K</p>
          <p className="text-sm text-gray-400">Ventes Totales</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'overview', label: 'Aperçu' },
          { key: 'pricing', label: 'Tarification' },
          { key: 'positioning', label: 'Positionnement' },
          { key: 'keywords', label: 'Mots-clés' }
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-xl €{activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'} transition-colors`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">#</th>
                <th className="p-4">Concurrence</th>
                <th className="p-4">Prix</th>
                <th className="p-4">Note</th>
                <th className="p-4">Avis</th>
                <th className="p-4">Ventes</th>
                <th className="p-4">Expédition</th>
                <th className="p-4">Livraison</th>
                <th className="p-4">Pub</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((competitor, i) => (
                <motion.tr key={competitor.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-bold">{competitor.position}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold €{
                        competitor.type === 'brand' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {competitor.type === 'brand' ? '🏢' : '🏪'}
                      </span>
                      <span className="font-medium">{competitor.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold">€{competitor.price}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {competitor.rating}
                    </div>
                  </td>
                  <td className="p-4">{competitor.reviews.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="text-green-400">{competitor.sales.toLocaleString()}</span>
                  </td>
                  <td className="p-4 text-gray-400">{competitor. fulfillment}</td>
                  <td className="p-4 text-gray-400">{competitor.shipping}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs €{
                      competitor.ads === 'Very High' ? 'bg-red-500/20 text-red-400' :
                      competitor.ads === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      competitor.ads === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {competitor.ads}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => alert('Voir les détails de ' + competitor.name)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white transition-colors">Voir</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Distribution des Prix</h3>
            <div className="space-y-3">
              {competitors.map(c => (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="w-24 text-sm truncate">{c.name}</span>
                  <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `€{(c.price / 80) * 100}%` }} />
                  </div>
                  <span className="font-semibold">€{c.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Recommandations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="font-medium text-green-400">Prix optimal: 59,99€ - 69,99€</p>
                <p className="text-sm text-gray-400">Point idéal pour les conversions</p>
              </div>
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <p className="font-medium text-blue-400">Surpasser en livraison</p>
                <p className="text-sm text-gray-400">Proposez la livraison gratuite pour concurrencer</p>
              </div>
              <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <p className="font-medium text-purple-400">Stratégie de bundle</p>
                <p className="text-sm text-gray-400">Créez des offres 2 packs</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'positioning' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Positionnement sur le Marché</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥇</span>
                  <span className="font-semibold">Segment Budget</span>
                </div>
                <p className="text-sm text-gray-400">€40-55 - Volume élevé, marge faible</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥈</span>
                  <span className="font-semibold">Milieu de Marché</span>
                </div>
                <p className="text-sm text-gray-400">€55-75 - Meilleur équilibre</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥉</span>
                  <span className="font-semibold">Premium</span>
                </div>
                <p className="text-sm text-gray-400">€75+ - Volume faible, marge élevée</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Votre Stratégie de Positionnement</h3>
            <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="font-semibold text-blue-400">Recommandé: Milieu de Marché</p>
              <p className="text-sm text-gray-400 mt-2">
                Basé sur votre structure de coûts et marges cibles, le segment milieu de marché (55€-75€) 
                offre le meilleur équilibre entre volume et rentabilité.
              </p>
              <p className="text-sm mt-3">
                <span className="font-semibold">Prix suggéré:</span> <span className="text-blue-400">€64.99</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}