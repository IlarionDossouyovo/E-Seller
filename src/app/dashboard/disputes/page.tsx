'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, MessageSquare, User, Store, Clock, CheckCircle, XCircle, Search, Filter, Send, FileText, Phone } from 'lucide-react'

const disputes = [
  { 
    id: 'D001', 
    order: 'ORD-V001', 
    vendor: 'TechGear Pro', 
    customer: 'Jean Dupont', 
    reason: 'Article non reçu', 
    amount: 79.99, 
    status: 'open', 
    priority: 'high',
    created: '10/04/2024',
    messages: 3
  },
  { 
    id: 'D002', 
    order: 'ORD-V005', 
    vendor: 'Fashion Hub', 
    customer: 'Marie Dubois', 
    reason: 'Produit défectueux', 
    amount: 149.99, 
    status: 'pending', 
    priority: 'medium',
    created: '09/04/2024',
    messages: 5
  },
  { 
    id: 'D003', 
    order: 'ORD-V008', 
    vendor: 'Home Essentials', 
    customer: 'Hans Mueller', 
    reason: 'Mauvais article envoyé', 
    amount: 59.99, 
    status: 'resolved', 
    priority: 'low',
    created: '05/04/2024',
    messages: 8
  },
  { 
    id: 'D004', 
    order: 'ORD-V012', 
    vendor: 'Beauty Box', 
    customer: 'Sophie Martin', 
    reason: 'Demande de remboursement', 
    amount: 89.99, 
    status: 'open', 
    priority: 'medium',
    created: '11/04/2024',
    messages: 1
  },
]

const statusColors: Record<string, string> = {
  open: 'bg-yellow-500/20 text-yellow-400',
  pending: 'bg-blue-500/20 text-blue-400',
  resolved: 'bg-green-500/20 text-green-400',
  closed: 'bg-gray-500/20 text-gray-400',
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low: 'bg-green-500/20 text-green-400',
}

const priorityLabels: Record<string, string> = {
  high: 'Haute',
  medium: 'Moyenne',
  low: 'Basse',
}

const statusLabels: Record<string, string> = {
  open: 'Ouvert',
  pending: 'En attente',
  resolved: 'Résolu',
  closed: 'Fermé',
}

export default function DisputesPage() {
  const [activeDispute, setActiveDispute] = useState(disputes[0])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [newMessage, setNewMessage] = useState('')

  const stats = {
    total: disputes.length,
    open: disputes.filter(d => d.status === 'open').length,
    pending: disputes.filter(d => d.status === 'pending').length,
    resolved: disputes.filter(d => d.status === 'resolved').length,
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      alert(`Message envoyé: ${newMessage}`)
      setNewMessage('')
    }
  }

  const handleResolve = () => {
    alert('Litige marqué comme résolu')
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Résolution des Litiges</h1>
            <p className="text-gray-400">Gérer les litiges fournisseurs-clients</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">Total Litiges</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.open}</p>
          <p className="text-sm text-gray-400">Ouverts</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.pending}</p>
          <p className="text-sm text-gray-400">En attente</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
          <p className="text-sm text-gray-400">Résolus</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Disputes List */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher des litiges..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm w-full text-white placeholder-gray-400"
              />
            </div>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm w-full text-white"
            >
              <option value="all" className="bg-gray-800">Tous les statuts</option>
              <option value="open" className="bg-gray-800">Ouvert</option>
              <option value="pending" className="bg-gray-800">En attente</option>
              <option value="resolved" className="bg-gray-800">Résolu</option>
            </select>
          </div>
          <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
            {disputes.map((dispute) => (
              <motion.button
                key={dispute.id}
                onClick={() => setActiveDispute(dispute)}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={`w-full p-4 text-left ${activeDispute.id === dispute.id ? 'bg-blue-500/20 border-l-2 border-blue-500' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm">{dispute.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${priorityColors[dispute.priority]}`}>
                    {priorityLabels[dispute.priority]}
                  </span>
                </div>
                <p className="font-medium text-sm truncate">{dispute.reason}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>{dispute.vendor}</span>
                  <span className={`px-1.5 py-0.5 rounded ${statusColors[dispute.status]}`}>
                    {statusLabels[dispute.status]}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dispute Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Litige #{activeDispute.id}</h3>
                <p className="text-gray-400">Créé le {activeDispute.created}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={handleResolve} className="px-4 py-2 bg-green-500/20 text-green-400 rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Résoudre
                </button>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Rejeter
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400">Commande</p>
                <p className="font-mono">{activeDispute.order}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400">Montant</p>
                <p className="font-semibold">{activeDispute.amount} €</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400">Fournisseur</p>
                <p className="flex items-center gap-2"><Store className="w-4 h-4" /> {activeDispute.vendor}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400">Client</p>
                <p className="flex items-center gap-2"><User className="w-4 h-4" /> {activeDispute.customer}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg mb-4">
              <p className="text-sm text-gray-400 mb-2">Motif</p>
              <p className="font-medium">{activeDispute.reason}</p>
            </div>

            {/* Chat */}
            <div className="border-t border-white/10 pt-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Messages ({activeDispute.messages})
              </h4>
              <div className="space-y-3 mb-4 max-h-[200px] overflow-y-auto">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">VS</div>
                  <div className="bg-white/5 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Hello, I ordered this product 2 weeks ago and still haven't received it. Can you please help?</p>
                    <p className="text-xs text-gray-500 mt-1">2024-04-10 10:30 AM</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-sm">VH</div>
                  <div className="bg-green-500/20 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">I'm sorry for the delay. Let me check the tracking information and get back to you.</p>
                    <p className="text-xs text-gray-500 mt-1">2024-04-10 2:15 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Tapez un message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white"
                />
                <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-500 rounded-xl">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}