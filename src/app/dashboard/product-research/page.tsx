'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, Flame, Zap, DollarSign, Star, Eye, Filter, Download, RefreshCw, ArrowUpRight, ArrowDownRight, Instagram, Youtube, ShoppingBag, Globe } from 'lucide-react'

const trendingProducts = [
  { id: 'T1', name: 'Wireless Earbuds Pro', platform: 'TikTok', views: '2.4M', growth: '+145%', score: 95, category: 'Electronics', price: 79.99, competition: 'Medium', supplier: 'Shenzhen' },
  { id: 'T2', name: 'Smart Watch Series X', platform: 'Instagram', views: '1.8M', growth: '+89%', score: 88, category: 'Electronics', price: 299.99, competition: 'High', supplier: 'Guangzhou' },
  { id: 'T3', name: 'Phone Case Premium', platform: 'TikTok', views: '890K', growth: '+234%', score: 92, category: 'Accessories', price: 24.99, competition: 'Low', supplier: 'Yiwu' },
  { id: 'T4', name: 'Portable Charger 20000mAh', platform: 'Youtube', views: '560K', growth: '+67%', score: 78, category: 'Electronics', price: 39.99, competition: 'Medium', supplier: 'Shenzhen' },
  { id: 'T5', name: 'LED Ring Light', platform: 'TikTok', views: '1.2M', growth: '+156%', score: 85, category: 'Electronics', price: 29.99, competition: 'High', supplier: 'Ningbo' },
  { id: 'T6', name: 'Yoga Mat Premium', platform: 'Instagram', views: '445K', growth: '+78%', score: 72, category: 'Sports', price: 34.99, competition: 'Low', supplier: 'Fujian' },
]

const platforms = ['All', 'TikTok', 'Instagram', 'Youtube', 'Amazon', 'Shopify']
const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys']

export default function ProductResearchPage() {
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('All')
  const [category, setCategory] = useState('All')
  const [timeRange, setTimeRange] = useState('7d')

  const stats = {
    totalTrending: trendingProducts.length,
    totalViews: trendingProducts.reduce((sum, p) => sum + parseFloat(p.views), 0),
    avgGrowth: '+138%',
    avgScore: 87,
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">AI Product Research</h1>
              <p className="text-gray-400">Find trending products across platforms</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalTrending}</p>
          <p className="text-sm text-gray-400">Trending Products</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">{stats.totalViews}M</p>
          <p className="text-sm text-gray-400">Total Views</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.avgGrowth}</p>
          <p className="text-sm text-gray-400">Avg Growth</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.avgScore}</p>
          <p className="text-sm text-gray-400">Avg Score</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2" />
          </div>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-white/5 rounded-xl flex items-center gap-2">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Trending Products */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="text-left text-sm text-gray-400">
              <th className="p-4">#</th>
              <th className="p-4">Product</th>
              <th className="p-4">Platform</th>
              <th className="p-4">Category</th>
              <th className="p-4">Views</th>
              <th className="p-4">Growth</th>
              <th className="p-4">Est. Price</th>
              <th className="p-4">Competition</th>
              <th className="p-4">Score</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trendingProducts.map((product, i) => (
              <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-4 font-mono text-gray-400">{i + 1}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                    product.platform === 'TikTok' ? 'bg-pink-500/20 text-pink-400' :
                    product.platform === 'Instagram' ? 'bg-purple-500/20 text-purple-400' :
                    product.platform === 'Youtube' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {product.platform === 'TikTok' && <ShoppingBag className="w-3 h-3" />}
                    {product.platform === 'Instagram' && <Globe className="w-3 h-3" />}
                    {product.platform === 'Youtube' && <Youtube className="w-3 h-3" />}
                    {product.platform}
                  </span>
                </td>
                <td className="p-4 text-gray-400">{product.category}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-gray-400" />
                    {product.views}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-green-400 flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    {product.growth}
                  </span>
                </td>
                <td className="p-4 font-semibold">${product.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.competition === 'Low' ? 'bg-green-500/20 text-green-400' :
                    product.competition === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {product.competition}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: `${product.score}%` }} />
                    </div>
                    <span className="font-semibold">{product.score}</span>
                  </div>
                </td>
                <td className="p-4">
                  <button className="px-3 py-1 bg-blue-500 rounded-lg text-sm">Analyze</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popular Platforms */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { name: 'TikTok', icon: ShoppingBag, color: 'pink', count: 234, growth: '+156%' },
          { name: 'Instagram', icon: Globe, color: 'purple', count: 189, growth: '+89%' },
          { name: 'Youtube', icon: Youtube, color: 'red', count: 145, growth: '+67%' },
          { name: 'Amazon', icon: ShoppingBag, color: 'orange', count: 312, growth: '+45%' },
        ].map((platform, i) => (
          <motion.div key={platform.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <platform.icon className={`w-5 h-5 text-${platform.color}-400`} />
              <h3 className="font-semibold">{platform.name}</h3>
            </div>
            <p className="text-2xl font-bold">{platform.count}</p>
            <p className="text-sm text-green-400">{platform.growth} this week</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}