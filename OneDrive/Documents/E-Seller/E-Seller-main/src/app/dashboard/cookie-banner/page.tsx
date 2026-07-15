'use client'
import { Cookie, Settings } from 'lucide-react'

export default function CookieBannerPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Cookie className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Cookie Banner</h1><p className="text-gray-400">Consent management</p></div>
        </div>
      </div>
    </div>
  )
}