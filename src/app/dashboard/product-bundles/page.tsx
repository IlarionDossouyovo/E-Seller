'use client'
import { Box, Layers } from 'lucide-react'
export default function ProductBundlesPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Box className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Product Bundles</h1><p className="text-gray-400">Bundled deals</p></div>
        </div>
      </div>
    </div>
  )
}