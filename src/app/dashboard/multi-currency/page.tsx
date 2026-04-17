'use client'
import { Globe, DollarSign } from 'lucide-react'
export default function MultiCurrencyPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Multi-Currency</h1><p className="text-gray-400">Display in local currency</p></div>
        </div>
      </div>
    </div>
  )
}