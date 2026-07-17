'use client'
import { MapPin, Navigation, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

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

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour Dashboard
        </Link>
        <Link href="/dashboard/shipping" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          Shipping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}