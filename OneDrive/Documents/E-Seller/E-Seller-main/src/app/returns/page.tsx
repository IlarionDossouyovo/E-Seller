import Link from 'next/link'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/store" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">← Back to Store</Link>
        <h1 className="text-4xl font-bold text-white mb-8">💰 Easy Returns</h1>
        <div className="p-6 bg-white/5 rounded-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">Return Policy</h2>
          <ul className="space-y-2 text-gray-300">
            <li>↩️ 30-day return policy</li>
            <li>📦 Free return shipping</li>
            <li>💵 Full refund or exchange</li>
            <li>📋 Item must be unused</li>
          </ul>
        </div>
      </div>
    </div>
  )
}