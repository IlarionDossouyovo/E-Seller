'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  BarChart3, 
  FileText, 
  Link2, 
  MessageCircle, 
  Heart, 
  DollarSign, 
  Package, 
  Star, 
  Trophy,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Activity
} from 'lucide-react'

const workflows = [
  { 
    id: 'product-research', 
    name: 'Product Research', 
    icon: Search, 
    frequency: '1h', 
    status: 'inactive', 
    description: 'Recherche produits tendances dropshipping',
    href: '/dashboard/products',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'analytics-report', 
    name: 'Analytics Report', 
    icon: BarChart3, 
    frequency: '1 jour', 
    status: 'inactive', 
    description: 'Rapport analytique quotidien',
    href: '/dashboard/analytics',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'content-generator', 
    name: 'Content Generator', 
    icon: FileText, 
    frequency: '2h', 
    status: 'inactive', 
    description: 'Generation descriptions produits',
    href: '/dashboard/branding',
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    id: 'seo-optimizer', 
    name: 'SEO Optimizer', 
    icon: Link2, 
    frequency: '1 jour', 
    status: 'inactive', 
    description: 'Suggestions SEO',
    href: '/dashboard/seo',
    color: 'from-green-500 to-teal-500'
  },
  { 
    id: 'customer-support', 
    name: 'Customer Support', 
    icon: MessageCircle, 
    frequency: 'Temps reel', 
    status: 'inactive', 
    description: 'Reponses automatisees',
    href: '/dashboard/assistant',
    color: 'from-cyan-500 to-blue-500'
  },
  { 
    id: 'health-check', 
    name: 'Health Check', 
    icon: Heart, 
    frequency: '15 min', 
    status: 'inactive', 
    description: 'Verification services',
    href: '/dashboard',
    color: 'from-red-500 to-pink-500'
  },
  { 
    id: 'price-tracker', 
    name: 'Price Tracker', 
    icon: DollarSign, 
    frequency: '6h', 
    status: 'inactive', 
    description: 'Suivi prix concurrents',
    href: '/dashboard/competition-analysis',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'inventory-alert', 
    name: 'Inventory Alert', 
    icon: Package, 
    frequency: '4h', 
    status: 'inactive', 
    description: 'Alertes stock',
    href: '/dashboard/inventory',
    color: 'from-orange-500 to-red-500'
  },
  { 
    id: 'review-responder', 
    name: 'Review Responder', 
    icon: Star, 
    frequency: '2h', 
    status: 'inactive', 
    description: 'Reponses aux avis',
    href: '/dashboard/customer-reviews',
    color: 'from-yellow-500 to-amber-500'
  },
  { 
    id: 'competitor-analysis', 
    name: 'Competitor Analysis', 
    icon: Trophy, 
    frequency: '1 jour', 
    status: 'inactive', 
    description: 'Analyse concurrents',
    href: '/dashboard/competition-analysis',
    color: 'from-violet-500 to-purple-500'
  },
]

export default function SellerStackWorkflows() {
  const [activeWorkflows, setActiveWorkflows] = useState<string[]>([])
  
  const toggleWorkflow = (id: string) => {
    setActiveWorkflows(prev => 
      prev.includes(id) 
        ? prev.filter(w => w !== id)
        : [...prev, id]
    )
  }

  const isActive = (id: string) => activeWorkflows.includes(id)

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Seller Stack Automations</h1>
          <p className="text-sm text-yellow-400 mt-1">Reserve aux fondateurs uniquement</p>
        </div>
        <Link href="/dashboard/seller-stack" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
          <Settings className="w-4 h-4" />
          Configuration
        </Link>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 mb-8 border border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">localhost:5679</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">PostgreSQL</span>
              <span className="text-green-400 text-sm">localhost:5432</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Ollama</span>
              <span className="text-green-400 text-sm">192.168.10.96:11434</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{activeWorkflows.length}/10</div>
            <div className="text-sm text-gray-400">workflows actifs</div>
          </div>
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {workflows.map((wf) => {
          const active = isActive(wf.id)
          const Icon = wf.icon
          
          return (
            <Link
              key={wf.id}
              href={wf.href}
              className={`relative p-5 rounded-xl bg-gradient-to-br ${wf.color} 
                hover:scale-105 transition-all duration-200 ease-out cursor-pointer
                ${active ? 'ring-4 ring-white shadow-lg shadow-white/20' : 'opacity-80 hover:opacity-100'}`}
            >
              {/* Status indicator */}
              <div className="absolute top-3 right-3">
                {active ? (
                  <div className="bg-white/20 p-1 rounded-full">
                    <Activity className="w-4 h-4 text-white animate-pulse" />
                  </div>
                ) : (
                  <div className="bg-black/20 p-1 rounded-full">
                    <Pause className="w-4 h-4 text-white/60" />
                  </div>
                )}
              </div>
              
              <Icon className="w-8 h-8 text-white mb-3" />
              <h3 className="font-bold text-white mb-1">{wf.name}</h3>
              <p className="text-xs text-white/80 mb-3">{wf.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-white/60">
                  <Clock className="w-3 h-3" />
                  {wf.frequency}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleWorkflow(wf.id)
                  }}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    active 
                      ? 'bg-white text-gray-900' 
                      : 'bg-white/20 text-white hover:bg-white/40'
                  }`}
                >
                  {active ? 'Actif' : 'Activer'}
                </button>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/seller-stack" className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="font-bold text-white">Recharger Config</h3>
            </div>
          </div>
        </Link>
        
        <Link href="/dashboard/seller-stack" className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-purple-500 transition-colors">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="font-bold text-white">Tester Ollama</h3>
              <p className="text-sm text-gray-400">Verifier la connexion Ollama</p>
            </div>
          </div>
        </Link>
        
        <Link href="/dashboard" className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-green-500 transition-colors">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="font-bold text-white">Dashboard</h3>
              <p className="text-sm text-gray-400">Retour au dashboard principal</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}