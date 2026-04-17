'use client'
import { TrendingUp, Flame } from 'lucide-react'
export default function TrendingProductsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Trending Products</h1><p className="text-gray-400">Hot items</p></div>
        </div>
      </div>
    </div>
  )
}