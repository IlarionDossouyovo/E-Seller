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

const platforms = ['Tous', 'TikTok', 'Instagram', 'Youtube', 'Amazon', 'Shopify']
const categories = ['Tous', 'Électronique', 'Mode', 'Maison', 'Beauté', 'Sports', 'Jouets']

export default function ProductResearchPage() {
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('Tous')
  const [category, setCategory] = useState('Tous')
  const [timeRange, setTimeRange] = useState('7d')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const stats = {
    totalTrending: trendingProducts.length,
    totalViews: trendingProducts.reduce((sum, p) => sum + parseFloat(p.views), 0),
    avgGrowth: '+138%',
    avgScore: 87,
  }

  const handleExport = () => {
    const csvContent = [
      ['Produit', 'Plateforme', 'Catégorie', 'Vues', 'Croissance', 'Prix', 'Concurrence', 'Score'],
      ...trendingProducts.map(p => [p.name, p.platform, p.category, p.views, p.growth, p.price + ' $', p.competition, p.score])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'produits_tendance.csv';
    link.click();
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
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Recherche de Produits IA</h1>
              <p className="text-gray-400">Trouver des produits tendance sur les plateformes</p>
            </div>
          </div>
          <button onClick={handleRefresh} disabled={isRefreshing} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl flex items-center gap-2 text-white disabled:opacity-50 transition-all">
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} /> {isRefreshing ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalTrending}</p>
          <p className="text-sm text-gray-400">Produits Tendance</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">{stats.totalViews}M</p>
          <p className="text-sm text-gray-400">Vues Totales</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.avgGrowth}</p>
          <p className="text-sm text-gray-400">Croissance Moy.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.avgScore}</p>
          <p className="text-sm text-gray-400">Score Moy.</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Rechercher des produits..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-800 border border-gray-600 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400" />
          </div>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white">
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white">
            <option value="24h">Dernières 24h</option>
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
          </select>
        </div>
        <button onClick={handleExport} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl flex items-center gap-2 text-white font-medium transition-colors">
          <Download className="w-4 h-4" /> Exporter
        </button>
      </div>

      {/* Trending Products */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="text-left text-sm text-gray-400">
              <th className="p-4">#</th>
              <th className="p-4">Produit</th>
              <th className="p-4">Plateforme</th>
              <th className="p-4">Catégorie</th>
              <th className="p-4">Vues</th>
              <th className="p-4">Croissance</th>
              <th className="p-4">Prix Est.</th>
              <th className="p-4">Concurrence</th>
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
                  <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm text-white transition-colors">Analyser</button>
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
            <p className="text-sm text-green-400">{platform.growth} cette semaine</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}