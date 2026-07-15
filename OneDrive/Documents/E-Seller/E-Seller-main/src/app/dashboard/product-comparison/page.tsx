'use client'

import { GitCompare } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductComparisonPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <GitCompare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Product Comparison</h1>
            <p className="text-gray-400">Compare products</p>
          </div>
        </div>
      </div>
    </div>
  )
}