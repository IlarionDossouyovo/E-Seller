'use client'

import { motion } from 'framer-motion'
import { 
  Search, 
  Package, 
  Palette, 
  Megaphone, 
  BarChart3, 
  Bot, 
  Truck, 
  Crosshair,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Mouse,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

const stats = [
  { 
    label: 'Total Revenue', 
    value: '$24,580', 
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    label: 'Active Products', 
    value: '156', 
    change: '+8.2%',
    trend: 'up',
    icon: Package,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    label: 'Total Views', 
    value: '125.4K', 
    change: '+24.8%',
    trend: 'up',
    icon: Eye,
    color: 'from-orange-500 to-red-500'
  },
  { 
    label: 'Click Rate', 
    value: '4.2%', 
    change: '-2.1%',
    trend: 'down',
    icon: Mouse,
    color: 'from-green-500 to-emerald-500'
  },
]

const quickActions = [
  { name: 'Search Products', description: 'Find winning products with AI', href: '/dashboard/products', icon: Search },
  { name: 'Generate Branding', description: 'Create your brand identity', href: '/dashboard/branding', icon: Palette },
  { name: 'Create Ads', description: 'Generate ad creatives', href: '/dashboard/ads', icon: Megaphone },
  { name: 'View Analytics', description: 'Check your performance', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Find Suppliers', description: 'Connect with suppliers', href: '/dashboard/suppliers', icon: Truck },
  { name: 'Positioning', description: 'Define your market position', href: '/dashboard/positioning', icon: Crosshair },
]

const recentProducts = [
  { name: 'Wireless Earbuds Pro', status: 'Trending', revenue: '$4,250', views: 12500 },
  { name: 'Smart Watch Ultra', status: 'New', revenue: '$3,120', views: 8900 },
  { name: 'LED Desk Lamp', status: 'Stable', revenue: '$2,450', views: 6200 },
  { name: 'Portable Charger', status: 'Trending', revenue: '$1,890', views: 5400 },
]

const container = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function DashboardPage() {
  return (
    <motion.div 
      variants={container}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={item} className="glass-card p-8">
        <h1 className="text-3xl font-bold mb-2 font-[var(--font-sora)]">
          Welcome back! 👋
        </h1>
        <p className="text-gray-400">
          Here&apos;s what&apos;s happening with your e-commerce business today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 group hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="text-xl font-semibold mb-4 font-[var(--font-sora)]">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, i) => (
            <motion.a
              key={action.name}
              href={action.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-4 text-center group cursor-pointer hover:border-electron-blue/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue/20 to-electron-purple/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <action.icon className="w-6 h-6 text-electron-blue" />
              </div>
              <h3 className="font-medium text-sm mb-1">{action.name}</h3>
              <p className="text-xs text-gray-500">{action.description}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Recent Products & Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <motion.div variants={item} className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold font-[var(--font-sora)]">Recent Products</h2>
            <a href="/dashboard/products" className="text-electron-blue text-sm hover:underline">View all</a>
          </div>
          <div className="space-y-4">
            {recentProducts.map((product, i) => (
              <motion.div 
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.views.toLocaleString()} views</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${product.revenue}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    product.status === 'Trending' ? 'bg-green-500/20 text-green-400' :
                    product.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Assistant Preview */}
        <motion.div variants={item} className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold font-[var(--font-sora)]">AI Assistant</h2>
            <a href="/dashboard/assistant" className="text-electron-blue text-sm hover:underline">Open chat</a>
          </div>
          <div className="space-y-4">
            {[
              { from: 'ai', text: 'I noticed your ROAS dropped by 2% this week. Would you like me to analyze your ad campaigns?' },
              { from: 'user', text: 'Yes, please analyze my ads' },
              { from: 'ai', text: 'I found 3 campaigns underperforming. Here are my recommendations:\n\n1. Pause "Summer Sale" ads - ROAS: 0.8\n2. Increase budget on "Smart Watch" - ROAS: 4.2\n3. Update copy for "Earbuds" ads' },
            ].map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`p-4 rounded-xl ${msg.from === 'ai' ? 'bg-electron-blue/10 border border-electron-blue/20' : 'bg-white/5'}`}
              >
                <p className="text-sm text-gray-300 whitespace-pre-line">{msg.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Placeholder */}
      <motion.div variants={item} className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6 font-[var(--font-sora)]">Performance Overview</h2>
        <div className="h-64 flex items-center justify-center bg-white/5 rounded-xl">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">Interactive charts coming soon</p>
            <p className="text-sm text-gray-600">Connect your analytics data to see real-time charts</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}