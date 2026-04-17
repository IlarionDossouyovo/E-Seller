'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, MapPin, Clock, AlertTriangle, Search, Plus, FileText } from 'lucide-react'

const taxRates = [
  { id: 'T1', name: 'US Sales Tax', rate: 7.25, type: 'state', region: 'United States', collected: 15600, status: 'active' },
  { id: 'T2', name: 'EU VAT', rate: 20, type: 'country', region: 'France', collected: 23400, status: 'active' },
  { id: 'T3', name: 'UK VAT', rate: 20, type: 'country', region: 'United Kingdom', collected: 18900, status: 'active' },
  { id: 'T4', name: 'Germany VAT', rate: 19, type: 'country', region: 'Germany', collected: 14500, status: 'active' },
  { id: 'T5', name: 'Canada GST', rate: 5, type: 'country', region: 'Canada', collected: 8900, status: 'active' },
]

const filings = [
  { id: 'F1', period: 'March 2024', dueDate: '2024-04-20', amount: 5600, status: 'due_soon' },
  { id: 'F2', period: 'February 2024', dueDate: '2024-03-20', amount: 4800, status: 'paid' },
  { id: 'F3', period: 'January 2024', dueDate: '2024-02-20', amount: 5200, status: 'paid' },
]

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400',
  inactive: 'bg-gray-500/20 text-gray-400',
  due_soon: 'bg-yellow-500/20 text-yellow-400',
  paid: 'bg-green-500/20 text-green-400',
}

export default function TaxesManagementPage() {
  const [activeTab, setActiveTab] = useState('rates')

  const stats = {
    totalRates: taxRates.length,
    totalCollected: taxRates.reduce((sum, t) => sum + t.collected, 0),
    averageRate: (taxRates.reduce((sum, t) => sum + t.rate, 0) / taxRates.length).toFixed(1),
    pendingFilings: filings.filter(f => f.status === 'due_soon').length,
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Taxes Management</h1>
            <p className="text-gray-400">Configure tax rates and file returns</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {['rates', 'filings', 'reports'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-indigo-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalRates}</p>
          <p className="text-sm text-gray-400">Tax Rates</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">${stats.totalCollected.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Collected</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.averageRate}%</p>
          <p className="text-sm text-gray-400">Average Rate</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.pendingFilings}</p>
          <p className="text-sm text-gray-400">Due Soon</p>
        </motion.div>
      </div>

      {activeTab === 'rates' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Tax Name</th>
                <th className="p-4">Rate</th>
                <th className="p-4">Type</th>
                <th className="p-4">Region</th>
                <th className="p-4">Collected</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {taxRates.map((tax, i) => (
                <motion.tr key={tax.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5">
                  <td className="p-4 font-medium">{tax.name}</td>
                  <td className="p-4">{tax.rate}%</td>
                  <td className="p-4">{tax.type}</td>
                  <td className="p-4">{tax.region}</td>
                  <td className="p-4 text-green-400">${tax.collected.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[tax.status]}`}>
                      {tax.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'filings' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Period</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Amount Due</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filings.map((filing, i) => (
                <motion.tr key={filing.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5">
                  <td className="p-4 font-medium">{filing.period}</td>
                  <td className="p-4">{filing.dueDate}</td>
                  <td className="p-4 text-green-400">${filing.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[filing.status]}`}>
                      {filing.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1 bg-blue-500 rounded-lg text-sm">Pay Now</button>
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