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
  { id: 1, customer: 'Sarah Johnson', avatar: '👩', lastMessage: 'When will my order arrive?', time: '2 min ago', status: 'active', unread: 2 },
  { id: 2, customer: 'Mike Chen', avatar: '👨', lastMessage: 'Thanks for the help!', time: '15 min ago', status: 'closed', rating: 5, unread: 0 },
  { id: 3, customer: 'Emma Wilson', avatar: '👩‍🦰', lastMessage: 'I need to change my shipping address', time: '1 hour ago', status: 'active', unread: 1 },
  { id: 4, customer: 'James Brown', avatar: '👨‍🦱', lastMessage: 'Product arrived damaged', time: '2 hours ago', status: 'pending', unread: 0 },
  { id: 5, customer: 'Lisa Anderson', avatar: '👩', lastMessage: 'Can I get a refund?', time: '3 hours ago', status: 'active', unread: 1 },
]

const mockMessages = [
  { id: 1, sender: 'customer', text: 'Hi, I have a question about my order #12345', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Hello! Of course, I\'d be happy to help. What would you like to know?', time: '10:31 AM' },
  { id: 3, sender: 'customer', text: 'When will it be delivered? I ordered it 3 days ago.', time: '10:32 AM' },
  { id: 4, sender: 'me', text: 'Let me check that for you. Your order is currently being processed and should be shipped within 24 hours.', time: '10:33 AM' },
  { id: 5, sender: 'me', text: 'You can track its status on our website with your order number.', time: '10:33 AM' },
  { id: 6, sender: 'customer', text: 'Thank you! Can you also tell me about the warranty?', time: '10:35 AM' },
]

const stats = [
  { label: 'Total Chats', value: '156', change: '+12%', icon: MessageSquare },
  { label: 'Active Now', value: '8', change: '+3', icon: Circle },
  { label: 'Avg Response', value: '< 2 min', change: '-30s', icon: Clock },
  { label: 'Satisfaction', value: '94%', change: '+2%', icon: Star },
]

export default function ChatPage() {
  const [chats] = useState<Chat[]>(mockChats)
  const [messages] = useState(mockMessages)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Live Chat Support</h1>
            <p className="text-gray-400">Real-time customer support conversations</p>
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
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-yellow-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
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
              placeholder="Search chats..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1"
            />
          </div>
          <div className="space-y-2">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedChat(chat)}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id 
                    ? 'bg-electron-blue/20 border border-electron-blue/30' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{chat.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{chat.customer}</p>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-electron-blue flex items-center justify-center text-xs">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    chat.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    chat.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {chat.status}
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
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="p-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}