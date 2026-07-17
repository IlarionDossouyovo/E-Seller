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
    title: 'Nouvelle Commande Reçue',
    message: 'Vous venez de recevoir une nouvelle commande pour "Wireless Earbuds Pro" - 49,99€',
    time: 'Il y a 2 minutes',
    read: false,
  },
  {
    id: 2,
    type: 'analytics',
    title: 'Alerte ROAS',
    message: 'Le ROAS de votre campagne publicitaire "Summer Sale" est descendu en dessous de 2.0x',
    time: 'Il y a 15 minutes',
    read: false,
  },
  {
    id: 3,
    type: 'success',
    title: 'Produit Approuvé',
    message: 'Votre produit "Smart Watch Ultra" a été approuvé et est maintenant en ligne',
    time: 'Il y a 1 heure',
    read: true,
  },
  {
    id: 4,
    type: 'info',
    title: 'Nouvelle Fonctionnalité Disponible',
    message: 'Découvrez notre nouveau générateur de branding IA avec création de logo',
    time: 'Il y a 2 heures',
    read: true,
  },
  {
    id: 5,
    type: 'alert',
    title: 'Alerte Stock Faible',
    message: 'Le chargeur portable manque de stock (15 unités restantes)',
    time: 'Il y a 3 heures',
    read: true,
  },
  {
    id: 6,
    type: 'order',
    title: 'Commande Expédiée',
    message: 'La commande #12345 a été expédiée à John Doe',
    time: 'Il y a 5 heures',
    read: true,
  },
  {
    id: 7,
    type: 'analytics',
    title: 'Jalon Atteint',
    message: 'Félicitations! Vous avez atteint 50 000€ de chiffre d\'affaires total 🎉',
    time: 'Il y a 1 jour',
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
  const [settings, setSettings] = useState({
    orders: true,
    analytics: true,
    products: true,
    marketing: true,
    email: true,
    push: true,
    sms: false,
  })

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

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-sora)]">Notifications</h1>
          <p className="text-gray-400">{unreadCount} notification(s) non lue(s)</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm"
          >
            Tout marquer comme lu
          </button>
          <button 
            onClick={clearAll}
            className="px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Tout effacer
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
              placeholder="Rechercher des notifications..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Toutes' },
              { key: 'unread', label: 'Non lues' },
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
            <h3 className="text-xl font-semibold mb-2">Aucune notification</h3>
            <p className="text-gray-400">Vous êtes à jour!</p>
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
                className={`glass-card p-4 flex items-start gap-4 cursor-pointer hover:bg-white/5 transition-colors ${
                  !notification.read ? 'border-l-4 border-l-electron-blue' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <config.icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 items-center">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 rounded-lg hover:bg-green-500/20 transition-colors text-green-400"
                          title="Marquer comme lu"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Paramètres de Notification</h2>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Push Notifications */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Notifications Push</h3>
            {[
              { key: 'orders', label: 'Notifications de commande', desc: 'Soyez notifié lorsque vous recevez des commandes' },
              { key: 'analytics', label: 'Alertes analytiques', desc: 'Alertes lorsque les métriques changent significativement' },
              { key: 'products', label: 'Mises à jour produit', desc: 'Actualités sur vos produits' },
              { key: 'marketing', label: 'Emails marketing', desc: 'Conseils et promotions' },
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{setting.label}</h3>
                  <p className="text-sm text-gray-400">{setting.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${settings[setting.key as keyof typeof settings] ? 'text-green-400' : 'text-gray-500'}`}>
                    {settings[setting.key as keyof typeof settings] ? 'ON' : 'OFF'}
                  </span>
                  <button 
                    onClick={() => toggleSetting(setting.key as keyof typeof settings)}
                    className={`w-14 h-7 rounded-full transition-colors relative ${settings[setting.key as keyof typeof settings] ? 'bg-green-500' : 'bg-gray-600'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${settings[setting.key as keyof typeof settings] ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Other Channels */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Autres Canaux</h3>
            {[
              { key: 'email', label: 'Notifications par email', desc: 'Recevoir les notifications par email' },
              { key: 'push', label: 'Push vers téléphone', desc: 'Notifications push instantanées' },
              { key: 'sms', label: 'Alertes SMS', desc: 'Alertes importantes par SMS' },
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{setting.label}</h3>
                  <p className="text-sm text-gray-400">{setting.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${settings[setting.key as keyof typeof settings] ? 'text-green-400' : 'text-gray-500'}`}>
                    {settings[setting.key as keyof typeof settings] ? 'ON' : 'OFF'}
                  </span>
                  <button 
                    onClick={() => toggleSetting(setting.key as keyof typeof settings)}
                    className={`w-14 h-7 rounded-full transition-colors relative ${settings[setting.key as keyof typeof settings] ? 'bg-green-500' : 'bg-gray-600'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${settings[setting.key as keyof typeof settings] ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <button className="px-6 py-2 rounded-lg bg-electron-blue hover:bg-electron-blue/80 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}