'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Factory,
  Palette,
  Megaphone,
  Target,
  BarChart3,
  Bot,
  Sparkles,
  Loader2,
  Send
} from 'lucide-react'

// AI Module definitions
const aiModules = [
  {
    id: 'product-intelligence',
    name: 'AI Product Intelligence',
    description: 'Research trends, score products, detect viral items',
    icon: Search,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'supplier-engine',
    name: 'AI Supplier Engine',
    description: 'Match suppliers, calculate margins, optimize logistics',
    icon: Factory,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'branding-generator',
    name: 'AI Branding Generator',
    description: 'Generate names, logos, brand identity',
    icon: Palette,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'ads-generator',
    name: 'AI Ads Generator',
    description: 'Create TikTok ads, UGC scripts, competitor analysis',
    icon: Megaphone,
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'positioning-engine',
    name: 'AI Positioning Engine',
    description: 'Target customers, marketing angles, offers',
    icon: Target,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'market-analytics',
    name: 'AI Market Analytics',
    description: 'Real-time ROI, CPA, ROAS dashboard',
    icon: BarChart3,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'business-assistant',
    name: 'AI Business Assistant',
    description: 'Chat GPT for strategies and optimization',
    icon: Bot,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'recommendations',
    name: 'ML Recommendations',
    description: 'Personalized product suggestions',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500'
  }
]

export default function AIDashboard() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId)
    setResult(null)
    setError(null)
    setInput('')
  }

  const handleSubmit = async () => {
    if (!input.trim() || !selectedModule) return
    
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/ai/${selectedModule}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          product: input,
          message: input 
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'Failed to get response')
      }
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">
            🤖 AI Dashboard
          </h1>
          <p className="text-slate-400">
            Click any module to start using AI features
          </p>
        </motion.div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {aiModules.map((module, index) => (
            <motion.button
              key={module.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleModuleClick(module.id)}
              className={`p-6 rounded-xl bg-gradient-to-br ${module.color} 
                hover:scale-105 transition-transform text-left
                ${selectedModule === module.id ? 'ring-4 ring-white' : ''}`}
            >
              <module.icon className="w-8 h-8 text-white mb-3" />
              <h3 className="font-semibold text-white mb-1">{module.name}</h3>
              <p className="text-xs text-white/80">{module.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Selected Module Interface */}
        {selectedModule && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-slate-800 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              {aiModules.find(m => m.id === selectedModule)?.name}
            </h2>

            {/* Input */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={selectedModule === 'product-intelligence' 
                  ? 'Enter product name (e.g., wireless earbuds)'
                  : selectedModule === 'business-assistant'
                  ? 'Ask a question...'
                  : 'Enter product name...'
                }
                className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                <span>Generate</span>
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <span className="ml-3 text-slate-400">Generating...</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <div className="bg-slate-700 rounded-lg p-4">
                <pre className="text-slate-300 whitespace-pre-wrap text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            {/* Placeholder */}
            {!result && !loading && !error && (
              <div className="text-center py-12 text-slate-500">
                Enter a product name or question and click Generate
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}