'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff,
  Smartphone,
  Mail,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Copy,
  Download,
  Trash2,
  Settings,
  Fingerprint,
  Globe,
  Activity,
  Bell,
  LogOut,
  Save
} from 'lucide-react'

const mockSessions = [
  { id: '1', device: 'Chrome on MacBook Pro', location: 'Paris, France', ip: '192.168.1.100', lastActive: '2 min ago', current: true },
  { id: '2', device: 'Safari on iPhone 14', location: 'Paris, France', ip: '192.168.1.101', lastActive: '1 hour ago', current: false },
]

const mockApiKeys = [
  { id: '1', name: 'Production Key', key: 'sk_••••••••••••', created: '2024-01-15', lastUsed: '2 min ago', permissions: ['read', 'write'] },
  { id: '2', name: 'Development Key', key: 'sk_••••••••••••', created: '2024-03-20', lastUsed: '5 days ago', permissions: ['read'] },
]

const mockLogs = [
  { id: 1, action: 'Login successful', ip: '192.168.1.100', location: 'Paris, France', time: '2 min ago', status: 'success' as const },
  { id: 2, action: 'Password changed', ip: '192.168.1.100', location: 'Paris, France', time: '1 hour ago', status: 'success' as const },
  { id: 3, action: 'API key created', ip: '192.168.1.100', location: 'Paris, France', time: '3 hours ago', status: 'success' as const },
  { id: 4, action: 'Login failed', ip: '45.33.32.156', location: 'Unknown', time: '5 hours ago', status: 'failed' as const },
]

const teamMembers = [
  { id: 1, name: 'Admin User', email: 'admin@e-seller.com', role: 'Admin', avatar: '👨‍💼' },
  { id: 2, name: 'John Doe', email: 'john@e-seller.com', role: 'Manager', avatar: '👨' },
  { id: 3, name: 'Jane Smith', email: 'jane@e-seller.com', role: 'Employee', avatar: '👩' },
]

export default function SecurityCenterPage() {
  const [activeTab, setActiveTab] = useState<'overview' | '2fa' | 'sessions' | 'api' | 'logs' | 'team'>('overview')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Security Center</h1>
              <p className="text-gray-400">Manage your account security</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> All Secure
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'overview', label: 'Overview', icon: Shield },
            { key: '2fa', label: '2FA', icon: Fingerprint },
            { key: 'sessions', label: 'Sessions', icon: Clock },
            { key: 'api', label: 'API Keys', icon: Key },
            { key: 'logs', label: 'Logs', icon: Activity },
            { key: 'team', label: 'Team', icon: Users },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === tab.key ? 'bg-electron-blue text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Security Score', value: '95%', icon: Shield, color: 'text-green-400' },
            { label: '2FA Status', value: 'Active', icon: Fingerprint, color: 'text-green-400' },
            { label: 'Active Sessions', value: '2', icon: Clock, color: 'text-blue-400' },
            { label: 'API Keys', value: '2', icon: Key, color: 'text-purple-400' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* 2FA */}
      {activeTab === '2fa' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Fingerprint className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Two-Factor Authentication</h3>
                  <p className="text-gray-400">Add extra security to your account</p>
                </div>
              </div>
              <button onClick={() => setTwoFactorEnabled(!twoFactorEnabled)} className={`w-14 h-8 rounded-full transition-colors ${twoFactorEnabled ? 'bg-green-500' : 'bg-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full bg-white transform transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg mb-4">Methods</h3>
            {[
              { icon: Smartphone, label: 'Authenticator App', enabled: true },
              { icon: Mail, label: 'Email', enabled: true },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 mb-2">
                <div className="flex items-center gap-3"><m.icon className="w-5 h-5 text-electron-blue" /><span>{m.label}</span></div>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Enabled</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sessions */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          {mockSessions.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Globe className={`w-5 h-5 ${s.current ? 'text-green-400' : 'text-gray-400'}`} />
                  <div><p className="font-medium flex items-center gap-2">{s.device} {s.current && <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">Current</span>}</p><p className="text-sm text-gray-400">{s.location} • {s.ip}</p></div>
                </div>
                <span className="text-sm text-gray-400">{s.lastActive}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* API Keys */}
      {activeTab === 'api' && (
        <div className="space-y-4">
          <div className="flex justify-end"><button className="px-4 py-2 rounded-lg bg-electron-blue flex items-center gap-2"><Key className="w-4 h-4" /> Create Key</button></div>
          {mockApiKeys.map((k, i) => (
            <motion.div key={k.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div><p className="font-medium">{k.name}</p><p className="text-sm text-gray-400 font-mono">{k.key}</p></div>
                <div className="flex gap-2"><button className="p-2 rounded-lg hover:bg-white/10"><Copy className="w-4 h-4" /></button><button className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"><Trash2 className="w-4 h-4" /></button></div>
              </div>
              <div className="flex gap-2">{k.permissions.map((p, j) => <span key={j} className="px-2 py-1 rounded-full bg-white/5 text-xs">{p}</span>)}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Logs */}
      {activeTab === 'logs' && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-lg">Activity Logs</h3><button className="px-4 py-2 rounded-lg bg-white/5 flex items-center gap-2"><Download className="w-4 h-4" /> Export</button></div>
          <div className="space-y-3">
            {mockLogs.map((log, i) => (
              <motion.div key={log.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  {log.status === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                  <div><p className="font-medium">{log.action}</p><p className="text-sm text-gray-400">{log.ip} • {log.location}</p></div>
                </div>
                <span className="text-sm text-gray-400">{log.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Team */}
      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="flex justify-end"><button className="px-4 py-2 rounded-lg bg-electron-blue flex items-center gap-2"><Users className="w-4 h-4" /> Invite</button></div>
          {teamMembers.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><span className="text-2xl">{m.avatar}</span><div><p className="font-medium">{m.name}</p><p className="text-sm text-gray-400">{m.email}</p></div></div>
                <span className={`px-3 py-1 rounded-full text-sm ${m.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' : m.role === 'Manager' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>{m.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}