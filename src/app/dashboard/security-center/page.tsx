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
  Save,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const mockSessions = [
  { id: '1', device: 'Chrome sur MacBook Pro', location: 'Paris, France', ip: '192.168.1.100', lastActive: 'Il y a 2 min', current: true },
  { id: '2', device: 'Safari sur iPhone 14', location: 'Paris, France', ip: '192.168.1.101', lastActive: 'Il y a 1 heure', current: false },
]

const mockApiKeys = [
  { id: '1', name: 'Cle de Production', key: 'sk_••••••••••••', created: '2024-01-15', lastUsed: 'Il y a 2 min', permissions: ['lecture', 'ecriture'] },
  { id: '2', name: 'Cle de Developpement', key: 'sk_••••••••••••', created: '2024-03-20', lastUsed: 'Il y a 5 jours', permissions: ['lecture'] },
]

const mockLogs = [
  { id: 1, action: 'Connexion reussie', ip: '192.168.1.100', location: 'Paris, France', time: 'Il y a 2 min', status: 'success' as const },
  { id: 2, action: 'Mot de passe modifie', ip: '192.168.1.100', location: 'Paris, France', time: 'Il y a 1 heure', status: 'success' as const },
  { id: 3, action: 'Cle API creee', ip: '192.168.1.100', location: 'Paris, France', time: 'Il y a 3 heures', status: 'success' as const },
  { id: 4, action: 'Connexion echouee', ip: '45.33.32.156', location: 'Inconnu', time: 'Il y a 5 heures', status: 'failed' as const },
]

const teamMembers = [
  { id: 1, name: 'Admin User', email: 'admin@e-seller.com', role: 'Administrateur', avatar: '👨‍💼' },
  { id: 2, name: 'John Doe', email: 'john@e-seller.com', role: 'Manager', avatar: '👨' },
  { id: 3, name: 'Jane Smith', email: 'jane@e-seller.com', role: 'Employe', avatar: '👩' },
]

export default function SecurityCenterPage() {
  const [activeTab, setActiveTab] = useState<'overview' | '2fa' | 'sessions' | 'api' | 'logs' | 'team'>('overview')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [notification, setNotification] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 bg-gradient-to-r from-green-500/20 via-emerald-500/10 to-transparent border border-green-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Centre de Securite</h1>
              <p className="text-gray-300">Gerez la securite de votre compte</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1 font-medium border border-green-500/30">
            <CheckCircle className="w-4 h-4" /> Tout Securise
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'overview', label: 'Apercu', icon: Shield },
            { key: '2fa', label: '2FA', icon: Fingerprint },
            { key: 'sessions', label: 'Sessions', icon: Clock },
            { key: 'api', label: 'Cles API', icon: Key },
            { key: 'logs', label: 'Journaux', icon: Activity },
            { key: 'team', label: 'Equipe', icon: Users },
          ].map(tab => (
            <button key={tab.key} onClick={() => { setActiveTab(tab.key as any); setNotification(tab.label + ' selectionne'); setTimeout(() => setNotification(null), 1500) }} className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap font-medium ${activeTab === tab.key ? 'bg-electron-blue text-white' : 'text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Score de Securite', value: '95%', icon: Shield, color: 'text-green-400' },
            { label: 'Statut 2FA', value: 'Actif', icon: Fingerprint, color: 'text-green-400' },
            { label: 'Sessions Actives', value: '2', icon: Clock, color: 'text-blue-400' },
            { label: 'Cles API', value: '2', icon: Key, color: 'text-purple-400' },
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
                  <h3 className="font-semibold text-lg text-white">Authentification a Deux Facteurs</h3>
                  <p className="text-gray-400">Ajoutez une securite supplementaire a votre compte</p>
                </div>
              </div>
              <button onClick={() => { setTwoFactorEnabled(!twoFactorEnabled); setNotification(twoFactorEnabled ? '2FA desactive' : '2FA active'); setTimeout(() => setNotification(null), 2000) }} className="w-14 h-8 rounded-full transition-colors cursor-pointer">
                <div className={`w-6 h-6 rounded-full bg-white transform transition-transform ${twoFactorEnabled ? 'translate-x-6 bg-green-400' : 'translate-x-1 bg-gray-400'}`} />
              </button>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg text-white mb-4">Methodes</h3>
            {[
              { icon: Smartphone, label: 'Application Authentificateur', enabled: true },
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
                  <div><p className="font-medium flex items-center gap-2">{s.device} {s.current && <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">Actuel</span>}</p><p className="text-sm text-gray-400">{s.location} • {s.ip}</p></div>
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
          <div className="flex justify-end"><button onClick={() => { setNotification('Creation de cle API...'); setTimeout(() => setNotification('Cle API creee!'), 1500) }} className="px-4 py-2.5 rounded-lg bg-electron-blue flex items-center gap-2 font-medium"><Key className="w-4 h-4" /> Creer Cle</button></div>
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
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-lg text-white">Journaux d'Activite</h3><button onClick={() => { setNotification('Export en cours...'); setTimeout(() => setNotification('Export termine!'), 2000) }} className="px-4 py-2.5 rounded-lg bg-white/10 flex items-center gap-2 font-medium border border-white/20 hover:bg-white/20"><Download className="w-4 h-4" /> Exporter</button></div>
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
          <div className="flex justify-end"><button onClick={() => { setNotification('Invitation envoyee!'); setTimeout(() => setNotification(null), 2000) }} className="px-4 py-2.5 rounded-lg bg-electron-blue flex items-center gap-2 font-medium"><Users className="w-4 h-4" /> Inviter</button></div>
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

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour Dashboard
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          Settings
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}