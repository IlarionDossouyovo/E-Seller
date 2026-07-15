'use client'
import { CheckCircle, UserCheck } from 'lucide-react'
export default function VendorApprovalPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div><h1 className="text-2xl font-bold font-[var(--font-sora)]">Vendor Approval</h1><p className="text-gray-400">Verify vendors</p></div>
        </div>
      </div>
    </div>
  )
}