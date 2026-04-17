'use client'
import { UserPlus, Gift, DollarSign } from 'lucide-react'

export default function ReferralProgramPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-cyan-600 flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Referral Program</h1><p className="text-gray-400">Refer & earn</p></div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card p-4"><p className="text-2xl font-bold text-green-400">156</p><p className="text-sm text-gray-400">Referrals</p></div>
      </div>
    </div>
  )
}