'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Package,
  CheckCircle,
  Star
} from 'lucide-react'

const productDetails: Record<number, any> = {
  1: {
    id: 1,
    name: 'Wireless Earbuds Pro Max',
    category: 'Electronics',
    score: 92,
    revenue: '$45,200',
    growth: '+156%',
    price: 49.99,
    margin: 65,
    platforms: ['TikTok', 'Instagram'],
    trend: 'up',
  },
  2: {
    id: 2,
    name: 'Smart Water Bottle with Temp Display',
    category: 'Home & Garden',
    score: 88,
    revenue: '$32,500',
    growth: '+89%',
    price: 29.99,
    margin: 72,
    platforms: ['TikTok', 'Facebook'],
    trend: 'up',
  },
  3: {
    id: 3,
    name: 'Portable Ring Light Kit',
    category: 'Electronics',
    score: 76,
    revenue: '$18,900',
    growth: '+34%',
    price: 24.99,
    margin: 58,
    platforms: ['Instagram', 'Meta'],
    trend: 'up',
  },
  4: {
    id: 4,
    name: 'Ergonomic Laptop Stand',
    category: 'Office',
    score: 84,
    revenue: '$28,400',
    growth: '+67%',
    price: 39.99,
    margin: 61,
    platforms: ['TikTok', 'Google'],
    trend: 'up',
  },
  5: {
    id: 5,
    name: 'Minimalist Watch Collection',
    category: 'Fashion',
    score: 68,
    revenue: '$12,300',
    growth: '-12%',
    price: 89.99,
    margin: 45,
    platforms: ['Instagram'],
    trend: 'down',
  },
  6: {
    id: 6,
    name: 'Portable Yoga Mat',
    category: 'Sports',
    score: 81,
    revenue: '$15,200',
    growth: '+42%',
    price: 34.99,
    margin: 55,
    platforms: ['Instagram', 'TikTok'],
    trend: 'up',
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  const product = productDetails[productId]

  if (!product) {
    return (
      <div className="glass-card p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <a href="/dashboard/products" className="text-electron-blue hover:underline">
          Back to Products
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <a 
          href="/dashboard/products" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </a>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-electron-blue/20 text-electron-blue text-sm">
                {product.category}
              </span>
              {product.platforms.map((plat: string) => (
                <span key={plat} className="px-3 py-1 rounded-full bg-white/10 text-gray-400 text-sm">
                  {plat}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold font-[var(--font-sora)]">{product.name}</h1>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-electron-blue">{product.score}/100</div>
            <p className="text-gray-400">AI Score</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Revenue', value: product.revenue, icon: DollarSign, color: 'text-green-400' },
          { label: 'Growth', value: product.growth, icon: TrendingUp, color: product.trend === 'up' ? 'text-green-400' : 'text-red-400' },
          { label: 'Price', value: `$${product.price}`, icon: ShoppingCart, color: 'text-electron-blue' },
          { label: 'Margin', value: `${product.margin}%`, icon: Package, color: 'text-purple-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <a 
            href="/store" 
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity text-center font-medium"
          >
            Start Selling
          </a>
          <button className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-medium">
            Analyze Competitors
          </button>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Platform Performance</h3>
        <div className="space-y-3">
          {product.platforms.map((plat: string) => (
            <div key={plat} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <span>{plat}</span>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-green-400">High Performance</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}