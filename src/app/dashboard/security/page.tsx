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
  { id: 1, type: 'login', action: 'Login successful', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 14:30:00', status: 'success' },
  { id: 2, type: 'action', action: 'Updated product "Earbuds Pro"', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 14:25:00', status: 'success' },
  { id: 3, type: 'security', action: '2FA enabled', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 14:20:00', status: 'success' },
  { id: 4, type: 'login', action: 'Failed login attempt', ip: '45.33.22.11', location: 'Unknown', timestamp: '2024-04-09 13:15:00', status: 'failed' },
  { id: 5, type: 'payment', action: 'Payment received: $49.99', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 12:00:00', status: 'success' },
  { id: 6, type: 'security', action: 'Password changed', ip: '192.168.1.45', location: 'Paris, France', timestamp: '2024-04-09 11:30:00', status: 'success' },
]

const mockUsers: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@e-seller.com', role: 'admin', lastLogin: '2024-04-09 14:30', status: 'active' },
  { id: 2, name: 'John Manager', email: 'john@e-seller.com', role: 'manager', lastLogin: '2024-04-09 12:00', status: 'active' },
  { id: 3, name: 'Sarah Employee', email: 'sarah@e-seller.com', role: 'employee', lastLogin: '2024-04-08 18:00', status: 'active' },
  { id: 4, name: 'Client User', email: 'client@example.com', role: 'client', lastLogin: '2024-04-07 10:00', status: 'active' },
]

const rolePermissions = {
  admin: ['read', 'write', 'delete', 'manage_users', 'manage_settings', 'view_analytics', 'manage_payments'],
  manager: ['read', 'write', 'view_analytics', 'manage_orders'],
  employee: ['read', 'write', 'manage_orders'],
  client: ['read', 'write_orders'],
}

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<'2fa' | 'roles' | 'logs' | 'api'>('2fa')
  const [twoFactorMethod, setTwoFactorMethod] = useState<TwoFactorMethod>('none')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [filterLog, setFilterLog] = useState<'all' | LogType>('all')

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
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Security Center</h1>
            <p className="text-gray-400">Manage your account security</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: '2fa', label: '2FA & Auth', icon: Fingerprint },
            { key: 'roles', label: 'Roles & Access', icon: Users },
            { key: 'logs', label: 'Activity Logs', icon: History },
            { key: 'api', label: 'API Security', icon: Key },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.key
                  ? 'bg-electron-blue text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
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
            <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
            <p className="text-gray-400 mb-6">
              Add an extra layer of security to your account
            </p>

            <div className="space-y-4">
              {[
                { 
                  key: 'app', 
                  label: 'Authenticator App', 
                  desc: 'Use Google Authenticator or similar',
                  icon: Smartphone,
                  enabled: twoFactorMethod === 'app'
                },
                { 
                  key: 'sms', 
                  label: 'SMS Code', 
                  desc: 'Receive code via text message',
                  icon: Smartphone,
                  enabled: twoFactorMethod === 'sms'
                },
                { 
                  key: 'email', 
                  label: 'Email Code', 
                  desc: 'Receive code via email',
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
            <h2 className="text-lg font-semibold mb-4">Password Security</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
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
                    {passwordStrength === 0 && 'Very weak'}
                    {passwordStrength === 1 && 'Weak - Add more characters'}
                    {passwordStrength === 2 && 'Medium - Add numbers'}
                    {passwordStrength === 3 && 'Strong - Add special chars'}
                    {passwordStrength === 4 && 'Very strong'}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-medium mb-2">Password Requirements:</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    {password.length >= 8 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4" />}
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    {password.match(/[A-Z]/) ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4" />}
                    At least one uppercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    {password.match(/[0-9]/) ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4" />}
                    At least one number
                  </li>
                  <li className="flex items-center gap-2">
                    {password.match(/[^A-Za-z0-9]/) ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4" />}
                    At least one special character
                  </li>
                </ul>
              </div>

              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity">
                Update Password
              </button>
            </div>
          </div>

          {/* Sessions */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active Sessions</h2>
              <button className="text-red-400 text-sm hover:underline">Revoke All</button>
            </div>
            <div className="space-y-3">
              {[
                { device: 'MacBook Pro', location: 'Paris, France', current: true, time: '2 min ago' },
                { device: 'iPhone 14', location: 'Paris, France', current: false, time: '1 hour ago' },
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
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Current</span>
                  ) : (
                    <button className="text-red-400 text-sm">Revoke</button>
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
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            
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
                      {user.role}
                    </span>
                    <button className="p-2 rounded-lg hover:bg-white/10">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
              <Users className="w-5 h-5" />
              Add Team Member
            </button>
          </div>

          {/* Permissions */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Role Permissions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm text-gray-400">Permission</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-400">Admin</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-400">Manager</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-400">Employee</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-400">Client</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { perm: 'Read Data', admin: true, manager: true, employee: true, client: true },
                    { perm: 'Write Data', admin: true, manager: true, employee: true, client: false },
                    { perm: 'Delete Data', admin: true, manager: false, employee: false, client: false },
                    { perm: 'Manage Users', admin: true, manager: false, employee: false, client: false },
                    { perm: 'View Analytics', admin: true, manager: true, employee: false, client: false },
                    { perm: 'Manage Payments', admin: true, manager: false, employee: false, client: false },
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
              <h2 className="text-lg font-semibold">Activity Log</h2>
              <div className="flex gap-2">
                {(['all', 'login', 'action', 'security', 'payment'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setFilterLog(filter)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      filterLog === filter 
                        ? 'bg-electron-blue text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
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

            <button className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
              <Key className="w-5 h-5" />
              Generate New Key
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
              <button className="mt-4 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2">
                <RefreshCcw className="w-4 h-4" />
                Add IP Range
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}