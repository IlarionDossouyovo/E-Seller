'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter, Plus, UserPlus, Mail, MoreVertical, UserCheck, UserX, ShoppingCart } from 'lucide-react'

const customers = [
  { id: 'C1', name: 'John Smith', email: 'john@example.com', orders: 12, spent: 1250.00, status: 'active', lastOrder: '2024-04-10', avatar: '👨' },
  { id: 'C2', name: 'Marie Dubois', email: 'marie@example.fr', orders: 8, spent: 890.50, status: 'active', lastOrder: '2024-04-08', avatar: '👩' },
  { id: 'C3', name: 'Hans Mueller', email: 'hans@example.de', orders: 5, spent: 456.00, status: 'inactive', lastOrder: '2024-03-15', avatar: '👨' },
  { id: 'C4', name: 'Sarah Johnson', email: 'sarah@example.com', orders: 15, spent: 2340.00, status: 'vip', lastOrder: '2024-04-12', avatar: '👩' },
  { id: 'C5', name: 'Mike Chen', email: 'mike@example.cn', orders: 3, spent: 189.99, status: 'new', lastOrder: '2024-04-11', avatar: '👨' },
]

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400',
  inactive: 'bg-gray-500/20 text-gray-400',
  vip: 'bg-yellow-500/20 text-yellow-400',
  new: 'bg-blue-500/20 text-blue-400',
}

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.status === filter
    return matchSearch && matchFilter
  })

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    vip: customers.filter(c => c.status === 'vip').length,
    revenue: customers.reduce((sum, c) => sum + c.spent, 0),
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Customers</h1>
            <p className="text-gray-400">Manage your customer base</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">Total Customers</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.active}</p>
          <p className="text-sm text-gray-400">Active</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.vip}</p>
          <p className="text-sm text-gray-400">VIP</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">${stats.revenue.toFixed(0)}</p>
          <p className="text-sm text-gray-400">Total Revenue</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="vip">VIP</option>
          <option value="inactive">Inactive</option>
          <option value="new">New</option>
        </select>
        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      {/* Customers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((customer, i) => (
          <motion.div key={customer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">{customer.avatar}</div>
                <div>
                  <h3 className="font-semibold text-white">{customer.name}</h3>
                  <p className="text-sm text-gray-400">{customer.email}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-white/10 rounded"><MoreVertical className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 bg-white/5 rounded">
                <p className="text-gray-400">Orders</p>
                <p className="font-semibold text-white">{customer.orders}</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded">
                <p className="text-gray-400">Spent</p>
                <p className="font-semibold text-white">${customer.spent.toFixed(0)}</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded">
                <p className="text-gray-400">Last</p>
                <p className="font-semibold text-white">{customer.lastOrder.slice(5)}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 px-3 py-2 bg-white/5 rounded-lg flex items-center justify-center gap-1 text-sm">
                <Mail className="w-4 h-4" /> Email
              </button>
              <button className="flex-1 px-3 py-2 bg-white/5 rounded-lg flex items-center justify-center gap-1 text-sm">
                <ShoppingCart className="w-4 h-4" /> Orders
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}