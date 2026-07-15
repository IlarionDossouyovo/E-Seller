'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  Link, 
  TrendingUp,
  Copy,
  ExternalLink,
  Settings,
  Plus,
  Search,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'

type Affiliate = {
  id: number
  name: string
  email: string
  avatar: string
  clicks: number
  conversions: number
  revenue: number
  commission: number
  status: 'active' | 'pending' | 'inactive'
  joinedDate: string
  code: string
}

const mockAffiliates: Affiliate[] = [
  { id: 1, name: 'John Smith', email: 'john.s@email.com', avatar: '👨', clicks: 1250, conversions: 45, revenue: 4500, commission: 450, status: 'active', joinedDate: '2024-01-15', code: 'JOHN2024' },
  { id: 2, name: 'Sarah Davis', email: 'sarah.d@email.com', avatar: '👩', clicks: 890, conversions: 28, revenue: 2800, commission: 280, status: 'active', joinedDate: '2024-02-20', code: 'SARAH24' },
  { id: 3, name: 'Mike Wilson', email: 'mike.w@email.com', avatar: '👨‍🦱', clicks: 450, conversions: 12, revenue: 1200, commission: 120, status: 'pending', joinedDate: '2024-04-01', code: 'MIKE24' },
  { id: 4, name: 'Lisa Brown', email: 'lisa.b@email.com', avatar: '👩', clicks: 2100, conversions: 78, revenue: 7800, commission: 780, status: 'active', joinedDate: '2023-11-10', code: 'LISA2024' },
  { id: 5, name: 'David Lee', email: 'david.l@email.com', avatar: '👨', clicks: 180, conversions: 5, revenue: 500, commission: 50, status: 'inactive', joinedDate: '2024-03-05', code: 'DAVID24' },
]

const programs = [
  { name: 'Standard Affiliate', commission: '10%', cookie: '30 days', active: true },
  { name: 'VIP Partner', commission: '15%', cookie: '60 days', active: true },
  { name: 'Reseller Program', commission: '25%', cookie: '90 days', active: false },
]

const stats = [
  { label: 'Total Affiliates', value: '156', icon: Users, change: '+12' },
  { label: 'Total Clicks', value: '12,450', icon: Link, change: '+8%' },
  { label: 'Total Revenue', value: '$45,230', icon: DollarSign, change: '+15%' },
  { label: 'Avg. Commission', value: '$145', icon: TrendingUp, change: '+5%' },
]

export default function AffiliatePage() {
  const [affiliates] = useState<Affiliate[]>(mockAffiliates)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAffiliates = affiliates.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span>
      case 'pending': return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
      case 'inactive': return <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm flex items-center gap-1"><XCircle className="w-3 h-3" /> Inactive</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Affiliate Program</h1>
              <p className="text-gray-400">Manage your affiliate partners and commissions</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Affiliate
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-violet-400" />
              <span className="text-sm text-green-400">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Affiliate Link */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Your Affiliate Link</h3>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
          <input 
            type="text" 
            value="https://e-seller.com?ref=YOURCODE" 
            readOnly 
            className="flex-1 bg-transparent border-none outline-none text-white"
          />
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
            <Copy className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 rounded-lg bg-electron-blue hover:opacity-90">
            Share
          </button>
        </div>
      </div>

      {/* Programs */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Commission Programs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {programs.map((prog, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{prog.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${prog.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {prog.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Commission</span><span className="text-electron-blue font-bold">{prog.commission}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Cookie</span><span>{prog.cookie}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Affiliates List */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Affiliates</h3>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent border-none outline-none text-white" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Affiliate</th>
                <th className="text-right p-4 text-gray-400 font-medium">Clicks</th>
                <th className="text-right p-4 text-gray-400 font-medium">Conversions</th>
                <th className="text-right p-4 text-gray-400 font-medium">Revenue</th>
                <th className="text-right p-4 text-gray-400 font-medium">Commission</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredAffiliates.map((aff, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{aff.avatar}</span>
                      <div>
                        <p className="font-medium">{aff.name}</p>
                        <p className="text-sm text-gray-400">{aff.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono">{aff.clicks.toLocaleString()}</td>
                  <td className="p-4 text-right font-mono">{aff.conversions}</td>
                  <td className="p-4 text-right font-mono text-green-400">${aff.revenue.toLocaleString()}</td>
                  <td className="p-4 text-right font-mono text-electron-blue">${aff.commission}</td>
                  <td className="p-4">{getStatusBadge(aff.status)}</td>
                  <td className="p-4 font-mono text-sm">{aff.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}