'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Filter, Plus, Search, Eye } from 'lucide-react'

const reports = [
  { id: '1', name: 'Monthly Sales Report', type: 'sales', period: 'March 2024', generatedAt: '2024-04-01', size: '2.4 MB' },
  { id: '2', name: 'Inventory Status', type: 'inventory', period: 'April 2024', generatedAt: '2024-04-10', size: '1.8 MB' },
  { id: '3', name: 'Customer Analytics', type: 'customers', period: 'Q1 2024', generatedAt: '2024-04-05', size: '3.2 MB' },
  { id: '4', name: 'Tax Summary', type: 'tax', period: 'Q1 2024', generatedAt: '2024-04-15', size: '1.2 MB' },
  { id: '5', name: 'Profit & Loss', type: 'financial', period: 'March 2024', generatedAt: '2024-04-01', size: '2.1 MB' },
  { id: '6', name: 'Shipping Report', type: 'shipping', period: 'March 2024', generatedAt: '2024-04-02', size: '1.5 MB' },
]

const typeColors: Record<string, string> = {
  sales: 'bg-blue-500/20 text-blue-400',
  inventory: 'bg-green-500/20 text-green-400',
  customers: 'bg-purple-500/20 text-purple-400',
  tax: 'bg-yellow-500/20 text-yellow-400',
  financial: 'bg-red-500/20 text-red-400',
  shipping: 'bg-cyan-500/20 text-cyan-400',
}

export default function ReportsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = reports.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || r.type === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Reports</h1>
            <p className="text-gray-400">Generate and download business reports</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
            <option value="all">All Types</option>
            <option value="sales">Sales</option>
            <option value="inventory">Inventory</option>
            <option value="customers">Customers</option>
            <option value="tax">Tax</option>
            <option value="financial">Financial</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center gap-2">
          <Plus className="w-5 h-5" /> Generate Report
        </button>
      </div>

      <div className="grid gap-4">
        {filtered.map((report, i) => (
          <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{report.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className={`px-2 py-0.5 rounded-full ${typeColors[report.type]}`}>{report.type}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {report.period}</span>
                  <span>{report.size}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/5 rounded-lg"><Eye className="w-5 h-5 text-gray-400" /></button>
              <button className="p-2 hover:bg-white/5 rounded-lg"><Download className="w-5 h-5 text-gray-400" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}