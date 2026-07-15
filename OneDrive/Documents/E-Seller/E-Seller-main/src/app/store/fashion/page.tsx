'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

const products = [
  { id: 'f1', name: 'Designer Dress', price: 89.99, originalPrice: 129.99, image: '👗', category: 'Fashion' },
  { id: 'f2', name: 'Casual Jeans', price: 59.99, originalPrice: 79.99, image: '👖', category: 'Fashion' },
  { id: 'f3', name: 'Leather Jacket', price: 199.99, originalPrice: 299.99, image: '🧥', category: 'Fashion' },
]

export default function FashionPage() {
  const { addItem } = useCart()

  const addToCart = (product: any) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    alert(`${product.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/store" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">← Back to Store</Link>
        <h1 className="text-4xl font-bold text-white mb-4">👗 Fashion</h1>
        <p className="text-gray-400 mb-8">200 products</p>
        
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