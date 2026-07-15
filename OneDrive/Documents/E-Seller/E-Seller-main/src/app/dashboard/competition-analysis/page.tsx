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
    shipping: '$4.99',
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
    shipping: '$2.99',
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
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Competition Analysis</h1>
              <p className="text-gray-400">Analyze your competitors</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 w-64" />
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">${stats.avgPrice}</p>
          <p className="text-sm text-gray-400">Avg Price</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.avgRating} ⭐</p>
          <p className="text-sm text-gray-400">Avg Rating</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.totalReviews.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Total Reviews</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{(stats.totalSales / 1000).toFixed(1)}K</p>
          <p className="text-sm text-gray-400">Total Sales</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['overview', 'pricing', 'positioning', 'keywords'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-blue-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">#</th>
                <th className="p-4">Competitor</th>
                <th className="p-4">Price</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Reviews</th>
                <th className="p-4">Sales</th>
                <th className="p-4">Fulfillment</th>
                <th className="p-4">Shipping</th>
                <th className="p-4">Ads</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((competitor, i) => (
                <motion.tr key={competitor.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-bold">{competitor.position}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        competitor.type === 'brand' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {competitor.type === 'brand' ? '🏢' : '🏪'}
                      </span>
                      <span className="font-medium">{competitor.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold">${competitor.price}</td>
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
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      competitor.ads === 'Very High' ? 'bg-red-500/20 text-red-400' :
                      competitor.ads === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      competitor.ads === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {competitor.ads}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1 bg-blue-500 rounded-lg text-sm">View</button>
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
            <h3 className="font-semibold mb-4">Price Distribution</h3>
            <div className="space-y-3">
              {competitors.map(c => (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="w-24 text-sm truncate">{c.name}</span>
                  <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${(c.price / 80) * 100}%` }} />
                  </div>
                  <span className="font-semibold">${c.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="font-medium text-green-400">Optimal Price: $59.99 - $69.99</p>
                <p className="text-sm text-gray-400">Sweet spot for conversions</p>
              </div>
              <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <p className="font-medium text-blue-400">Beat on Shipping</p>
                <p className="text-sm text-gray-400">Offer free shipping to compete</p>
              </div>
              <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <p className="font-medium text-purple-400">Bundle Strategy</p>
                <p className="text-sm text-gray-400">Create 2-pack deals</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'positioning' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Market Position</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥇</span>
                  <span className="font-semibold">Budget Segment</span>
                </div>
                <p className="text-sm text-gray-400">$40-55 - High volume, low margin</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥈</span>
                  <span className="font-semibold">Mid-Market</span>
                </div>
                <p className="text-sm text-gray-400">$55-75 - Best balance</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥉</span>
                  <span className="font-semibold">Premium</span>
                </div>
                <p className="text-sm text-gray-400">$75+ - Lower volume, high margin</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Your Positioning Strategy</h3>
            <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="font-semibold text-blue-400">Recommended: Mid-Market</p>
              <p className="text-sm text-gray-400 mt-2">
                Based on your cost structure and target margins, the mid-market segment ($55-75) 
                offers the best balance of volume and profitability.
              </p>
              <p className="text-sm mt-3">
                <span className="font-semibold">Suggested price:</span> <span className="text-blue-400">$64.99</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}