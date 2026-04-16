'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield } from 'lucide-react'

const cartItems = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 79.99, quantity: 1, image: '🎧' },
  { id: '2', name: 'Smart Watch Series X', price: 299.99, quantity: 1, image: '⌚' },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
  }

  const removeItem = (id: string) => setItems(items.filter(item => item.id !== id))

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.2
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/store" className="text-white hover:text-blue-400">← Back to Store</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" /> Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 mb-4">Your cart is empty</p>
            <Link href="/store" className="text-blue-400 hover:underline">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4 flex gap-4">
                  <div className="w-24 h-24 bg-white/5 rounded-xl flex items-center justify-center text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-blue-400 font-bold">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-white/10 rounded"><Minus className="w-4 h-4" /></button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-white/10 rounded"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-6 h-fit sticky top-24">
              <h3 className="font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Shipping</span><span className="text-white">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Tax (20%)</span><span className="text-white">${tax.toFixed(2)}</span></div>
                <div className="flex justify-between pt-2 border-t border-white/10 font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
              {shipping > 0 && <p className="text-xs text-green-400 mt-2">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>}
              <Link href="/store/checkout" className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2">
                Checkout <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2 mt-4 text-gray-400 text-xs justify-center">
                <Shield className="w-4 h-4" /> Secure checkout
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}