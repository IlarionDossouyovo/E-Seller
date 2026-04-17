'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Truck, Package, Globe, Plus, Search, Filter, Clock, DollarSign, AlertTriangle, CheckCircle, XCircle, RefreshCw, Warehouse, MapPin, Star, Link2, ExternalLink, Settings, Trash2, Eye, Edit } from 'lucide-react'

const suppliers = [
  { id: 'D1', name: 'CJ Dropshipping', location: 'China', products: 120000, syncTime: 'Real-time', rating: 4.8, status: 'connected', priceRange: '$$' },
  { id: 'D2', name: 'Spocket', location: 'US/EU', products: 50000, syncTime: 'Hourly', rating: 4.5, status: 'connected', priceRange: '$$$' },
  { id: 'D3', name: 'Modalyst', location: 'Global', products: 80000, syncTime: 'Daily', rating: 4.3, status: 'pending', priceRange: '$$' },
  { id: 'D4', name: 'Printful', location: 'US/EU', products: 2000, syncTime: 'Real-time', rating: 4.9, status: 'connected', priceRange: '$$$$' },
]

const products = [
  { id: 'P1', name: 'Wireless Earbuds Pro', supplier: 'CJ Dropshipping', cost: 12.50, price: 49.99, stock: 9999, status: 'synced', lastSync: '2 min ago' },
  { id: 'P2', name: 'Smart Watch Series X', supplier: 'Spocket', cost: 89.99, price: 299.99, stock: 45, status: 'low_stock', lastSync: '15 min ago' },
  { id: 'P3', name: 'Phone Case Premium', supplier: 'CJ Dropshipping', cost: 3.50, price: 24.99, stock: 9999, status: 'synced', lastSync: '2 min ago' },
  { id: 'P4', name: 'Custom T-Shirt', supplier: 'Printful', cost: 15.00, price: 34.99, stock: 100, status: 'synced', lastSync: '1 min ago' },
]

const orders = [
  { id: 'DS-001', customer: 'John Smith', product: 'Wireless Earbuds Pro', supplier: 'CJ Dropshipping', status: 'shipped', tracking: 'CN123456789', date: '2024-04-12' },
  { id: 'DS-002', customer: 'Marie Dubois', product: 'Smart Watch Series X', supplier: 'Spocket', status: 'processing', tracking: null, date: '2024-04-12' },
  { id: 'DS-003', customer: 'Hans Mueller', product: 'Phone Case Premium', supplier: 'CJ Dropshipping', status: 'delivered', tracking: 'CN987654321', date: '2024-04-11' },
]

const statusColors: Record<string, string> = {
  synced: 'bg-green-500/20 text-green-400',
  low_stock: 'bg-yellow-500/20 text-yellow-400',
  out_of_stock: 'bg-red-500/20 text-red-400',
  pending: 'bg-gray-500/20 text-gray-400',
}

export default function DropshippingPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [syncAll, setSyncAll] = useState(false)

  const stats = {
    totalProducts: products.length,
    syncedProducts: products.filter(p => p.status === 'synced').length,
    activeOrders: orders.length,
    revenue: '$1,234.56',
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Dropshipping Engine</h1>
              <p className="text-gray-400">Manage suppliers and auto-sync</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center gap-2">
            <Link2 className="w-4 h-4" /> Connect Supplier
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
          <p className="text-sm text-gray-400">Total Products</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.syncedProducts}</p>
          <p className="text-sm text-gray-400">Synced</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.activeOrders}</p>
          <p className="text-sm text-gray-400">Active Orders</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">{stats.revenue}</p>
          <p className="text-sm text-gray-400">Revenue</p>
        </motion.div>
      </div>

      {/* Sync All */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-teal-400" />
          <span>Auto-sync inventory every 30 minutes</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setSyncAll(!syncAll)} className={`px-4 py-2 rounded-xl ${syncAll ? 'bg-teal-500' : 'bg-white/5'}`}>
            <RefreshCw className="w-4 h-4" /> Sync Now
          </button>
          <button className="px-4 py-2 bg-white/5 rounded-xl">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['suppliers', 'products', 'orders', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-teal-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'suppliers' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {suppliers.map((supplier, i) => (
            <motion.div key={supplier.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-xl">🚚</div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  supplier.status === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>{supplier.status}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{supplier.name}</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Globe className="w-4 h-4" /> {supplier.location}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Package className="w-4 h-4" /> {supplier.products.toLocaleString()} products
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <RefreshCw className="w-4 h-4" /> {supplier.syncTime}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{supplier.rating}</span>
                </div>
                <span className="text-gray-400">{supplier.priceRange}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-teal-500 rounded-lg text-sm">Sync</button>
                <button className="flex-1 px-3 py-2 bg-white/5 rounded-lg text-sm">Settings</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Product</th>
                <th className="p-4">Supplier</th>
                <th className="p-4">Cost</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Sync</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-gray-400">{product.supplier}</td>
                  <td className="p-4 text-teal-400">${product.cost.toFixed(2)}</td>
                  <td className="p-4 font-semibold">${product.price}</td>
                  <td className="p-4">{product.stock > 1000 ? '∞' : product.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[product.status]}`}>{product.status}</span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">{product.lastSync}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-white/10 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 hover:bg-white/10 rounded"><RefreshCw className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Supplier</th>
                <th className="p-4">Tracking</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-mono">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.product}</td>
                  <td className="p-4 text-gray-400">{order.supplier}</td>
                  <td className="p-4 font-mono text-sm">{order.tracking || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{order.status}</span>
                  </td>
                  <td className="p-4 text-gray-400">{order.date}</td>
                  <td className="p-4">
                    <button className="px-3 py-1 bg-teal-500 rounded-lg text-sm">Track</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-2xl">
          <h3 className="font-semibold mb-4">Dropshipping Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Auto-sync Inventory</p>
                <p className="text-sm text-gray-400">Sync stock levels automatically</p>
              </div>
              <button className="w-12 h-6 bg-teal-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Auto-fulfill Orders</p>
                <p className="text-sm text-gray-400">Automatically send orders to suppliers</p>
              </div>
              <button className="w-12 h-6 bg-teal-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Price Markup Rules</p>
                <p className="text-sm text-gray-400">Auto-calculate prices from cost</p>
              </div>
              <button className="px-3 py-1 bg-white/10 rounded-lg text-sm">Configure</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}