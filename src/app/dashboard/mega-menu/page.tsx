'use client'
import { Menu, List } from 'lucide-react'
export default function MegaMenuPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Menu className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Mega Menu</h1><p className="text-gray-400">Navigation menus</p></div>
        </div>
      </div>
    </div>
  )
}