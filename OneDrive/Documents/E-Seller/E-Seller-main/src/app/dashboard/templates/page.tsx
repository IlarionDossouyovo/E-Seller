'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Layout, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Download, 
  Eye, 
  Palette,
  Zap,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Layers,
  Grid,
  MousePointer,
  Type,
  Image,
  Video,
  ShoppingCart,
  FileText,
  MessageSquare,
  Star,
  Heart,
  Share2,
  Plus,
  Minus,
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Home,
  CreditCard,
  Lock,
  Globe,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  TrendingUp,
  BarChart3,
  Users,
  Package,
  Truck,
  Box,
  Tag,
  Percent,
  Calendar,
  Clock,
  Filter,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  XCircle,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Copy,
  RefreshCw,
  Search as SearchIcon,
  ShoppingBag,
  CreditCard as CardIcon,
  Truck as TruckIcon,
  Package as PackageIcon,
  Star as StarIcon,
  Heart as HeartIcon,
  Share as ShareIcon,
  Eye as EyeIcon,
  Search as SearchIcon2
} from 'lucide-react'

type TemplateCategory = 'landing' | 'shop' | 'blog' | 'portfolio' | 'saas'

interface Template {
  id: number
  name: string
  category: TemplateCategory
  description: string
  preview: string
  features: string[]
  pages: number
  responsive: boolean
  animated: boolean
}

const templates: Template[] = [
  {
    id: 1,
    name: 'E-Commerce Pro',
    category: 'shop',
    description: 'Boutique en ligne complète avec panier, checkout, produits',
    preview: 'shop',
    features: ['Panier', 'Checkout', 'Produits', 'Categories', 'Recherche', 'Filtres'],
    pages: 8,
    responsive: true,
    animated: true,
  },
  {
    id: 2,
    name: 'SaaS Landing',
    category: 'saas',
    description: 'Page d\'accueil moderne pour SaaS avec pricing, features',
    preview: 'saas',
    features: ['Hero', 'Features', 'Pricing', 'Testimonials', 'CTA', 'Footer'],
    pages: 5,
    responsive: true,
    animated: true,
  },
  {
    id: 3,
    name: 'Blog Minimal',
    category: 'blog',
    description: 'Blog propre avec articles, categories, newsletter',
    preview: 'blog',
    features: ['Articles', 'Categories', 'Newsletter', 'Comments', 'Sidebar'],
    pages: 6,
    responsive: true,
    animated: false,
  },
  {
    id: 4,
    name: 'Portfolio Creative',
    category: 'portfolio',
    description: 'Portfolio créatif pour freelancers et agences',
    preview: 'portfolio',
    features: ['Gallery', 'Projects', 'About', 'Contact', 'Skills'],
    pages: 5,
    responsive: true,
    animated: true,
  },
  {
    id: 5,
    name: 'Startup Launch',
    category: 'landing',
    description: 'Landing page complète pour startup avec animated hero',
    preview: 'startup',
    features: ['Animated Hero', 'Features', 'Stats', 'Testimonials', 'CTA', 'Footer'],
    pages: 4,
    responsive: true,
    animated: true,
  },
  {
    id: 6,
    name: 'Food & Restaurant',
    category: 'shop',
    description: 'Site restaurant avec menu, reservations, commandes',
    preview: 'restaurant',
    features: ['Menu', 'Reservations', 'Commandes', 'Gallery', 'Contact'],
    pages: 6,
    responsive: true,
    animated: true,
  },
]

const categories: { key: TemplateCategory | 'all'; label: string; icon: any }[] = [
  { key: 'all', label: 'All Templates', icon: Grid },
  { key: 'landing', label: 'Landing', icon: Layout },
  { key: 'shop', label: 'E-Commerce', icon: ShoppingBag },
  { key: 'blog', label: 'Blog', icon: FileText },
  { key: 'portfolio', label: 'Portfolio', icon: Image },
  { key: 'saas', label: 'SaaS', icon: Zap },
]

// Preview Component - Mock E-Commerce Template
function EcommercePreview() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [cartCount, setCartCount] = useState(2)

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-xs">ShopPro</span>
        </div>
        <div className="flex items-center gap-2">
          <SearchIcon2 className="w-4 h-4 text-gray-400" />
          <button onClick={() => setCartCount(c => c + 1)} className="relative">
            <ShoppingCart className="w-4 h-4 text-gray-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden">
            <Menu className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-16 pb-8 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-white font-bold text-lg mb-2">Summer Sale</h2>
          <p className="text-gray-400 text-xs mb-3">Up to 50% Off</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-xs font-medium"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="px-2 grid grid-cols-2 gap-2">
        {[
          { name: 'Product 1', price: '$29', img: '📦' },
          { name: 'Product 2', price: '$49', img: '👟' },
          { name: 'Product 3', price: '$39', img: '⌚' },
          { name: 'Product 4', price: '$59', img: '🎧' },
        ].map((product, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gray-800 rounded-lg p-2 text-center"
          >
            <div className="text-2xl mb-1">{product.img}</div>
            <p className="text-white text-[10px] font-medium truncate">{product.name}</p>
            <p className="text-blue-400 text-xs font-bold">{product.price}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Nav (Mobile) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-2 flex justify-around">
        {[
          { icon: Home, active: true },
          { icon: SearchIcon2, active: false },
          { icon: ShoppingCart, active: false },
          { icon: User, active: false },
        ].map((item, i) => (
          <button key={i} className={`p-1 ${item.active ? 'text-blue-400' : 'text-gray-400'}`}>
            <item.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Animated Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"
      />
    </div>
  )
}

// Preview Component - SaaS Template
function SaaSPreview() {
  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-white text-sm">SaaSPro</span>
        </div>
        <div className="hidden md:flex gap-3">
          {['Features', 'Pricing', 'About'].map((item, i) => (
            <span key={i} className="text-gray-400 text-xs">{item}</span>
          ))}
        </div>
        <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Get Started</button>
      </div>

      {/* Hero */}
      <div className="pt-14 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            animate={{ 
              textShadow: ['0 0 10px #3b82f6', '0 0 20px #8b5cf6', '0 0 10px #3b82f6']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white font-bold text-lg mb-2"
          >
            Build Faster 🚀
          </motion.h1>
          <p className="text-gray-400 text-xs mb-3">The best SaaS platform for your business</p>
          
          <div className="flex gap-2 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 rounded-full text-xs"
            >
              Start Free
            </motion.button>
            <button className="border border-gray-600 text-gray-300 px-3 py-1.5 rounded-full text-xs">
              Demo
            </button>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: BarChart3, label: 'Analytics' },
            { icon: Lock, label: 'Security' },
            { icon: Zap, label: 'Fast' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-800 rounded-lg p-2 text-center"
            >
              <feature.icon className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="text-white text-[10px]">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Background */}
      <motion.div
        animate={{ x: [-50, 50], y: [-20, 20] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"
      />
    </div>
  )
}

// Preview Component - Blog Template
function BlogPreview() {
  const posts = [
    { title: 'Getting Started', img: '📝', read: '5 min' },
    { title: 'Best Practices', img: '💡', read: '8 min' },
    { title: 'Tips & Tricks', img: '✨', read: '3 min' },
  ]

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 z-10">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white text-sm">BlogPro</span>
          <div className="flex gap-2">
            <SearchIcon2 className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="pt-12 px-3 space-y-2">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-gray-800 rounded-lg p-2 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center text-lg">
              {post.img}
            </div>
            <div className="flex-1">
              <p className="text-white text-xs font-medium">{post.title}</p>
              <p className="text-gray-500 text-[10px]">{post.read} read</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-3 text-center">
        <p className="text-white text-xs mb-1">Subscribe to newsletter</p>
        <input 
          type="text" 
          placeholder="Your email" 
          className="w-full bg-black/30 rounded px-2 py-1 text-xs text-white placeholder-gray-500"
        />
      </div>
    </div>
  )
}

// Preview Component - Portfolio Template
function PortfolioPreview() {
  const projects = ['🎨', '📱', '💻', '📸', '🎬', '🎵']
  
  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" />
            <span className="font-bold text-white text-sm">John Doe</span>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="pt-14 px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-2"
        />
        <p className="text-white text-sm font-bold">Creative Designer</p>
        <p className="text-gray-400 text-xs">Creating amazing digital experiences</p>
      </div>

      {/* Projects Grid */}
      <div className="px-3 mt-3">
        <div className="grid grid-cols-3 gap-1.5">
          {projects.map((emoji, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center text-2xl cursor-pointer"
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        {['🐦', '📸', '💼'].map((icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.2 }}
            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm"
          >
            {icon}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Preview Component - Restaurant Template
function RestaurantPreview() {
  const menu = [
    { name: 'Burger', price: '$12', emoji: '🍔' },
    { name: 'Pizza', price: '$15', emoji: '🍕' },
    { name: 'Salad', price: '$8', emoji: '🥗' },
    { name: 'Pasta', price: '$14', emoji: '🍝' },
  ]

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden">
      {/* Hero with parallax effect */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-orange-900/80 to-transparent z-10" />
      
      <div className="pt-8 px-3 text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-white font-bold text-lg"
        >
          🍕 Pizza Palace
        </motion.h1>
        <p className="text-gray-400 text-xs">Italian • Fast • Delicious</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs"
        >
          Order Now
        </motion.button>
      </div>

      {/* Menu */}
      <div className="px-2 mt-3 space-y-1.5">
        {menu.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gray-800 rounded-lg p-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{item.emoji}</span>
              <span className="text-white text-xs">{item.name}</span>
            </div>
            <span className="text-orange-400 text-xs font-bold">{item.price}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-3 left-3 right-3 text-center">
        <p className="text-gray-400 text-[10px]">📍 123 Main St • ⏰ Open until 10PM</p>
      </div>
    </div>
  )
}

const previewComponents: Record<string, any> = {
  shop: EcommercePreview,
  saas: SaaSPreview,
  blog: BlogPreview,
  portfolio: PortfolioPreview,
  landing: RestaurantPreview,
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('mobile')

  const filteredTemplates = templates.filter(t => 
    selectedCategory === 'all' || t.category === selectedCategory
  )

  const PreviewComponent = selectedTemplate ? previewComponents[selectedTemplate.preview] : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Responsive Templates</h1>
            <p className="text-gray-400">Beautiful animated templates for any use case</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="glass-card p-4 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-electron-blue text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedTemplate(template)}
            className="glass-card overflow-hidden cursor-pointer hover:border-electron-blue/30 transition-all group"
          >
            {/* Preview Area */}
            <div className="aspect-[4/3] bg-gray-900 relative">
              {PreviewComponent && selectedTemplate?.id === template.id ? (
                <div className="w-full h-full p-2">
                  <PreviewComponent />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {template.category === 'shop' && '🛒'}
                      {template.category === 'saas' && '🚀'}
                      {template.category === 'blog' && '📝'}
                      {template.category === 'portfolio' && '🎨'}
                      {template.category === 'landing' && '🌐'}
                    </div>
                    <p className="text-gray-500 text-sm">Click to preview</p>
                  </div>
                </div>
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-3 rounded-full bg-white/20 backdrop-blur"
                >
                  <Eye className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-3 rounded-full bg-white/20 backdrop-blur"
                >
                  <Download className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1">
                {template.responsive && (
                  <span className="px-2 py-0.5 rounded-full bg-green-500/80 text-white text-[10px]">Responsive</span>
                )}
                {template.animated && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/80 text-white text-[10px]">Animated</span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{template.name}</h3>
                <span className="text-xs text-gray-400">{template.pages} pages</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{template.description}</p>
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 4).map((feature, j) => (
                  <span key={j} className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-400">
                    {feature}
                  </span>
                ))}
                {template.features.length > 4 && (
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-400">
                    +{template.features.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-electron-black z-10">
                <div>
                  <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedTemplate.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Device Tabs */}
              <div className="p-4 border-b border-white/10 flex gap-4">
                {[
                  { key: 'desktop', label: 'Desktop', icon: Monitor },
                  { key: 'tablet', label: 'Tablet', icon: Tablet },
                  { key: 'mobile', label: 'Mobile', icon: Smartphone },
                ].map(device => (
                  <button
                    key={device.key}
                    onClick={() => setPreviewDevice(device.key as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      previewDevice === device.key
                        ? 'bg-electron-blue text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <device.icon className="w-4 h-4" />
                    {device.label}
                  </button>
                ))}
              </div>

              {/* Preview Area */}
              <div className="p-6 flex justify-center bg-gray-900/50">
                <div className={`relative ${
                  previewDevice === 'mobile' ? 'w-[280px] h-[500px]' :
                  previewDevice === 'tablet' ? 'w-[500px] h-[400px]' :
                  'w-full max-w-3xl h-[500px]'
                }`}>
                  {PreviewComponent && <PreviewComponent />}
                </div>
              </div>

              {/* Features */}
              <div className="p-6 border-t border-white/10">
                <h3 className="font-semibold mb-4">Template Features</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedTemplate.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-white/10 flex gap-4">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity font-semibold flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Template
                </button>
                <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">
                  Customize
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}