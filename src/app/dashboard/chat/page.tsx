'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Send, 
  User, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  Circle,
  MoreVertical,
  Search,
  Archive,
  Star,
  AlertCircle
} from 'lucide-react'

type Chat = {
  id: number
  customer: string
  avatar: string
  lastMessage: string
  time: string
  status: 'active' | 'pending' | 'closed'
  unread: number
  rating?: number
}

const mockChats: Chat[] = [
  { id: 1, customer: 'Sophie Martin', avatar: '👩', lastMessage: 'Quand arrivera ma commande?', time: '2 min', status: 'active', unread: 2 },
  { id: 2, customer: 'Marc Dubois', avatar: '👨', lastMessage: 'Merci pour votre aide!', time: '15 min', status: 'closed', rating: 5, unread: 0 },
  { id: 3, customer: 'Emma Bernard', avatar: '👩‍🦰', lastMessage: 'Je dois changer mon adresse de livraison', time: '1 heure', status: 'active', unread: 1 },
  { id: 4, customer: 'Jacques Petit', avatar: '👨‍🦱', lastMessage: 'Le produit est arrive endommage', time: '2 heures', status: 'pending', unread: 0 },
  { id: 5, customer: 'Claire Moreau', avatar: '👩', lastMessage: 'Puis-je obtenir un remboursement?', time: '3 heures', status: 'active', unread: 1 },
]

const mockMessages = [
  { id: 1, sender: 'customer', text: 'Bonjour, j\'ai une question sur ma commande #12345', time: '10:30' },
  { id: 2, sender: 'me', text: 'Bonjour! Bien sur, je serais ravi de vous aider. Que souhaitez-vous savoir?', time: '10:31' },
  { id: 3, sender: 'customer', text: 'Quand sera-t-elle livree? Je l\'ai commandee il y a 3 jours.', time: '10:32' },
  { id: 4, sender: 'me', text: 'Laissez-moi verifier. Votre commande est en cours de traitement et devrait etre expediee sous 24 heures.', time: '10:33' },
  { id: 5, sender: 'me', text: 'Vous pouvez suivre son statut sur notre site avec votre numero de commande.', time: '10:33' },
  { id: 6, sender: 'customer', text: 'Merci! Pouvez-vous aussi me parler de la garantie?', time: '10:35' },
]

const stats = [
  { label: 'Total Chats', value: '156', change: '+12%', icon: MessageSquare },
  { label: 'Actifs', value: '8', change: '+3', icon: Circle },
  { label: 'Reponse Moy.', value: '< 2 min', change: '-30s', icon: Clock },
  { label: 'Satisfaction', value: '94%', change: '+2%', icon: Star },
]

export default function ChatPage() {
  const [chats] = useState<Chat[]>(mockChats)
  const [messages] = useState(mockMessages)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0])
  const [newMessage, setNewMessage] = useState('')
  const [notification, setNotification] = useState<string | null>(null)

  const sendMessage = () => {
    if (newMessage.trim()) {
      setNotification('Message envoye!');
      setTimeout(() => setNotification(null), 2000)
      setNewMessage('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Support Chat en Direct</h1>
            <p className="text-gray-300">Conversations de support client en temps reel</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-cyan-400" />
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-yellow-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Chat List */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher des chats..."
              onChange={(e) => { setNotification('Recherche: ' + e.target.value); setTimeout(() => setNotification(null), 1000) }}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 flex-1 outline-none focus:border-electron-blue"
            />
          </div>
          <div className="space-y-2">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => { setSelectedChat(chat); setNotification('Discussion avec ' + chat.customer); setTimeout(() => setNotification(null), 1500) }}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedChat?.id === chat.id 
                    ? 'bg-electron-blue/20 border-electron-blue/40' 
                    : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{chat.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white truncate">{chat.customer}</p>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-6 h-6 rounded-full bg-electron-blue flex items-center justify-center text-xs font-medium text-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    chat.status === 'active' ? 'bg-green-500/30 text-green-400 border border-green-500/30' :
                    chat.status === 'pending' ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/30' :
                    'bg-gray-500/30 text-gray-400 border border-gray-500/30'
                  }`}>
                    {chat.status === 'active' ? 'Actif' : chat.status === 'pending' ? 'En attente' : 'Ferme'}
                  </span>
                  {chat.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(chat.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 glass-card flex flex-col h-[500px]">
          {/* Chat Header */}
          {selectedChat && (
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedChat.avatar}</span>
                <div>
                  <p className="font-medium">{selectedChat.customer}</p>
                  <p className="text-sm text-gray-400">Order #12345</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-white/10">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/10">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/10">
                  <Archive className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-xl ${
                  msg.sender === 'me' 
                    ? 'bg-electron-blue text-white' 
                    : 'bg-white/10 text-white'
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-gray-900/50">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electron-blue/50"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="p-4 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 text-white font-medium"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Envoyer</span>
              </button>
            </div>
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