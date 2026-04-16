'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CreditCard, Lock, Check, ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', country: '', postalCode: '',
    cardNumber: '', cardExpiry: '', cardCvc: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/store/cart" className="flex items-center gap-2 text-white hover:text-blue-400">
            <ArrowLeft className="w-5 h-5" /> Back to Cart
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Lock className="w-4 h-4" /> Secure Checkout
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {['Information', 'Payment', 'Confirmation'].map((s, i) => (
            <div key={i} className={`flex items-center gap-2 ${step > i ? 'text-green-400' : step === i + 1 ? 'text-blue-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > i + 1 ? 'bg-green-500' : step === i + 1 ? 'bg-blue-500' : 'bg-white/10'}`}>
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className="hidden md:inline">{s}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Contact Information</h2>
              <input type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              
              <h2 className="text-xl font-semibold text-white pt-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                <input type="text" placeholder="Last Name" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              </div>
              <input type="text" placeholder="Address" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="City" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                <input type="text" placeholder="Postal Code" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} />
              </div>
              <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}>
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
                <option value="GB">United Kingdom</option>
              </select>
              <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold">
                Continue to Payment
              </button>
            </div>

            <div className="glass-card p-6 h-fit">
              <h3 className="font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3"><span className="text-4xl">🎧</span><div><p className="text-white">Wireless Earbuds Pro</p><p className="text-gray-400">$79.99</p></div></div>
                <div className="flex gap-3"><span className="text-4xl">⌚</span><div><p className="text-white">Smart Watch Series X</p><p className="text-gray-400">$299.99</p></div></div>
                <div className="flex justify-between pt-4 border-t border-white/10"><span className="text-gray-400">Total</span><span className="text-white text-xl font-bold">$455.97</span></div>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Payment</h2>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Credit Card</span>
                </div>
                <input type="text" placeholder="Card Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-3" value={formData.cardNumber} onChange={e => setFormData({...formData, cardNumber: e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/YY" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.cardExpiry} onChange={e => setFormData({...formData, cardExpiry: e.target.value})} />
                  <input type="text" placeholder="CVC" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.cardCvc} onChange={e => setFormData({...formData, cardCvc: e.target.value})} />
                </div>
              </div>
              <button onClick={() => setStep(3)} className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold">
                Pay $455.97
              </button>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4">Shipping to</h3>
              <p className="text-gray-300">{formData.firstName} {formData.lastName}</p>
              <p className="text-gray-400">{formData.address}</p>
              <p className="text-gray-400">{formData.city}, {formData.postalCode}</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h2>
            <p className="text-gray-400 mb-8">Thank you for your purchase. A confirmation email has been sent.</p>
            <Link href="/store" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold inline-block">
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  )
}