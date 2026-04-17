'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Handshake, Package, DollarSign, Users, TrendingUp, Clock, AlertTriangle, CheckCircle, XCircle, FileText } from 'lucide-react'

const affiliates = [
  { id: 'A1', name: 'Tech Influencer Co', commission: 15, sales: 2340, earnings: 3510, status: 'active', joined: '2024-01-15' },
  { id: 'A2', name: 'Fashion Bloggers', commission: 12, sales: 1890, earnings: 2268, status: 'active', joined: '2024-02-20' },
  { id: 'A3', name: 'Tech Reviewers Pro', commission: 15, sales: 1560, earnings: 2340, status: 'active', joined: '2024-03-01' },
  { id: 'A4', name: 'Lifestyle Creator', commission: 10, sales: 890, earnings: 890, status: 'pending', joined: '2024-04-01' },
]

const payouts = [
  { id: 'P1', affiliate: 'Tech Influencer Co', amount: 1560, status: 'paid', date: '2024-04-01' },
  { id: 'P2', affiliate: 'Fashion Bloggers', amount: 890, status: 'paid', date: '2024-04-01' },
  { id: 'P3', affiliate: 'Tech Reviewers Pro', amount: 780, status: 'pending', date: '2024-04-15' },
]

export default function AffiliateManagementPage() {
  const [activeTab, setActiveTab] = useState('affiliates')

  const stats = {
    totalAffiliates: affiliates.length,
    activeAffiliates: affiliates.filter(a => a.status === 'active').length,
    totalSales: affiliates.reduce((sum, a) => sum + a.sales, 0),
    totalEarnings: affiliates.reduce((sum, a) => sum + a.earnings, 0),
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Handshake className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Affiliate Management</h1>
            <p className="text-gray-400">Manage your affiliate partners</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['affiliates', 'payouts', 'tracking'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-green-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalAffiliates}</p>
          <p className="text-sm text-gray-400">Total Affiliates</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.activeAffiliates}</p>
          <p className="text-sm text-gray-400">Active</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.totalSales.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Total Sales</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">${stats.totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Total Earnings</p>
        </motion.div>
      </div>

      {activeTab === 'affiliates' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Affiliate</th>
                <th className="p-4">Commission</th>
                <th className="p-4">Sales</th>
                <th className="p-4">Earnings</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((affiliate, i) => (
                <motion.tr key={affiliate.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5">
                  <td className="p-4 font-medium">{affiliate.name}</td>
                  <td className="p-4">{affiliate.commission}%</td>
                  <td className="p-4">{affiliate.sales.toLocaleString()}</td>
                  <td className="p-4 text-green-400">${affiliate.earnings.toLocaleString()}</td>
                  <td className="p-4 text-gray-400">{affiliate.joined}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${affiliate.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {affiliate.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'payouts' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Affiliate</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout, i) => (
                <motion.tr key={payout.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5">
                  <td className="p-4 font-medium">{payout.affiliate}</td>
                  <td className="p-4 text-green-400">${payout.amount}</td>
                  <td className="p-4 text-gray-400">{payout.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${payout.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {payout.status}
                    </span>
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