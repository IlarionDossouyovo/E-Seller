'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Store, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  BarChart3,
  MapPin,
  Globe,
  CreditCard,
  Truck,
  Zap
} from 'lucide-react'

// All marketplace integrations
const marketplaces = [
  {
    id: 'shopify',
    name: 'Shopify',
    icon: '🛒',
    color: '#96BF48',
    status: 'connected',
    products: 156,
    revenue: 12450,
    lastSync: 'Il y a 5 min',
    features: ['Products', 'Orders', 'Inventory', 'Customers']
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    icon: '🛍️',
    color: '#96588A',
    status: 'connected',
    products: 89,
    revenue: 8340,
    lastSync: 'Il y a 10 min',
    features: ['Products', 'Orders', 'Inventory']
  },
  {
    id: 'amazon',
    name: 'Amazon',
    icon: '📦',
    color: '#FF9900',
    status: 'connected',
    products: 234,
    revenue: 45670,
    lastSync: 'Il y a 2 min',
    features: ['FBA', 'Prime', 'Advertising']
  },
  {
    id: 'ebay',
    name: 'eBay',
    icon: '🛍️',
    color: '#E53238',
    status: 'connected',
    products: 67,
    revenue: 12340,
    lastSync: 'Il y a 15 min',
    features: ['Auctions', 'Fixed Price', 'International']
  },
  {
    id: 'etsy',
    name: 'Etsy',
    icon: '🎨',
    color: '#F56400',
    status: 'pending',
    products: 0,
    revenue: 0,
    lastSync: 'Jamais',
    features: ['Custom', 'Handmade', 'Vintage']
  },
  {
    id: 'wish',
    name: 'Wish',
    icon: '🌟',
    color: '#52BD95',
    status: 'connected',
    products: 45,
    revenue: 8920,
    lastSync: 'Il y a 30 min',
    features: ['Mobile-First', 'Flash Sales']
  },
  {
    id: 'aliexpress',
    name: 'AliExpress',
    icon: '🔻',
    color: '#FF4747',
    status: 'disconnected',
    products: 0,
    revenue: 0,
    lastSync: 'Jamais',
    features: ['Dropshipping', 'Global']
  },
  {
    id: 'shopee',
    name: 'Shopee',
    icon: '🦐',
    color: '#FF5722',
    status: 'pending',
    products: 0,
    revenue: 0,
    lastSync: 'Jamais',
    features: ['SEA Market', 'Live Streaming']
  },
  {
    id: 'lazada',
    name: 'Lazada',
    icon: '🛍️',
    color: '#FF6900',
    status: 'pending',
    products: 0,
    revenue: 0,
    lastSync: 'Jamais',
    features: ['SEA Market', 'Fulfillment']
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    icon: '🎵',
    color: '#000000',
    status: 'connected',
    products: 28,
    revenue: 5670,
    lastSync: 'Il y a 1 min',
    features: ['Live', 'Videos', 'Influencers']
  }
]

// Local stores
const stores = [
  { id: 1, name: 'Paris - Champs-Élysées', address: '75 Avenue des Champs-Élysées, Paris', phone: '+33 1 23 45 67 89', manager: 'Marie Dupont' },
  { id: 2, name: 'Lyon - Part-Dieu', address: 'Centre Commercial Part-Dieu, Lyon', phone: '+33 4 78 90 12 34', manager: 'Jean Martin' },
  { id: 3, name: 'Marseille - Centre', address: '12 Rue de la République, Marseille', phone: '+33 4 91 23 45 67', manager: 'Sophie Bernard' },
  { id: 4, name: 'Bordeaux - Mériadeck', address: '15 Cours du XXX, Bordeaux', phone: '+33 5 56 78 90 12', manager: 'Pierre Durant' },
  { id: 5, name: 'Lille - Europa', address: 'Centre Commercial Europa, Lille', phone: '+33 3 20 12 34 56', manager: 'Claire Lefebvre' }
]

export default function MarketplacesPage() {
  const [activeTab, setActiveTab] = useState('marketplaces')
  const [syncing, setSyncing] = useState<string | null>(null)

  const syncMarketplace = async (id: string) => {
    setSyncing(id)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSyncing(null)
  }

  const totalRevenue = marketplaces.filter(m => m.status === 'connected').reduce((sum, m) => sum + m.revenue, 0)
  const totalProducts = marketplaces.filter(m => m.status === 'connected').reduce((sum, m) => sum + m.products, 0)
  const connectedCount = marketplaces.filter(m => m.status === 'connected').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-10 h-10 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">🌐 Marketplaces & Boutiques</h1>
          </div>
          <p className="text-slate-400">
            Gérez toutes vos marketplaces et magasins、物理位置 depuis un seul endroit
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
            <p className="text-2xl font-bold text-white">{connectedCount}</p>
            <p className="text-sm text-slate-400">Marketplaces connectées</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
            <p className="text-2xl font-bold text-green-400">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-slate-400">Revenu total</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
            <p className="text-2xl font-bold text-blue-400">{totalProducts}</p>
            <p className="text-sm text-slate-400">Produits synchronisés</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
            <p className="text-2xl font-bold text-purple-400">{stores.length}</p>
            <p className="text-sm text-slate-400">Magasins physiques</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['marketplaces', 'stores', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-blue-500' : 'bg-white/5'}`}
            >
              {tab === 'marketplaces' ? '🌐 Marketplaces' : tab === 'stores' ? '🏪 Magasins' : '📦 Commandes'}
            </button>
          ))}
        </div>

        {/* Marketplaces Tab */}
        {activeTab === 'marketplaces' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketplaces.map((mp, index) => (
              <motion.div
                key={mp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-4"
                style={{ borderColor: mp.status === 'connected' ? mp.color : 'transparent' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{mp.icon}</span>
                    <div>
                      <h3 className="font-semibold text-white">{mp.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        mp.status === 'connected' ? 'bg-green-500/20 text-green-400' :
                        mp.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {mp.status === 'connected' ? 'Connecté' : mp.status === 'pending' ? 'En attente' : 'Déconnecté'}
                      </span>
                    </div>
                  </div>
                  {mp.status === 'connected' && (
                    <button
                      onClick={() => syncMarketplace(mp.id)}
                      disabled={syncing === mp.id}
                      className="p-2 hover:bg-white/10 rounded-lg"
                    >
                      <RefreshCw className={`w-4 h-4 ${syncing === mp.id ? 'animate-spin' : ''}`} />
                    </button>
                  )}
                </div>
                
                {mp.status === 'connected' && (
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <p className="text-slate-400">Produits</p>
                      <p className="font-semibold">{mp.products}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Revenu</p>
                      <p className="font-semibold text-green-400">${mp.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {mp.features.map(f => (
                    <span key={f} className="text-xs bg-white/5 px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
                
                {mp.status !== 'connected' ? (
                  <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm">
                    {mp.status === 'pending' ? 'Compléter la configuration' : 'Connecter'}
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Sync: {mp.lastSync}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Stores Tab */}
        {activeTab === 'stores' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-white">{store.name}</h3>
                </div>
                <p className="text-sm text-slate-400 mb-1">{store.address}</p>
                <p className="text-sm text-slate-400 mb-1">📞 {store.phone}</p>
                <p className="text-sm">👤 Manager: {store.manager}</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm">
                    Gérer
                  </button>
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg">
                    📊
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">Commandes récentes</h3>
            <div className="space-y-3">
              {[
                { id: 'ORD-7823', marketplace: 'Amazon', product: 'Wireless Earbuds Pro', status: 'En cours', amount: 89.99 },
                { id: 'ORD-7822', marketplace: 'Shopify', product: 'Smart Watch X', status: 'Livré', amount: 199.99 },
                { id: 'ORD-7821', marketplace: 'eBay', product: 'Phone Case Premium', status: 'En cours', amount: 24.99 },
                { id: 'ORD-7820', marketplace: 'Amazon', product: 'USB-C Cable', status: 'Livré', amount: 15.99 }
              ].map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-slate-400">{order.marketplace} - {order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.amount}</p>
                    <span className={`text-xs ${order.status === 'Livré' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}