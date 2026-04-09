'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Search, 
  Check, 
  Trash2, 
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Settings,
  Filter
} from 'lucide-react'

type NotificationType = 'order' | 'analytics' | 'alert' | 'success' | 'info'

interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'order',
    title: 'New Order Received',
    message: 'You just received a new order for "Wireless Earbuds Pro" - $49.99',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'analytics',
    title: 'ROAS Alert',
    message: 'Your ad campaign "Summer Sale" ROAS dropped below 2.0x',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'success',
    title: 'Product Approved',
    message: 'Your product "Smart Watch Ultra" has been approved and is now live',
    time: '1 hour ago',
    read: true,
  },
  {
    id: 4,
    type: 'info',
    title: 'New Feature Available',
    message: 'Check out our new AI Branding Generator with logo creation',
    time: '2 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'alert',
    title: 'Low Stock Warning',
    message: 'Portable Charger is running low on stock (15 units left)',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 6,
    type: 'order',
    title: 'Order Shipped',
    message: 'Order #12345 has been shipped to John Doe',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 7,
    type: 'analytics',
    title: 'Milestone Reached',
    message: 'Congratulations! You\'ve reached $50,000 in total revenue 🎉',
    time: '1 day ago',
    read: true,
  },
]

const typeConfig = {
  order: { icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  analytics: { icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  alert: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
  success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' },
  info: { icon: Info, color: 'text-gray-400', bg: 'bg-gray-500/20' },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread' && n.read) return false
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !n.message.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-sora)]">Notifications</h1>
          <p className="text-gray-400">{unreadCount} unread notifications</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm"
          >
            Mark all as read
          </button>
          <button 
            onClick={clearAll}
            className="px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as any)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === f.key 
                    ? 'bg-electron-blue text-white' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No notifications</h3>
            <p className="text-gray-400">You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notification, i) => {
            const config = typeConfig[notification.type]
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass-card p-4 flex items-start gap-4 ${
                  !notification.read ? 'border-l-4 border-l-electron-blue' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <config.icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors text-red-400"
                        title="Delete"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Notification Settings */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Notification Settings</h2>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Order notifications', desc: 'Get notified when you receive orders' },
            { label: 'Analytics alerts', desc: 'Alerts when metrics change significantly' },
            { label: 'Product updates', desc: 'News about your products' },
            { label: 'Marketing emails', desc: 'Tips and promotions' },
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <h3 className="font-medium">{setting.label}</h3>
                <p className="text-sm text-gray-400">{setting.desc}</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-electron-blue">
                <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}