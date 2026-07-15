'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { Star, ShoppingCart } from 'lucide-react'

const products = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 79.99, originalPrice: 99.99, rating: 4.8, reviews: 234, image: '🎧', category: 'Electronics', tag: 'Best Seller' },
  { id: '2', name: 'Smart Watch Series X', price: 299.99, originalPrice: 399.99, rating: 4.9, reviews: 156, image: '⌚', category: 'Electronics', tag: 'New' },
  { id: '4', name: 'Portable Charger 20K', price: 49.99, originalPrice: 69.99, rating: 4.6, reviews: 312, image: '🔋', category: 'Electronics', tag: 'Sale' },
]

export default function ElectronicsPage() {
  const { addItem, count } = useCart()

  const addToCart = (product: any) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    alert(`${product.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/store" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">← Back to Store</Link>
        <h1 className="text-4xl font-bold text-white mb-4">📱 Electronics</h1>
        <p className="text-gray-400 mb-8">120 products</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div key={product.id} className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                <span className="text-6xl">{product.image}</span>
                {product.tag && <span className="absolute top-3 left-3 px-3 py-1 bg-blue-500 rounded-full text-xs text-white">{product.tag}</span>}
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-xs">{product.category}</p>
                <h3 className="text-white font-medium mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">${product.price}</span>
                    <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
                  </div>
                  <button onClick={() => addToCart(product)} className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}