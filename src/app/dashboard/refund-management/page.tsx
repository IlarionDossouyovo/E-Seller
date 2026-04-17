'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, DollarSign, Plus, Settings, CheckCircle, XCircle, Clock, AlertTriangle, Mail } from 'lucide-react'

const refunds = [
  { id: 'R1', order: 'ORD-1234', customer: 'John Smith', amount: 49.99, reason: 'Wrong size', status: 'pending', date: '2024-04-12' },
  { id: 'R2', order: 'ORD-1233', customer: 'Marie Dubois', amount: 24.99, reason: 'Defective', status: 'approved', date: '2024-04-11' },
  { id: 'R3', order: 'ORD-1232', customer: 'Hans Mueller', amount: 99.99, reason: 'Not as described', status: 'rejected', date: '2024-04-10' },
]

export default function RefundManagementPage() {
  const [activeTab, setActiveTab] = useState('requests')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Refund Management</h1>
              <p className="text-gray-400">Process refunds</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{refunds.length}</p>
          <p className="text-sm text-gray-400">Total Requests</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">3</p>
          <p className="text-sm text-gray-400">Pending</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">$174.97</p>
          <p className="text-sm text-gray-400">Refunded</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-red-400">1</p>
          <p className="text-sm text-gray-400">Rejected</p>
        </motion.div>
      </div>

      <div className="flex gap-2">
        {['requests', 'history', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-red-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'requests' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((refund, i) => (
                <motion.tr key={refund.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">{refund.order}</td>
                  <td className="p-4">{refund.customer}</td>
                  <td className="p-4 text-red-400">${refund.amount}</td>
                  <td className="p-4">{refund.reason}</td>
                  <td className="p-4 text-gray-400">{refund.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      refund.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      refund.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{refund.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {refund.status === 'pending' && (
                        <>
                          <button className="p-1.5 bg-green-500 rounded-lg"><CheckCircle className="w-4 h-4" /></button>
                          <button className="p-1.5 bg-red-500 rounded-lg"><XCircle className="w-4 h-4" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}