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
  { icon: Target, label: 'Analyze Products', prompt: 'Analyze my top 5 products and suggest improvements' },
  { icon: TrendingUp, label: 'Optimize Ads', prompt: 'Review my ad campaigns and suggest optimizations' },
  { icon: DollarSign, label: 'Pricing Strategy', prompt: 'Help me set optimal pricing for new products' },
  { icon: Package, label: 'Find Suppliers', prompt: 'Find reliable suppliers for my product niche' },
  { icon: BarChart3, label: 'Analytics', prompt: 'Explain my recent analytics trends' },
  { icon: Lightbulb, label: 'Business Tips', prompt: 'Give me tips to increase conversions' },
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content: "Hello! I'm your AI Business Assistant. I'm here to help you with:\n\n• Product analysis and trends\n• Ad campaign optimization\n• Pricing strategies\n• Supplier recommendations\n• Business growth tips\n\nHow can I help you today?",
      timestamp: new Date(),
      suggestions: ['Find winning products', 'Optimize my ads', 'Pricing strategy'],
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)
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
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('product') || lowerQuery.includes('winning')) {
      return "Based on my analysis of your store, here are the top 3 winning products:\n\n1. **Wireless Earbuds Pro** - ROAS: 4.2x, 312 orders\n2. **Smart Watch Ultra** - ROAS: 3.8x, 245 orders\n3. **LED Desk Lamp** - ROAS: 3.2x, 189 orders\n\nRecommendations:\n• Focus ad budget on Earbuds (highest ROAS)\n• Consider raising price by $5-10 for Earbuds (high demand)\n• Test new variants for Smart Watch"
    }
    
    if (lowerQuery.includes('ad') || lowerQuery.includes('campaign')) {
      return "I've analyzed your ad campaigns. Here are the key findings:\n\n**Underperforming:**\n• Summer Sale Ads - ROAS: 0.8 (pause or revise)\n• Brand Awareness - ROAS: 1.2 (repurpose)\n\n**Top Performers:**\n• Product Demo TikTok - ROAS: 4.5x\n• UGC Testimonial - ROAS: 4.1x\n\n**Suggested Actions:**\n1. Increase budget on top performers by 30%\n2. A/B test new hooks on underperformers\n3. Update creative for brand awareness campaign"
    }
    
    if (lowerQuery.includes('price') || lowerQuery.includes('pricing')) {
      return "For optimal pricing strategy, I recommend:\n\n**Premium Tier:**\n• Price point: $79-99\n• Target: Quality-focused buyers\n• Bundle with accessories\n\n**Mid-Range:**\n• Price point: $49-59\n• Best seller potential\n• Include premium packaging\n\n**Entry:**\n• Price point: $29-35\n• Lead generation\n• Upsell to premium later\n\n**Current recommendation:** Test $54.99 with 15% discount for first buyers."
    }

    return "I'm here to help you grow your e-commerce business. You can ask me about:\n\n• Product research and winning products\n• Ad campaign optimization\n• Pricing strategies\n• Supplier finding\n• Analytics insights\n• Marketing tips\n\nWhat would you like to explore?"
  }

  const getSuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('product')) {
      return ['Show more products', 'Get supplier info', 'Analyze competition']
    }
    
    if (lowerQuery.includes('ad')) {
      return ['Generate new ads', 'View campaign details', 'Budget recommendations']
    }

    return ['Tell me more', 'Show details', 'Give me actionable steps']
  }

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt)
  }

  const copyMessage = (content: string, id: number) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Quick Actions */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-electron-blue" />
          <span className="text-sm text-gray-400">Quick Actions</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleQuickAction(action.prompt)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
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
                          onClick={() => copyMessage(message.content, message.id)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          title="Copy"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Good response">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" title="Bad response">
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
              placeholder="Ask me anything about your business..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
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
    </div>
  )
}