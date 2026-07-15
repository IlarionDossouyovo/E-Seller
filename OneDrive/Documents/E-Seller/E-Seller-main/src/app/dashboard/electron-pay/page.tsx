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
  { id: 'card', name: 'Credit/Debit Cards', icon: '💳', supported: true, countries: ['Global'] },
  { id: 'apple', name: 'Apple Pay', icon: '🍎', supported: true, countries: ['US', 'UK', 'EU', 'AU'] },
  { id: 'google', name: 'Google Pay', icon: '🔵', supported: true, countries: ['US', 'UK', 'EU'] },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', supported: true, countries: ['Global'] },
  { id: 'alipay', name: 'Alipay', icon: '🅰️', supported: true, countries: ['CN', 'US'] },
  { id: 'wechat', name: 'WeChat Pay', icon: '💬', supported: true, countries: ['CN', 'US'] },
  { id: 'stripe', name: 'Stripe', icon: '⚡', supported: true, countries: ['Global'] },
  { id: 'mercadopago', name: 'Mercado Pago', icon: '🇧🇷', supported: true, countries: ['BR', 'AR', 'MX'] },
  { id: 'mpesa', name: 'M-Pesa', icon: '🇰🇪', supported: true, countries: ['KE', 'TZ', 'GH'] },
  { id: 'klarna', name: 'Klarna', icon: '🇸🇪', supported: true, countries: ['EU', 'US'] },
  { id: 'afterpay', name: 'Afterpay', icon: '🇦🇺', supported: true, countries: ['AU', 'NZ', 'US'] },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦', supported: true, countries: ['Global'] },
]

const currencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', symbol: 'R$' },
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪', symbol: 'KSh' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', symbol: 'R' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
]

const stats = [
  { label: 'Payment Methods', value: '12+', icon: CreditCard },
  { label: 'Countries', value: '150+', icon: Globe },
  { label: 'Currencies', value: '12', icon: DollarSign },
  { label: 'Security', value: 'PCI DSS', icon: Shield },
]

const transactions = [
  { id: 'TRX-001', date: '2024-04-09', amount: '$149.00', method: 'Card', status: 'success' },
  { id: 'TRX-002', date: '2024-04-09', amount: '$89.99', method: 'PayPal', status: 'success' },
  { id: 'TRX-003', date: '2024-04-08', amount: '$249.00', method: 'Apple Pay', status: 'success' },
  { id: 'TRX-004', date: '2024-04-08', amount: '$45.00', method: 'Card', status: 'pending' },
  { id: 'TRX-005', date: '2024-04-07', amount: '$599.00', method: 'Bank', status: 'success' },
]

export default function ElectronPayPage() {
  const [enabledMethods, setEnabledMethods] = useState<string[]>(['card', 'paypal', 'stripe', 'apple', 'google'])
  const [enabledCurrencies, setEnabledCurrencies] = useState<string[]>(['USD', 'EUR', 'GBP'])

  const toggleMethod = (id: string) => {
    if (enabledMethods.includes(id)) {
      setEnabledMethods(enabledMethods.filter(m => m !== id))
    } else {
      setEnabledMethods([...enabledMethods, id])
    }
  }

  const toggleCurrency = (code: string) => {
    if (enabledCurrencies.includes(code)) {
      setEnabledCurrencies(enabledCurrencies.filter(c => c !== code))
    } else {
      setEnabledCurrencies([...enabledCurrencies, code])
    }
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
                  <CheckCircle className="w-3 h-3" /> Active
                </span>
              </div>
              <p className="text-gray-400">International Payment Processor</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            Settings
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
          Payment Methods
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {paymentMethods.map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggleMethod(method.id)}
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
          Enabled Currencies
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {currencies.map((currency, i) => (
            <motion.button
              key={currency.code}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => toggleCurrency(currency.code)}
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
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
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
                  <p className="text-sm text-gray-400">{tx.date} • {tx.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{tx.amount}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  tx.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {tx.status}
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
              <h3 className="font-semibold">PCI DSS Compliant</h3>
              <p className="text-sm text-gray-400">Your payments are secure with enterprise-grade encryption</p>
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
        <h3 className="text-lg font-semibold mb-4">API Integration</h3>
        <div className="p-4 rounded-xl bg-black/50 font-mono text-sm">
          <p className="text-gray-400 mb-2">// Initialize Electron-Pay</p>
          <p className="text-blue-400">const</p> electronPay = <p className="text-yellow-400">require</p>(<span className="text-green-400">'electron-pay'</span>);
          <br />
          <p className="text-gray-400 mb-2 mt-3">// Create payment</p>
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
    </div>
  )
}