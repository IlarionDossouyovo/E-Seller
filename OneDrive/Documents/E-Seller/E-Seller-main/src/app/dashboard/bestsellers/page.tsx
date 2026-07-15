'use client'
import { Trophy, Medal } from 'lucide-react'
export default function BestsellersPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Bestsellers</h1><p className="text-gray-400">Top selling products</p></div>
        </div>
      </div>
    </div>
  )
}