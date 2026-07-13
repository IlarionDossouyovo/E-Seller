'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Database, 
  Cpu, 
  Activity, 
  Server,
  Zap,
  ShoppingCart,
  TrendingUp,
  Users,
  Package,
  FileText,
  Search,
  Eye,
  Play,
  Settings,
  Workflow
} from 'lucide-react'
import Link from 'next/link'

const services = [
  { name: 'Ollama AI', status: 'online', icon: Cpu, url: 'http://localhost:11434' },
  { name: 'PostgreSQL', status: 'online', icon: Database, url: 'localhost:5432' },
]

const departments = [
  { id: 'products', name: 'Product Director', description: 'Recherche produits IA', icon: Search },
  { id: 'branding', name: 'Brand Director', description: 'Création identité de marque', icon: Bot },
  { id: 'ads', name: 'Ads Director', description: 'Publicités & UGC', icon: TrendingUp },
  { id: 'analytics', name: 'Analytics Director', description: 'Métriques & rapports', icon: Activity },
  { id: 'assistant', name: 'Assistant Director', description: 'Support client 24/7', icon: Users },
  { id: 'seo', name: 'SEO Director', description: 'Référencement naturel', icon: Eye },
  { id: 'ai-assistant', name: 'Content Director', description: 'Contenu marketing', icon: FileText },
  { id: 'health', name: 'Health Director', description: 'Surveillance système', icon: Server },
  { id: 'maintenance', name: 'Maintenance Director', description: 'Maintenance & sécurité', icon: Settings },
]

const stats = [
  { label: 'Produits', value: '156', icon: Package, change: '+12%' },
  { label: 'Commandes', value: '89', icon: ShoppingCart, change: '+8%' },
  { label: 'Clients', value: '342', icon: Users, change: '+15%' },
  { label: 'Revenus', value: '€12.4k', icon: TrendingUp, change: '+23%' },
]

export default function SellerStackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Seller Stack</h1>
            <p className="text-slate-400">AI Director System - Gestion Centralisée</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Système Opérationnel
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800/50 rounded-xl p-5 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-6 h-6 text-blue-400" />
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Services */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-5 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              Services Connectés
            </h2>
          </div>
          <div className="p-5 space-y-3">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{service.name}</p>
                    <p className="text-slate-400 text-sm">{service.url}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                  En ligne
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-5 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              Départements AI
            </h2>
          </div>
          <div className="p-5 grid grid-cols-2 gap-3">
            {departments.map((dept) => (
              <motion.div
                key={dept.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500/50 cursor-pointer"
              >
                <Link href={`/dashboard/${dept.id}`}>
                  <dept.icon className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-white font-medium text-sm">{dept.name}</p>
                  <p className="text-slate-400 text-xs">{dept.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-slate-800/50 rounded-xl border border-slate-700 p-5">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-yellow-400" />
          Actions Rapides
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/dashboard/products" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-blue-500 text-left">
            <Search className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white font-medium">Recherche Produit</p>
          </Link>
          <Link href="/dashboard/branding" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500 text-left">
            <Bot className="w-5 h-5 text-purple-400 mb-2" />
            <p className="text-white font-medium">Générer Marque</p>
          </Link>
          <Link href="/dashboard/analytics" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-green-500 text-left">
            <Activity className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-white font-medium">Analytique</p>
          </Link>
          <Link href="/dashboard/bi-reports" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-yellow-500 text-left">
            <FileText className="w-5 h-5 text-yellow-400 mb-2" />
            <p className="text-white font-medium">Rapport</p>
          </Link>
          <Link href="/dashboard/seller-stack-workflows" className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-blue-500 text-left block">
            <Workflow className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white font-medium">10 Automations</p>
          </Link>
        </div>
      </div>
    </div>
  )
}