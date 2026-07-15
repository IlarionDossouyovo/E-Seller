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
  { id: 1, orderId: 'ORD-12345', product: 'Smart Watch X', productImage: '⌚', customer: 'Sarah J.', reason: 'Defective product', status: 'pending', amount: 299.99, requestDate: '2024-04-09' },
  { id: 2, orderId: 'ORD-12340', product: 'Bluetooth Speaker', productImage: '🔊', customer: 'Mike C.', reason: 'Wrong item received', status: 'approved', amount: 79.99, requestDate: '2024-04-08', processedDate: '2024-04-09' },
  { id: 3, orderId: 'ORD-12335', product: 'Yoga Mat Premium', productImage: '🧘', customer: 'Emma W.', reason: 'Changed mind', status: 'rejected', amount: 39.99, requestDate: '2024-04-07', processedDate: '2024-04-08' },
  { id: 4, orderId: 'ORD-12330', product: 'Face Serum Set', productImage: '🧴', customer: 'Lisa A.', reason: 'Allergic reaction', status: 'refunded', amount: 45.99, requestDate: '2024-04-05', processedDate: '2024-04-07' },
  { id: 5, orderId: 'ORD-12325', product: 'Protein Shaker', productImage: '🥤', customer: 'James B.', reason: 'Damaged package', status: 'pending', amount: 19.99, requestDate: '2024-04-09' },
]

const stats = [
  { label: 'Total Returns', value: '23', change: '+5', icon: RotateCcw },
  { label: 'Pending Review', value: '8', change: '+2', icon: Clock },
  { label: 'Approved', value: '12', change: '+3', icon: CheckCircle },
  { label: 'Refund Amount', value: '$1,245', change: 'This month', icon: DollarSign },
]

export default function ReturnsPage() {
  const [returns] = useState<Return[]>(mockReturns)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'refunded'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReturns = returns.filter(ret => {
    const matchesFilter = filter === 'all' || ret.status === filter
    const matchesSearch = ret.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ret.customer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
      case 'approved':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Approved</span>
      case 'rejected':
        return <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm flex items-center gap-1"><X className="w-3 h-3" /> Rejected</span>
      case 'refunded':
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm flex items-center gap-1"><DollarSign className="w-3 h-3" /> Refunded</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Returns Management</h1>
              <p className="text-gray-400">Process and track return requests</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Return
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
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1"
          />
        </div>
        
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected', 'refunded'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                filter === status 
                  ? 'bg-electron-blue text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {status}
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
                    <p className="font-medium">{ret.product}</p>
                    <p className="text-sm text-gray-400">Order: {ret.orderId} • Customer: {ret.customer}</p>
                  </div>
                  {getStatusBadge(ret.status)}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Reason: {ret.reason}
                  </span>
                  <span>Requested: {ret.requestDate}</span>
                  {ret.processedDate && <span>Processed: {ret.processedDate}</span>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${ret.amount.toFixed(2)}</span>
                    <span className="text-sm text-gray-400">refund amount</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {ret.status === 'pending' && (
                      <>
                        <button className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                          Approve
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                          Reject
                        </button>
                      </>
                    )}
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}