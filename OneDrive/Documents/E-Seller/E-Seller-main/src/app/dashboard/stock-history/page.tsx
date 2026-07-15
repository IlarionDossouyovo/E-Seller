'use client'
import { Package, History } from 'lucide-react'
export default function StockHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Stock History</h1><p className="text-gray-400">Inventory changes</p></div>
        </div>
      </div>
    </div>
  )
}