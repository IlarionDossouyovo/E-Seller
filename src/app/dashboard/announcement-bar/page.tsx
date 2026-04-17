'use client'
import { Radio, Megaphone } from 'lucide-react'
export default function AnnouncementBarPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center">
            <Megaphone className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Announcement Bar</h1><p className="text-gray-400">Top banner messages</p></div>
        </div>
      </div>
    </div>
  )
}