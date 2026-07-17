'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/app/i18n'
import { Users, Search, Filter, Plus, UserPlus, Mail, MoreVertical, UserCheck, UserX, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

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
  const { t } = useI18n()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  const showNotification = (message: string, type: 'success' | 'info' = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddCustomer = () => {
    showNotification(t.customers?.addCustomer || 'Ajouter un Client clique!', 'success')
  }

  const handleEmail = (name: string) => {
    showNotification(`${t.customers?.email || 'Email'}: ${name}`, 'info')
  }

  const handleViewOrders = (name: string) => {
    showNotification(`${t.customers?.viewOrders || 'Commandes'}: ${name}`, 'info')
  }

  const handleMore = (name: string) => {
    showNotification(`Options: ${name}`, 'info')
  }

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
      {/* Notification */}
      {notification && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-blue-500/90 text-white'
          }`}
        >
          {notification.message}
        </motion.div>
      )}

      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">{t.customers?.title || 'Customers'}</h1>
            <p className="text-gray-400">{t.customers?.subtitle || 'Manage your customer base'}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">{t.customers?.totalCustomers || 'Total Customers'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.active}</p>
          <p className="text-sm text-gray-400">{t.customers?.active || 'Active'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.vip}</p>
          <p className="text-sm text-gray-400">{t.customers?.vip || 'VIP'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">${stats.revenue.toFixed(0)}</p>
          <p className="text-sm text-gray-400">{t.customers?.totalRevenue || 'Total Revenue'}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder={t.customers?.search || 'Search customers...'} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 bg-gray-800 border border-white/20 rounded-xl text-white">
          <option value="all">{t.customers?.allStatus || 'All Status'}</option>
          <option value="active">{t.customers?.active || 'Active'}</option>
          <option value="vip">VIP</option>
          <option value="inactive">Inactive</option>
          <option value="new">New</option>
        </select>
        <button onClick={handleAddCustomer} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center gap-2 cursor-pointer active:scale-95 transition-transform">
          <UserPlus className="w-4 h-4" /> {t.customers?.addCustomer || 'Add Customer'}
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
              <button onClick={() => handleMore(customer.name)} className="p-1 hover:bg-white/10 rounded cursor-pointer"><MoreVertical className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 bg-white/5 rounded">
                <p className="text-gray-400">{t.customers?.orders || 'Orders'}</p>
                <p className="font-semibold text-white">{customer.orders}</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded">
                <p className="text-gray-400">{t.customers?.spent || 'Spent'}</p>
                <p className="font-semibold text-white">${customer.spent.toFixed(0)}</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded">
                <p className="text-gray-400">{t.customers?.last || 'Last'}</p>
                <p className="font-semibold text-white">{customer.lastOrder.slice(5)}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => handleEmail(customer.name)} className="flex-1 px-3 py-2 bg-white/5 rounded-lg flex items-center justify-center gap-1 text-sm cursor-pointer active:scale-95 transition-transform">
                <Mail className="w-4 h-4" /> {t.customers?.email || 'Email'}
              </button>
              <button onClick={() => handleViewOrders(customer.name)} className="flex-1 px-3 py-2 bg-white/5 rounded-lg flex items-center justify-center gap-1 text-sm cursor-pointer active:scale-95 transition-transform">
                <ShoppingCart className="w-4 h-4" /> {t.customers?.viewOrders || 'Orders'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard/orders" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Commandes
        </Link>
        <Link href="/dashboard/analytics" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          Analytics
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}