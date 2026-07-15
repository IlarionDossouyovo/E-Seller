'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, CreditCard, Banknote, QrCode, Plus, Minus, Trash2, DollarSign, CheckCircle, Printer, Mail } from 'lucide-react'

const cart = [
  { id: 1, name: 'Wireless Earbuds', price: 49.99, qty: 2 },
  { id: 2, name: 'Phone Case', price: 24.99, qty: 1 },
]

export default function POSTerminalPage() {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cartTotal, setCartTotal] = useState(124.97)

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">POS Terminal</h1>
              <p className="text-gray-400">Point of Sale</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Products */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Quick Add</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {['Earbuds $49', 'Case $24', 'Cable $15', 'Watch $99', 'Band $19', 'Lens $29'].map((item, i) => (
              <button key={i} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 text-sm">{item}</button>
            ))}
          </div>

          <h3 className="font-semibold mb-4">Cart</h3>
          <div className="space-y-3 mb-4">
            {cart.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-400">${item.price} x {item.qty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 bg-white/10 rounded"><Minus className="w-4 h-4" /></button>
                  <span>{item.qty}</span>
                  <button className="p-1 bg-white/10 rounded"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-semibold pt-4 border-t border-white/10">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Payment</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button onClick={() => setPaymentMethod('card')} className={`p-4 rounded-xl flex flex-col items-center ${paymentMethod === 'card' ? 'bg-blue-500' : 'bg-white/5'}`}>
              <CreditCard className="w-6 h-6 mb-1" /> Card
            </button>
            <button onClick={() => setPaymentMethod('cash')} className={`p-4 rounded-xl flex flex-col items-center ${paymentMethod === 'cash' ? 'bg-green-500' : 'bg-white/5'}`}>
              <Banknote className="w-6 h-6 mb-1" /> Banknote
            </button>
            <button onClick={() => setPaymentMethod('qr')} className={`p-4 rounded-xl flex flex-col items-center ${paymentMethod === 'qr' ? 'bg-purple-500' : 'bg-white/5'}`}>
              <QrCode className="w-6 h-6 mb-1" /> QR
            </button>
          </div>

          {paymentMethod === 'cash' && (
            <div className="space-y-2 mb-4">
              {[20, 50, 100].map(amt => (
                <button key={amt} className="flex-1 py-3 bg-white/5 rounded-lg font-semibold">${amt}</button>
              ))}
            </div>
          )}

          <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-bold text-lg mb-4">
            Complete Sale (${cartTotal.toFixed(2)})
          </button>

          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-white/5 rounded-lg flex items-center justify-center gap-1"><Printer className="w-4 h-4" /> Print</button>
            <button className="flex-1 py-2 bg-white/5 rounded-lg flex items-center justify-center gap-1"><Mail className="w-4 h-4" /> Email</button>
          </div>
        </div>
      </div>
    </div>
  )
}