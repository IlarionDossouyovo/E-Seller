'use client'

import { motion } from 'framer-motion'
import { Heart, Share2, Users } from 'lucide-react'

export default function WishlistSharingPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Wishlist Sharing</h1><p className="text-gray-400">Shared lists</p></div>
        </div>
      </div>
    </div>
  )
}