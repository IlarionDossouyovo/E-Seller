'use client'

import { useState } from 'react'
import Link from 'next/link'

const workflows = [
  { id: 1, name: 'Product Research', icon: '🔍', frequency: '1h', status: 'inactive', description: 'Recherche produits tendances dropshipping' },
  { id: 2, name: 'Analytics Report', icon: '📊', frequency: '1 jour', status: 'inactive', description: 'Rapport analytique quotidien' },
  { id: 3, name: 'Content Generator', icon: '✍️', frequency: '2h', description: 'Génération descriptions produits' },
  { id: 4, name: 'SEO Optimizer', icon: '🔗', frequency: '1 jour', status: 'inactive', description: 'Suggestions SEO' },
  { id: 5, name: 'Customer Support', icon: '💬', frequency: 'Temps réel', status: 'inactive', description: 'Réponses automatisées' },
  { id: 6, name: 'Health Check', icon: '❤️', frequency: '15 min', status: 'inactive', description: 'Vérification services' },
  { id: 7, name: 'Price Tracker', icon: '💰', frequency: '6h', status: 'inactive', description: 'Suivi prix concurrents' },
  { id: 8, name: 'Inventory Alert', icon: '📦', frequency: '4h', status: 'inactive', description: 'Alertes stock' },
  { id: 9, name: 'Review Responder', icon: '⭐', frequency: '2h', status: 'inactive', description: 'Réponses aux avis' },
  { id: 10, name: 'Competitor Analysis', icon: '🏆', frequency: '1 jour', status: 'inactive', description: 'Analyse concurrents' },
]

export default function SellerStackWorkflows() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">🤖 Seller Stack Automations</h1>
          <p className="text-gray-500">10 workflows AI configurés avec Ollama</p>
        </div>
        <Link href="/dashboard/seller-stack" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          ⚙️ Configuration
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {workflows.map((wf) => (
          <div key={wf.id} className="border rounded-lg p-4 hover:shadow-lg transition">
            <div className="text-3xl mb-2">{wf.icon}</div>
            <h3 className="font-bold text-lg">{wf.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{wf.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{wf.frequency}</span>
              <span className={`text-xs px-2 py-1 rounded ${wf.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {wf.status === 'active' ? '✅ Actif' : '⏸ Inactif'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="font-bold text-lg mb-2">📋 Statut des Services</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-3 rounded">
            <div className="text-2xl">🐳</div>
            <div className="font-bold">N8N</div>
            <div className="text-green-600 text-sm">localhost:5679</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-2xl">🐘</div>
            <div className="font-bold">PostgreSQL</div>
            <div className="text-green-600 text-sm">localhost:5432</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="text-2xl">🤖</div>
            <div className="font-bold">Ollama</div>
            <div className="text-green-600 text-sm">192.168.10.96:11434</div>
          </div>
        </div>
      </div>
    </div>
  )
}