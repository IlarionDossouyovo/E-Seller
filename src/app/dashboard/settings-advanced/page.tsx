'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, Globe, Bell, Shield, Palette, Database, Server,
  Mail, Zap, Layout, Key, Save, CheckCircle, AlertCircle
} from 'lucide-react'

const tabs = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'store', label: 'Store', icon: Globe },
  { id: 'payments', label: 'Payments', icon: Key },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'api', label: 'API', icon: Zap },
]

export default function SettingsAdvancedPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)
  
  // Settings state
  const [storeSettings, setStoreSettings] = useState({
    maintenanceMode: false,
    guestCheckout: true,
    currencySelector: true,
  })
  
  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'USD',
    taxRate: 20,
    taxIncluded: true,
  })
  
  const [notificationSettings, setNotificationSettings] = useState({
    newOrder: true,
    lowStock: true,
    customerRegistration: true,
    paymentReceived: true,
  })
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    ipWhitelist: false,
    sessionTimeout: true,
  })
  
  const [selectedTheme, setSelectedTheme] = useState(0)
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'E-SELLER Store',
    storeEmail: 'contact@e-seller.com',
    timezone: 'UTC',
    language: 'English',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleStore = (key: keyof typeof storeSettings) => {
    setStoreSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const togglePayment = (key: keyof typeof paymentSettings) => {
    if (key !== 'currency' && key !== 'taxRate') {
      setPaymentSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }
  }
  
  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const toggleSecurity = (key: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Settings</h1>
            <p className="text-gray-400">Configure your platform</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="glass-card p-2 w-56 shrink-0">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-electron-blue text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Store Name</label>
                  <input 
                    type="text" 
                    value={generalSettings.storeName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeName: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:bg-white/15 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Store Email</label>
                  <input 
                    type="email" 
                    value={generalSettings.storeEmail}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:bg-white/15 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Timezone</label>
                  <div className="relative">
                    <select 
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="UTC" className="bg-gray-800">UTC (Coordinated Universal Time)</option>
                      <option value="Europe/Paris" className="bg-gray-800">Europe/Paris</option>
                      <option value="America/New_York" className="bg-gray-800">America/New_York</option>
                      <option value="Asia/Tokyo" className="bg-gray-800">Asia/Tokyo</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Default Language</label>
                  <div className="relative">
                    <select 
                      value={generalSettings.language}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="English" className="bg-gray-800">English</option>
                      <option value="French" className="bg-gray-800">French</option>
                      <option value="Spanish" className="bg-gray-800">Spanish</option>
                      <option value="German" className="bg-gray-800">German</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'store' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Store Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Maintenance Mode</p><p className="text-sm text-gray-400">Disable store temporarily</p></div>
                  <button onClick={() => toggleStore('maintenanceMode')} className={`w-14 h-7 rounded-full transition-colors relative ${storeSettings.maintenanceMode ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${storeSettings.maintenanceMode ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Guest Checkout</p><p className="text-sm text-gray-400">Allow checkout without account</p></div>
                  <button onClick={() => toggleStore('guestCheckout')} className={`w-14 h-7 rounded-full transition-colors relative ${storeSettings.guestCheckout ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${storeSettings.guestCheckout ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Currency Selector</p><p className="text-sm text-gray-400">Show currency switcher</p></div>
                  <button onClick={() => toggleStore('currencySelector')} className={`w-14 h-7 rounded-full transition-colors relative ${storeSettings.currencySelector ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${storeSettings.currencySelector ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Currency</label>
                  <div className="relative">
                    <select 
                      value={paymentSettings.currency}
                      onChange={(e) => setPaymentSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="USD" className="bg-gray-800">USD - US Dollar</option>
                      <option value="EUR" className="bg-gray-800">EUR - Euro</option>
                      <option value="GBP" className="bg-gray-800">GBP - British Pound</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tax Rate (%)</label>
                  <input 
                    type="number" 
                    value={paymentSettings.taxRate}
                    onChange={(e) => setPaymentSettings(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:bg-white/15 transition-colors cursor-text"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Tax Included</p><p className="text-sm text-gray-400">Prices include tax</p></div>
                  <button onClick={() => togglePayment('taxIncluded')} className={`w-14 h-7 rounded-full transition-colors relative ${paymentSettings.taxIncluded ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${paymentSettings.taxIncluded ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-3">
                {[
                  { key: 'newOrder', label: 'New Order', desc: 'Email when order placed' },
                  { key: 'lowStock', label: 'Low Stock', desc: 'Alert when product low' },
                  { key: 'customerRegistration', label: 'Customer Registration', desc: 'Notify new customer' },
                  { key: 'paymentReceived', label: 'Payment Received', desc: 'Confirm payment' }
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div><p className="font-medium">{n.label}</p><p className="text-sm text-gray-400">{n.desc}</p></div>
                    <button onClick={() => toggleNotification(n.key as keyof typeof notificationSettings)} className={`w-14 h-7 rounded-full transition-colors relative ${notificationSettings[n.key as keyof typeof notificationSettings] ? 'bg-green-500' : 'bg-gray-500'}`}>
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${notificationSettings[n.key as keyof typeof notificationSettings] ? 'left-8' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Two-Factor Auth</p><p className="text-sm text-gray-400">Require 2FA for admin</p></div>
                  <button onClick={() => toggleSecurity('twoFactorAuth')} className={`w-14 h-7 rounded-full transition-colors relative ${securitySettings.twoFactorAuth ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${securitySettings.twoFactorAuth ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">IP Whitelist</p><p className="text-sm text-gray-400">Restrict access by IP</p></div>
                  <button onClick={() => toggleSecurity('ipWhitelist')} className={`w-14 h-7 rounded-full transition-colors relative ${securitySettings.ipWhitelist ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${securitySettings.ipWhitelist ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Session Timeout</p><p className="text-sm text-gray-400">Auto logout after 30min</p></div>
                  <button onClick={() => toggleSecurity('sessionTimeout')} className={`w-14 h-7 rounded-full transition-colors relative ${securitySettings.sessionTimeout ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${securitySettings.sessionTimeout ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Appearance</h3>
              <div className="grid grid-cols-3 gap-4">
                {['Default Dark', 'Light Mode', 'Custom'].map((theme, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedTheme(i)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${selectedTheme === i ? 'border-electron-blue bg-electron-blue/10' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <p className="text-center font-medium">{theme}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Email Configuration</h3>
              <div className="space-y-4">
                <div><label className="block text-sm text-gray-400 mb-2">SMTP Host</label><input type="text" placeholder="smtp.example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">SMTP Port</label><input type="text" defaultValue="587" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">SMTP Username</label><input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">SMTP Password</label><input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" /></div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">API Keys</h3>
              <div className="space-y-3">
                {[{ name: 'Production', key: 'sk_live_xxxxx', active: true }, { name: 'Development', key: 'sk_test_xxxxx', active: true }].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div><p className="font-medium">{api.name}</p><p className="text-sm text-gray-400 font-mono">{api.key}</p></div>
                    <button className="px-3 py-1 rounded-lg bg-electron-blue text-sm">View</button>
                  </div>
                ))}
                <button className="w-full p-4 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40">+ Generate New Key</button>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button onClick={handleSave} className="px-6 py-3 bg-gradient-to-r from-electron-blue to-electron-purple rounded-xl flex items-center gap-2">
              {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}