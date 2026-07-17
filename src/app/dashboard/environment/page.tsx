'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/app/i18n'
import { Key, Eye, EyeOff, Copy, Plus, Trash2, Check, AlertCircle } from 'lucide-react'

const envVars = [
  { id: '1', key: 'DATABASE_URL', value: 'postgresql://***', type: 'database', env: 'production', masked: true },
  { id: '2', key: 'STRIPE_SECRET_KEY', value: 'sk_live_***', type: 'payment', env: 'production', masked: true },
  { id: '3', key: 'NEXTAUTH_SECRET', value: '***', type: 'auth', env: 'production', masked: true },
  { id: '4', key: 'RESEND_API_KEY', value: 're_***', type: 'email', env: 'production', masked: true },
  { id: '5', key: 'CLOUDINARY_API_SECRET', value: '***', type: 'storage', env: 'production', masked: true },
]

const typeColors: Record<string, string> = {
  database: 'bg-blue-500/20 text-blue-400',
  payment: 'bg-green-500/20 text-green-400',
  auth: 'bg-purple-500/20 text-purple-400',
  email: 'bg-yellow-500/20 text-yellow-400',
  storage: 'bg-cyan-500/20 text-cyan-400',
}

export default function EnvironmentPage() {
  const { t } = useI18n()
  const [variables, setVariables] = useState(envVars)
  const [showValues, setShowValues] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<string | null>(null)
  const [newVar, setNewVar] = useState({ key: '', value: '', type: 'custom', env: 'production' })

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      custom: t.environment?.custom || 'Custom',
      database: t.environment?.database || 'Database',
      payment: t.environment?.payment || 'Payment',
      auth: t.environment?.auth || 'Auth',
      email: t.environment?.email || 'Email',
      storage: t.environment?.storage || 'Storage',
    }
    return labels[type] || type
  }

  const getEnvLabel = (env: string) => {
    const labels: Record<string, string> = {
      production: t.environment?.production || 'Production',
      staging: t.environment?.staging || 'Staging',
      development: t.environment?.development || 'Development',
    }
    return labels[env] || env
  }

  const toggleShow = (id: string) => setShowValues(prev => ({ ...prev, [id]: !prev[id] }))

  const copyValue = async (value: string, id: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const deleteVar = (id: string) => setVariables(variables.filter(v => v.id !== id))

  const addVariable = () => {
    if (!newVar.key || !newVar.value) return
    setVariables([...variables, { ...newVar, id: String(Date.now()), value: newVar.value, masked: false }])
    setNewVar({ key: '', value: '', type: 'custom', env: 'production' })
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">{t.environment?.title || 'Environment Variables'}</h1>
            <p className="text-gray-400">{t.environment?.subtitle || 'Manage API keys and sensitive configuration'}</p>
          </div>
        </div>
      </div>

      {/* Add New Variable */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">{t.environment?.addNewVariable || 'Add New Variable'}</h3>
        <div className="grid md:grid-cols-5 gap-4">
          <input type="text" placeholder={t.environment?.keyName || 'KEY_NAME'} value={newVar.key} onChange={(e) => setNewVar({...newVar, key: e.target.value.toUpperCase()})} className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 font-mono text-white placeholder-gray-400" />
          <input type="text" placeholder={t.environment?.value || 'value'} value={newVar.value} onChange={(e) => setNewVar({...newVar, value: e.target.value})} className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 font-mono text-white placeholder-gray-400" />
          <select value={newVar.type} onChange={(e) => setNewVar({...newVar, type: e.target.value})} className="bg-gray-800 border border-white/20 rounded-xl px-4 py-2 text-white">
            <option value="custom">{t.environment?.custom || 'Custom'}</option>
            <option value="database">{t.environment?.database || 'Database'}</option>
            <option value="payment">{t.environment?.payment || 'Payment'}</option>
            <option value="auth">{t.environment?.auth || 'Auth'}</option>
            <option value="email">{t.environment?.email || 'Email'}</option>
            <option value="storage">{t.environment?.storage || 'Storage'}</option>
          </select>
          <select value={newVar.env} onChange={(e) => setNewVar({...newVar, env: e.target.value})} className="bg-gray-800 border border-white/20 rounded-xl px-4 py-2 text-white">
            <option value="production">{t.environment?.production || 'Production'}</option>
            <option value="staging">{t.environment?.staging || 'Staging'}</option>
            <option value="development">{t.environment?.development || 'Development'}</option>
          </select>
          <button onClick={addVariable} className="px-4 py-2 bg-teal-500 rounded-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <Plus className="w-5 h-5" /> {t.environment?.add || 'Add'}
          </button>
        </div>
      </div>

      {/* Variables List */}
      <div className="space-y-3">
        {variables.map((variable, i) => (
          <motion.div key={variable.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <Key className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <p className="font-mono font-semibold text-white">{variable.key}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`px-2 py-0.5 rounded-full ${typeColors[variable.type]}`}>{getTypeLabel(variable.type)}</span>
                  <span className="text-gray-500">{getEnvLabel(variable.env)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <code className="px-3 py-1 bg-white/5 rounded font-mono text-sm text-gray-300 max-w-xs truncate">
                {showValues[variable.id] ? variable.value : variable.value.replace(/.+/g, '••••••')}
              </code>
              <button onClick={() => toggleShow(variable.id)} className="p-2 hover:bg-white/5 rounded-lg">
                {showValues[variable.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button onClick={() => copyValue(variable.value, variable.id)} className="p-2 hover:bg-white/5 rounded-lg">
                {copied === variable.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button onClick={() => deleteVar(variable.id)} className="p-2 hover:bg-white/5 rounded-lg">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info */}
      <div className="glass-card p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-white">{t.environment?.securityNotice || 'Security Notice'}</p>
          <p className="text-sm text-gray-400">{t.environment?.securityMessage || 'Never share your production API keys. Use environment variables to keep them secure.'}</p>
        </div>
      </div>
    </div>
  )
}