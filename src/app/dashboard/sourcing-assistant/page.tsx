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
    avgPrice: '14,50 €',
    avgLeadTime: '12 jours',
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
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Assistant d'Achat</h1>
              <p className="text-gray-400">Trouver et gérer les fournisseurs</p>
            </div>
          </div>
          <button onClick={() => alert('Demande de devis envoyée!')} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl flex items-center gap-2 text-white transition-all">
            <MessageSquare className="w-4 h-4" /> Demander un devis
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalSuppliers}</p>
          <p className="text-sm text-gray-400">Fournisseurs vérifiés</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.activeOrders}</p>
          <p className="text-sm text-gray-400">Commandes en cours</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-orange-400">{stats.avgPrice}</p>
          <p className="text-sm text-gray-400">Prix moyen</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.avgLeadTime}</p>
          <p className="text-sm text-gray-400">Délai moyen</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'search', label: 'Recherche' },
          { key: 'suppliers', label: 'Fournisseurs' },
          { key: 'orders', label: 'Ordres' },
          { key: 'messages', label: 'Messages' }
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-xl ${activeTab === tab.key ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'} transition-colors`}>
            {tab.label}
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
                <input type="text" placeholder="Rechercher des produits ou des fournisseurs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400" />
              </div>
              <select className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white">
                <option>Toutes les catégories</option>
                <option>Électronique</option>
                <option>Fashion</option>
                <option>Home</option>
              </select>
              <select className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white">
                <option>Tous les emplacements</option>
                <option>Chine</option>
                <option>Vietnam</option>
                <option>Turquie</option>
              </select>
              <button onClick={() => alert('Recherche en cours...')} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl font-semibold text-white transition-all">
                Rechercher
              </button>
            </div>
          </div>

          {/* Quick Search Categories */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {['Électronique', 'Téléphones', 'Coques', 'Câbles', 'Chargeurs', 'Audio', 'Accessoires', 'Emballage'].map((cat, i) => (
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
                  <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs">En vedette</span>
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
                  <span className="text-gray-400">{supplier.orders} commandes</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-gray-400">MOQ</p>
                    <p className="font-semibold">{supplier.moq} unités</p>
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-gray-400">Prix</p>
                    <p className="font-semibold">{supplier.price} €</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert('Contact: ' + supplier.name)} className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">Contact</button>
                  <button onClick={() => alert('Voir le profil: ' + supplier.name)} className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors">Voir le profil</button>
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
                <th className="p-4">Fournisseur</th>
                <th className="p-4">Emplacement</th>
                <th className="p-4">Note</th>
                <th className="p-4">MOQ</th>
                <th className="p-4">Prix</th>
                <th className="p-4">Délai</th>
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
                  <td className="p-4 font-semibold">{supplier.price} €</td>
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
                      <button onClick={() => alert('Contact supplier')} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white transition-colors">Contact</button>
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
                <th className="p-4">ID Demande</th>
                <th className="p-4">Produit</th>
                <th className="p-4">Quantité</th>
                <th className="p-4">Fournisseurs</th>
                <th className="p-4">Date</th>
                <th className="p-4">Statut</th>
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
                      {request.status === 'ordered' ? 'Commandé' : request.status === 'quoted' ? 'Devis reçu' : 'En attente'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => alert('Voir les détails')} className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm text-white transition-colors">Voir</button>
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
            <h3 className="font-semibold mb-2">Aucun Message</h3>
            <p className="text-gray-400">Commencez une conversation avec un fournisseur</p>
          </div>
        </div>
      )}
    </div>
  )
}