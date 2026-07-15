'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, Globe, Clock, DollarSign, Star, MapPin, Phone, Mail, FileText, Download, MessageSquare, Truck, Shield, CheckCircle, AlertCircle, Filter, RefreshCw, Ruler, Weight, Box, Factory } from 'lucide-react'

const suppliers = [
  { 
    id: 'S1', 
    name: 'Shenzhen Tech Electronics', 
    location: 'Shenzhen, China',
    rating: 4.8,
    orders: 2340,
    moq: 50,
    price: 12.50,
    leadTime: '7-14 days',
    certifications: ['CE', 'FCC', 'RoHS'],
    responseTime: '< 24h',
    featured: true
  },
  { 
    id: 'S2', 
    name: 'Guangzhou Premium Manufacturing', 
    location: 'Guangzhou, China',
    rating: 4.5,
    orders: 1560,
    moq: 100,
    price: 14.00,
    leadTime: '10-15 days',
    certifications: ['CE', 'FCC'],
    responseTime: '< 48h',
    featured: false
  },
  { 
    id: 'S3', 
    name: 'Ningbo Electronics Co', 
    location: 'Ningbo, China',
    rating: 4.3,
    orders: 890,
    moq: 200,
    price: 10.50,
    leadTime: '14-21 days',
    certifications: ['CE'],
    responseTime: '< 72h',
    featured: false
  },
]

const sourcingRequests = [
  { id: 'R1', product: 'Wireless Earbuds', quantity: 500, status: 'quoted', suppliers: 3, date: '2024-04-12' },
  { id: 'R2', product: 'Phone Case', quantity: 1000, status: 'pending', suppliers: 0, date: '2024-04-11' },
  { id: 'R3', product: 'USB Cable', quantity: 2000, status: 'ordered', suppliers: 1, date: '2024-04-10' },
]

export default function SourcingAssistantPage() {
  const [activeTab, setActiveTab] = useState('search')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = {
    totalSuppliers: 156,
    activeOrders: 12,
    avgPrice: '$14.50',
    avgLeadTime: '12 days',
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Sourcing Assistant</h1>
              <p className="text-gray-400">Find and manage suppliers</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Request Quote
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalSuppliers}</p>
          <p className="text-sm text-gray-400">Verified Suppliers</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.activeOrders}</p>
          <p className="text-sm text-gray-400">Active Orders</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-orange-400">{stats.avgPrice}</p>
          <p className="text-sm text-gray-400">Avg Price</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.avgLeadTime}</p>
          <p className="text-sm text-gray-400">Avg Lead Time</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['search', 'suppliers', 'orders', 'messages'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-orange-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'search' && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="glass-card p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search for products or suppliers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3" />
              </div>
              <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
              </select>
              <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                <option>All Locations</option>
                <option>China</option>
                <option>Vietnam</option>
                <option>Turkey</option>
              </select>
              <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-semibold">
                Search
              </button>
            </div>
          </div>

          {/* Quick Search Categories */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {['Electronics', 'Phones', 'Cases', 'Cables', 'Chargers', 'Audio', 'Accessories', 'Packaging'].map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 bg-white/5 rounded-xl text-center hover:bg-white/10"
              >
                <Package className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                <span className="text-xs">{cat}</span>
              </motion.button>
            ))}
          </div>

          {/* Featured Suppliers */}
          <div className="grid md:grid-cols-3 gap-4">
            {suppliers.filter(s => s.featured).map((supplier, i) => (
              <motion.div key={supplier.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-orange-400" />
                  <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs">Featured</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{supplier.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{supplier.location}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{supplier.rating}</span>
                  </div>
                  <span className="text-gray-400">{supplier.orders} orders</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-gray-400">MOQ</p>
                    <p className="font-semibold">{supplier.moq} units</p>
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-gray-400">Price</p>
                    <p className="font-semibold">${supplier.price}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-500 rounded-lg">Contact</button>
                  <button className="flex-1 px-3 py-2 bg-white/5 rounded-lg">View Profile</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'suppliers' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Supplier</th>
                <th className="p-4">Location</th>
                <th className="p-4">Rating</th>
                <th className="p-4">MOQ</th>
                <th className="p-4">Price</th>
                <th className="p-4">Lead Time</th>
                <th className="p-4">Certifications</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, i) => (
                <motion.tr key={supplier.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-orange-400" />
                      <span className="font-medium">{supplier.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{supplier.location}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {supplier.rating}
                    </div>
                  </td>
                  <td className="p-4">{supplier.moq}</td>
                  <td className="p-4 font-semibold">${supplier.price}</td>
                  <td className="p-4 text-gray-400">{supplier.leadTime}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {supplier.certifications.map(cert => (
                        <span key={cert} className="px-2 py-0.5 bg-white/5 rounded text-xs">{cert}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="px-3 py-1 bg-blue-500 rounded-lg text-sm">Contact</button>
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
                <th className="p-4">Request ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Suppliers</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sourcingRequests.map((request, i) => (
                <motion.tr key={request.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-mono">{request.id}</td>
                  <td className="p-4 font-medium">{request.product}</td>
                  <td className="p-4">{request.quantity}</td>
                  <td className="p-4">{request.suppliers}</td>
                  <td className="p-4 text-gray-400">{request.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      request.status === 'ordered' ? 'bg-green-500/20 text-green-400' :
                      request.status === 'quoted' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1 bg-white/5 rounded-lg text-sm">View</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="glass-card p-6">
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No Messages</h3>
            <p className="text-gray-400">Start a conversation with a supplier</p>
          </div>
        </div>
      )}
    </div>
  )
}