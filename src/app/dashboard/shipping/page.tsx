'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  DollarSign,
  Globe,
  Search,
  Plus,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

type Carrier = {
  id: number
  name: string
  logo: string
  rating: number
  price: number
  deliveryDays: string
  countries: string[]
  active: boolean
}

const mockCarriers: Carrier[] = [
  { id: 1, name: 'FedEx', logo: '📦', rating: 4.8, price: 12.99, deliveryDays: '2-3 days', countries: ['US', 'CA', 'MX'], active: true },
  { id: 2, name: 'DHL', logo: '🚚', rating: 4.6, price: 15.99, deliveryDays: '3-5 days', countries: ['Global'], active: true },
  { id: 3, name: 'UPS', logo: '📬', rating: 4.7, price: 11.99, deliveryDays: '2-4 days', countries: ['US', 'EU'], active: true },
  { id: 4, name: 'USPS', logo: '📮', rating: 4.3, price: 5.99, deliveryDays: '5-7 days', countries: ['US'], active: false },
  { id: 5, name: 'Amazon Logistics', logo: '📦', rating: 4.5, price: 8.99, deliveryDays: '1-2 days', countries: ['US', 'UK', 'DE'], active: true },
]

const shippingZones = [
  { name: 'Domestic (US)', carriers: 3, rate: '$5.99 - $12.99' },
  { name: 'Canada', carriers: 2, rate: '$15.99 - $25.99' },
  { name: 'Europe', carriers: 4, rate: '$19.99 - $35.99' },
  { name: 'Asia Pacific', carriers: 3, rate: '$25.99 - $45.99' },
  { name: 'Latin America', carriers: 2, rate: '$29.99 - $49.99' },
]

const stats = [
  { label: 'Active Carriers', value: '4', icon: Truck },
  { label: 'Shipping Zones', value: '5', icon: Globe },
  { label: 'Avg. Shipping Cost', value: '$12.50', icon: DollarSign },
  { label: 'Avg. Delivery Time', value: '3.2 days', icon: Clock },
]

export default function ShippingPage() {
  const [carriers] = useState<Carrier[]>(mockCarriers)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCarriers = carriers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Shipping Integration</h1>
              <p className="text-gray-400">Manage carriers, rates, and delivery zones</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Carrier
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
            <stat.icon className="w-5 h-5 text-cyan-400 mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Carriers */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Shipping Carriers</h3>
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search carriers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-gray-500"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCarriers.map((carrier, i) => (
            <motion.div
              key={carrier.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{carrier.logo}</span>
                  <div>
                    <p className="font-medium">{carrier.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <span>⭐ {carrier.rating}</span>
                      <span>•</span>
                      <span>{carrier.deliveryDays}</span>
                    </div>
                  </div>
                </div>
                <button className={`w-12 h-6 rounded-full ${carrier.active ? 'bg-electron-blue' : 'bg-gray-500'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${carrier.active ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span>${carrier.price.toFixed(2)} / package</span>
                </div>
                <div className="flex gap-1">
                  {carrier.countries.slice(0, 2).map((c, j) => (
                    <span key={j} className="px-2 py-0.5 rounded bg-white/5 text-xs">{c}</span>
                  ))}
                  {carrier.countries.length > 2 && (
                    <span className="px-2 py-0.5 rounded bg-white/5 text-xs">+{carrier.countries.length - 2}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Shipping Zones</h3>
        <div className="space-y-3">
          {shippingZones.map((zone, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-electron-blue" />
                <span className="font-medium">{zone.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{zone.carriers} carriers</span>
                <span>{zone.rate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rate Calculator */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Shipping Rate Calculator</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Weight (kg)</label>
            <input type="number" placeholder="0" className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">From</label>
            <select className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Germany</option>
            </select>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">To</label>
            <select className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white">
              <option>Canada</option>
              <option>France</option>
              <option>Japan</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity">
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}