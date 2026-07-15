'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wrench, Clock, Mail, AlertCircle } from 'lucide-react'

export default function MaintenancePage() {
  const [enabled, setEnabled] = useState(false)
  const [message, setMessage] = useState('We are performing some scheduled maintenance. We will be back soon!')
  const [email, setEmail] = useState('maintenance@e-seller.com')
  const [eta, setEta] = useState('2 hours')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full glass-card p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
          <Wrench className="w-10 h-10 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Maintenance Mode</h1>
        <p className="text-gray-400 mb-6">Your store is currently in maintenance mode. Customers cannot access it.</p>

        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <span className="text-white">Enable Maintenance</span>
            <button onClick={() => setEnabled(!enabled)} className={`w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-green-500' : 'bg-gray-600'}`}>
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Contact Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">ETA</label>
              <input type="text" value={eta} onChange={(e) => setEta(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-start gap-3 text-left">
          <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-white">Preview</p>
            <p className="text-sm text-gray-400">This is how your store will look to visitors when maintenance is enabled.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}