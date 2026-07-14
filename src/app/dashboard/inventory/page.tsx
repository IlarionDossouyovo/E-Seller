'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Search,
  Plus,
  Minus,
  Filter,
  Download,
  BarChart3,
  Warehouse,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Tag,
  DollarSign
} from 'lucide-react'

type Product = {
  id: number
  name: string
  sku: string
  category: string
  stock: number
  minStock: number
  price: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  lastUpdated: string
  image: string
}

const mockProducts: Product[] = [
  { id: 1, name: 'Ecouteurs Sans Fil Pro', sku: 'WEP-001', category: 'Electronique', stock: 145, minStock: 20, price: 49.99, status: 'in_stock', lastUpdated: '2024-04-09', image: '🎧' },
  { id: 2, name: 'Montre Connectee Serie X', sku: 'SWX-002', category: 'Electronique', stock: 12, minStock: 15, price: 299.99, status: 'low_stock', lastUpdated: '2024-04-09', image: '⌚' },
  { id: 3, name: 'Tapis de Yoga Premium', sku: 'YMP-003', category: 'Sports', stock: 0, minStock: 10, price: 39.99, status: 'out_of_stock', lastUpdated: '2024-04-08', image: '🧘' },
  { id: 4, name: 'Lampe de Bureau LED', sku: 'LDL-004', category: 'Maison', stock: 89, minStock: 25, price: 59.99, status: 'in_stock', lastUpdated: '2024-04-09', image: '💡' },
  { id: 5, name: 'Enceinte Bluetooth', sku: 'BTS-005', category: 'Electronique', stock: 67, minStock: 30, price: 79.99, status: 'in_stock', lastUpdated: '2024-04-08', image: '🔊' },
  { id: 6, name: 'Shaker Proteine', sku: 'PRS-006', category: 'Sports', stock: 8, minStock: 20, price: 19.99, status: 'low_stock', lastUpdated: '2024-04-09', image: '🥤' },
  { id: 7, name: 'Kit Serum Visage', sku: 'FSS-007', category: 'Beaute', stock: 234, minStock: 50, price: 45.99, status: 'in_stock', lastUpdated: '2024-04-07', image: '🧴' },
  { id: 8, name: 'Chaussures de Course', sku: 'RNS-008', category: 'Sports', stock: 0, minStock: 15, price: 129.99, status: 'out_of_stock', lastUpdated: '2024-04-06', image: '👟' },
]

const categories = ['Tous', 'Electronique', 'Sports', 'Maison', 'Beaute', 'Mode']

const stats = [
  { label: 'Total Produits', value: '156', change: '+12', icon: Package },
  { label: 'Valeur Totale', value: '45 230 EUR', change: '+8.5%', icon: DollarSign },
  { label: 'Stock Faible', value: '8', change: '-3', icon: AlertTriangle },
  { label: 'Rupture de Stock', value: '4', change: '+1', icon: XCircle },
]

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Tous')
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all')
  const [notification, setNotification] = useState<string | null>(null)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'Tous' || product.category === categoryFilter
    const matchesStock = stockFilter === 'all' || 
                         (stockFilter === 'low' && product.status === 'low_stock') ||
                         (stockFilter === 'out' && product.status === 'out_of_stock')
    return matchesSearch && matchesCategory && matchesStock
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-3 h-3" /> En Stock</span>
      case 'low_stock':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Stock Faible</span>
      case 'out_of_stock':
        return <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm flex items-center gap-1"><XCircle className="w-3 h-3" /> Rupture de Stock</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-orange-500/20 via-red-500/10 to-transparent border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Warehouse className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Gestion des Stocks</h1>
              <p className="text-gray-300">Suivez les niveaux de stock, les alertes et la valeur d'inventaire</p>
            </div>
          </div>
          <button onClick={() => { setNotification('Ajout de produit...'); setTimeout(() => { setNotification('Produit ajoute!'); setTimeout(() => setNotification(null), 2000) }, 1000) }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Ajouter Produit
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-electron-blue" />
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher produits ou SKU..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setNotification('Recherche: ' + e.target.value); setTimeout(() => setNotification(null), 1000) }}
            className="bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1"
          />
        </div>
        
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setNotification(e.target.value + ' selectionne'); setTimeout(() => setNotification(null), 1500) }}
          className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select
          value={stockFilter}
          onChange={(e) => { setStockFilter(e.target.value as any); const label = e.target.value === 'all' ? 'Tous' : e.target.value === 'low' ? 'Stock Faible' : 'Rupture'; setNotification(label + ' selectionne'); setTimeout(() => setNotification(null), 1500) }}
          className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium"
        >
          <option value="all">Tous les Stocks</option>
          <option value="low">Stock Faible</option>
          <option value="out">Rupture de Stock</option>
        </select>

        <button onClick={() => { setNotification('Export en cours...'); setTimeout(() => { setNotification('Export termine!'); setTimeout(() => setNotification(null), 2000) }, 1000) }} className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2 border border-white/20 font-medium">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Products Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Produit</th>
                <th className="text-left p-4 text-gray-400 font-medium">SKU</th>
                <th className="text-left p-4 text-gray-400 font-medium">Categorie</th>
                <th className="text-right p-4 text-gray-400 font-medium">Stock</th>
                <th className="text-right p-4 text-gray-400 font-medium">Prix</th>
                <th className="text-left p-4 text-gray-400 font-medium">Statut</th>
                <th className="text-left p-4 text-gray-400 font-medium">Derniere MAJ</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{product.image}</span>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 font-mono text-sm">{product.sku}</td>
                  <td className="p-4 text-gray-400">{product.category}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 rounded hover:bg-white/10"><Minus className="w-4 h-4" /></button>
                      <span className="font-bold w-12 text-center">{product.stock}</span>
                      <button className="p-1 rounded hover:bg-white/10"><Plus className="w-4 h-4" /></button>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono">{product.price.toFixed(2)} EUR</td>
                  <td className="p-4">{getStatusBadge(product.status)}</td>
                  <td className="p-4 text-gray-400 text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {product.lastUpdated}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alert Section */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Alertes Stock Faible
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.filter(p => p.status === 'low_stock' || p.status === 'out_of_stock').map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl border ${product.status === 'out_of_stock' ? 'border-red-500/30 bg-red-500/10' : 'border-yellow-500/30 bg-yellow-500/10'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{product.image}</span>
                {product.status === 'out_of_stock' ? (
                  <XCircle className="w-5 h-5 text-red-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                )}
              </div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-400">{product.stock} / {product.minStock} min</p>
              <button onClick={() => { setNotification('Reapprovisionnement: ' + product.name); setTimeout(() => setNotification(null), 2000) }} className="mt-3 w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
                Reapprovisionner
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}