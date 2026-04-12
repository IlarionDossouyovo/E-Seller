'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin,
  Search,
  Filter,
  MoreVertical,
  Star,
  ShoppingCart,
  DollarSign,
  Calendar,
  Tag,
  TrendingUp,
  MessageSquare,
  CreditCard,
  ChevronRight,
  Plus,
  Download,
  BarChart3
} from 'lucide-react'

type Customer = {
  id: number
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  segment: 'vip' | 'regular' | 'new' | 'at_risk'
  status: 'active' | 'inactive'
  tags: string[]
}

const mockCustomers: Customer[] = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234 567 8901', location: 'New York, USA', avatar: '👩', totalOrders: 12, totalSpent: 2450, lastOrder: '2024-04-08', segment: 'vip', status: 'active', tags: ['Frequent Buyer', 'Electronics'] },
  { id: 2, name: 'Mike Chen', email: 'mike.chen@email.com', phone: '+1 234 567 8902', location: 'Los Angeles, USA', avatar: '👨', totalOrders: 5, totalSpent: 890, lastOrder: '2024-04-07', segment: 'regular', status: 'active', tags: ['Sports'] },
  { id: 3, name: 'Emma Wilson', email: 'emma.w@email.com', phone: '+1 234 567 8903', location: 'London, UK', avatar: '👩‍🦰', totalOrders: 1, totalSpent: 149, lastOrder: '2024-04-09', segment: 'new', status: 'active', tags: ['New Customer'] },
  { id: 4, name: 'James Brown', email: 'james.b@email.com', phone: '+1 234 567 8904', location: 'Paris, France', avatar: '👨‍🦱', totalOrders: 8, totalSpent: 1200, lastOrder: '2024-03-15', segment: 'at_risk', status: 'inactive', tags: ['At Risk'] },
  { id: 5, name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '+1 234 567 8905', location: 'Tokyo, Japan', avatar: '👩', totalOrders: 15, totalSpent: 3800, lastOrder: '2024-04-09', segment: 'vip', status: 'active', tags: ['VIP', 'Electronics'] },
  { id: 6, name: 'David Lee', email: 'david.l@email.com', phone: '+1 234 567 8906', location: 'Sydney, Australia', avatar: '👨', totalOrders: 3, totalSpent: 450, lastOrder: '2024-04-05', segment: 'regular', status: 'active', tags: ['Fashion'] },
]

const segments = [
  { key: 'all', label: 'All Customers', count: 156, color: 'bg-gray-500' },
  { key: 'vip', label: 'VIP', count: 23, color: 'bg-yellow-500' },
  { key: 'regular', label: 'Regular', count: 89, color: 'bg-blue-500' },
  { key: 'new', label: 'New', count: 28, color: 'bg-green-500' },
  { key: 'at_risk', label: 'At Risk', count: 16, color: 'bg-red-500' },
]

const stats = [
  { label: 'Total Customers', value: '156', change: '+12%', icon: Users },
  { label: 'New This Month', value: '28', change: '+18%', icon: UserPlus },
  { label: 'Total Revenue', value: '$45,230', change: '+8.5%', icon: DollarSign },
  { label: 'Avg. Order Value', value: '$189', change: '+5.2%', icon: ShoppingCart },
]

export default function CRMPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = segmentFilter === 'all' || customer.segment === segmentFilter
    return matchesSearch && matchesSegment
  })

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case 'vip':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1"><Star className="w-3 h-3" /> VIP</span>
      case 'regular':
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">Regular</span>
      case 'new':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">New</span>
      case 'at_risk':
        return <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm flex items-center gap-1"><TrendingUp className="w-3 h-3" /> At Risk</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Customer CRM</h1>
              <p className="text-gray-400">Manage customers, segments, and relationships</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Add Customer
            </button>
          </div>
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

      {/* Segments */}
      <div className="glass-card p-4">
        <div className="flex gap-2 overflow-x-auto">
          {segments.map(segment => (
            <button
              key={segment.key}
              onClick={() => setSegmentFilter(segment.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                segmentFilter === segment.key
                  ? 'bg-electron-blue text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${segment.color}`} />
              {segment.label}
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
                {segment.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1"
          />
        </div>
      </div>

      {/* Customer List */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Customer</th>
                <th className="text-left p-4 text-gray-400 font-medium">Location</th>
                <th className="text-right p-4 text-gray-400 font-medium">Orders</th>
                <th className="text-right p-4 text-gray-400 font-medium">Total Spent</th>
                <th className="text-left p-4 text-gray-400 font-medium">Segment</th>
                <th className="text-left p-4 text-gray-400 font-medium">Last Order</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, i) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-white/5 hover:bg-white/5 cursor-pointer"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{customer.avatar}</span>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {customer.location}
                  </td>
                  <td className="p-4 text-right font-medium">{customer.totalOrders}</td>
                  <td className="p-4 text-right font-mono">${customer.totalSpent.toLocaleString()}</td>
                  <td className="p-4">{getSegmentBadge(customer.segment)}</td>
                  <td className="p-4 text-gray-400 text-sm">{customer.lastOrder}</td>
                  <td className="p-4">
                    <button className="p-2 rounded-lg hover:bg-white/10">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedCustomer.avatar}</span>
                <div>
                  <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                  {getSegmentBadge(selectedCustomer.segment)}
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </div>
                  <p className="font-medium">{selectedCustomer.email}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </div>
                  <p className="font-medium">{selectedCustomer.phone}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </div>
                  <p className="font-medium">{selectedCustomer.location}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    Last Order
                  </div>
                  <p className="font-medium">{selectedCustomer.lastOrder}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-electron-blue/20 to-electron-purple/20">
                  <p className="text-gray-400 text-sm mb-1">Total Orders</p>
                  <p className="text-2xl font-bold">{selectedCustomer.totalOrders}</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-600/20">
                  <p className="text-gray-400 text-sm mb-1">Total Spent</p>
                  <p className="text-2xl font-bold">${selectedCustomer.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-medium mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-sm">
                      {tag}
                    </span>
                  ))}
                  <button className="px-3 py-1 rounded-full border border-dashed border-gray-500 text-gray-400 text-sm hover:border-white hover:text-white">
                    <Plus className="w-3 h-3 inline" /> Add Tag
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Send Email
                </button>
                <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                  View Orders
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}