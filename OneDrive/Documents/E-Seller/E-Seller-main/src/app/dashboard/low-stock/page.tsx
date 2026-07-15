'use client'
import { AlertTriangle, Package } from 'lucide-react'
export default function LowStockPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Low Stock</h1><p className="text-gray-400">Running low</p></div>
        </div>
      </div>
    </div>
  )
}