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
  { code: 'USD', name: 'Dollar americain', symbol: '$', icon: DollarSign, countries: ['Etats-Unis', 'Canada', 'Australie', 'Singapour'] },
  { code: 'EUR', name: 'Euro', symbol: '€', icon: Euro, countries: ['France', 'Allemagne', 'Italie', 'Espagne', 'Pays-Bas', 'Belgique'] },
  { code: 'GBP', name: 'Livre sterling', symbol: '£', icon: PoundSterling, countries: ['Royaume-Uni', 'Irlande'] },
  { code: 'JPY', name: 'Yen japonais', symbol: '¥', icon: JapaneseYen, countries: ['Japon'] },
  { code: 'AUD', name: 'Dollar australien', symbol: 'A$', icon: CircleDollarSign, countries: ['Australie', 'Nouvelle-Zelande'] },
  { code: 'CAD', name: 'Dollar canadien', symbol: 'C$', icon: CircleDollarSign, countries: ['Canada'] },
  { code: 'CHF', name: 'Franc suisse', symbol: 'Fr', icon: CircleDollarSign, countries: ['Suisse', 'Liechtenstein'] },
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
    region: 'Amerique du Nord',
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
      { name: 'Virement SEPA', logo: '🏦' },
    ]
  },
  {
    region: 'Asie Pacifique',
    icon: '🌏',
    methods: [
      { name: 'Alipay', logo: '🔶' },
      { name: 'WeChat Pay', logo: '🟢' },
      { name: 'PayPay', logo: '🟣' },
      { name: 'GrabPay', logo: '🟠' },
    ]
  },
  {
    region: 'Amerique latine',
    icon: '🌎',
    methods: [
      { name: 'Mercado Pago', logo: '🔵' },
      { name: 'Pix', logo: '⚡' },
      { name: 'Boleto', logo: '📄' },
      { name: 'OXXO', logo: '🏪' },
    ]
  },
  {
    region: 'Moyen-Orient & Afrique',
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
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Paiements internationaux</h1>
            <p className="text-gray-400">Acceptez des paiements du monde entier</p>
          </div>
        </div>
      </div>

      {/* Currency Selection */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Selectionnez votre devise</h2>
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
          <p className="text-sm text-gray-400 mb-2">Disponible dans :</p>
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
        <h2 className="text-lg font-semibold mb-4">Moyens de paiement par region</h2>
        
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
          <h2 className="text-lg font-semibold">Moyens de paiement enregistres</h2>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un moyen
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
                        Par defaut
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">
                    {method.country} • {method.expiry && `Expire ${method.expiry}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button 
                    onClick={() => setDefault(method.id)}
                    className="px-3 py-1 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Definir par defaut
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
        <h2 className="text-lg font-semibold mb-4">Securite des paiements</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: 'Conforme PCI DSS', desc: 'Vos paiements sont securises avec un chiffrement de niveau entreprise' },
            { icon: Lock, title: 'Chiffrement SSL', desc: 'Toutes les transactions sont chiffrees de bout en bout' },
            { icon: TrendingUp, title: 'Disponibilite 99.9%', desc: 'Traitement des paiements fiable avec zero arret' },
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
        <h2 className="text-lg font-semibold mb-4">Toutes les devises supportees</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {[
            { code: 'USD', name: 'Dollar americain', flag: '🇺🇸' },
            { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
            { code: 'GBP', name: 'Livre sterling', flag: '🇬🇧' },
            { code: 'JPY', name: 'Yen japonais', flag: '🇯🇵' },
            { code: 'CNY', name: 'Yuan chinois', flag: '🇨🇳' },
            { code: 'AUD', name: 'Dollar australien', flag: '🇦🇺' },
            { code: 'CAD', name: 'Dollar canadien', flag: '🇨🇦' },
            { code: 'CHF', name: 'Franc suisse', flag: '🇨🇭' },
            { code: 'HKD', name: 'Dollar de Hong Kong', flag: '🇭🇰' },
            { code: 'SGD', name: 'Dollar de Singapour', flag: '🇸🇬' },
            { code: 'BRL', name: 'Real bresilien', flag: '🇧🇷' },
            { code: 'INR', name: 'Roupie indienne', flag: '🇮🇳' },
            { code: 'KRW', name: 'Won coreen', flag: '🇰🇷' },
            { code: 'MXN', name: 'Peso mexicain', flag: '🇲🇽' },
            { code: 'TRY', name: 'Lire turque', flag: '🇹🇷' },
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