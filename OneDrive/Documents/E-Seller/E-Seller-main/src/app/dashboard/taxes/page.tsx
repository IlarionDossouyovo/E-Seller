'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Globe, 
  DollarSign, 
  Percent,
  Info,
  CheckCircle,
  AlertTriangle,
  Search,
  Plus
} from 'lucide-react'

type TaxRate = {
  country: string
  countryCode: string
  rate: number
  state?: string
  type: 'standard' | 'reduced' | 'zero'
  active: boolean
}

const mockTaxRates: TaxRate[] = [
  { country: 'United States', countryCode: 'US', rate: 7.25, state: 'Federal + Average', type: 'standard', active: true },
  { country: 'United Kingdom', countryCode: 'GB', rate: 20, type: 'standard', active: true },
  { country: 'Germany', countryCode: 'DE', rate: 19, type: 'standard', active: true },
  { country: 'France', countryCode: 'FR', rate: 20, type: 'standard', active: true },
  { country: 'Canada', countryCode: 'CA', rate: 5, state: 'GST', type: 'standard', active: true },
  { country: 'Japan', countryCode: 'JP', rate: 10, type: 'standard', active: true },
  { country: 'Australia', countryCode: 'AU', rate: 10, type: 'standard', active: true },
  { country: 'China', countryCode: 'CN', rate: 13, type: 'standard', active: true },
]

const popularCountries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', rate: '7.25%' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', rate: '20%' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', rate: '19%' },
  { code: 'FR', name: 'France', flag: '🇫🇷', rate: '20%' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', rate: '5%' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', rate: '10%' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', rate: '10%' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', rate: '22%' },
]

const stats = [
  { label: 'Active Tax Rates', value: '8', icon: Calculator },
  { label: 'Countries Covered', value: '45+', icon: Globe },
  { label: 'Tax Collected', value: '$2,340', icon: DollarSign },
  { label: 'Compliance', value: '100%', icon: CheckCircle },
]

export default function TaxesPage() {
  const [taxRates] = useState<TaxRate[]>(mockTaxRates)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRates = taxRates.filter(rate =>
    rate.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Tax Calculator</h1>
              <p className="text-gray-400">Configure tax rates by country and region</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Tax Rate
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Setup */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Popular Countries</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCountries.map((country, i) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-electron-blue/30 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{country.flag}</span>
                <span className="font-medium">{country.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold">{country.rate}</span>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tax Rates Table */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Tax Rates Configuration</h3>
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-gray-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Country</th>
                <th className="text-left p-4 text-gray-400 font-medium">Tax Rate</th>
                <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRates.map((rate, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="p-4 flex items-center gap-2">
                    <span className="text-xl">{rate.countryCode === 'US' ? '🇺🇸' : rate.countryCode === 'GB' ? '🇬🇧' : rate.countryCode === 'DE' ? '🇩🇪' : rate.countryCode === 'FR' ? '🇫🇷' : rate.countryCode === 'CA' ? '🇨🇦' : rate.countryCode === 'JP' ? '🇯🇵' : rate.countryCode === 'AU' ? '🇦🇺' : '🌍'}</span>
                    <span className="font-medium">{rate.country}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-400">{rate.rate}%</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rate.type === 'standard' ? 'bg-blue-500/20 text-blue-400' :
                      rate.type === 'reduced' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {rate.type}
                    </span>
                  </td>
                  <td className="p-4">
                    {rate.active ? (
                      <span className="flex items-center gap-1 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400 text-sm">
                        <AlertTriangle className="w-4 h-4" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Calculator */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Tax Calculator</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Amount</label>
            <input type="number" placeholder="0.00" className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white text-lg font-mono" />
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Country</label>
            <select className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>France</option>
            </select>
          </div>
          <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Tax Amount</p>
              <p className="text-2xl font-bold text-emerald-400">$0.00</p>
            </div>
            <Percent className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  )
}