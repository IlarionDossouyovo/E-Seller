'use client'
import { FileText, FormInput } from 'lucide-react'
export default function CustomFormsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
            <FormInput className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Custom Forms</h1><p className="text-gray-400">Build custom forms</p></div>
        </div>
      </div>
    </div>
  )
}