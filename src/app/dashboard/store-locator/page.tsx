'use client'
import { MapPin, Navigation } from 'lucide-react'
export default function StoreLocatorPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Store Locator</h1><p className="text-gray-400">Find nearby stores</p></div>
        </div>
      </div>
    </div>
  )
}