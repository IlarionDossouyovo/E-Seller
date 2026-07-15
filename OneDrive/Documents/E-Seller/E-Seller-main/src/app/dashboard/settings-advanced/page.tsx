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

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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
                  <input type="text" defaultValue="E-SELLER Store" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Store Email</label>
                  <input type="email" defaultValue="contact@e-seller.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Timezone</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>Europe/Paris</option>
                    <option>America/New_York</option>
                    <option>Asia/Tokyo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Default Language</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>German</option>
                  </select>
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
                  <button className="w-12 h-6 rounded-full bg-gray-500"><div className="w-5 h-5 rounded-full bg-white translate-x-0.5" /></button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Guest Checkout</p><p className="text-sm text-gray-400">Allow checkout without account</p></div>
                  <button className="w-12 h-6 rounded-full bg-electron-blue"><div className="w-5 h-5 rounded-full bg-white translate-x-6" /></button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Currency Selector</p><p className="text-sm text-gray-400">Show currency switcher</p></div>
                  <button className="w-12 h-6 rounded-full bg-electron-blue"><div className="w-5 h-5 rounded-full bg-white translate-x-6" /></button>
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
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tax Rate (%)</label>
                  <input type="number" defaultValue="20" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Tax Included</p><p className="text-sm text-gray-400">Prices include tax</p></div>
                  <button className="w-12 h-6 rounded-full bg-electron-blue"><div className="w-5 h-5 rounded-full bg-white translate-x-6" /></button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-3">
                {[{ label: 'New Order', desc: 'Email when order placed' }, { label: 'Low Stock', desc: 'Alert when product low' }, { label: 'Customer Registration', desc: 'Notify new customer' }, { label: 'Payment Received', desc: 'Confirm payment' }].map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div><p className="font-medium">{n.label}</p><p className="text-sm text-gray-400">{n.desc}</p></div>
                    <button className="w-12 h-6 rounded-full bg-electron-blue"><div className="w-5 h-5 rounded-full bg-white translate-x-6" /></button>
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
                  <button className="w-12 h-6 rounded-full bg-electron-blue"><div className="w-5 h-5 rounded-full bg-white translate-x-6" /></button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">IP Whitelist</p><p className="text-sm text-gray-400">Restrict access by IP</p></div>
                  <button className="w-12 h-6 rounded-full bg-gray-500"><div className="w-5 h-5 rounded-full bg-white translate-x-0.5" /></button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">Session Timeout</p><p className="text-sm text-gray-400">Auto logout after 30min</p></div>
                  <button className="w-12 h-6 rounded-full bg-electron-blue"><div className="w-5 h-5 rounded-full bg-white translate-x-6" /></button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Appearance</h3>
              <div className="grid grid-cols-3 gap-4">
                {['Default Dark', 'Light Mode', 'Custom'].map((theme, i) => (
                  <div key={i} className={`p-4 rounded-xl border-2 cursor-pointer ${i === 0 ? 'border-electron-blue bg-electron-blue/10' : 'border-white/10'}`}>
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