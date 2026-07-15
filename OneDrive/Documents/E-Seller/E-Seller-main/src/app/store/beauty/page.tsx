'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { Star } from 'lucide-react'

const products = [
  { id: '3', name: 'Organic Face Cream', price: 34.99, originalPrice: 49.99, rating: 4.7, reviews: 89, image: '🧴', category: 'Beauty' },
]

export default function BeautyPage() {
  const { addItem } = useCart()

  const addToCart = (product: any) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    alert(`${product.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/store" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">← Back to Store</Link>
        <h1 className="text-4xl font-bold text-white mb-4">💄 Beauty</h1>
        <p className="text-gray-400 mb-8">85 products</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white/5 rounded-2xl overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">${product.price}</span>
                  <button onClick={() => addToCart(product)} className="px-3 py-1 bg-blue-600 rounded-lg text-white text-sm">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}