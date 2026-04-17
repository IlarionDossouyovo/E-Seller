'use client'
import { Percent, Tag, Zap } from 'lucide-react'
export default function DiscountManagerPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Percent className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Discount Manager</h1><p className="text-gray-400">Manage discounts</p></div>
        </div>
      </div>
    </div>
  )
}