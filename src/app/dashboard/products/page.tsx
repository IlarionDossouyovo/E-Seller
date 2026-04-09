'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  TrendingUp, 
  Filter, 
  Download, 
  Star, 
  Eye, 
  ShoppingCart,
  Zap,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Hash,
  ExternalLink,
  Heart,
  Share2
} from 'lucide-react'

const mockProducts = [
  {
    id: 1,
    name: 'Wireless Earbuds Pro Max',
    category: 'Electronics',
    trend: 'up',
    score: 92,
    revenue: '$45,200',
    growth: '+156%',
    saturation: 'Low',
    platforms: ['TikTok', 'Instagram'],
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    price: 49.99,
    margin: 65,
  },
  {
    id: 2,
    name: 'Smart Water Bottle with Temp Display',
    category: 'Home & Garden',
    trend: 'up',
    score: 88,
    revenue: '$32,500',
    growth: '+89%',
    saturation: 'Medium',
    platforms: ['TikTok', 'Facebook'],
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
    price: 29.99,
    margin: 72,
  },
  {
    id: 3,
    name: 'Portable Ring Light Kit',
    category: 'Electronics',
    trend: 'stable',
    score: 76,
    revenue: '$18,900',
    growth: '+34%',
    saturation: 'High',
    platforms: ['Instagram', 'Meta'],
    image: 'https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=400',
    price: 24.99,
    margin: 58,
  },
  {
    id: 4,
    name: 'Ergonomic Laptop Stand',
    category: 'Office',
    trend: 'up',
    score: 84,
    revenue: '$28,400',
    growth: '+67%',
    saturation: 'Low',
    platforms: ['TikTok', 'Google'],
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    price: 39.99,
    margin: 61,
  },
  {
    id: 5,
    name: 'Minimalist Watch Collection',
    category: 'Fashion',
    trend: 'down',
    score: 68,
    revenue: '$12,300',
    growth: '-12%',
    saturation: 'Very High',
    platforms: ['Instagram'],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    price: 89.99,
    margin: 45,
  },
  {
    id: 6,
    name: 'Yoga Mat with Alignment Lines',
    category: 'Sports',
    trend: 'up',
    score: 81,
    revenue: '$21,600',
    growth: '+52%',
    saturation: 'Medium',
    platforms: ['TikTok', 'Instagram'],
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    price: 34.99,
    margin: 68,
  },
]

const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Office', 'Beauty']
const platforms = ['All Platforms', 'TikTok', 'Instagram', 'Facebook', 'Meta', 'Google']

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms')
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Describe your product idea... (e.g., 'portable yoga mat for beginners')"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  AI Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4"
          >
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-electron-blue text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Platform</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map(plat => (
                  <button
                    key={plat}
                    onClick={() => setSelectedPlatform(plat)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedPlatform === plat 
                        ? 'bg-electron-purple text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Products Found', value: '2,456', icon: ShoppingCart },
          { label: 'Avg Score', value: '78/100', icon: Star },
          { label: 'Total Revenue', value: '$485K', icon: TrendingUp },
          { label: 'Active Searches', value: '124', icon: Search },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-electron-blue/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-electron-blue" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold font-[var(--font-sora)]">
          Winning Products ({mockProducts.length})
        </h2>
        <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden group hover:border-electron-blue/30 transition-all"
          >
            {/* Image */}
            <div className="relative h-48 bg-white/5">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-electron-black/80 to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 flex gap-2">
                {product.platforms.map(plat => (
                  <span key={plat} className="px-2 py-1 rounded-full bg-white/10 backdrop-blur text-xs">
                    {plat}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs text-electron-blue">{product.category}</span>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  {product.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : product.trend === 'down' ? (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  ) : null}
                </div>
              </div>

              {/* Score Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">AI Score</span>
                  <span className={`font-bold ${product.score >= 85 ? 'text-green-400' : product.score >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {product.score}/100
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${product.score}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      product.score >= 85 ? 'bg-green-500' : product.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs text-gray-400">Revenue</p>
                  <p className="font-bold">{product.revenue}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Growth</p>
                  <p className={`font-bold ${product.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {product.growth}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="font-bold">${product.price}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Margin</p>
                  <p className="font-bold">{product.margin}%</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-electron-blue/20 text-electron-blue hover:bg-electron-blue/30 transition-colors text-sm font-medium">
                  View Details
                </button>
                <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity text-sm font-medium">
                  Start Selling
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}