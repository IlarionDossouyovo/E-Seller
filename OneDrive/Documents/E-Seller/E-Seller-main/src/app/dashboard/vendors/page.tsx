'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Store, Package, DollarSign, Star, TrendingUp, Users, Clock, AlertTriangle, Clock as ClockIcon, CheckCircle, XCircle, Edit, Trash2, Eye, MoreVertical } from 'lucide-react'

const dashboardStats = [
  { label: 'Total Sales', value: '$12,450', change: '+18%', icon: DollarSign },
  { label: 'Orders', value: '234', change: '+12%', icon: Package },
  { label: 'Customers', value: '189', change: '+8%', icon: Users },
  { label: 'Rating', value: '4.8', change: '+0.2', icon: Star },
]

const recentOrders = [
  { id: 'ORD-V001', customer: 'John Smith', product: 'Wireless Earbuds Pro', quantity: 2, price: 159.98, status: 'processing', date: '2024-04-12' },
  { id: 'ORD-V002', customer: 'Marie Dubois', product: 'Smart Watch Series X', quantity: 1, price: 299.99, status: 'shipped', date: '2024-04-12' },
  { id: 'ORD-V003', customer: 'Hans Mueller', product: 'Phone Case Premium', quantity: 5, price: 124.95, status: 'delivered', date: '2024-04-11' },
  { id: 'ORD-V004', customer: 'Sarah Johnson', product: 'Fast Charger 65W', quantity: 3, price: 119.97, status: 'pending', date: '2024-04-11' },
]

const products = [
  { id: 'P1', name: 'Wireless Earbuds Pro', stock: 45, price: 79.99, sales: 234, status: 'active', image: '🎧' },
  { id: 'P2', name: 'Smart Watch Series X', stock: 12, price: 299.99, sales: 89, status: 'active', image: '⌚' },
  { id: 'P3', name: 'Phone Case Premium', stock: 156, price: 24.99, sales: 567, status: 'active', image: '📱' },
  { id: 'P4', name: 'Fast Charger 65W', stock: 0, price: 39.99, sales: 123, status: 'out_of_stock', image: '🔌' },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  processing: 'bg-blue-500/20 text-blue-400',
  shipped: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-green-500/20 text-green-400',
  active: 'bg-green-500/20 text-green-400',
  out_of_stock: 'bg-red-500/20 text-red-400',
}

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl">🏪</div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">TechGear Pro Store</h1>
              <p className="text-gray-400">vendor.e-seller.com/techgear-pro</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                  Level: Gold
                </span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/5 rounded-xl flex items-center gap-2">
            <Edit className="w-4 h-4" /> Edit Store
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardStats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-gray-400" />
              <span className="text-green-400 text-sm">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {['overview', 'orders', 'products', 'analytics', 'payouts'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl whitespace-nowrap ${activeTab === tab ? 'bg-blue-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-semibold">Recent Orders</h3>
              <button className="text-blue-400 text-sm">View All</button>
            </div>
            <table className="w-full">
              <thead className="bg-white/5">
                <tr className="text-left text-sm text-gray-400">
                  <th className="p-3">Order</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-t border-white/5">
                    <td className="p-3 font-mono text-sm">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">${order.price.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Products */}
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-semibold">Top Products</h3>
              <button className="text-blue-400 text-sm">View All</button>
            </div>
            <div className="divide-y divide-white/5">
              {products.slice(0, 4).map((product, i) => (
                <div key={product.id} className="p-4 flex items-center gap-3">
                  <span className="text-2xl">{product.image}</span>
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-400">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${product.price}</p>
                    <p className="text-sm text-gray-400">{product.stock} stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Order ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-t border-white/5">
                  <td className="p-4 font-mono text-sm">{order.id}</td>
                  <td className="p-4">{order.product}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.quantity}</td>
                  <td className="p-4 font-semibold">${order.price.toFixed(2)}</td>
                  <td className="p-4 text-gray-400">{order.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-white/10 rounded"><Eye className="w-4 h-4" /></button>
                      <button className="p-1 hover:bg-white/10 rounded"><Edit className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">My Products</h3>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center gap-2">
              <Package className="w-4 h-4" /> Add Product
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-3xl">{product.image}</div>
                  <button className="p-1 hover:bg-white/10 rounded"><MoreVertical className="w-4 h-4" /></button>
                </div>
                <h4 className="font-semibold mb-1">{product.name}</h4>
                <p className="text-2xl font-bold mb-2">${product.price}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                  <span className="text-gray-400">{product.sales} sales</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-2 bg-white/5 rounded-lg text-sm">Edit</button>
                  <button className="flex-1 px-3 py-2 bg-white/5 rounded-lg text-sm">View</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Payouts Tab */}
      {activeTab === 'payouts' && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Next Payout</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold">$1,245.00</p>
                <p className="text-gray-400">Scheduled for April 15, 2024</p>
              </div>
              <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-xl">
                <ClockIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <p className="text-gray-400">Gross Sales</p>
                <p className="font-semibold">$1,380.00</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <p className="text-gray-400">Commission (10%)</p>
                <p className="font-semibold">-$138.00</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <p className="text-gray-400">Processing Fee</p>
                <p className="font-semibold">-$2.00</p>
              </div>
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-white/5">
              <h3 className="font-semibold">Payout History</h3>
            </div>
            <table className="w-full">
              <thead className="bg-white/5">
                <tr className="text-left text-sm text-gray-400">
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-04-08', amount: '$890.00', method: 'Bank Transfer', status: 'completed' },
                  { date: '2024-04-01', amount: '$1,250.00', method: 'Bank Transfer', status: 'completed' },
                  { date: '2024-03-25', amount: '$780.00', method: 'PayPal', status: 'completed' },
                ].map((payout, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="p-4">{payout.date}</td>
                    <td className="p-4 font-semibold">{payout.amount}</td>
                    <td className="p-4">{payout.method}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">{payout.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}