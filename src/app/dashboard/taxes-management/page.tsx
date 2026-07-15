'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/app/i18n'
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
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState('rates')
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  const showNotification = (message: string, type: 'success' | 'info' = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    const tabNames: Record<string, string> = {
      rates: t.taxes?.rates || 'Rates',
      filings: t.taxes?.filings || 'Filings',
      reports: t.taxes?.reports || 'Reports',
    }
    showNotification(`${tabNames[tab]}`, 'info')
  }

  const stats = {
    totalRates: taxRates.length,
    totalCollected: taxRates.reduce((sum, t) => sum + t.collected, 0),
    averageRate: (taxRates.reduce((sum, t) => sum + t.rate, 0) / taxRates.length).toFixed(1),
    pendingFilings: filings.filter(f => f.status === 'due_soon').length,
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-blue-500/90 text-white'
          }`}
        >
          {notification.message}
        </motion.div>
      )}

      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">{t.taxes?.title || 'Taxes Management'}</h1>
            <p className="text-gray-400">{t.taxes?.subtitle || 'Configure tax rates and file returns'}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {['rates', 'filings', 'reports'].map(tab => (
          <button key={tab} onClick={() => handleTabClick(tab)} className={`px-4 py-2 rounded-xl cursor-pointer active:scale-95 transition-transform ${activeTab === tab ? 'bg-indigo-500' : 'bg-white/5 hover:bg-white/10'}`}>
            {tab === 'rates' ? (t.taxes?.rates || 'Rates') : tab === 'filings' ? (t.taxes?.filings || 'Filings') : (t.taxes?.reports || 'Reports')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalRates}</p>
          <p className="text-sm text-gray-400">{t.taxes?.taxRates || 'Tax Rates'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">${stats.totalCollected.toLocaleString()}</p>
          <p className="text-sm text-gray-400">{t.taxes?.collected || 'Collected'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.averageRate}%</p>
          <p className="text-sm text-gray-400">{t.taxes?.averageRate || 'Average Rate'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.pendingFilings}</p>
          <p className="text-sm text-gray-400">{t.taxes?.dueSoon || 'Due Soon'}</p>
        </motion.div>
      </div>

      {activeTab === 'rates' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">{t.taxes?.taxName || 'Tax Name'}</th>
                <th className="p-4">{t.taxes?.rate || 'Rate'}</th>
                <th className="p-4">{t.taxes?.type || 'Type'}</th>
                <th className="p-4">{t.taxes?.region || 'Region'}</th>
                <th className="p-4">{t.taxes?.collectedAmount || 'Collected'}</th>
                <th className="p-4">{t.taxes?.status || 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {taxRates.map((tax, i) => (
                <motion.tr key={tax.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5">
                  <td className="p-4 font-medium">{tax.name}</td>
                  <td className="p-4">{tax.rate}%</td>
                  <td className="p-4">{tax.type === 'state' ? (t.taxes?.state || 'State') : (t.taxes?.country || 'Country')}</td>
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
                <th className="p-4">{t.taxes?.period || 'Period'}</th>
                <th className="p-4">{t.taxes?.dueDate || 'Due Date'}</th>
                <th className="p-4">{t.taxes?.amountDue || 'Amount Due'}</th>
                <th className="p-4">{t.taxes?.status || 'Status'}</th>
                <th className="p-4">{t.taxes?.actions || 'Actions'}</th>
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
                      {filing.status === 'due_soon' ? (t.taxes?.dueSoon || 'due soon') : (t.taxes?.paid || 'paid')}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => showNotification(`Paiement: ${filing.period} - $${filing.amount}`, 'success')} className="px-3 py-1 bg-blue-500 rounded-lg text-sm cursor-pointer hover:bg-blue-600">{t.taxes?.payNow || 'Pay Now'}</button>
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