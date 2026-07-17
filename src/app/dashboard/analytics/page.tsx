'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Eye,
  Mouse,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  RefreshCw,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const mockStats = [
  { 
    label: 'Revenu Total', 
    value: '48 250 EUR', 
    change: '+18.2%',
    trend: 'up',
    icon: DollarSign,
  },
  { 
    label: 'Commandes', 
    value: '1 245', 
    change: '+12.5%',
    trend: 'up',
    icon: ShoppingCart,
  },
  { 
    label: 'Visiteurs Uniques', 
    value: '45.2K', 
    change: '+24.8%',
    trend: 'up',
    icon: Eye,
  },
  { 
    label: 'Taux de Conversion', 
    value: '3.2%', 
    change: '-2.1%',
    trend: 'down',
    icon: Mouse,
  },
]

const mockChartData = [
  { day: 'Lun', revenue: 4200, orders: 120 },
  { day: 'Mar', revenue: 3800, orders: 98 },
  { day: 'Mer', revenue: 5100, orders: 145 },
  { day: 'Jeu', revenue: 4700, orders: 132 },
  { day: 'Ven', revenue: 6200, orders: 178 },
  { day: 'Sam', revenue: 7800, orders: 220 },
  { day: 'Dim', revenue: 5500, orders: 156 },
]

const mockProducts = [
  { name: 'Ecouteurs Sans Fil Pro', revenue: '12 450 EUR', orders: 312, growth: '+24%' },
  { name: 'Montre Connectee Ultra', revenue: '9 820 EUR', orders: 245, growth: '+18%' },
  { name: 'Lampe de Bureau LED', revenue: '6 540 EUR', orders: 189, growth: '+12%' },
  { name: 'Chargeur Portable', revenue: '4 320 EUR', orders: 156, growth: '+8%' },
  { name: 'Haut-parleur Bluetooth', revenue: '3 890 EUR', orders: 134, growth: '+15%' },
]

const mockTraffic = [
  { source: 'TikTok', visits: 18500, conversion: '4.2%' },
  { source: 'Instagram', visits: 12200, conversion: '3.8%' },
  { source: 'Facebook', visits: 8400, conversion: '2.9%' },
  { source: 'Google Ads', visits: 5600, conversion: '4.5%' },
  { source: 'Direct', visits: 3200, conversion: '5.1%' },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setNotification('Actualisation des donnees...')
    setTimeout(() => {
      setIsRefreshing(false)
      setNotification('Donnees actualisees!')
      setTimeout(() => setNotification(null), 2000)
    }, 1500)
  }

  const handleExport = () => {
    setNotification('Export en cours...')
    setTimeout(() => {
      setNotification('Export termine!')
      setTimeout(() => setNotification(null), 2000)
    }, 1000)
  }

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range)
    setNotification('Donnees chargees pour: ' + range)
    setTimeout(() => setNotification(null), 1500)
  }

  const maxRevenue = Math.max(...mockChartData.map(d => d.revenue))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Tableau de Bord Analytique</h1>
          <p className="text-gray-300">Suivez les performances de votre entreprise en temps reel</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Time Range */}
          <div className="flex bg-white/10 rounded-xl p-1 border border-white/20 backdrop-blur-sm">
            {['24h', '7j', '30j', '90j'].map(range => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors font-medium ${
                  timeRange === range
                    ? 'bg-electron-blue text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button 
            onClick={handleRefresh}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
          >
            <RefreshCw className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={handleExport} className="px-4 py-2.5 rounded-xl bg-electron-blue/20 hover:bg-electron-blue/30 text-electron-blue font-medium transition-colors flex items-center gap-2 text-sm border border-electron-blue/30">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-electron-blue/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-electron-blue" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold font-[var(--font-sora)] text-white">Revenus et Commandes</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-electron-blue" />
                <span className="text-gray-400">Revenus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-electron-purple" />
                <span className="text-gray-400">Commandes</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-2">
            {mockChartData.map((data, i) => (
              <motion.div
                key={data.day}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex gap-1 h-48">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    className="flex-1 bg-gradient-to-t from-electron-blue to-electron-blue/50 rounded-t-lg relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 hover:opacity-100 transition-opacity">
                      ${data.revenue}
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.orders / 250) * 100}%` }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                    className="flex-1 bg-gradient-to-t from-electron-purple to-electron-purple/50 rounded-t-lg"
                  />
                </div>
                <span className="text-xs text-gray-500">{data.day}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold font-[var(--font-sora)] text-white mb-6">Sources de Trafic</h2>
          <div className="space-y-4">
            {mockTraffic.map((source, i) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 rounded-xl bg-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{source.source}</span>
                  <span className="text-sm text-gray-400">{source.visits.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(source.visits / 20000) * 100}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-electron-blue to-electron-purple rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{source.conversion} conversion</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold font-[var(--font-sora)] text-white mb-6">Produits les Plus Performants</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm text-gray-400 font-medium">Produit</th>
                <th className="text-right py-3 px-4 text-sm text-gray-400 font-medium">Revenu</th>
                <th className="text-right py-3 px-4 text-sm text-gray-400 font-medium">Commandes</th>
                <th className="text-right py-3 px-4 text-sm text-gray-400 font-medium">Croissance</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product, i) => (
                <motion.tr 
                  key={product.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">{product.name}</td>
                  <td className="py-4 px-4 text-right font-semibold">{product.revenue}</td>
                  <td className="py-4 px-4 text-right text-gray-400">{product.orders}</td>
                  <td className="py-4 px-4 text-right text-green-400">{product.growth}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Panier Moyen', value: '38.75 EUR', change: '+5.2%' },
          { label: 'Retention Client', value: '68%', change: '+12%' },
          { label: 'CAC', value: '12.40 EUR', change: '-8%' },
          { label: 'LTV', value: '156 EUR', change: '+24%' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-xl font-bold">{kpi.value}</p>
              <p className="text-xs text-green-400">{kpi.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard/customers" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Clients
        </Link>
        <Link href="/dashboard/products" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          Produits
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}