'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Globe, DollarSign, Plus, Settings, CheckCircle } from 'lucide-react'

const taxRules = [
  { country: 'US', state: 'California', rate: 7.25, regions: ['Los Angeles', 'San Francisco'] },
  { country: 'US', state: 'New York', rate: 8.0, regions: ['NYC', 'Buffalo'] },
  { country: 'EU', region: 'Germany', rate: 19.0, regions: ['All'] },
  { country: 'EU', region: 'France', rate: 20.0, regions: ['All'] },
  { country: 'UK', region: 'UK', rate: 20.0, regions: ['All'] },
]

export default function TaxCalculatorPage() {
  const [activeTab, setActiveTab] = useState('calculator')
  const [subtotal, setSubtotal] = useState(100)

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-slate-600 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Tax Calculator</h1>
              <p className="text-gray-400">Calculate taxes by region</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-slate-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Rule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{taxRules.length}</p>
          <p className="text-sm text-gray-400">Tax Rules</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">5</p>
          <p className="text-sm text-gray-400">Countries</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">$12,340</p>
          <p className="text-sm text-gray-400">Tax Collected</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">100%</p>
          <p className="text-sm text-gray-400">Compliance</p>
        </motion.div>
      </div>

      <div className="flex gap-2">
        {['calculator', 'rules', 'reports'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-blue-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'calculator' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Calculate Tax</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Subtotal</label>
                <input type="number" value={subtotal} onChange={(e) => setSubtotal(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Region</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <option>US - California (7.25%)</option>
                  <option>US - New York (8.0%)</option>
                  <option>EU - Germany (19.0%)</option>
                  <option>UK (20.0%)</option>
                </select>
              </div>
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Tax (7.25%)</span>
                  <span>${(subtotal * 0.0725).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>${(subtotal * 1.0725).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Tax Rules</h3>
            <div className="space-y-3">
              {taxRules.map((rule, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="font-medium">{rule.country} - {rule.state || rule.region}</p>
                      <p className="text-sm text-gray-400">{rule.regions.join(', ')}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-400">{rule.rate}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}