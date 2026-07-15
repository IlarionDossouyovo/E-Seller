'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Settings,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Building2,
  Key,
  Bell,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Shield,
  Lock,
  Smartphone,
  Zap
} from 'lucide-react'

type PaymentProvider = {
  id: string
  name: string
  icon: string
  enabled: boolean
  fees: string
  countries: string[]
}

const providers: PaymentProvider[] = [
  { id: 'electron', name: 'Electron-Pay', icon: '⚡', enabled: true, fees: '2.9% + $0.30', countries: ['150+'] },
  { id: 'stripe', name: 'Stripe', icon: '💳', enabled: true, fees: '2.9% + $0.30', countries: ['135+'] },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', enabled: true, fees: '2.99% + $0.30', countries: ['200+'] },
  { id: 'alipay', name: 'Alipay', icon: '🅰️', enabled: false, fees: '1.2%', countries: ['China'] },
  { id: 'wechat', name: 'WeChat Pay', icon: '💬', enabled: false, fees: '1.2%', countries: ['China'] },
  { id: 'klarna', name: 'Klarna', icon: '🇸🇪', enabled: false, fees: '2.99%', countries: ['EU', 'US'] },
]

const currencies = [
  { code: 'USD', enabled: true },
  { code: 'EUR', enabled: true },
  { code: 'GBP', enabled: true },
  { code: 'JPY', enabled: false },
  { code: 'CNY', enabled: false },
  { code: 'BRL', enabled: false },
]

export default function PaymentSettingsPage() {
  const [enabledProviders, setEnabledProviders] = useState<string[]>(['electron', 'stripe', 'paypal'])
  const [enabledCurrencies, setEnabledCurrencies] = useState<string[]>(['USD', 'EUR', 'GBP'])
  const [showApiKey, setShowApiKey] = useState(false)
  const [saved, setSaved] = useState(false)

  const toggleProvider = (id: string) => {
    if (enabledProviders.includes(id)) {
      setEnabledProviders(enabledProviders.filter(p => p !== id))
    } else {
      setEnabledProviders([...enabledProviders, id])
    }
  }

  const toggleCurrency = (code: string) => {
    if (enabledCurrencies.includes(code)) {
      setEnabledCurrencies(enabledCurrencies.filter(c => c !== code))
    } else {
      setEnabledCurrencies([...enabledCurrencies, code])
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Payment Settings</h1>
              <p className="text-gray-400">Configure payment providers and currencies</p>
            </div>
          </div>
          <button onClick={handleSave} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple flex items-center gap-2">
            {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Providers */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5" /> Payment Providers
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {providers.map((provider, i) => (
            <motion.div key={provider.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => toggleProvider(provider.id)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${enabledProviders.includes(provider.id) ? 'border-electron-blue bg-electron-blue/10' : 'border-white/10'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{provider.icon}</span>
                  <div><p className="font-medium">{provider.name}</p><p className="text-sm text-gray-400">Fee: {provider.fees}</p></div>
                </div>
                {enabledProviders.includes(provider.id) ? <CheckCircle className="w-6 h-6 text-green-400" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-500" />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Currencies */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5" /> Currencies</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {currencies.map((currency, i) => (
            <motion.button key={currency.code} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} onClick={() => toggleCurrency(currency.code)} className={`p-3 rounded-xl border-2 transition-all ${enabledCurrencies.includes(currency.code) ? 'border-electron-blue bg-electron-blue/10' : 'border-white/10 opacity-60'}`}>
              {enabledCurrencies.includes(currency.code) && <CheckCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />}
              <span className="font-bold">{currency.code}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Shield className="w-5 h-5" /> Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-3"><Lock className="w-5 h-5 text-green-400" /><div><p className="font-medium">SSL/TLS</p><p className="text-sm text-gray-400">Encrypted</p></div></div>
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-green-400" /><div><p className="font-medium">3D Secure</p><p className="text-sm text-gray-400">Card authentication</p></div></div>
            <button className="w-12 h-6 rounded-full bg-electron-blue"><div className="w-5 h-5 rounded-full bg-white translate-x-6" /></button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-3"><Smartphone className="w-5 h-5 text-green-400" /><div><p className="font-medium">Fraud Protection</p><p className="text-sm text-gray-400">AI detection</p></div></div>
            <button className="w-12 h-6 rounded-full bg-electron-blue"><div className="w-5 h-5 rounded-full bg-white translate-x-6" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}