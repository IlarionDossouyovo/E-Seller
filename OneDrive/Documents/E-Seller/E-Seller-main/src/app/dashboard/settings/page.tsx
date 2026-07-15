'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Key, 
  Globe,
  Moon,
  Sun,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  LogOut,
  Trash2
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  })

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'security', label: 'Security', icon: Shield },
    { key: 'billing', label: 'Billing', icon: CreditCard },
    { key: 'api', label: 'API Keys', icon: Key },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold font-[var(--font-sora)]">Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="glass-card p-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.key
                    ? 'bg-electron-blue text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <>
              {/* Avatar */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Profile Picture</h2>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
                    <span className="text-3xl font-bold">U</span>
                  </div>
                  <div>
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm mb-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </button>
                    <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electron-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electron-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electron-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 234 567 890"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electron-blue/50"
                    />
                  </div>
                </div>
                <button className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center gap-2 hover:opacity-90">
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
                  { key: 'marketing', label: 'Marketing Emails', desc: 'Receive promotional content and offers' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? 'bg-electron-blue' : 'bg-white/20'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50"
                    />
                  </div>
                </div>
                <button className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold">
                  Update Password
                </button>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Two-Factor Authentication</h2>
                <p className="text-gray-400 mb-4">Add an extra layer of security to your account</p>
                <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Current Plan</h2>
                <div className="p-4 rounded-xl bg-gradient-to-r from-electron-blue/20 to-electron-purple/20 border border-electron-blue/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">Pro Plan</h3>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Active</span>
                  </div>
                  <p className="text-2xl font-bold mb-2">$99<span className="text-sm text-gray-400">/month</span></p>
                  <p className="text-sm text-gray-400">Renewed on May 15, 2024</p>
                </div>
                <button className="mt-4 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                  Manage Subscription
                </button>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Payment Method</h2>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                  <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-800" />
                  <div className="flex-1">
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-400">Expires 12/25</p>
                  </div>
                  <button className="text-electron-blue text-sm hover:underline">Edit</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-6">API Keys</h2>
              <p className="text-gray-400 mb-4">Manage your API keys for external integrations</p>
              
              <div className="p-4 rounded-xl bg-white/5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Production Key</span>
                  <span className="text-xs text-gray-500">Created Jan 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-black/30 px-4 py-2 rounded-lg text-sm font-mono">
                    sk_live_••••••••••••••••
                  </code>
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <Key className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center gap-2">
                <Key className="w-5 h-5" />
                Generate New Key
              </button>
            </div>
          )}

          {/* Danger Zone */}
          <div className="glass-card p-6 border border-red-500/20">
            <h2 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h2>
            <p className="text-gray-400 mb-4">Once you delete your account, there is no going back.</p>
            <button className="px-6 py-3 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}