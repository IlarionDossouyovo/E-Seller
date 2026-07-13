'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Play,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Bot,
  Brain,
  Search,
  Palette,
  Megaphone,
  BarChart3,
  MessageCircle,
  Sparkles,
  Zap,
  Settings,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Target,
  Package,
  Users,
  CreditCard,
  Truck
} from 'lucide-react'

const demoSections = [
  {
    id: 'dashboard',
    title: 'Dashboard Principal',
    description: 'Vue d\'ensemble de votre e-commerce avec statistiques en temps reel',
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-500',
    href: '/dashboard'
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: '8 modules AI pour analyser, generer et optimiser votre business',
    icon: Bot,
    color: 'from-purple-500 to-pink-500',
    href: '/dashboard/ai'
  },
  {
    id: 'products',
    title: 'Product Research',
    description: 'Recherche de produits gagnants avec analyse IA',
    icon: Search,
    color: 'from-green-500 to-teal-500',
    href: '/dashboard/products'
  },
  {
    id: 'branding',
    title: 'Brand Generator',
    description: 'Generation automatique de logos, noms et identite de marque',
    icon: Palette,
    color: 'from-yellow-500 to-orange-500',
    href: '/dashboard/branding'
  },
  {
    id: 'ads',
    title: 'Ads Generator',
    description: 'Creation de publicites TikTok et scripts UGC',
    icon: Megaphone,
    color: 'from-red-500 to-pink-500',
    href: '/dashboard/ads'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Tableau de bord ROI, CPA, ROAS en temps reel',
    icon: BarChart3,
    color: 'from-indigo-500 to-purple-500',
    href: '/dashboard/analytics'
  },
  {
    id: 'assistant',
    title: 'AI Assistant',
    description: 'Chat avec GPT pour strategies d\'optimisation',
    icon: MessageCircle,
    color: 'from-cyan-500 to-blue-500',
    href: '/dashboard/assistant'
  },
  {
    id: 'workflows',
    title: 'Automations',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    href: '/dashboard/seller-stack-workflows'
  },
  {
    id: 'inventory',
    title: 'Inventory',
    description: 'Gestion des stocks et alertes automatiques',
    icon: Package,
    color: 'from-orange-500 to-red-500',
    href: '/dashboard/inventory'
  },
  {
    id: 'suppliers',
    title: 'Suppliers',
    description: 'Gestion des fournisseurs et calcul des marges',
    icon: Truck,
    color: 'from-green-500 to-emerald-500',
    href: '/dashboard/suppliers'
  },
  {
    id: 'customers',
    title: 'Customers',
    description: 'Gestion des clients et segmentation',
    icon: Users,
    color: 'from-blue-500 to-indigo-500',
    href: '/dashboard/customers'
  },
  {
    id: 'payments',
    title: 'Payments',
    description: 'Integration Stripe et Electron-Pay',
    icon: CreditCard,
    color: 'from-purple-500 to-violet-500',
    href: '/dashboard/payments'
  }
]

export default function DemoPage() {
  const [currentSection, setCurrentSection] = useState(0)

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % demoSections.length)
  }

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + demoSections.length) % demoSections.length)
  }

  const current = demoSections[currentSection]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour a l'accueil
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Section {currentSection + 1} / {demoSections.length}</span>
              <div className="flex gap-2">
                <button 
                  onClick={prevSection}
                  className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button 
                  onClick={nextSection}
                  className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Demo Interactive
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Decouvrez <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">E-Seller</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Parcourez toutes les fonctionnalites de la plateforme e-commerce IA la plus avancee
          </p>
        </div>

        {/* Current Section Preview */}
        <div className="mb-12">
          <div className={`bg-gradient-to-br ${current.color} rounded-2xl p-12 text-center`}>
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {(() => {
                const Icon = current.icon
                return <Icon className="w-12 h-12 text-white" />
              })()}
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{current.title}</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">{current.description}</p>
            <Link 
              href={current.href}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              <Play className="w-5 h-5" />
              Essayer cette section
            </Link>
          </div>
        </div>

        {/* All Sections Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Toutes les sections</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {demoSections.map((section, index) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className={`bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-blue-500 transition-colors ${
                    index === currentSection ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${section.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">{section.title}</h4>
                  <p className="text-gray-500 text-xs line-clamp-2">{section.description}</p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-6">Vous voulez acceder a toutes ces fonctionnalites?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Acceder au Dashboard
            </Link>
            <Link 
              href="/contact" 
              className="bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Demander un Acces
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}