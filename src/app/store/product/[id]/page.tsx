'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Heart, Star, Shield, Truck, RotateCcw, Check } from 'lucide-react'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = {
    id: params.id,
    name: 'Wireless Earbuds Pro',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 234,
    description: 'Experience premium sound quality with our advanced wireless earbuds. Featuring active noise cancellation, 24-hour battery life, and seamless Bluetooth connectivity.',
    features: ['Active Noise Cancellation', '24-hour Battery Life', 'Bluetooth 5.3', 'Touch Controls', 'Water Resistant IPX5'],
    images: ['🎧', '🎵', '🎶', '🎤'],
    inStock: true,
    sku: 'WEP-001',
    category: 'Electronics',
    tags: ['Best Seller', 'New Arrival']
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/store" className="flex items-center gap-2 text-white hover:text-blue-400">
            <ArrowLeft className="w-5 h-5" /> Back to Store
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-300 hover:text-white"><Heart className="w-6 h-6" /></button>
            <button className="p-2 text-gray-300 hover:text-white"><ShoppingCart className="w-6 h-6" /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <motion.div key={selectedImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center text-9xl">
              {product.images[selectedImage]}
            </motion.div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center text-3xl ${selectedImage === i ? 'ring-2 ring-blue-500' : ''}`}>
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-2">
                {product.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">{tag}</span>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} />)}
                </div>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white">${product.price}</span>
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm">Save 20%</span>
            </div>

            <p className="text-gray-300">{product.description}</p>

            <div className="space-y-2">
              <p className="text-gray-400">Features:</p>
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-300">
                  <Check className="w-4 h-4 text-green-400" /> {f}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2">-</button>
                <span className="px-4 py-2">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">+</button>
              </div>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="text-center"><Truck className="w-5 h-5 mx-auto text-blue-400 mb-1" /><p className="text-xs text-gray-400">Free Shipping</p></div>
              <div className="text-center"><RotateCcw className="w-5 h-5 mx-auto text-blue-400 mb-1" /><p className="text-xs text-gray-400">30-Day Returns</p></div>
              <div className="text-center"><Shield className="w-5 h-5 mx-auto text-blue-400 mb-1" /><p className="text-xs text-gray-400">2-Year Warranty</p></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}