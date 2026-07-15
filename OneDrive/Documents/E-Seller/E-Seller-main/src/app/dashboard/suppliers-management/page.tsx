'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Truck, Package, DollarSign, Star, Users, MapPin, Clock, AlertTriangle, CheckCircle, Search, Plus } from 'lucide-react'

const suppliers = [
  { id: 'S1', name: 'Shenzhen Electronics Co', products: 45, orders: 234, rating: 4.8, status: 'active', country: 'China', leadTime: '7-14 days' },
  { id: 'S2', name: 'Guangzhou Textiles', products: 23, orders: 156, rating: 4.5, status: 'active', country: 'China', leadTime: '14-21 days' },
  { id: 'S3', name: 'Vietnam Manufacturing', products: 12, orders: 89, rating: 4.2, status: 'inactive', country: 'Vietnam', leadTime: '21-28 days' },
  { id: 'S4', name: 'Turkey Textiles Co', products: 18, orders: 67, rating: 4.6, status: 'active', country: 'Turkey', leadTime: '10-14 days' },
]

const recentOrders = [
  { id: 'PO-001', supplier: 'Shenzhen Electronics Co', items: 500, total: 15000, status: 'delivered', date: '2024-04-10' },
  { id: 'PO-002', supplier: 'Vietnam Manufacturing', items: 200, total: 4500, status: 'in_transit', date: '2024-04-08' },
  { id: 'PO-003', supplier: 'Turkey Textiles Co', items: 1000, total: 8000, status: 'processing', date: '2024-04-12' },
]

export default function SuppliersManagementPage() {
  const [activeTab, setActiveTab] = useState('suppliers')

  const stats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    totalProducts: suppliers.reduce((sum, s) => sum + s.products, 0),
    avgRating: (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1),
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Suppliers Management</h1>
            <p className="text-gray-400">Manage your suppliers and purchase orders</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {['suppliers', 'orders', 'analytics'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-blue-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">Total Suppliers</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.active}</p>
          <p className="text-sm text-gray-400">Active</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.totalProducts}</p>
          <p className="text-sm text-gray-400">Products</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.avgRating} ⭐</p>
          <p className="text-sm text-gray-400">Avg Rating</p>
        </motion.div>
      </div>

      {activeTab === 'suppliers' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Supplier</th>
                <th className="p-4">Country</th>
                <th className="p-4">Products</th>
                <th className="p-4">Lead Time</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, i) => (
                <motion.tr key={supplier.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5">
                  <td className="p-4 font-medium">{supplier.name}</td>
                  <td className="p-4">{supplier.country}</td>
                  <td className="p-4">{supplier.products}</td>
                  <td className="p-4 text-gray-400">{supplier.leadTime}</td>
                  <td className="p-4">{supplier.rating} ⭐</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${supplier.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {supplier.status}
                    </span>
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
                <th className="p-4">PO Number</th>
                <th className="p-4">Supplier</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5">
                  <td className="p-4 font-mono">{order.id}</td>
                  <td className="p-4">{order.supplier}</td>
                  <td className="p-4">{order.items}</td>
                  <td className="p-4">${order.total.toLocaleString()}</td>
                  <td className="p-4 text-gray-400">{order.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400' : order.status === 'in_transit' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {order.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}