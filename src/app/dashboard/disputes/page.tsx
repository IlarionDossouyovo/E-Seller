'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, MessageSquare, User, Store, Clock, CheckCircle, XCircle, Search, Filter, Send, FileText, Phone } from 'lucide-react'

const disputes = [
  { 
    id: 'D001', 
    order: 'ORD-V001', 
    vendor: 'TechGear Pro', 
    customer: 'John Smith', 
    reason: 'Item not received', 
    amount: 79.99, 
    status: 'open', 
    priority: 'high',
    created: '2024-04-10',
    messages: 3
  },
  { 
    id: 'D002', 
    order: 'ORD-V005', 
    vendor: 'Fashion Hub', 
    customer: 'Marie Dubois', 
    reason: 'Defective product', 
    amount: 149.99, 
    status: 'pending', 
    priority: 'medium',
    created: '2024-04-09',
    messages: 5
  },
  { 
    id: 'D003', 
    order: 'ORD-V008', 
    vendor: 'Home Essentials', 
    customer: 'Hans Mueller', 
    reason: 'Wrong item sent', 
    amount: 59.99, 
    status: 'resolved', 
    priority: 'low',
    created: '2024-04-05',
    messages: 8
  },
  { 
    id: 'D004', 
    order: 'ORD-V012', 
    vendor: 'Beauty Box', 
    customer: 'Sarah Johnson', 
    reason: 'Refund request', 
    amount: 89.99, 
    status: 'open', 
    priority: 'medium',
    created: '2024-04-11',
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
      alert(`Message sent: ${newMessage}`)
      setNewMessage('')
    }
  }

  const handleResolve = () => {
    alert('Dispute marked as resolved')
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Dispute Resolution</h1>
            <p className="text-gray-400">Manage vendor-customer disputes</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">Total Disputes</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.open}</p>
          <p className="text-sm text-gray-400">Open</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.pending}</p>
          <p className="text-sm text-gray-400">Pending</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
          <p className="text-sm text-gray-400">Resolved</p>
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
                placeholder="Search disputes..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm w-full"
              />
            </div>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm w-full"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
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
                    {dispute.priority}
                  </span>
                </div>
                <p className="font-medium text-sm truncate">{dispute.reason}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>{dispute.vendor}</span>
                  <span className={`px-1.5 py-0.5 rounded ${statusColors[dispute.status]}`}>
                    {dispute.status}
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
                <h3 className="text-xl font-semibold">Dispute #{activeDispute.id}</h3>
                <p className="text-gray-400">Created {activeDispute.created}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={handleResolve} className="px-4 py-2 bg-green-500/20 text-green-400 rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Resolve
                </button>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400">Order</p>
                <p className="font-mono">{activeDispute.order}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400">Amount</p>
                <p className="font-semibold">${activeDispute.amount}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400">Vendor</p>
                <p className="flex items-center gap-2"><Store className="w-4 h-4" /> {activeDispute.vendor}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-sm text-gray-400">Customer</p>
                <p className="flex items-center gap-2"><User className="w-4 h-4" /> {activeDispute.customer}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg mb-4">
              <p className="text-sm text-gray-400 mb-2">Reason</p>
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
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2"
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