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
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Copy,
  RefreshCw,
  Settings,
  Fingerprint,
  LogOut,
  History,
  Clock,
  Globe,
  Server,
  Database,
  Bus,
  CopyCheck,
  AlertCircle,
  RefreshCcw
} from 'lucide-react'

type TwoFactorMethod = 'none' | 'email' | 'sms' | 'app'

type Role = 'admin' | 'manager' | 'employee' | 'client'

type LogType = 'login' | 'action' | 'security' | 'payment'

interface Log {
  id: number
  type: LogType
  action: string
  ip: string
  location: string
  timestamp: string
  status: 'success' | 'failed' | 'warning'
}

interface User {
  id: number
  name: string
  email: string
  role: Role
  lastLogin: string
  status: 'active' | 'inactive'
}

const mockLogs: Log[] = [
  { id: 1, type: 'login', action: 'Connexion reussie', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 14:30:00', status: 'success' },
  { id: 2, type: 'action', action: 'Produit "Ecouteurs Pro" mis a jour', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 14:25:00', status: 'success' },
  { id: 3, type: 'security', action: '2FA active', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 14:20:00', status: 'success' },
  { id: 4, type: 'login', action: 'Echec de connexion', ip: '45.33.22.11', location: 'Inconnu', timestamp: '2024-04-09 13:15:00', status: 'failed' },
  { id: 5, type: 'payment', action: 'Paiement recu: 49.99 EUR', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 12:00:00', status: 'success' },
  { id: 6, type: 'security', action: 'Mot de passe modifie', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 11:30:00', status: 'success' },
]

const mockUsers: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@e-seller.com', role: 'admin', lastLogin: '2024-04-09 14:30', status: 'active' },
  { id: 2, name: 'John Manager', email: 'john@e-seller.com', role: 'manager', lastLogin: '2024-04-09 12:00', status: 'active' },
  { id: 3, name: 'Sarah Employee', email: 'sarah@e-seller.com', role: 'employee', lastLogin: '2024-04-08 18:00', status: 'active' },
  { id: 4, name: 'Client User', email: 'client@example.com', role: 'client', lastLogin: '2024-04-07 10:00', status: 'active' },
]

const rolePermissions = {
  admin: ['lecture', 'ecriture', 'suppression', 'gestion_utilisateurs', 'parametres', 'analytique', 'paiements'],
  manager: ['lecture', 'ecriture', 'analytique', 'gestion_commandes'],
  employee: ['lecture', 'ecriture', 'gestion_commandes'],
  client: ['lecture', 'passer_commandes'],
}

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<'2fa' | 'roles' | 'logs' | 'api'>('2fa')
  const [twoFactorMethod, setTwoFactorMethod] = useState<TwoFactorMethod>('none')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [filterLog, setFilterLog] = useState<'all' | LogType>('all')
  const [notification, setNotification] = useState<string | null>(null)

  const checkPasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.match(/[A-Z]/)) strength++
    if (pwd.match(/[0-9]/)) strength++
    if (pwd.match(/[^A-Za-z0-9]/)) strength++
    setPasswordStrength(strength)
  }

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd)
    checkPasswordStrength(pwd)
  }

  const getRoleColor = (role: Role) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400'
      case 'manager': return 'bg-yellow-500/20 text-yellow-400'
      case 'employee': return 'bg-blue-500/20 text-blue-400'
      case 'client': return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getLogIcon = (type: LogType) => {
    switch (type) {
      case 'login': return <LogOut className="w-4 h-4" />
      case 'action': return <Activity className="w-4 h-4" />
      case 'security': return <Shield className="w-4 h-4" />
      case 'payment': return <Bus className="w-4 h-4" />
    }
  }

  const filteredLogs = mockLogs.filter(log => filterLog === 'all' || log.type === filterLog)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-green-500/20 via-emerald-500/10 to-transparent border border-green-500/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Centre de Securite</h1>
            <p className="text-gray-300">Gerez la securite de votre compte</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: '2fa', label: '2FA & Auth', icon: Fingerprint },
            { key: 'roles', label: 'Roles & Acces', icon: Users },
            { key: 'logs', label: 'Journaux', icon: History },
            { key: 'api', label: 'Securite API', icon: Key },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key as any); setNotification(tab.label + ' selectionne'); setTimeout(() => setNotification(null), 1500) }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-electron-blue text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2FA & Authentication */}
      {activeTab === '2fa' && (
        <div className="space-y-6">
          {/* 2FA Methods */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Authentification a Deux Facteurs</h2>
            <p className="text-gray-400 mb-6">
              Ajoutez une couche de securite supplementaire a votre compte
            </p>

            <div className="space-y-4">
              {[
                { 
                  key: 'app', 
                  label: 'Application Authentificateur', 
                  desc: 'Utilisez Google Authenticator ou similaire',
                  icon: Smartphone,
                  enabled: twoFactorMethod === 'app'
                },
                { 
                  key: 'sms', 
                  label: 'Code SMS', 
                  desc: 'Recevez le code par message texte',
                  icon: Smartphone,
                  enabled: twoFactorMethod === 'sms'
                },
                { 
                  key: 'email', 
                  label: 'Code Email', 
                  desc: 'Recevez le code par email',
                  icon: Mail,
                  enabled: twoFactorMethod === 'email'
                },
              ].map(method => (
                <div 
                  key={method.key}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    method.enabled 
                      ? 'border-electron-blue bg-electron-blue/10' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  onClick={() => setTwoFactorMethod(method.key as TwoFactorMethod)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{method.label}</p>
                        <p className="text-sm text-gray-400">{method.desc}</p>
                      </div>
                    </div>
                    {method.enabled ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Password Security */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Securite du Mot de Passe</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nouveau Mot de Passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Entrez le nouveau mot de passe"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-electron-blue/50 backdrop-blur-sm"
                  />
                  <button
                    onClick={() => { setShowPassword(!showPassword); setNotification(showPassword ? 'Mot de passe masque' : 'Mot de passe visible'); setTimeout(() => setNotification(null), 1500) }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password Strength */}
              {password.length > 0 && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(level => (
                      <div 
                        key={level}
                        className={`h-1 flex-1 rounded-full ${
                          level <= passwordStrength 
                            ? passwordStrength <= 1 ? 'bg-red-500' 
                            : passwordStrength <= 2 ? 'bg-yellow-500' 
                            : 'bg-green-500'
                            : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">
                    {passwordStrength === 0 && 'Tres faible'}
                    {passwordStrength === 1 && 'Faible - Ajoutez des caracteres'}
                    {passwordStrength === 2 && 'Moyen - Ajoutez des chiffres'}
                    {passwordStrength === 3 && 'Fort - Ajoutez des caracteres speciaux'}
                    {passwordStrength === 4 && 'Tres fort'}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-medium mb-2 text-white">Exigences du Mot de Passe:</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    {password.length >= 8 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4" />}
                    Au moins 8 caracteres
                  </li>
                  <li className="flex items-center gap-2">
                    {password.match(/[A-Z]/) ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4" />}
                    Au moins une lettre majuscule
                  </li>
                  <li className="flex items-center gap-2">
                    {password.match(/[0-9]/) ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4" />}
                    Au moins un chiffre
                  </li>
                  <li className="flex items-center gap-2">
                    {password.match(/[^A-Za-z0-9]/) ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4" />}
                    Au moins un caractere special
                  </li>
                </ul>
              </div>

              <button onClick={() => { setNotification('Mot de passe mis a jour!'); setTimeout(() => setNotification(null), 2000) }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity font-medium">
                Mettre a Jour le Mot de Passe
              </button>
            </div>
          </div>

          {/* Sessions */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Sessions Actives</h2>
              <button onClick={() => { setNotification('Toutes les sessions revoquees!'); setTimeout(() => setNotification(null), 2000) }} className="text-red-400 text-sm hover:underline font-medium">Revoquer Tout</button>
            </div>
            <div className="space-y-3">
              {[
                { device: 'MacBook Pro', location: 'Paris, France', current: true, time: 'Il y a 2 min' },
                { device: 'iPhone 14', location: 'Paris, France', current: false, time: 'Il y a 1 heure' },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-gray-400">{session.location} • {session.time}</p>
                    </div>
                  </div>
                  {session.current ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Actuel</span>
                  ) : (
                    <button onClick={() => { setNotification('Session revoquee!'); setTimeout(() => setNotification(null), 2000) }} className="text-red-400 text-sm font-medium">Revoquer</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Roles & Access */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Membres de l'Equipe</h2>
            
            <div className="space-y-4">
              {mockUsers.map((user, i) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
                      <span className="font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getRoleColor(user.role)}`}>
                      {user.role === 'admin' ? 'Administrateur' : user.role === 'manager' ? 'Manager' : user.role === 'employee' ? 'Employe' : 'Client'}
                    </span>
                    <button onClick={() => { setNotification('Parametres ouverts'); setTimeout(() => setNotification(null), 1500) }} className="p-2 rounded-lg hover:bg-white/10">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <button onClick={() => { setNotification('Invitation envoyee!'); setTimeout(() => setNotification(null), 2000) }} className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
              <Users className="w-5 h-5" />
              Ajouter un Membre
            </button>
          </div>

          {/* Permissions */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Permissions des Roles</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm text-gray-400">Permission</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-400">Admin</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-400">Manager</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-400">Employe</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-400">Client</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { perm: 'Lecture Donnees', admin: true, manager: true, employee: true, client: true },
                    { perm: 'Ecriture Donnees', admin: true, manager: true, employee: true, client: false },
                    { perm: 'Suppression Donnees', admin: true, manager: false, employee: false, client: false },
                    { perm: 'Gestion Utilisateurs', admin: true, manager: false, employee: false, client: false },
                    { perm: 'Voir Analytique', admin: true, manager: true, employee: false, client: false },
                    { perm: 'Gestion Paiements', admin: true, manager: false, employee: false, client: false },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-4">{row.perm}</td>
                      <td className="py-3 px-4 text-center">{row.admin ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}</td>
                      <td className="py-3 px-4 text-center">{row.manager ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}</td>
                      <td className="py-3 px-4 text-center">{row.employee ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}</td>
                      <td className="py-3 px-4 text-center">{row.client ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <XCircle className="w-5 h-5 text-red-400 mx-auto" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Activity Logs */}
      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Journal d'Activite</h2>
              <div className="flex gap-2">
                {(['all', 'login', 'action', 'security', 'payment'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => { setFilterLog(filter); setNotification((filter === 'all' ? 'Tous' : filter) + ' filtre'); setTimeout(() => setNotification(null), 1500) }}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors font-medium ${
                      filterLog === filter 
                        ? 'bg-electron-blue text-white' 
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    {filter === 'all' ? 'Tous' : filter === 'login' ? 'Connexion' : filter === 'action' ? 'Action' : filter === 'security' ? 'Securite' : 'Paiement'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredLogs.map((log, i) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    log.status === 'success' ? 'bg-green-500/20' :
                    log.status === 'failed' ? 'bg-red-500/20' :
                    'bg-yellow-500/20'
                  }`}>
                    {log.status === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> :
                     log.status === 'failed' ? <AlertTriangle className="w-5 h-5 text-red-400" /> :
                     <AlertCircle className="w-5 h-5 text-yellow-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{log.action}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {log.ip}
                      </span>
                      <span>{log.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{log.type}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {log.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Security */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">API Keys</h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Production Key</span>
                  <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-black/30 px-4 py-2 rounded-lg text-sm font-mono">
                    sk_live_••••••••••••••••
                  </code>
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Created: 2024-01-15 • Last used: 2 min ago</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Test Key</span>
                  <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-black/30 px-4 py-2 rounded-lg text-sm font-mono">
                    sk_test_••••••••••••••••
                  </code>
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => { setNotification('Nouvelle cle generatee!'); setTimeout(() => setNotification(null), 2000) }} className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
              <Key className="w-5 h-5" />
              Generer une Nouvelle Cle
            </button>
          </div>

          {/* API Security Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">Rate Limiting</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <p className="font-medium">API Rate Limit</p>
                    <p className="text-sm text-gray-400">100 requests per minute</p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-electron-blue">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <p className="font-medium">Webhook Verification</p>
                    <p className="text-sm text-gray-400">Verify webhook signatures</p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-electron-blue">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">IP Whitelist</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
                  <code className="flex-1 font-mono text-sm">192.168.1.0/24</code>
                  <button className="text-red-400"><XCircle className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
                  <code className="flex-1 font-mono text-sm">10.0.0.0/16</code>
                  <button className="text-red-400"><XCircle className="w-4 h-4" /></button>
                </div>
              </div>
              <button onClick={() => { setNotification('Plage IP ajoutee!'); setTimeout(() => setNotification(null), 2000) }} className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm flex items-center gap-2 font-medium border border-white/20">
                <RefreshCcw className="w-4 h-4" />
                Ajouter une Plage IP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}