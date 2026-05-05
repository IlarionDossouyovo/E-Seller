'use client'

import { useState, useEffect, useRef, useDeferredValue, useTransition, memo } from 'react'
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
  Send,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react'

// AI Module definitions
const aiModules = [
  {
    id: 'product-intelligence',
    name: 'Intelligence artificielle produit',
    description: 'Analyser les tendances, évaluer les produits, détecter les contenus viraux',
    icon: Search,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'supplier-engine',
    name: 'Moteur de fournisseur d\'IA',
    description: 'Sélectionner les fournisseurs, calculer les marges, optimiser la logistique',
    icon: Factory,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'branding-generator',
    name: 'Générateur de marque IA',
    description: 'Générer des noms, des logos, une identité de marque',
    icon: Palette,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'ads-generator',
    name: 'Générateur de publicités IA',
    description: 'Création de publicités TikTok, scripts UGC, analyse de la concurrence',
    icon: Megaphone,
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'positioning-engine',
    name: 'Moteur de positionnement IA',
    description: 'Clients cibles, stratégies marketing, offres',
    icon: Target,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'market-analytics',
    name: 'Analyses du marché de l\'IA',
    description: 'Tableau de bord ROI, CPA, ROAS en temps réel',
    icon: BarChart3,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'business-assistant',
    name: 'Assistant commercial IA',
    description: 'Discutez de GPT pour des stratégies d\'optimisation',
    icon: Bot,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'recommendations',
    name: 'Recommandations ML',
    description: 'Suggestions de produits personnalisées',
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
  const [isListening, setIsListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const deferredInput = useDeferredValue(input)
  
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<any>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('')
          setInput(transcript)
        }
        
        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
      
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const speakResult = (text: string) => {
    if (!synthRef.current) return
    
    synthRef.current.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fr-FR'
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    synthRef.current.speak(utterance)
  }

  const handleModuleClick = (moduleId: string) => {
    startTransition(() => {
      setSelectedModule(moduleId)
      setResult(null)
      setError(null)
      setInput('')
    })
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
      {isPending && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm z-50">
          Chargement...
        </div>
      )}
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
            Cliquez sur un module pour commencer à utiliser les fonctionnalités d'IA
          </p>
        </motion.div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {aiModules.map((module, index) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`p-6 rounded-xl bg-gradient-to-br ${module.color} 
                hover:scale-105 transition-all duration-200 ease-out text-left cursor-pointer
                ${selectedModule === module.id ? 'ring-4 ring-white' : ''}`}
              style={{ willChange: 'transform' }}
            >
              <module.icon className="w-8 h-8 text-white mb-3" />
              <h3 className="font-semibold text-white mb-1">{module.name}</h3>
              <p className="text-xs text-white/80">{module.description}</p>
            </button>
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
                onChange={(e) => startTransition(() => setInput(e.target.value))}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={selectedModule === 'product-intelligence' 
                  ? 'Saisissez le nom du produit...'
                  : selectedModule === 'business-assistant'
                  ? 'Posez une question...'
                  : 'Saisissez un nom de produit...'
                }
                className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={toggleVoiceInput}
                className={`p-3 rounded-lg ${isListening ? 'bg-red-600' : 'bg-slate-600'} hover:bg-slate-500`}
                title=" Voice Input"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                <span>Générer</span>
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <span className="ml-3 text-slate-400">Génération en cours...</span>
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
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-slate-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">Résultat:</span>
                  <button
                    onClick={() => speakResult(typeof result === 'string' ? result : JSON.stringify(result))}
                    disabled={speaking}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    {speaking ? 'En lecture...' : 'Écouter'}
                  </button>
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap text-sm overflow-auto max-h-96">
                  {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                </pre>
              </motion.div>
            )}

            {/* Placeholder */}
            {!result && !loading && !error && (
              <div className="text-center py-12 text-slate-500">
                Saisissez un nom de produit ou une question, puis cliquez sur Générer
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}