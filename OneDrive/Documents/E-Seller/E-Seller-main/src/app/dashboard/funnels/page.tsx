'use client'

import { useState } from 'react'
import { motion, Reorder } from 'framer-motion'
import { 
  GitBranch, 
  Plus, 
  Trash2, 
  Edit, 
  Copy, 
  Play, 
  Pause,
  ArrowRight,
  Mail,
  Zap,
  ShoppingCart,
  Users,
  MessageSquare,
  ExternalLink,
  Settings,
  GripVertical
} from 'lucide-react'

type StepType = 'landing' | 'email' | 'upsell' | 'checkout' | 'thankyou' | 'delay'

interface FunnelStep {
  id: string
  type: StepType
  name: string
  description: string
}

interface Funnel {
  id: number
  name: string
  steps: FunnelStep[]
  status: 'draft' | 'active' | 'paused'
  conversions: number
  revenue: number
}

const mockFunnels: Funnel[] = [
  {
    id: 1,
    name: 'Product Launch Funnel',
    status: 'active',
    conversions: 234,
    revenue: 15680,
    steps: [
      { id: '1', type: 'landing', name: 'Landing Page', description: 'Product sales page' },
      { id: '2', type: 'email', name: 'Welcome Email', description: 'Thank you + next steps' },
      { id: '3', type: 'upsell', name: 'Upsell Offer', description: 'Premium package' },
      { id: '4', type: 'checkout', name: 'Checkout', description: 'Payment page' },
    ],
  },
  {
    id: 2,
    name: 'Lead Magnet Funnel',
    status: 'active',
    conversions: 567,
    revenue: 8500,
    steps: [
      { id: '1', type: 'landing', name: 'Squeeze Page', description: 'Free guide download' },
      { id: '2', type: 'email', name: 'Deliver PDF', description: 'Send the guide' },
      { id: '3', type: 'email', name: 'Follow Up', description: 'Tips and tricks' },
    ],
  },
  {
    id: 3,
    name: 'Webinar Funnel',
    status: 'draft',
    conversions: 0,
    revenue: 0,
    steps: [
      { id: '1', type: 'landing', name: 'Registration Page', description: 'Webinar sign up' },
      { id: '2', type: 'email', name: 'Reminder Emails', description: '3 reminders' },
      { id: '3', type: 'landing', name: 'Webinar Page', description: 'Watch page' },
    ],
  },
]

const stepIcons = {
  landing: ExternalLink,
  email: Mail,
  upsell: Zap,
  checkout: ShoppingCart,
  thankyou: MessageSquare,
  delay: Users,
}

const stepColors = {
  landing: 'from-blue-500 to-cyan-500',
  email: 'from-purple-500 to-pink-500',
  upsell: 'from-yellow-500 to-orange-500',
  checkout: 'from-green-500 to-emerald-500',
  thankyou: 'from-indigo-500 to-purple-500',
  delay: 'from-gray-500 to-slate-500',
}

export default function FunnelsPage() {
  const [funnels] = useState(mockFunnels)
  const [selectedFunnel, setSelectedFunnel] = useState<Funnel | null>(null)
  const [activeTab, setActiveTab] = useState<'funnels' | 'builder'>('funnels')

  const stats = {
    totalFunnels: funnels.length,
    activeFunnels: funnels.filter(f => f.status === 'active').length,
    totalConversions: funnels.reduce((sum, f) => sum + f.conversions, 0),
    totalRevenue: funnels.reduce((sum, f) => sum + f.revenue, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-sora)]">Funnel Builder</h1>
          <p className="text-gray-400">Create automated marketing funnels</p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Funnel
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Funnels', value: stats.totalFunnels, icon: GitBranch },
          { label: 'Active', value: stats.activeFunnels, icon: Play },
          { label: 'Conversions', value: stats.totalConversions, icon: Users },
          { label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: ShoppingCart },
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

      {/* Funnels List */}
      <div className="grid md:grid-cols-3 gap-6">
        {funnels.map((funnel, i) => (
          <motion.div
            key={funnel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => {
              setSelectedFunnel(funnel)
              setActiveTab('builder')
            }}
            className="glass-card p-6 cursor-pointer hover:border-electron-blue/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{funnel.name}</h3>
                <p className="text-sm text-gray-400">{funnel.steps.length} steps</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                funnel.status === 'active' 
                  ? 'bg-green-500/20 text-green-400' 
                  : funnel.status === 'paused'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {funnel.status}
              </span>
            </div>

            {/* Steps Preview */}
            <div className="flex items-center gap-1 mb-4 overflow-x-auto py-2">
              {funnel.steps.map((step, j) => {
                const Icon = stepIcons[step.type]
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stepColors[step.type]} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {j < funnel.steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-500 mx-1" />
                    )}
                  </div>
                )
              })}
            </div>

            {funnel.status !== 'draft' && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs text-gray-400">Conversions</p>
                  <p className="font-bold">{funnel.conversions}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Revenue</p>
                  <p className="font-bold">${funnel.revenue.toLocaleString()}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                Edit
              </button>
              <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                {funnel.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Funnel Builder Preview */}
      {activeTab === 'builder' && selectedFunnel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">{selectedFunnel.name}</h2>
              <p className="text-gray-400">{selectedFunnel.steps.length} steps</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 text-sm">
                <Play className="w-4 h-4" />
                Launch
              </button>
            </div>
          </div>

          {/* Visual Funnel */}
          <div className="flex items-center justify-center gap-4 overflow-x-auto py-8">
            {selectedFunnel.steps.map((step, i) => {
              const Icon = stepIcons[step.type]
              return (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stepColors[step.type]} flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                      <p className="text-sm font-medium">{step.name}</p>
                      <p className="text-xs text-gray-500">{step.type}</p>
                    </div>
                    <button className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <GripVertical className="w-3 h-3" />
                    </button>
                  </motion.div>
                  {i < selectedFunnel.steps.length - 1 && (
                    <div className="mx-4">
                      <ArrowRight className="w-6 h-6 text-gray-500" />
                      <p className="text-xs text-gray-600 text-center mt-1">↓</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Add Step */}
          <div className="mt-12 text-center">
            <button className="px-6 py-3 rounded-xl border border-dashed border-white/20 hover:border-electron-blue hover:bg-electron-blue/5 transition-colors flex items-center gap-2 mx-auto">
              <Plus className="w-5 h-5" />
              Add Step
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}