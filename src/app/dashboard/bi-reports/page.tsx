'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Download, Filter, Settings, Calendar, TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingBag, RefreshCw, PieChart, LineChart, Activity, Plus, Save, Share2, Printer, FileSpreadsheet, Database, Play, Pause } from 'lucide-react'

const reports = [
  { id: 'R1', name: 'Revenue Overview', type: 'revenue', lastRun: '2 hours ago', schedule: 'Daily', status: 'active' },
  { id: 'R2', name: 'Product Performance', type: 'products', lastRun: '1 day ago', schedule: 'Weekly', status: 'active' },
  { id: 'R3', name: 'Customer Analytics', type: 'customers', lastRun: '3 hours ago', schedule: 'Daily', status: 'active' },
  { id: 'R4', name: 'Marketing ROI', type: 'marketing', lastRun: '1 week ago', schedule: 'Monthly', status: 'paused' },
]

const charts = [
  { name: 'Revenue', data: [12, 19, 15, 25, 32, 28, 35, 42, 38, 45], color: 'green' },
  { name: 'Orders', data: [8, 12, 10, 15, 18, 16, 20, 22, 19, 25], color: 'blue' },
  { name: 'Customers', data: [5, 8, 7, 10, 12, 11, 14, 16, 15, 18], color: 'purple' },
]

export default function BIReportsPage() {
  const [activeTab, setActiveTab] = useState('reports')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Advanced BI Reports</h1>
              <p className="text-gray-400">Custom analytics dashboards</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">$124,500</p>
          <p className="text-sm text-gray-400">Total Revenue</p>
          <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
            <TrendingUp className="w-3 h-3" /> +12.5%
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">1,245</p>
          <p className="text-sm text-gray-400">Orders</p>
          <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
            <TrendingUp className="w-3 h-3" /> +8.3%
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">567</p>
          <p className="text-sm text-gray-400">Customers</p>
          <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
            <TrendingDown className="w-3 h-3" /> -2.1%
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-orange-400">$89.50</p>
          <p className="text-sm text-gray-400">Avg Order Value</p>
          <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
            <TrendingUp className="w-3 h-3" /> +5.2%
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['reports', 'dashboard', 'exports', 'schedules'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-indigo-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'reports' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Charts */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Performance Trends</h3>
              <div className="flex gap-2">
                <button onClick={() => setSelectedMetric('revenue')} className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'revenue' ? 'bg-indigo-500' : 'bg-white/5'}`}>Revenue</button>
                <button onClick={() => setSelectedMetric('orders')} className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'orders' ? 'bg-indigo-500' : 'bg-white/5'}`}>Orders</button>
                <button onClick={() => setSelectedMetric('customers')} className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'customers' ? 'bg-indigo-500' : 'bg-white/5'}`}>Customers</button>
              </div>
            </div>
            <div className="h-64 flex items-end gap-2">
              {(selectedMetric === 'revenue' ? charts[0] : selectedMetric === 'orders' ? charts[1] : charts[2]).data.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${value * 4}%` }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex-1 bg-gradient-to-t ${
                    selectedMetric === 'revenue' ? 'from-indigo-500 to-cyan-500' :
                    selectedMetric === 'orders' ? 'from-blue-500 to-cyan-500' :
                    'from-purple-500 to-pink-500'
                  } rounded-t`}
                />
              ))}
            </div>
          </div>

          {/* Saved Reports */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Saved Reports</h3>
            <div className="space-y-3">
              {reports.map((report, i) => (
                <motion.div key={report.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-indigo-400" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-400">Last run: {report.lastRun}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${report.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{report.status}</span>
                    <button className="p-1 hover:bg-white/10 rounded"><Settings className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Custom Dashboard</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white/5 rounded-lg text-sm flex items-center gap-1">
                <Save className="w-4 h-4" /> Save
              </button>
              <button className="px-3 py-1.5 bg-white/5 rounded-lg text-sm flex items-center gap-1">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {['Revenue', 'Orders', 'Customers', 'AOV', 'Conversion', 'Traffic', 'Returns', 'Profit'].map(metric => (
              <button key={metric} onClick={() => setSelectedMetric(metric.toLowerCase())} className={`p-3 rounded-xl text-left ${selectedMetric === metric.toLowerCase() ? 'bg-indigo-500' : 'bg-white/5'}`}>
                <p className="text-sm text-gray-400">{metric}</p>
                <p className="font-semibold">12,450</p>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="font-medium mb-2">Date Range</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">Today</button>
                <button className="flex-1 py-2 bg-indigo-500 rounded-lg text-sm">7 Days</button>
                <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">30 Days</button>
                <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">Custom</button>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="font-medium mb-2">Comparison</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-indigo-500 rounded-lg text-sm">vs Last Period</button>
                <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">vs Last Year</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'exports' && (
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 text-center">
            <FileSpreadsheet className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Excel Export</h3>
            <p className="text-sm text-gray-400 mb-4">Download data as .xlsx</p>
            <button className="px-4 py-2 bg-green-500 rounded-xl">Export</button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 text-center">
            <Database className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">CSV Export</h3>
            <p className="text-sm text-gray-400 mb-4">Download data as .csv</p>
            <button className="px-4 py-2 bg-blue-500 rounded-xl">Export</button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 text-center">
            <Printer className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Print Report</h3>
            <p className="text-sm text-gray-400 mb-4">Print or save as PDF</p>
            <button className="px-4 py-2 bg-purple-500 rounded-xl">Print</button>
          </motion.div>
        </div>
      )}

      {activeTab === 'schedules' && (
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Scheduled Reports</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="font-medium">Daily Revenue Report</p>
                  <p className="text-sm text-gray-400">Every day at 9:00 AM</p>
                </div>
              </div>
              <button className="flex items-center gap-2">
                <span className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
                </span>
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="font-medium">Weekly Performance</p>
                  <p className="text-sm text-gray-400">Every Monday at 8:00 AM</p>
                </div>
              </div>
              <button className="flex items-center gap-2">
                <span className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}