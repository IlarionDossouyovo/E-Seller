'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Crown, Users, Store, Activity, Shield, DollarSign, TrendingUp,
  AlertTriangle, Search, MoreVertical
} from 'lucide-react'

const tenants = [
  { id: '1', name: 'TechStore Pro', owner: 'john@techstore.com', status: 'active', plan: 'Enterprise', users: 45, revenue: 12500, createdAt: '2024-01-15' },
  { id: '2', name: 'Fashion Hub', owner: 'sarah@fashionhub.com', status: 'active', plan: 'Pro', users: 12, revenue: 2800, createdAt: '2024-02-20' },
  { id: '3', name: 'Pet Supplies Co', owner: 'mike@petsupplies.com', status: 'active', plan: 'Starter', users: 3, revenue: 450, createdAt: '2024-03-10' },
  { id: '4', name: 'Home Decor Plus', owner: 'lisa@homedecor.com', status: 'suspended', plan: 'Pro', users: 8, revenue: 1200, createdAt: '2024-01-25' },
  { id: '5', name: 'Electronics World', owner: 'alex@elecworld.com', status: 'pending', plan: 'Enterprise', users: 0, revenue: 0, createdAt: '2024-04-01' },
]

const recentActivity = [
  { type: 'new_tenant', message: 'New tenant registered: Electronics World', time: '5 min ago' },
  { type: 'payment', message: 'TechStore Pro paid $12,500', time: '1 hour ago' },
  { type: 'alert', message: 'Home Decor Plus exceeded usage limit', time: '2 hours ago' },
  { type: 'login', message: 'Admin login from Paris', time: '3 hours ago' },
]

const systemStats = [
  { label: 'Total Tenants', value: '156', change: '+12%', icon: Store },
  { label: 'Active Users', value: '2,340', change: '+8%', icon: Users },
  { label: 'Monthly Revenue', value: '$45,200', change: '+15%', icon: DollarSign },
  { label: 'System Health', value: '99.9%', change: 'Optimal', icon: Activity },
]

export default function SuperAdminPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Super Admin</h1>
            <p className="text-gray-400">Platform-wide management</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {systemStats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-green-400">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tenants Table */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Tenants</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg" />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400 border-b border-white/10">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Users</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tenants.filter(t => statusFilter === 'all' || t.status === statusFilter).map(tenant => (
                  <tr key={tenant.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3">
                      <div><p className="font-medium">{tenant.name}</p><p className="text-sm text-gray-400">{tenant.owner}</p></div>
                    </td>
                    <td className="py-3"><span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">{tenant.plan}</span></td>
                    <td className="py-3">{tenant.users}</td>
                    <td className="py-3">${tenant.revenue.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${tenant.status === 'active' ? 'bg-green-500/20 text-green-400' : tenant.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {tenant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'alert' ? 'bg-red-500/20 text-red-400' : activity.type === 'payment' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {activity.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> : activity.type === 'payment' ? <DollarSign className="w-4 h-4" /> : activity.type === 'new_tenant' ? <Store className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Add Tenant', icon: Store }, { label: 'View Reports', icon: TrendingUp }, { label: 'System Settings', icon: Shield }, { label: 'View All Logs', icon: Activity }].map((action, i) => (
            <button key={i} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 flex items-center gap-3">
              <action.icon className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}