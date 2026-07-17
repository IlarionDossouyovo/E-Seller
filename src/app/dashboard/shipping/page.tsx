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
  AlertCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

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
  { id: 1, name: 'FedEx', logo: '📦', rating: 4.8, price: 12.99, deliveryDays: '2-3 jours', countries: ['US', 'CA', 'MX'], active: true },
  { id: 2, name: 'DHL', logo: '🚚', rating: 4.6, price: 15.99, deliveryDays: '3-5 jours', countries: ['Global'], active: true },
  { id: 3, name: 'UPS', logo: '📬', rating: 4.7, price: 11.99, deliveryDays: '2-4 jours', countries: ['US', 'EU'], active: true },
  { id: 4, name: 'USPS', logo: '📮', rating: 4.3, price: 5.99, deliveryDays: '5-7 jours', countries: ['US'], active: false },
  { id: 5, name: 'Amazon Logistics', logo: '📦', rating: 4.5, price: 8.99, deliveryDays: '1-2 jours', countries: ['US', 'UK', 'DE'], active: true },
]

const shippingZones = [
  { name: 'France Metropolitaine', carriers: 3, rate: '5.99 - 12.99 EUR' },
  { name: 'Belgique', carriers: 2, rate: '15.99 - 25.99 EUR' },
  { name: 'Europe', carriers: 4, rate: '19.99 - 35.99 EUR' },
  { name: 'Asie Pacifique', carriers: 3, rate: '25.99 - 45.99 EUR' },
  { name: 'Amerique Latine', carriers: 2, rate: '29.99 - 49.99 EUR' },
]

const stats = [
  { label: 'Transporteurs Actifs', value: '4', icon: Truck },
  { label: 'Zones de Livraison', value: '5', icon: Globe },
  { label: 'Cout Moyen', value: '12.50 EUR', icon: DollarSign },
  { label: 'Delai Moyen', value: '3.2 jours', icon: Clock },
]

export default function ShippingPage() {
  const [carriers] = useState<Carrier[]>(mockCarriers)
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState<string | null>(null)

  const filteredCarriers = carriers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-transparent border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Integration Livraison</h1>
              <p className="text-gray-300">Gerez les transporteurs, tarifs et zones de livraison</p>
            </div>
          </div>
          <button onClick={() => { setNotification('Ajout transporteur...'); setTimeout(() => { setNotification('Formulaire ouvert!'); setTimeout(() => setNotification(null), 2000) }, 1000) }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Ajouter Transporteur
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
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Carriers */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Transporteurs</h3>
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher transporteurs..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setNotification('Recherche: ' + e.target.value); setTimeout(() => setNotification(null), 1000) }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 flex-1 outline-none focus:border-electron-blue"
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
                    <p className="font-medium text-white">{carrier.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <span>⭐ {carrier.rating}</span>
                      <span>•</span>
                      <span>{carrier.deliveryDays}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => { setNotification(carrier.name + (carrier.active ? ' desactive!' : ' active!')); setTimeout(() => setNotification(null), 2000) }} className={`w-12 h-6 rounded-full ${carrier.active ? 'bg-electron-blue' : 'bg-gray-500'} cursor-pointer`}>
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${carrier.active ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-white">{carrier.price.toFixed(2)} EUR / colis</span>
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
        <h3 className="text-lg font-semibold mb-4 text-white">Zones de Livraison</h3>
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
                <span className="font-medium text-white">{zone.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{zone.carriers} transporteurs</span>
                <span className="text-white font-medium">{zone.rate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rate Calculator */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Calculateur de Tarif</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Poids (kg)</label>
            <input type="number" placeholder="0" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">De</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
              <option>France</option>
              <option>Belgique</option>
              <option>Suisse</option>
            </select>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Vers</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
              <option>Canada</option>
              <option>Etats-Unis</option>
              <option>Japon</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={() => { setNotification('Calcul en cours...'); setTimeout(() => { setNotification('Tarif calcule: 15.99 EUR'); setTimeout(() => setNotification(null), 2000) }, 1000) }} className="w-full py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity font-medium">
              Calculer
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard/store-locator" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Store Locator
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}