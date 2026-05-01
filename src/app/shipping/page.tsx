import Link from 'next/link'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/store" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">← Back to Store</Link>
        <h1 className="text-4xl font-bold text-white mb-8">🚚 Free Shipping</h1>
        <div className="space-y-6 text-gray-300">
          <div className="p-6 bg-white/5 rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">Free Shipping Details</h2>
            <ul className="space-y-2">
              <li>✅ Free shipping on orders over $50</li>
              <li>📦 Standard delivery: 5-7 business days</li>
              <li>🚀 Express delivery: 2-3 business days ($9.99)</li>
              <li>🌍 International shipping available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}