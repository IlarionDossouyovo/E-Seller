'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, 
  Search, 
  MapPin, 
  Star, 
  Package, 
  Clock, 
  DollarSign,
  CheckCircle,
  Filter,
  Download,
  MessageSquare,
  ExternalLink,
  ArrowUpRight,
  Shield,
  TrendingUp
} from 'lucide-react'

const mockSuppliers = [
  {
    id: 1,
    name: 'Shenzhen Tech Co., Ltd',
    location: 'Shenzhen, China',
    rating: 4.8,
    reviews: 1250,
    minOrder: 100,
    responseTime: '< 24h',
    certifications: ['ISO 9001', 'CE', 'FCC'],
    categories: ['Electronics', 'Smart Devices'],
    featured: true,
    moq: 100,
    priceRange: '$5-50',
    reliability: 98,
  },
  {
    id: 2,
    name: 'Yiwu Trading Co.',
    location: 'Yiwu, China',
    rating: 4.6,
    reviews: 890,
    minOrder: 50,
    responseTime: '< 12h',
    certifications: ['ISO 9001', 'GMP'],
    categories: ['Home & Garden', 'Fashion'],
    featured: false,
    moq: 50,
    priceRange: '$2-20',
    reliability: 95,
  },
  {
    id: 3,
    name: 'Premium Goods Manufacturing',
    location: 'Guangzhou, China',
    rating: 4.9,
    reviews: 567,
    minOrder: 200,
    responseTime: '< 8h',
    certifications: ['ISO 9001', 'CE', 'RoHS', 'UL'],
    categories: ['Electronics', 'Premium Products'],
    featured: true,
    moq: 200,
    priceRange: '$15-100',
    reliability: 99,
  },
  {
    id: 4,
    name: 'Vietnam Sourcing Ltd',
    location: 'Ho Chi Minh City, Vietnam',
    rating: 4.5,
    reviews: 340,
    minOrder: 100,
    responseTime: '< 24h',
    certifications: ['ISO 9001'],
    categories: ['Textiles', 'Garments'],
    featured: false,
    moq: 100,
    priceRange: '$3-15',
    reliability: 92,
  },
]

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [isSearching, setIsSearching] = useState(false)

  const categories = ['All', 'Electronics', 'Home & Garden', 'Fashion', 'Sports', 'Beauty']
  const locations = ['All', 'China', 'Vietnam', 'Turkey', 'USA', 'India']

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">AI Supplier Engine</h1>
            <p className="text-gray-400">Find and connect with verified suppliers</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product / Category</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., Wireless Earbuds, Electronics..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electron-blue/50 transition-colors"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electron-blue/50 transition-colors"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={isSearching || !searchQuery}
          className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSearching ? (
            <>
              <Search className="w-5 h-5 animate-pulse" />
              Searching suppliers...
            </>
          ) : (
            <>
              <Truck className="w-5 h-5" />
              Find Suppliers
            </>
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Verified Suppliers', value: '2,450', icon: Shield },
          { label: 'Countries', value: '12', icon: MapPin },
          { label: 'Avg Response', value: '< 24h', icon: Clock },
          { label: 'Success Rate', value: '97%', icon: TrendingUp },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-electron-blue/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-electron-blue" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockSuppliers.filter(s => s.featured).map((supplier, i) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border border-electron-blue/30"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <Package className="w-7 h-7 text-electron-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{supplier.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {supplier.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-bold">{supplier.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 rounded-xl bg-white/5">
                <p className="text-xs text-gray-400">Min Order</p>
                <p className="font-bold">{supplier.moq} units</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <p className="text-xs text-gray-400">Price Range</p>
                <p className="font-bold">{supplier.priceRange}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <p className="text-xs text-gray-400">Reliability</p>
                <p className="font-bold text-green-400">{supplier.reliability}%</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {supplier.certifications.map(cert => (
                <span key={cert} className="px-2 py-1 rounded-full bg-white/5 text-xs">
                  {cert}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Contact
              </button>
              <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity text-sm">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* All Suppliers */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold font-[var(--font-sora)]">All Suppliers</h2>
          <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="space-y-4">
          {mockSuppliers.map((supplier, i) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium">{supplier.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {supplier.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {supplier.rating} ({supplier.reviews})
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="text-gray-400">Min Order</p>
                  <p className="font-medium">{supplier.moq}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400">Price</p>
                  <p className="font-medium">{supplier.priceRange}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400">Response</p>
                  <p className="font-medium">{supplier.responseTime}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                  View
                </button>
                <button className="px-4 py-2 rounded-lg bg-electron-blue/20 text-electron-blue hover:bg-electron-blue/30 transition-colors text-sm">
                  Contact
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}