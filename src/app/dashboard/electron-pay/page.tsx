'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Globe, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Lock,
  Building2,
  Wallet,
  Smartphone,
  Banknote,
  Gem,
  Zap,
  Shield,
  ArrowRight,
  Copy,
  ExternalLink
} from 'lucide-react'

type PaymentMethod = {
  id: string
  name: string
  icon: string
  supported: boolean
  countries: string[]
}

const paymentMethods: PaymentMethod[] = [
  { id: 'card', name: 'Cartes de credit/debit', icon: '💳', supported: true, countries: ['Mondial'] },
  { id: 'apple', name: 'Apple Pay', icon: '🍎', supported: true, countries: ['Etats-Unis', 'Royaume-Uni', 'UE', 'Australie'] },
  { id: 'google', name: 'Google Pay', icon: '🔵', supported: true, countries: ['Etats-Unis', 'Royaume-Uni', 'UE'] },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', supported: true, countries: ['Mondial'] },
  { id: 'alipay', name: 'Alipay', icon: '🅰️', supported: true, countries: ['CN', 'Etats-Unis'] },
  { id: 'wechat', name: 'WeChat Pay', icon: '💬', supported: true, countries: ['CN', 'Etats-Unis'] },
  { id: 'stripe', name: 'Stripe', icon: '⚡', supported: true, countries: ['Mondial'] },
  { id: 'mercadopago', name: 'Mercado Pago', icon: '🇧🇷', supported: true, countries: ['BR', 'AR', 'MX'] },
  { id: 'mpesa', name: 'M-Pesa', icon: '🇰🇪', supported: true, countries: ['KE', 'TZ', 'GH'] },
  { id: 'klarna', name: 'Klarna', icon: '🇸🇪', supported: true, countries: ['UE', 'Etats-Unis'] },
  { id: 'afterpay', name: 'Afterpay', icon: '🇦🇺', supported: true, countries: ['Australie', 'NZ', 'Etats-Unis'] },
  { id: 'bank', name: 'Virement bancaire', icon: '🏦', supported: true, countries: ['Mondial'] },
]

const currencies = [
  { code: 'USD', name: 'Dollar americain', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'Livre sterling', flag: '🇬🇧', symbol: '£' },
  { code: 'JPY', name: 'Yen japonais', flag: '🇯🇵', symbol: '¥' },
  { code: 'CNY', name: 'Yuan chinois', flag: '🇨🇳', symbol: '¥' },
  { code: 'BRL', name: 'Real bresilien', flag: '🇧🇷', symbol: 'R$' },
  { code: 'KES', name: 'Shilling kenyen', flag: '🇰🇪', symbol: 'KSh' },
  { code: 'NGN', name: 'Naira nigerian', flag: '🇳🇬', symbol: '₦' },
  { code: 'ZAR', name: 'Rand sud-africain', flag: '🇿🇦', symbol: 'R' },
  { code: 'INR', name: 'Roupie indienne', flag: '🇮🇳', symbol: '₹' },
  { code: 'AUD', name: 'Dollar australien', flag: '🇦🇺', symbol: 'A$' },
  { code: 'CAD', name: 'Dollar canadien', flag: '🇨🇦', symbol: 'C$' },
]

const stats = [
  { label: 'Modes de paiement', value: '12+', icon: CreditCard },
  { label: 'Pays', value: '150+', icon: Globe },
  { label: 'Devises', value: '12', icon: DollarSign },
  { label: 'Securite', value: 'PCI DSS', icon: Shield },
]

const transactions = [
  { id: 'TRX-001', date: '2024-04-09', amount: '149,00$', method: 'Carte', status: 'success' },
  { id: 'TRX-002', date: '2024-04-09', amount: '89,99$', method: 'PayPal', status: 'success' },
  { id: 'TRX-003', date: '2024-04-08', amount: '249,00$', method: 'Apple Pay', status: 'success' },
  { id: 'TRX-004', date: '2024-04-08', amount: '45,00$', method: 'Carte', status: 'pending' },
  { id: 'TRX-005', date: '2024-04-07', amount: '599,00$', method: 'Banque', status: 'success' },
]

export default function ElectronPayPage() {
  const [enabledMethods, setEnabledMethods] = useState<string[]>(['card', 'paypal', 'stripe', 'apple', 'google'])
  const [enabledCurrencies, setEnabledCurrencies] = useState<string[]>(['USD', 'EUR', 'GBP'])
  const [notification, setNotification] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  const toggleMethod = (id: string, name: string) => {
    if (enabledMethods.includes(id)) {
      setEnabledMethods(enabledMethods.filter(m => m !== id))
      setNotification(`${name} desactive`)
    } else {
      setEnabledMethods([...enabledMethods, id])
      setNotification(`${name} active`)
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const toggleCurrency = (code: string, name: string) => {
    if (enabledCurrencies.includes(code)) {
      setEnabledCurrencies(enabledCurrencies.filter(c => c !== code))
      setNotification(`${code} desactive`)
    } else {
      setEnabledCurrencies([...enabledCurrencies, code])
      setNotification(`${code} active`)
    }
    setTimeout(() => setNotification(null), 3000)
  }

  const copyApiCode = () => {
    const code = `const electronPay = require('electron-pay');
const payment = await electronPay.create({
  amount: 149.00,
  currency: 'USD',
  method: 'card'
});`
    navigator.clipboard.writeText(code)
    setNotification('Code API copie!')
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electron-blue via-electron-purple to-blue-600 flex items-center justify-center shadow-lg shadow-electron-blue/30">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-[var(--font-sora)]">Electron-Pay</h1>
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Actif
                </span>
              </div>
              <p className="text-gray-400">Processeur de paiements internationaux</p>
            </div>
          </div>
          <button onClick={() => { setShowSettings(true); setNotification('Parametres ouverture...'); setTimeout(() => setNotification(null), 3000); }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            Parametres
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <stat.icon className="w-5 h-5 text-electron-blue mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Modes de paiement
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {paymentMethods.map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggleMethod(method.id, method.name)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                enabledMethods.includes(method.id)
                  ? 'border-electron-blue bg-electron-blue/10'
                  : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{method.icon}</span>
                {enabledMethods.includes(method.id) ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <p className="font-medium text-sm">{method.name}</p>
              <p className="text-xs text-gray-500">{method.countries.join(', ')}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Currencies */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Devises activees
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {currencies.map((currency, i) => (
            <motion.button
              key={currency.code}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => toggleCurrency(currency.code, currency.name)}
              className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                enabledCurrencies.includes(currency.code)
                  ? 'border-electron-blue bg-electron-blue/10'
                  : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <span className="text-xl">{currency.flag}</span>
              <span className="font-bold text-sm">{currency.code}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Transactions recentes</h3>
        <div className="space-y-3">
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.status === 'success' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                }`}>
                  {tx.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{tx.id}</p>
                  <p className="text-sm text-gray-400">{tx.date.split('-').reverse().join('/')} • {tx.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{tx.amount}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  tx.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {tx.status === 'success' ? 'succes' : 'en attente'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Badge */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold">Conforme a la norme PCI DSS</h3>
              <p className="text-sm text-gray-400">Vos paiements sont securises grace a un chiffrement de niveau entreprise</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-white/5">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="p-2 rounded-lg bg-white/5">
              <Shield className="w-6 h-6" />
            </div>
            <div className="p-2 rounded-lg bg-white/5">
              <Lock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* API Info */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Integration API</h3>
          <button onClick={copyApiCode} className="px-3 py-1 rounded-lg bg-electron-blue/20 text-electron-blue text-sm flex items-center gap-1">
            <Copy className="w-4 h-4" /> Copier
          </button>
        </div>
        <div className="p-4 rounded-xl bg-black/50 font-mono text-sm">
          <p className="text-gray-400 mb-2">{/* Initialisation d'Electron-Pay */}</p>
          <p className="text-blue-400">const</p> electronPay = <p className="text-yellow-400">require</p>(<span className="text-green-400">'electron-pay'</span>);
          <br />
          <p className="text-gray-400 mb-2 mt-3">{/* Creer un paiement */}</p>
          <p className="text-blue-400">const</p> payment = <p className="text-blue-400">await</p> electronPay.<p className="text-yellow-400">create</p>({'{'}
          <br />
          &nbsp;&nbsp;amount: <span className="text-green-400">149.00</span>,
          <br />
          &nbsp;&nbsp;currency: <span className="text-green-400">'USD'</span>,
          <br />
          &nbsp;&nbsp;method: <span className="text-green-400">'card'</span>
          <br />
          {'}'});
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}