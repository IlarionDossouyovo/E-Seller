'use client'
import { Layers, Palette } from 'lucide-react'
export default function ProductVariantsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Product Variants</h1><p className="text-gray-400">Size, color, material</p></div>
        </div>
      </div>
    </div>
  )
}