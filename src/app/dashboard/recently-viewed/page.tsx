'use client'
import { History, Clock } from 'lucide-react'
export default function RecentlyViewedPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
            <History className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Recently Viewed</h1><p className="text-gray-400">Viewing history</p></div>
        </div>
      </div>
    </div>
  )
}