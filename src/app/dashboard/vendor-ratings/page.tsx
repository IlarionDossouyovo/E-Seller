'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, User, Store, TrendingUp, Clock, ThumbsUp, ThumbsDown, Filter, Search, Download, MessageSquare, ChevronDown } from 'lucide-react'

const vendors = [
  { 
    id: 'V1', 
    name: 'TechGear Pro', 
    slug: 'techgear-pro',
    category: 'Électronique',
    rating: 4.8, 
    reviews: 234, 
    stars: { 5: 189, 4: 32, 3: 8, 2: 3, 1: 2 },
    responseRate: 98,
    shipsOnTime: 96,
    customerService: 4.9,
    recentReviews: [
      { rating: 5, comment: 'Excellent produit, livraison rapide !', customer: 'Jean D.', date: '12/04/2024' },
      { rating: 5, comment: 'Excellent vendeur, je le recommande fortement !', customer: 'Marie L.', date: '11/04/2024' },
      { rating: 4, comment: 'Bon produit, légèrement retardé.', customer: 'Hans M.', date: '10/04/2024' },
    ]
  },
  { 
    id: 'V2', 
    name: 'Centre de la Mode', 
    slug: 'centre-de-la-mode',
    category: 'Mode',
    rating: 4.5, 
    reviews: 156, 
    stars: { 5: 98, 4: 35, 3: 15, 2: 5, 1: 3 },
    responseRate: 92,
    shipsOnTime: 88,
    customerService: 4.6,
    recentReviews: [
      { rating: 5, comment: 'J\'adore la qualité !', customer: 'Sarah J.', date: '12/04/2024' },
      { rating: 4, comment: 'Bonne qualité, mais taille petite.', customer: 'Mike C.', date: '11/04/2024' },
    ]
  },
  { 
    id: 'V3', 
    name: 'Articles Essentiels pour la Maison', 
    slug: 'articles-essentiels-maison',
    category: 'Maison et Jardin',
    rating: 4.2, 
    reviews: 89, 
    stars: { 5: 45, 4: 22, 3: 12, 2: 6, 1: 4 },
    responseRate: 85,
    shipsOnTime: 82,
    customerService: 4.3,
    recentReviews: [
      { rating: 4, comment: 'Bon produit pour le prix.', customer: 'Lisa W.', date: '10/04/2024' },
    ]
  },
]

const categories = ['Tous', 'Électronique', 'Mode', 'Maison & Jardin', 'Beauté', 'Sports']

export default function VendorRatingsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Tous')
  const [sortBy, setSortBy] = useState('rating')

  const stats = {
    avgRating: (vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1),
    totalReviews: vendors.reduce((sum, v) => sum + v.reviews, 0),
    topRated: vendors.filter(v => v.rating >= 4.5).length,
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Notes des Fournisseurs</h1>
            <p className="text-gray-400">Surveiller et comparer les performances des fournisseurs</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{vendors.length}</p>
          <p className="text-sm text-gray-400">Nombre total de fournisseurs</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.avgRating}</p>
          <p className="text-sm text-gray-400">Note moyenne</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.totalReviews}</p>
          <p className="text-sm text-gray-400">Avis totaux</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.topRated}</p>
          <p className="text-sm text-gray-400">Les mieux notés</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Rechercher des fournisseurs..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-4 py-2 text-white placeholder-gray-400" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white">
            {categories.map(c => <option key={c} value={c} className="bg-gray-800">{c}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white">
            <option value="rating" className="bg-gray-800">Meilleure note</option>
            <option value="reviews" className="bg-gray-800">Plus d'avis</option>
            <option value="response" className="bg-gray-800">Meilleure réponse</option>
          </select>
        </div>
        <button onClick={() => {
            const csvContent = [
              ['Nom', 'Catégorie', 'Note', 'Avis', 'Taux de réponse', 'Expédition', 'Service client'],
              ...vendors.map(v => [v.name, v.category, v.rating, v.reviews, v.responseRate + '%', v.shipsOnTime + '%', v.customerService])
            ].map(row => row.join(',')).join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'fournisseurs_notes.csv';
            link.click();
          }} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 text-white font-medium transition-colors">
          <Download className="w-4 h-4" /> Exporter
        </button>
      </div>

      {/* Vendors List */}
      <div className="space-y-4">
        {vendors.map((vendor, i) => (
          <motion.div key={vendor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
            <div className="flex items-start gap-6">
              {/* Vendor Info */}
              <div className="w-48 shrink-0">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl mb-3">🏪</div>
                <h3 className="font-semibold text-lg">{vendor.name}</h3>
                <p className="text-sm text-gray-400">{vendor.category}</p>
                <p className="text-sm text-blue-400">{vendor.slug}</p>
              </div>

              {/* Stats Grid */}
              <div className="flex-1 grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-3xl font-bold">{vendor.rating}</span>
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-sm text-gray-400">{vendor.reviews} avis</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">{vendor.responseRate}%</p>
                  <p className="text-sm text-gray-400">Taux de réponse</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">{vendor.shipsOnTime}%</p>
                  <p className="text-sm text-gray-400">Expédition dans les délais</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{vendor.customerService}</p>
                  <p className="text-sm text-gray-400">Service client</p>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Répartition des notes</p>
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm w-4">{star}</span>
                      <Star className="w-3 h-3 text-yellow-400" />
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full" 
                          style={{ width: `${(vendor.stars[star as keyof typeof vendor.stars] / vendor.reviews) * 100}%` }} 
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-8">{vendor.stars[star as keyof typeof vendor.stars]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Avis récents</p>
                <div className="space-y-2">
                  {vendor.recentReviews.map((review, idx) => (
                    <div key={idx} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        {renderStars(review.rating)}
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm">"{review.comment}"</p>
                      <p className="text-xs text-gray-500 mt-1">- {review.customer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}