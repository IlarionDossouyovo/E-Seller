'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Zap,
  Lightbulb,
  Target,
  TrendingUp,
  DollarSign,
  Package,
  BarChart3
} from 'lucide-react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

const quickActions = [
  { icon: Target, label: 'Analyser Produits', prompt: 'Analyse mes 5 meilleurs produits et suggere des ameliorations' },
  { icon: TrendingUp, label: 'Optimiser Publicites', prompt: 'Examine mes campagnes publicitaires et suggere des optimisations' },
  { icon: DollarSign, label: 'Strategie Prix', prompt: 'Aide-moi a definir le prix optimal pour mes nouveaux produits' },
  { icon: Package, label: 'Trouver Fournisseurs', prompt: 'Trouve des fournisseurs fiables pour ma niche de produits' },
  { icon: BarChart3, label: 'Analytique', prompt: 'Explique-moi les tendances analytiques recentes' },
  { icon: Lightbulb, label: 'Conseils Business', prompt: 'Donne-moi des conseils pour augmenter les conversions' },
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content: "Bonjour! Je suis votre Assistant Business IA. Je suis la pour vous aider avec:\n\n• Analyse et tendances des produits\n• Optimisation des campagnes publicitaires\n• Strategies de tarification\n• Recommandations de fournisseurs\n• Conseils pour la croissance de votre entreprise\n\nComment puis-je vous aider aujourd'hui?",
      timestamp: new Date(),
      suggestions: ['Trouver produits gagnants', 'Optimiser mes publicites', 'Strategie de prix'],
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [notification, setNotification] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 2000))

    const aiResponse: Message = {
      id: messages.length + 1,
      role: 'assistant',
      content: getAIResponse(inputValue),
      timestamp: new Date(),
      suggestions: getSuggestions(inputValue),
    }

    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
    setNotification('Reponse generatee!')
    setTimeout(() => setNotification(null), 2000)
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('produit') || lowerQuery.includes('gagnant')) {
      return "D'apres mon analyse de votre boutique, voici les 3 produits gagnants:\n\n1. **Ecouteurs Sans Fil Pro** - ROAS: 4.2x, 312 commandes\n2. **Montre Connectee Ultra** - ROAS: 3.8x, 245 commandes\n3. **Lampe de Bureau LED** - ROAS: 3.2x, 189 commandes\n\nRecommandations:\n• Concentrez le budget publicitaire sur les Ecouteurs (ROAS le plus eleve)\n• Considerez une augmentation de prix de 5-10 EUR pour les Ecouteurs (forte demande)\n• Testez de nouvelles variantes pour la Montre Connectee"
    }
    
    if (lowerQuery.includes('publicite') || lowerQuery.includes('campagne')) {
      return "J'ai analyse vos campagnes publicitaires. Voici les resultats cls:\n\n**Sous-performantes:**\n• Publicites Soldes d'Ete - ROAS: 0.8 (pauser ou reviser)\n• Notoriete de Marque - ROAS: 1.2 (recycler)\n\n**Meilleures Performances:**\n• Demonstration Produit TikTok - ROAS: 4.5x\n• Temoignage UGC - ROAS: 4.1x\n\n**Actions Suggerees:**\n1. Augmentez le budget des meilleures performances de 30%\n2. Testez A/B de nouvelles accroches sur les sous-performantes\n3. Mettez a jour le creatif pour la campagne de notorieté"
    }
    
    if (lowerQuery.includes('prix') || lowerQuery.includes('tarif')) {
      return "Pour une strategie de tarification optimale, je recommande:\n\n**Tier Premium:**\n• Point de prix: 79-99 EUR\n• Cible: Acheteurs focalises sur la qualite\n• Bundle avec accessoires\n\n**Milieu de Gamme:**\n• Point de prix: 49-59 EUR\n• Potentiel meilleur vendeur\n• Emballage premium inclus\n\n**Entree de Gamme:**\n• Point de prix: 29-35 EUR\n• Generation de leads\n• Upsell vers premium plus tard\n\n**Recommandation actuelle:** Testez 54.99 EUR avec 15% de reduction pour les premiers acheteurs."
    }

    return "Je suis la pour vous aider a developper votre entreprise e-commerce. Vous pouvez me demander:\n\n• Recherche de produits et produits gagnants\n• Optimisation des campagnes publicitaires\n• Strategies de tarification\n• Recherche de fournisseurs\n• Insights analytiques\n• Conseils marketing\n\nQu'aimeriez-vous explorer?"
  }

  const getSuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('produit')) {
      return ['Afficher plus de produits', 'Info fournisseurs', 'Analyser la concurrence']
    }
    
    if (lowerQuery.includes('publicite')) {
      return ['Generer nouvelles publicites', 'Voir details campagne', 'Recommandations budget']
    }

    return ['Dis-moi en plus', 'Montre les details', 'Donne-moi des actions concretes']
  }

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt)
  }

  const copyMessage = (content: string, id: number) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setNotification('Message copie!')
    setTimeout(() => {
      setCopiedId(null)
      setNotification(null)
    }, 2000)
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Quick Actions */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-electron-blue" />
          <span className="text-sm text-gray-400">Actions Rapides</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                handleQuickAction(action.prompt)
                setNotification('Action selectionnee: ' + action.label)
                setTimeout(() => setNotification(null), 2000)
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-electron-blue/20 transition-colors text-sm border border-white/10 hover:border-electron-blue/30"
            >
              <action.icon className="w-4 h-4 text-electron-blue" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'assistant' 
                      ? 'bg-gradient-to-br from-electron-blue to-electron-purple' 
                      : 'bg-white/10'
                  }`}>
                    {message.role === 'assistant' ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <MessageSquare className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    message.role === 'assistant' 
                      ? 'bg-white/5' 
                      : 'bg-electron-blue/20 border border-electron-blue/20'
                  }`}>
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                    
                    {message.role === 'assistant' && (
                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => {
                            copyMessage(message.content, message.id)
                            setNotification('Message copie!')
                            setTimeout(() => setNotification(null), 2000)
                          }}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          title="Copier"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button onClick={() => { setNotification('Reponse notee comme positive!'); setTimeout(() => setNotification(null), 2000) }} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Bonne reponse">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setNotification('Reponse notee comme negative'); setTimeout(() => setNotification(null), 2000) }} className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Mauvaise reponse">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && message.role === 'assistant' && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickAction(suggestion)}
                        className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs text-gray-400"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full bg-gray-500"
                  />
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Posez-moi une question sur votre entreprise..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electron-blue/50 focus:bg-white/15 transition-colors backdrop-blur-sm"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="px-6 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}