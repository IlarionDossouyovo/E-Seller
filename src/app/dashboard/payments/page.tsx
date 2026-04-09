'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Globe, 
  Check, 
  Plus, 
  Trash2, 
  Edit,
  Lock,
  Shield,
  TrendingUp,
  DollarSign,
  Euro,
  PoundSterling,
  JapaneseYen,
  Wallet,
  Landmark,
  CircleDollarSign
} from 'lucide-react'

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', icon: DollarSign, countries: ['United States', 'Canada', 'Australia', 'Singapore'] },
  { code: 'EUR', name: 'Euro', symbol: '€', icon: Euro, countries: ['France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium'] },
  { code: 'GBP', name: 'British Pound', symbol: '£', icon: PoundSterling, countries: ['United Kingdom', 'Ireland'] },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', icon: JapaneseYen, countries: ['Japan'] },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', icon: CircleDollarSign, countries: ['Australia', 'New Zealand'] },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', icon: CircleDollarSign, countries: ['Canada'] },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', icon: CircleDollarSign, countries: ['Switzerland', 'Liechtenstein'] },
]

type PaymentMethod = {
  id: number
  type: 'card' | 'paypal' | 'bank' | 'wallet'
  name: string
  last4?: string
  expiry?: string
  isDefault: boolean
  country: string
}

const mockPaymentMethods: PaymentMethod[] = [
  { id: 1, type: 'card', name: 'Visa ending in 4242', last4: '4242', expiry: '12/25', isDefault: true, country: 'United States' },
  { id: 2, type: 'paypal', name: 'PayPal', isDefault: false, country: 'Global' },
  { id: 3, type: 'card', name: 'Mastercard ending in 8888', last4: '8888', expiry: '06/26', isDefault: false, country: 'Germany' },
]

const regionalPayments = [
  {
    region: 'North America',
    icon: '🇺🇸',
    methods: [
      { name: 'Visa', logo: '💳' },
      { name: 'Mastercard', logo: '💳' },
      { name: 'American Express', logo: '💳' },
      { name: 'Discover', logo: '💳' },
      { name: 'PayPal', logo: '🅿️' },
      { name: 'Apple Pay', logo: '🍎' },
      { name: 'Google Pay', logo: '🔵' },
    ]
  },
  {
    region: 'Europe',
    icon: '🇪🇺',
    methods: [
      { name: 'Visa', logo: '💳' },
      { name: 'Mastercard', logo: '💳' },
      { name: 'PayPal', logo: '🅿️' },
      { name: 'Klarna', logo: '🛍️' },
      { name: 'iDEAL', logo: '🏦' },
      { name: 'SEPA Transfer', logo: '🏦' },
    ]
  },
  {
    region: 'Asia Pacific',
    icon: '🌏',
    methods: [
      { name: 'Alipay', logo: '🔶' },
      { name: 'WeChat Pay', logo: '🟢' },
      { name: 'PayPay', logo: '🟣' },
      { name: 'GrabPay', logo: '🟠' },
    ]
  },
  {
    region: 'Latin America',
    icon: '🌎',
    methods: [
      { name: 'Mercado Pago', logo: '🔵' },
      { name: 'Pix', logo: '⚡' },
      { name: 'Boleto', logo: '📄' },
      { name: 'OXXO', logo: '🏪' },
    ]
  },
  {
    region: 'Middle East & Africa',
    icon: '🏜️',
    methods: [
      { name: 'STC Pay', logo: '💙' },
      { name: 'Mada', logo: '🟢' },
      { name: 'KNET', logo: '🔵' },
      { name: 'M-Pesa', logo: '💚' },
    ]
  },
]

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods)
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [selectedRegion, setSelectedRegion] = useState('North America')

  const setDefault = (id: number) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })))
  }

  const deleteMethod = (id: number) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">International Payments</h1>
            <p className="text-gray-400">Accept payments from around the world</p>
          </div>
        </div>
      </div>

      {/* Currency Selection */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Select Your Currency</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {currencies.map((currency, i) => (
            <motion.button
              key={currency.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedCurrency(currency)}
              className={`p-4 rounded-xl border transition-all ${
                selectedCurrency.code === currency.code
                  ? 'border-electron-blue bg-electron-blue/10'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <currency.icon className="w-5 h-5" />
                <span className="font-bold">{currency.symbol}</span>
              </div>
              <p className="text-sm font-medium">{currency.code}</p>
            </motion.button>
          ))}
        </div>
        
        {/* Supported Countries */}
        <div className="mt-4 p-4 rounded-xl bg-white/5">
          <p className="text-sm text-gray-400 mb-2">Available in:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCurrency.countries.map((country, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-sm">
                {country}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Payment Methods */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Methods by Region</h2>
        
        {/* Region Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {regionalPayments.map((region) => (
            <button
              key={region.region}
              onClick={() => setSelectedRegion(region.region)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                selectedRegion === region.region
                  ? 'bg-electron-blue text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <span className="mr-2">{region.icon}</span>
              {region.region}
            </button>
          ))}
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {regionalPayments
            .find(r => r.region === selectedRegion)
            ?.methods.map((method, i) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center cursor-pointer"
              >
                <div className="text-3xl mb-2">{method.logo}</div>
                <p className="font-medium text-sm">{method.name}</p>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Saved Payment Methods */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Saved Payment Methods</h2>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Method
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue/20 to-electron-purple/20 flex items-center justify-center">
                  {method.type === 'card' && <CreditCard className="w-6 h-6 text-electron-blue" />}
                  {method.type === 'paypal' && <span className="text-xl">🅿️</span>}
                  {method.type === 'bank' && <span className="text-xl">🏦</span>}
                  {method.type === 'wallet' && <span className="text-xl">👛</span>}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{method.name}</p>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 rounded-full bg-electron-blue/20 text-electron-blue text-xs">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">
                    {method.country} • {method.expiry && `Expires ${method.expiry}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button 
                    onClick={() => setDefault(method.id)}
                    className="px-3 py-1 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Set Default
                  </button>
                )}
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteMethod(method.id)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Security */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Security</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: 'PCI DSS Compliant', desc: 'Your payments are secured with enterprise-grade encryption' },
            { icon: Lock, title: 'SSL Encrypted', desc: 'All transactions are encrypted end-to-end' },
            { icon: TrendingUp, title: '99.9% Uptime', desc: 'Reliable payment processing with zero downtime' },
          ].map((feature, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5">
              <feature.icon className="w-8 h-8 text-electron-blue mb-3" />
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Currencies */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">All Supported Currencies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {[
            { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
            { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
            { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
            { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
            { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
            { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
            { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
            { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
            { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
            { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
            { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
            { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
            { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
            { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
            { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
          ].map((currency, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
              <span className="text-xl">{currency.flag}</span>
              <div>
                <p className="font-medium text-sm">{currency.code}</p>
                <p className="text-xs text-gray-400">{currency.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}