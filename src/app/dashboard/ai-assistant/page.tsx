'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Bot, Send, Settings, User, Clock, CheckCircle, XCircle, AlertTriangle, BarChart3, Download, Play, Pause, RefreshCw, Sparkles, Zap, Brain, Phone, Mail, ShoppingCart, HelpCircle, FileText, Cpu, Database, Shield, Plus, Search, Filter, Edit, Trash2, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const conversations = [
  { id: 'C1', customer: 'John Smith', message: 'Où est ma commande?', time: 'Il y a 2 min', status: 'unread', priority: 'high' },
  { id: 'C2', customer: 'Marie Dubois', message: 'Comment retourner un produit?', time: 'Il y a 5 min', status: 'open', priority: 'medium' },
  { id: 'C3', customer: 'Hans Mueller', message: 'Livrez-vous en Allemagne?', time: 'Il y a 12 min', status: 'resolved', priority: 'low' },
  { id: 'C4', customer: 'Sarah Johnson', message: 'Le code promo ne fonctionne pas', time: 'Il y a 1h', status: 'open', priority: 'high' },
]

const responses = [
  { trigger: 'Où est ma commande', response: 'Je peux vous aider à suivre votre commande. Veuillez fournir votre numéro de commande.', category: 'Livraison' },
  { trigger: 'Politique de retour', response: 'Vous pouvez retourner tout produit dans les 30 jours suivant la livraison. Visitez notre page retours pour plus de détails.', category: 'Retours' },
  { trigger: 'Pays de livraison', response: 'Nous livrons dans plus de 190 pays! Les coûts de livraison varient selon la localisation.', category: 'Livraison' },
  { trigger: 'Code promo', response: 'Laissez-moi vérifier ce code pour vous. Pourriez-vous partager le code?', category: 'Commandes' },
]

const analytics = {
  totalChats: 1245,
  resolved: 1089,
  avgResponseTime: '1.2 min',
  satisfaction: '94.5%',
}

export default function AIChatbotPage() {
  const [activeTab, setActiveTab] = useState('chat')
  const [selectedChat, setSelectedChat] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [chatEnabled, setChatEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Assistant Chatbot IA</h1>
              <p className="text-gray-400">Automatiser le support client</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Statut du Chat:</span>
            <button onClick={() => setChatEnabled(!chatEnabled)} className={`px-4 py-2 rounded-xl flex items-center gap-2 ${chatEnabled ? 'bg-green-500' : 'bg-red-500'}`}>
              {chatEnabled ? <><Play className="w-4 h-4" /> En ligne</> : <><Pause className="w-4 h-4" /> Hors ligne</>}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{analytics.totalChats}</p>
          <p className="text-sm text-gray-400">Chats Totaux</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{analytics.resolved}</p>
          <p className="text-sm text-gray-400">Résolus</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-teal-400">{analytics.avgResponseTime}</p>
          <p className="text-sm text-gray-400">Temps Moyen</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{analytics.satisfaction}</p>
          <p className="text-sm text-gray-400">Satisfaction</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'chat', label: 'Chat' },
          { key: 'responses', label: 'Réponses' },
          { key: 'analytics', label: 'Analytiques' },
          { key: 'settings', label: 'Paramètres' }
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-xl ${activeTab === tab.key ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300'} transition-colors`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'chat' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Rechercher des conversations..." className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-9 pr-4 py-2 text-white placeholder-gray-400" />
              </div>
            </div>
            <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
              {conversations.map((chat) => (
                <motion.button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className={`w-full p-4 text-left ${selectedChat.id === chat.id ? 'bg-emerald-500/20 border-l-2 border-emerald-500' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{chat.customer}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      chat.status === 'unread' ? 'bg-blue-500/20 text-blue-400' :
                      chat.status === 'open' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>{chat.status === 'unread' ? 'Non lu' : chat.status === 'open' ? 'Ouvert' : 'Résolu'}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{chat.message}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {chat.time}</span>
                    <span className={`px-1 py-0.5 rounded ${chat.priority === 'high' ? 'bg-red-500/20 text-red-400' : chat.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>{chat.priority === 'high' ? 'Haute' : chat.priority === 'medium' ? 'Moyenne' : 'Basse'}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2 glass-card flex flex-col">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold">{selectedChat.customer}</p>
                  <p className="text-sm text-gray-400">En ligne</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 rounded-lg"><Settings className="w-4 h-4" /></button>
                <button className="p-2 bg-white/5 rounded-lg"><Sparkles className="w-4 h-4 text-emerald-400" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">CS</div>
                <div className="bg-white/5 rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm">Bonjour! Comment puis-je vous aider?</p>
                </div>
              </div>
              <div className="flex gap-2 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold">JS</div>
                <div className="bg-emerald-500/20 rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm">{selectedChat.message}</p>
                </div>
              </div>
              {selectedChat.status === 'unread' && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-3 max-w-[70%]">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">Suggestion IA</span>
                    </div>
                    <p className="text-sm">Je peux vous aider à suivre votre commande. Laissez-moi vérifier le statut...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2 mb-3 overflow-x-auto">
                <button onClick={() => alert('Suivre la commande')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm whitespace-nowrap text-white transition-colors">Suivre Commande</button>
                <button onClick={() => alert('Politique de retour')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm whitespace-nowrap text-white transition-colors">Politique de Retour</button>
                <button onClick={() => alert('Info livraison')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm whitespace-nowrap text-white transition-colors">Info Livraison</button>
                <button onClick={() => alert('Code promo')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm whitespace-nowrap text-white transition-colors">Code Promo</button>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Tapez un message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2"
                />
                <button className="px-4 py-2 bg-emerald-500 rounded-xl">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'responses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Modèles de Réponses IA</h3>
            <button onClick={() => alert('Ajouter un modèle!')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-2 text-white transition-colors">
              <Plus className="w-4 h-4" /> Ajouter un Modèle
            </button>
          </div>
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr className="text-left text-sm text-gray-400">
                  <th className="p-4">Déclencheur</th>
                  <th className="p-4">Réponse</th>
                  <th className="p-4">Catégorie</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((resp, i) => (
                  <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                    <td className="p-4 font-medium">{resp.trigger}</td>
                    <td className="p-4 text-gray-400 text-sm max-w-xs truncate">{resp.response}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-white/5 rounded text-xs">{resp.category}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-white/10 rounded"><Edit className="w-4 h-4" /></button>
                        <button className="p-1 hover:bg-white/10 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Volume de Chats</h3>
            <div className="h-48 flex items-end gap-2">
              {[45, 62, 78, 55, 89, 95, 102, 88, 76, 95, 110, 125].map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: `${value}%` }}
                    transition={{ delay: i * 0.05 }}
                    className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Performance des Réponses</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <p className="font-medium text-green-400">Réponse Auto IA: 67%</p>
                <p className="text-sm text-gray-400">Des chats gérés automatiquement</p>
              </div>
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <p className="font-medium text-blue-400">Transfert Humain: 33%</p>
                <p className="text-sm text-gray-400">Escaladés vers des agents humains</p>
              </div>
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                <p className="font-medium text-yellow-400">Temps Moyen de Résolution: 4.2 min</p>
                <p className="text-sm text-gray-400">Incluant IA + humain</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-2xl">
          <h3 className="font-semibold mb-4">Paramètres du Chatbot</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="font-medium">Réponse Auto IA</p>
                  <p className="text-sm text-gray-400">Activer l'IA pour répondre automatiquement</p>
                </div>
              </div>
              <button onClick={() => alert('Paramètres de réponse auto')} className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-medium">Réponses Rapides</p>
                  <p className="text-sm text-gray-400">Afficher les réponses suggérées</p>
                </div>
              </div>
              <button onClick={() => alert('Paramètres des réponses rapides')} className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Heures d'Ouverture</p>
                  <p className="text-sm text-gray-400">24/7 ou heures spécifiques</p>
                </div>
              </div>
              <button onClick={() => alert('Configurer les heures d\'ouverture')} className="px-4 py-1 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm text-white transition-colors">Configurer</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">Escalade Humaine</p>
                  <p className="text-sm text-gray-400">Autoriser le transfert vers les agents</p>
                </div>
              </div>
              <button onClick={() => alert('Paramètres d\'escalade')} className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard/ai-chatbot" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          AI Chatbot
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}