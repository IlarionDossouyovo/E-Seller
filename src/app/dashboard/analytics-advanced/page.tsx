'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, 
  Eye, Globe, Clock, ArrowUp, ArrowDown, RefreshCw, Download,
  BarChart3, PieChart, LineChart, Activity, ArrowLeft, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const realTimeMetrics = [
  { label: 'Utilisateurs Actifs', value: '247', change: '+12%', up: true, icon: Users },
  { label: 'Revenu Aujourd\'hui', value: '3 847 EUR', change: '+8.3%', up: true, icon: DollarSign },
  { label: 'Commandes', value: '89', change: '+23%', up: true, icon: ShoppingCart },
  { label: 'Pages Vues', value: '12.4K', change: '-2.1%', up: false, icon: Eye },
]

const hourlyData = [
  { hour: '00:00', revenue: 120, orders: 5 },
  { hour: '04:00', revenue: 85, orders: 3 },
  { hour: '08:00', revenue: 340, orders: 15 },
  { hour: '12:00', revenue: 890, orders: 42 },
  { hour: '16:00', revenue: 1250, orders: 58 },
  { hour: '20:00', revenue: 780, orders: 35 },
  { hour: '23:59', revenue: 382, orders: 18 },
]

const topProducts = [
  { name: 'Ecouteurs Sans Fil Pro', sales: 234, revenue: 18660, growth: '+15%' },
  { name: 'Montre Connectee Serie X', sales: 89, revenue: 26699, growth: '+22%' },
  { name: 'Creme Visage Bio', sales: 156, revenue: 5457, growth: '+8%' },
  { name: 'Chargeur Portable 20K', sales: 198, revenue: 9898, growth: '-3%' },
]

const trafficSources = [
  { source: 'Referencement Naturel', visits: 4521, percent: 35 },
  { source: 'Direct', visits: 3210, percent: 25 },
  { source: 'Reseaux Sociaux', visits: 2580, percent: 20 },
  { source: 'Referral', visits: 1542, percent: 12 },
  { source: 'Email', visits: 1038, percent: 8 },
]

const geoData = [
  { country: 'Etats-Unis', visits: 4521, revenue: 12500 },
  { country: 'France', visits: 2100, revenue: 8200 },
  { country: 'Allemagne', visits: 1890, revenue: 7100 },
  { country: 'Royaume-Uni', visits: 1650, revenue: 6300 },
  { country: 'Canada', visits: 980, revenue: 4100 },
]

export default function AnalyticsAdvancedPage() {
  const [timeRange, setTimeRange] = useState('today')
  const [refreshing, setRefreshing] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const handleRefresh = () => {
    setRefreshing(true)
    setNotification('Actualisation des donnees...')
    setTimeout(() => {
      setRefreshing(false)
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
    const labels: any = { 'today': 'Aujourd\'hui', '7d': '7 jours', '30d': '30 jours', '90d': '90 jours', '1y': '1 an' }
    setNotification('Donnees chargees pour: ' + labels[range])
    setTimeout(() => setNotification(null), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-electron-blue/20 via-purple-500/10 to-transparent border border-electron-blue/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electron-blue via-electron-purple to-blue-600 flex items-center justify-center shadow-lg shadow-electron-blue/30">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Analytique Avancee</h1>
              <p className="text-gray-300">Intelligence commerciale en temps reel</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleRefresh} className={`p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 ${refreshing ? 'animate-spin' : ''}`}>
              <RefreshCw className="w-5 h-5 text-white" />
            </button>
            <button onClick={handleExport} className="px-4 py-2.5 bg-electron-blue/20 rounded-xl flex items-center gap-2 text-electron-blue font-medium border border-electron-blue/30 hover:bg-electron-blue/30 transition-colors">
              <Download className="w-4 h-4" /> Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="glass-card p-2 flex gap-2 flex-wrap">
        {['today', '7d', '30d', '90d', '1y'].map(range => (
          <button key={range} onClick={() => handleTimeRangeChange(range)} className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${timeRange === range ? 'bg-electron-blue text-white' : 'text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'}`}>
            {range === 'today' ? 'Aujourd\'hui' : range === '7d' ? '7 jours' : range === '30d' ? '30 jours' : range === '90d' ? '90 jours' : '1 an'}
          </button>
        ))}
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {realTimeMetrics.map((metric, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className="w-5 h-5 text-electron-blue" />
              <span className={`text-sm flex items-center gap-1 ${metric.up ? 'text-green-400' : 'text-red-400'}`}>
                {metric.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {metric.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-sm text-gray-400">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Hourly Revenue Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2 text-white"><LineChart className="w-5 h-5" /> Revenu Horaire</h3>
          </div>
          <div className="flex items-end gap-2 h-40">
            {hourlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gradient-to-t from-electron-blue to-purple-500 rounded-t" style={{ height: `${(d.revenue / 1250) * 100}%` }} />
                <span className="text-xs text-gray-500 mt-2">{d.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-white"><PieChart className="w-5 h-5" /> Sources de Trafic</h3>
          <div className="space-y-4">
            {trafficSources.map((source, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{source.source}</span>
                  <span className="text-gray-400">{source.visits.toLocaleString()} ({source.percent}%)</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-electron-blue to-purple-500 rounded-full" style={{ width: `${source.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products & Geo */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-white"><BarChart3 className="w-5 h-5" /> Produits les Plus Vendus</h3>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold">{i + 1}</span>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-400">{product.sales} ventes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{product.revenue.toLocaleString()} EUR</p>
                  <span className={`text-xs ${product.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{product.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-white"><Globe className="w-5 h-5" /> Principaux Pays</h3>
          <div className="space-y-4">
            {geoData.map((geo, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌍</span>
                  <span className="font-medium">{geo.country}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">{geo.revenue.toLocaleString()} EUR</p>
                  <span className="text-xs text-gray-400">{geo.visits.toLocaleString()} visites</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour Dashboard
        </Link>
        <Link href="/dashboard/analytics" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          Analytics
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}