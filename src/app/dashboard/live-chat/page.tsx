'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Send, 
  Users, 
  TrendingUp, 
  Plus, 
  Search,
  Filter,
  Trash2,
  Edit,
  Copy,
  Eye,
  Clock,
  Zap,
  BarChart3,
  CheckCircle,
  XCircle
} from 'lucide-react'

type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'

interface Campaign {
  id: number
  name: string
  subject: string
  status: CampaignStatus
  sent: number
  opened: number
  clicked: number
  date: string
  type: 'newsletter' | 'promotion' | 'automation' | 'welcome'
}

const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: 'Spring Sale Announcement',
    subject: '🌸 Up to 50% Off - Spring Sale!',
    status: 'sent',
    sent: 12500,
    opened: 5625,
    clicked: 1875,
    date: '2024-04-05',
    type: 'promotion',
  },
  {
    id: 2,
    name: 'New Product Launch',
    subject: 'Introducing: Smart Watch Ultra',
    status: 'sent',
    sent: 15000,
    opened: 7500,
    clicked: 3000,
    date: '2024-04-01',
    type: 'newsletter',
  },
  {
    id: 3,
    name: 'Welcome Series - Day 1',
    subject: 'Welcome to E-Seller! Here\'s what\'s next...',
    status: 'sending',
    sent: 450,
    opened: 180,
    clicked: 90,
    date: '2024-04-09',
    type: 'automation',
  },
  {
    id: 4,
    name: 'Abandoned Cart Reminder',
    subject: 'You left something behind...',
    status: 'scheduled',
    sent: 0,
    opened: 0,
    clicked: 0,
    date: '2024-04-10',
    type: 'automation',
  },
  {
    id: 5,
    name: 'April Newsletter',
    subject: 'What\'s New at E-Seller - April 2024',
    status: 'draft',
    sent: 0,
    opened: 0,
    clicked: 0,
    date: '',
    type: 'newsletter',
  },
]

const mockTemplates = [
  { name: 'Welcome Email', category: 'Automation' },
  { name: 'Promo Announcement', category: 'Promotion' },
  { name: 'Newsletter', category: 'Newsletter' },
  { name: 'Re-engagement', category: 'Automation' },
]

export default function EmailsPage() {
  const [campaigns] = useState(mockCampaigns)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'all'>('all')
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'automation'>('campaigns')

  const filteredCampaigns = campaigns.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    totalSubscribers: 15420,
    avgOpenRate: '45.2%',
    avgClickRate: '12.8%',
    sentThisMonth: 27500,
  }

  const statusConfig = {
    draft: { label: 'Draft', color: 'text-gray-400', bg: 'bg-gray-500/20' },
    scheduled: { label: 'Scheduled', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    sending: { label: 'Sending', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    sent: { label: 'Sent', color: 'text-green-400', bg: 'bg-green-500/20' },
    failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-500/20' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-sora)]">Email Marketing</h1>
          <p className="text-gray-400">Create and manage email campaigns</p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Subscribers', value: stats.totalSubscribers.toLocaleString(), icon: Users },
          { label: 'Avg Open Rate', value: stats.avgOpenRate, icon: Mail },
          { label: 'Avg Click Rate', value: stats.avgClickRate, icon: TrendingUp },
          { label: 'Sent This Month', value: stats.sentThisMonth.toLocaleString(), icon: Send },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-electron-blue/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-electron-blue" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'campaigns', label: 'Campaigns' },
            { key: 'templates', label: 'Templates' },
            { key: 'automation', label: 'Automation' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.key
                  ? 'bg-electron-blue text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'campaigns' && (
        <>
          {/* Filters */}
          <div className="glass-card p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search campaigns..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {['all', 'draft', 'scheduled', 'sending', 'sent'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status as any)}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                      statusFilter === status 
                        ? 'bg-electron-blue text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {status === 'all' ? 'All' : statusConfig[status as CampaignStatus].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Campaigns List */}
          <div className="space-y-4">
            {filteredCampaigns.map((campaign, i) => {
              const status = statusConfig[campaign.status]
              const openRate = campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : '0'
              const clickRate = campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : '0'
              
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{campaign.subject}</p>
                      <p className="text-xs text-gray-500">{campaign.date || 'Not scheduled'}</p>
                    </div>

                    {campaign.status === 'sent' && (
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-bold">{campaign.sent.toLocaleString()}</p>
                          <p className="text-gray-400 text-xs">Sent</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold">{openRate}%</p>
                          <p className="text-gray-400 text-xs">Opened</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold">{clickRate}%</p>
                          <p className="text-gray-400 text-xs">Clicked</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {campaign.status === 'draft' && (
                        <button className="px-4 py-2 rounded-lg bg-electron-blue hover:opacity-90 transition-opacity text-sm">
                          Send
                        </button>
                      )}
                      {campaign.status === 'scheduled' && (
                        <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm">
                          Edit
                        </button>
                      )}
                      {campaign.status === 'sent' && (
                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                          <BarChart3 className="w-5 h-5" />
                        </button>
                      )}
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-red-400">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </>
      )}

      {activeTab === 'templates' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTemplates.map((template, i) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 cursor-pointer hover:border-electron-blue/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-electron-blue/20 transition-colors">
                <Mail className="w-6 h-6 text-gray-400 group-hover:text-electron-blue transition-colors" />
              </div>
              <h3 className="font-semibold mb-1">{template.name}</h3>
              <p className="text-sm text-gray-400">{template.category}</p>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'automation' && (
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Welcome Series', trigger: 'New subscriber', emails: 3, status: 'active' },
            { name: 'Abandoned Cart', trigger: 'Cart abandoned', emails: 2, status: 'active' },
            { name: 'Post-Purchase', trigger: 'Order completed', emails: 2, status: 'paused' },
            { name: 'Win-Back', trigger: 'No purchase in 30 days', emails: 3, status: 'active' },
          ].map((automation, i) => (
            <motion.div
              key={automation.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{automation.name}</h3>
                  <p className="text-sm text-gray-400">Trigger: {automation.trigger}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  automation.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {automation.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{automation.emails} emails</p>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}