'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X,
  Star,
  ChevronRight,
  Zap,
  Shield,
  Truck,
  CreditCard,
  Globe,
  ArrowRight
} from 'lucide-react'

const products = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 79.99, originalPrice: 99.99, rating: 4.8, reviews: 234, image: '🎧', category: 'Electronics', tag: 'Best Seller' },
  { id: '2', name: 'Smart Watch Series X', price: 299.99, originalPrice: 399.99, rating: 4.9, reviews: 156, image: '⌚', category: 'Electronics', tag: 'New' },
  { id: '3', name: 'Organic Face Cream', price: 34.99, originalPrice: 49.99, rating: 4.7, reviews: 89, image: '🧴', category: 'Beauty', tag: null },
  { id: '4', name: 'Portable Charger 20K', price: 49.99, originalPrice: 69.99, rating: 4.6, reviews: 312, image: '🔋', category: 'Electronics', tag: 'Sale' },
  { id: '5', name: 'Yoga Mat Premium', price: 39.99, originalPrice: 59.99, rating: 4.8, reviews: 178, image: '🧘', category: 'Sports', tag: null },
  { id: '6', name: 'LED Desk Lamp', price: 44.99, originalPrice: 54.99, rating: 4.5, reviews: 95, image: '💡', category: 'Home', tag: null },
]

const categories = [
  { name: 'Electronics', icon: '📱', count: 120 },
  { name: 'Beauty', icon: '💄', count: 85 },
  { name: 'Fashion', icon: '👗', count: 200 },
  { name: 'Home', icon: '🏠', count: 150 },
  { name: 'Sports', icon: '⚽', count: 90 },
]

export default function StorePage() {
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const addToCart = () => setCartCount(prev => prev + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">E-SELLER</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-300"><Heart className="w-6 h-6" /></button>
              <button className="relative p-2 text-gray-300">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center text-white">{cartCount}</span>}
              </button>
              <Link href="/login" className="hidden md:block px-4 py-2 bg-blue-600 rounded-lg text-white text-sm">Sign In</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 p-8 md:p-16">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm mb-4">⚡ Powered by AI</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Discover Amazing Products</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">Shop the best products curated by AI. Fast shipping, secure payments.</p>
              <div className="flex gap-4">
                <a href="#products" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold flex items-center gap-2">Shop Now <ArrowRight className="w-5 h-5" /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ icon: Truck, label: 'Free Shipping' }, { icon: Shield, label: 'Secure Payment' }, { icon: CreditCard, label: 'Easy Returns' }, { icon: Globe, label: 'Global Delivery' }].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                <f.icon className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium text-sm">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="p-6 bg-white/5 rounded-2xl text-center cursor-pointer hover:bg-white/10">
                <span className="text-4xl mb-2 block">{cat.icon}</span>
                <p className="text-white font-medium">{cat.name}</p>
                <p className="text-gray-400 text-sm">{cat.count} products</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10">
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
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">${product.price}</span>
                    <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">© 2026 E-SELLER. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}