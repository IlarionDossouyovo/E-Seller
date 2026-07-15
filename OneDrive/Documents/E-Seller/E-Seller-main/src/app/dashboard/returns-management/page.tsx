'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Package, DollarSign, Clock, AlertTriangle, CheckCircle, XCircle, Search, Filter } from 'lucide-react'

const returns = [
  { id: 'R1', orderId: 'ORD-1234', product: 'Wireless Earbuds Pro', reason: 'Defective', amount: 79.99, status: 'approved', date: '2024-04-10' },
  { id: 'R2', orderId: 'ORD-1245', product: 'Smart Watch Series X', reason: 'Wrong Size', amount: 299.99, status: 'pending', date: '2024-04-11' },
  { id: 'R3', orderId: 'ORD-1256', product: 'Phone Case Premium', reason: 'Not as described', amount: 24.99, status: 'rejected', date: '2024-04-09' },
  { id: 'R4', orderId: 'ORD-1267', product: 'Fast Charger 65W', reason: 'Changed mind', amount: 39.99, status: 'approved', date: '2024-04-12' },
]

const statusColors: Record<string, string> = {
  approved: 'bg-green-500/20 text-green-400',
  pending: 'bg-yellow-500/20 text-yellow-400',
  rejected: 'bg-red-500/20 text-red-400',
}

export default function ReturnsManagementPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const stats = {
    total: returns.length,
    pending: returns.filter(r => r.status === 'pending').length,
    approved: returns.filter(r => r.status === 'approved').length,
    totalAmount: returns.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.amount, 0),
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
            <RotateCcw className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Returns Management</h1>
            <p className="text-gray-400">Process return requests</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">Total Requests</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          <p className="text-sm text-gray-400">Pending</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
          <p className="text-sm text-gray-400">Approved</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">${stats.totalAmount.toFixed(2)}</p>
          <p className="text-sm text-gray-400">Refunded</p>
        </motion.div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="text-left text-sm text-gray-400">
              <th className="p-4">Return ID</th>
              <th className="p-4">Order</th>
              <th className="p-4">Product</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((ret, i) => (
              <motion.tr key={ret.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5">
                <td className="p-4 font-mono">{ret.id}</td>
                <td className="p-4">{ret.orderId}</td>
                <td className="p-4">{ret.product}</td>
                <td className="p-4 text-gray-400">{ret.reason}</td>
                <td className="p-4">${ret.amount}</td>
                <td className="p-4 text-gray-400">{ret.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[ret.status]}`}>
                    {ret.status}
                  </span>
                </td>
                <td className="p-4">
                  {ret.status === 'pending' && (
                    <div className="flex gap-1">
                      <button className="p-1 bg-green-500/20 rounded"><CheckCircle className="w-4 h-4 text-green-400" /></button>
                      <button className="p-1 bg-red-500/20 rounded"><XCircle className="w-4 h-4 text-red-400" /></button>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}