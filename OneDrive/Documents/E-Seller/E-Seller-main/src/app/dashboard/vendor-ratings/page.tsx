'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, User, Store, TrendingUp, Clock, ThumbsUp, ThumbsDown, Filter, Search, Download, MessageSquare, ChevronDown } from 'lucide-react'

const vendors = [
  { 
    id: 'V1', 
    name: 'TechGear Pro', 
    slug: 'techgear-pro',
    category: 'Electronics',
    rating: 4.8, 
    reviews: 234, 
    stars: { 5: 189, 4: 32, 3: 8, 2: 3, 1: 2 },
    responseRate: 98,
    shipsOnTime: 96,
    customerService: 4.9,
    recentReviews: [
      { rating: 5, comment: 'Great product, fast shipping!', customer: 'John D.', date: '2024-04-12' },
      { rating: 5, comment: 'Excellent seller, highly recommended!', customer: 'Marie L.', date: '2024-04-11' },
      { rating: 4, comment: 'Good product, slightly delayed.', customer: 'Hans M.', date: '2024-04-10' },
    ]
  },
  { 
    id: 'V2', 
    name: 'Fashion Hub', 
    slug: 'fashion-hub',
    category: 'Fashion',
    rating: 4.5, 
    reviews: 156, 
    stars: { 5: 98, 4: 35, 3: 15, 2: 5, 1: 3 },
    responseRate: 92,
    shipsOnTime: 88,
    customerService: 4.6,
    recentReviews: [
      { rating: 5, comment: 'Love the quality!', customer: 'Sarah J.', date: '2024-04-12' },
      { rating: 4, comment: 'Good quality, size runs small.', customer: 'Mike C.', date: '2024-04-11' },
    ]
  },
  { 
    id: 'V3', 
    name: 'Home Essentials', 
    slug: 'home-essentials',
    category: 'Home & Garden',
    rating: 4.2, 
    reviews: 89, 
    stars: { 5: 45, 4: 22, 3: 12, 2: 6, 1: 4 },
    responseRate: 85,
    shipsOnTime: 82,
    customerService: 4.3,
    recentReviews: [
      { rating: 4, comment: 'Decent product for the price.', customer: 'Lisa W.', date: '2024-04-10' },
    ]
  },
]

const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports']

export default function VendorRatingsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
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
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Vendor Ratings</h1>
            <p className="text-gray-400">Monitor and compare vendor performance</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{vendors.length}</p>
          <p className="text-sm text-gray-400">Total Vendors</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.avgRating}</p>
          <p className="text-sm text-gray-400">Avg Rating</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.totalReviews}</p>
          <p className="text-sm text-gray-400">Total Reviews</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.topRated}</p>
          <p className="text-sm text-gray-400">Top Rated</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search vendors..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
            <option value="response">Best Response</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-white/5 rounded-lg flex items-center gap-2">
          <Download className="w-4 h-4" /> Export
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
                  <p className="text-sm text-gray-400">{vendor.reviews} reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">{vendor.responseRate}%</p>
                  <p className="text-sm text-gray-400">Response Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">{vendor.shipsOnTime}%</p>
                  <p className="text-sm text-gray-400">Ships On Time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{vendor.customerService}</p>
                  <p className="text-sm text-gray-400">Customer Service</p>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Rating Distribution</p>
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
                <p className="text-sm text-gray-400 mb-2">Recent Reviews</p>
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