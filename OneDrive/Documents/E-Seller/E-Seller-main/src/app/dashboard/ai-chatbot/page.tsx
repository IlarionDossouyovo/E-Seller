'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Bot, Send, Settings, User, Clock, CheckCircle, XCircle, AlertTriangle, BarChart3, Download, Play, Pause, RefreshCw, Sparkles, Zap, Brain, Phone, Mail, ShoppingCart, HelpCircle, FileText, Cpu, Database, Shield, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'

const conversations = [
  { id: 'C1', customer: 'John Smith', message: 'Where is my order?', time: '2 min ago', status: 'unread', priority: 'high' },
  { id: 'C2', customer: 'Marie Dubois', message: 'How do I return a product?', time: '5 min ago', status: 'open', priority: 'medium' },
  { id: 'C3', customer: 'Hans Mueller', message: 'Do you ship to Germany?', time: '12 min ago', status: 'resolved', priority: 'low' },
  { id: 'C4', customer: 'Sarah Johnson', message: 'Discount code not working', time: '1 hour ago', status: 'open', priority: 'high' },
]

const responses = [
  { trigger: 'Where is my order', response: 'I can help you track your order. Please provide your order number.', category: 'Shipping' },
  { trigger: 'Return policy', response: 'You can return any product within 30 days of delivery. Visit our returns page for details.', category: 'Returns' },
  { trigger: 'Shipping countries', response: 'We ship to over 190 countries worldwide! Shipping costs vary by location.', category: 'Shipping' },
  { trigger: 'Discount code', response: 'Let me check that code for you. Could you please share the code?', category: 'Orders' },
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
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">AI Chatbot Assistant</h1>
              <p className="text-gray-400">Automate customer support</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Chat Status:</span>
            <button onClick={() => setChatEnabled(!chatEnabled)} className={`px-4 py-2 rounded-xl flex items-center gap-2 ${chatEnabled ? 'bg-green-500' : 'bg-red-500'}`}>
              {chatEnabled ? <><Play className="w-4 h-4" /> Online</> : <><Pause className="w-4 h-4" /> Offline</>}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{analytics.totalChats}</p>
          <p className="text-sm text-gray-400">Total Chats</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{analytics.resolved}</p>
          <p className="text-sm text-gray-400">Resolved</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-teal-400">{analytics.avgResponseTime}</p>
          <p className="text-sm text-gray-400">Avg Response</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{analytics.satisfaction}</p>
          <p className="text-sm text-gray-400">Satisfaction</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['chat', 'responses', 'analytics', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-emerald-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                <input type="text" placeholder="Search conversations..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2" />
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
                    }`}>{chat.status}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{chat.message}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {chat.time}</span>
                    <span className={`px-1 py-0.5 rounded ${chat.priority === 'high' ? 'bg-red-500/20 text-red-400' : chat.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>{chat.priority}</span>
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
                  <p className="text-sm text-gray-400">Online</p>
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
                  <p className="text-sm">Hello! How can I help you today?</p>
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
                      <span className="text-sm font-medium text-blue-400">AI Suggestion</span>
                    </div>
                    <p className="text-sm">I can help you track your order. Let me check the status...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2 mb-3 overflow-x-auto">
                <button className="px-3 py-1.5 bg-white/5 rounded-full text-sm whitespace-nowrap">Track Order</button>
                <button className="px-3 py-1.5 bg-white/5 rounded-full text-sm whitespace-nowrap">Return Policy</button>
                <button className="px-3 py-1.5 bg-white/5 rounded-full text-sm whitespace-nowrap">Shipping Info</button>
                <button className="px-3 py-1.5 bg-white/5 rounded-full text-sm whitespace-nowrap">Discount Code</button>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
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
            <h3 className="font-semibold">AI Response Templates</h3>
            <button className="px-4 py-2 bg-emerald-500 rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Template
            </button>
          </div>
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr className="text-left text-sm text-gray-400">
                  <th className="p-4">Trigger</th>
                  <th className="p-4">Response</th>
                  <th className="p-4">Category</th>
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
            <h3 className="font-semibold mb-4">Chat Volume</h3>
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
            <h3 className="font-semibold mb-4">Response Performance</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <p className="font-medium text-green-400">AI Auto-Response: 67%</p>
                <p className="text-sm text-gray-400">Of chats handled automatically</p>
              </div>
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <p className="font-medium text-blue-400">Human Handoff: 33%</p>
                <p className="text-sm text-gray-400">Escalated to human agents</p>
              </div>
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                <p className="font-medium text-yellow-400">Avg Resolution Time: 4.2 min</p>
                <p className="text-sm text-gray-400">Including AI + human</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-2xl">
          <h3 className="font-semibold mb-4">Chatbot Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="font-medium">AI Auto-Response</p>
                  <p className="text-sm text-gray-400">Enable AI to respond automatically</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-medium">Quick Replies</p>
                  <p className="text-sm text-gray-400">Show suggested responses</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm text-gray-400">24/7 or specific hours</p>
                </div>
              </div>
              <button className="px-4 py-1 bg-white/10 rounded-lg text-sm">Configure</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">Human Escalation</p>
                  <p className="text-sm text-gray-400">Allow handoff to agents</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}