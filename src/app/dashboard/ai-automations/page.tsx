'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Settings, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Loader2,
  Zap,
  GitBranch,
  RotateCcw
} from 'lucide-react'
import Link from 'next/link'

// Predefined automation chains
const automationChains = [
  {
    id: 'product-research',
    name: 'Recherche produit automatique',
    description: 'Analyse produit → Fournisseurs → Positioning',
    icon: '🔍',
    modules: ['product-intelligence', 'supplier-engine', 'positioning-engine']
  },
  {
    id: 'full-branding',
    name: 'Création marque complète',
    description: 'Génère nom → Logo → Packaging → Storytelling',
    icon: '🎨',
    modules: ['product-intelligence', 'branding-generator']
  },
  {
    id: 'ad-campaign',
    name: 'Campagne publicitaire',
    description: 'Analyse → Ads → UGC Scripts',
    icon: '📺',
    modules: ['product-intelligence', 'ads-generator']
  },
  {
    id: 'market-analysis',
    name: 'Analyse marché',
    description: 'Analytics → Recommendations → Trends',
    icon: '📊',
    modules: ['market-analytics', 'recommendations']
  },
  {
    id: 'full-launch',
    name: 'Lancement complet',
    description: 'Produit → Marque → Ads → Analytics',
    icon: '🚀',
    modules: ['product-intelligence', 'branding-generator', 'supplier-engine', 'positioning-engine', 'ads-generator', 'market-analytics']
  },
  {
    id: 'ai-business',
    name: 'Assistant IA complet',
    description: 'Questions → Stratégies → Optimisation',
    icon: '🤖',
    modules: ['business-assistant']
  }
]

export default function AIAutomations() {
  const [selectedChain, setSelectedChain] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runAutomation = async (chainId: string) => {
    // Show selection alert first
    const chain = automationChains.find(c => c.id === chainId)
    alert(`✅ "${chain?.name}" sélectionné!\n\nVeuillez entrer un produit puis cliquez sur "Lancer"`)
    
    setSelectedChain(chainId)
    setError(null)
    setResults(null)
    
    // If input already exists, run immediately
    if (input.trim() || chainId === 'ai-business') {
      setLoading(true)

      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Demo results
      setResults({
        success: true,
        automation: chain?.name || chainId,
        input: input,
        results: chain?.modules.map((mod, i) => ({
          module: mod,
          result: {
            status: 'success',
            data: `✅ Résultat de l'étape ${i + 1} pour: ${input || 'Assistant IA'}`
          }
        }))
      })
      
      setLoading(false)
      alert('🎉 Automation terminée avec succès!')
    }
  }

  const handleLaunch = async () => {
    if (!selectedChain) {
      setError('Veuillez sélectionner une automation ci-dessus')
      return
    }
    if (!input.trim() && selectedChain !== 'ai-business') {
      setError('Veuillez entrer un produit ou une question')
      return
    }

    setLoading(true)
    setError(null)
    setResults(null)

    // Simulate API call for demo
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const chain = automationChains.find(c => c.id === selectedChain)
    
    // Demo results
    setResults({
      success: true,
      automation: chain?.name || selectedChain,
      input: input,
      results: chain?.modules.map((mod, i) => ({
        module: mod,
        result: {
          status: 'success',
          data: `✅ Résultat de l'étape ${i + 1} pour: ${input || 'Assistant IA'}`
        }
      }))
    })
    
    setLoading(false)
    alert('🎉 Automation terminée avec succès!')
  }

  const reset = () => {
    setResults(null)
    setError(null)
    setSelectedChain(null)
    setInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-10 h-10 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">⚡ AI Automations</h1>
          </div>
          <p className="text-slate-400">
            Chaînez plusieurs modules IA pour des workflows automatisés
          </p>
        </motion.div>

        {/* Chain Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {automationChains.map((chain, index) => (
            <motion.button
              key={chain.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => runAutomation(chain.id)}
              disabled={loading}
              className={`p-6 rounded-xl text-left transition-all ${
                selectedChain === chain.id
                  ? 'ring-2 ring-yellow-500 bg-slate-700' 
                  : 'bg-slate-800 hover:bg-slate-750'
              }`}
            >
              <div className="text-3xl mb-3">{chain.icon}</div>
              <h3 className="font-semibold text-white mb-1">{chain.name}</h3>
              <p className="text-sm text-slate-400 mb-3">{chain.description}</p>
              
              {/* Module chain display */}
              <div className="flex flex-wrap gap-1">
                {chain.modules.map((mod, i) => (
                  <span key={mod} className="text-xs bg-slate-600 px-2 py-1 rounded flex items-center gap-1">
                    {i > 0 && <ArrowRight className="w-3 h-3" />}
                    {mod.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-xl p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Entrée pour l'automatisation
          </h2>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && selectedChain && runAutomation(selectedChain)}
              placeholder="Entrez un nom de produit ou une question..."
              className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            />
            <button
              onClick={reset}
              className="bg-slate-600 hover:bg-slate-500 px-4 py-3 rounded-lg"
              title="Réinitialiser"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handleLaunch}
              disabled={loading || !selectedChain}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              <span>Lancer</span>
            </button>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
            <span className="ml-3 text-slate-400">Traitement en cours...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-700 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">
                Résultat: {results.automation}
              </h3>
            </div>

            {/* Show each step result */}
            {results.results && (
              <div className="space-y-4">
                {results.results.map((step: any, index: number) => (
                  <div key={index} className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-sm">
                        Étape {index + 1}
                      </span>
                      <span className="text-white font-medium">{step.module}</span>
                    </div>
                    <pre className="text-slate-300 text-sm whitespace-pre-wrap">
                      {JSON.stringify(step.result, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour Dashboard
        </Link>
        <Link href="/dashboard/seller-stack-workflows" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          Workflows
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}