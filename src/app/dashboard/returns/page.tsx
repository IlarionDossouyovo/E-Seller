'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  RotateCcw, 
  Package, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  DollarSign,
  Search,
  Filter,
  Plus,
  X
} from 'lucide-react'

type Return = {
  id: number
  orderId: string
  product: string
  productImage: string
  customer: string
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'refunded'
  amount: number
  requestDate: string
  processedDate?: string
}

const mockReturns: Return[] = [
  { id: 1, orderId: 'ORD-12345', product: 'Montre Connectee X', productImage: '⌚', customer: 'Sophie M.', reason: 'Produit defectueux', status: 'pending', amount: 299.99, requestDate: '2024-04-09' },
  { id: 2, orderId: 'ORD-12340', product: 'Enceinte Bluetooth', productImage: '🔊', customer: 'Marc D.', reason: 'Mauvais article recu', status: 'approved', amount: 79.99, requestDate: '2024-04-08', processedDate: '2024-04-09' },
  { id: 3, orderId: 'ORD-12335', product: 'Tapis de Yoga Premium', productImage: '🧘', customer: 'Emma B.', reason: 'A change d\'avis', status: 'rejected', amount: 39.99, requestDate: '2024-04-07', processedDate: '2024-04-08' },
  { id: 4, orderId: 'ORD-12330', product: 'Kit Serum Visage', productImage: '🧴', customer: 'Claire M.', reason: 'Reaction allergique', status: 'refunded', amount: 45.99, requestDate: '2024-04-05', processedDate: '2024-04-07' },
  { id: 5, orderId: 'ORD-12325', product: 'Shaker Proteine', productImage: '🥤', customer: 'Jacques P.', reason: 'Colis endommage', status: 'pending', amount: 19.99, requestDate: '2024-04-09' },
]

const stats = [
  { label: 'Total Retours', value: '23', change: '+5', icon: RotateCcw },
  { label: 'En Attente', value: '8', change: '+2', icon: Clock },
  { label: 'Approuves', value: '12', change: '+3', icon: CheckCircle },
  { label: 'Montant', value: '1 245 EUR', change: 'Ce mois', icon: DollarSign },
]

export default function ReturnsPage() {
  const [returns] = useState<Return[]>(mockReturns)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'refunded'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState<string | null>(null)

  const filteredReturns = returns.filter(ret => {
    const matchesFilter = filter === 'all' || ret.status === filter
    const matchesSearch = ret.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ret.customer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1 border border-yellow-500/30"><Clock className="w-3 h-3" /> En Attente</span>
      case 'approved':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1 border border-green-500/30"><CheckCircle className="w-3 h-3" /> Approuve</span>
      case 'rejected':
        return <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm flex items-center gap-1 border border-red-500/30"><X className="w-3 h-3" /> Rejete</span>
      case 'refunded':
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm flex items-center gap-1 border border-blue-500/30"><DollarSign className="w-3 h-3" /> Rembourse</span>
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En Attente'
      case 'approved': return 'Approuve'
      case 'rejected': return 'Rejete'
      case 'refunded': return 'Rembourse'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-violet-500/20 via-purple-500/10 to-transparent border border-violet-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <RotateCcw className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Gestion des Retours</h1>
              <p className="text-gray-300">Traitez et suivez les demandes de retour</p>
            </div>
          </div>
          <button onClick={() => { setNotification('Nouveau retour...'); setTimeout(() => { setNotification('Formulaire ouvert!'); setTimeout(() => setNotification(null), 2000) }, 1000) }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Nouveau Retour
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
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-violet-400" />
              <span className="text-sm text-gray-400">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center bg-gray-900/50">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par ID commande ou client..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setNotification('Recherche: ' + e.target.value); setTimeout(() => setNotification(null), 1000) }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 flex-1 outline-none focus:border-electron-blue"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {([
            { key: 'all', label: 'Tous' },
            { key: 'pending', label: 'En Attente' },
            { key: 'approved', label: 'Approuve' },
            { key: 'rejected', label: 'Rejete' },
            { key: 'refunded', label: 'Rembourse' },
          ] as const).map(f => (
            <button
              key={f.key}
              onClick={() => { setFilter(f.key); setNotification(f.label); setTimeout(() => setNotification(null), 1500) }}
              className={`px-4 py-2.5 rounded-xl transition-all font-medium ${
                filter === f.key 
                  ? 'bg-electron-blue text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Returns List */}
      <div className="space-y-4">
        {filteredReturns.map((ret, i) => (
          <motion.div
            key={ret.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{ret.productImage}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-white">{ret.product}</p>
                    <p className="text-sm text-gray-400">Commande: {ret.orderId} • Client: {ret.customer}</p>
                  </div>
                  {getStatusBadge(ret.status)}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Motif: {ret.reason}
                  </span>
                  <span>Demande: {ret.requestDate}</span>
                  {ret.processedDate && <span>Traite: {ret.processedDate}</span>}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">{ret.amount.toFixed(2)} EUR</span>
                    <span className="text-sm text-gray-400">montant</span>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {ret.status === 'pending' && (
                      <>
                        <button onClick={() => { setNotification('Retour approuve!'); setTimeout(() => setNotification(null), 2000) }} className="px-4 py-2.5 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 transition-colors font-medium">
                          Approuver
                        </button>
                        <button onClick={() => { setNotification('Retour rejete!'); setTimeout(() => setNotification(null), 2000) }} className="px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-colors font-medium">
                          Rejeter
                        </button>
                      </>
                    )}
                    <button onClick={() => { setNotification('Details: ' + ret.product); setTimeout(() => setNotification(null), 2000) }} className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10 font-medium">
                      Voir Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}