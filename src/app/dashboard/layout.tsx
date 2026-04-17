'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Search, 
  Package, 
  Palette, 
  Megaphone, 
  Target, 
  BarChart3, 
  Bot, 
  Truck, 
  Crosshair,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  Home,
  TrendingUp,
  DollarSign,
  Users as UsersIcon,
  Bell,
  Mail,
  GitBranch,
  CreditCard,
  Shield,
  Layout,
  Palette as PaletteIcon,
  Warehouse,
  Calculator,
  MessageSquare,
  Star as StarIcon,
  RotateCcw,
  Globe as GlobeIcon,
  FileText as FileTextIcon,
  Gift,
  Zap as ZapIcon,
  Globe,
  Webhook,
  BookOpen,
  Link as LinkIcon,
  Wallet,
  Activity,
  Crown,
  Key,
  Handshake,
  AlertTriangle,
  Store,
  Percent,
  RefreshCw,
  Video,
  Building2,
  Edit,
  Trash2,
  Gavel
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'AI Products', href: '/dashboard/products', icon: Search },
  { name: 'Branding', href: '/dashboard/branding', icon: Palette },
  { name: 'Ads Generator', href: '/dashboard/ads', icon: Megaphone },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Advanced Analytics', href: '/dashboard/analytics-advanced', icon: Activity },
  { name: 'Assistant', href: '/dashboard/assistant', icon: Bot },
  { name: 'Suppliers', href: '/dashboard/suppliers', icon: Truck },
  { name: 'Positioning', href: '/dashboard/positioning', icon: Crosshair },
  { name: 'Orders', href: '/dashboard/orders', icon: Package },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Electron-Pay', href: '/dashboard/electron-pay', icon: Wallet },
  { name: 'Stripe', href: '/dashboard/stripe', icon: CreditCard },
  { name: 'Security Center', href: '/dashboard/security-center', icon: Shield },
  { name: 'Security', href: '/dashboard/security', icon: Shield },
  { name: 'Templates', href: '/dashboard/templates', icon: Layout },
  { name: 'Brand Kit', href: '/dashboard/brandkit', icon: PaletteIcon },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Warehouse },
  { name: 'CRM', href: '/dashboard/crm', icon: UsersIcon },
  { name: 'SEO', href: '/dashboard/seo', icon: Search },
  { name: 'Live Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Reviews', href: '/dashboard/reviews', icon: StarIcon },
  { name: 'Returns', href: '/dashboard/returns', icon: RotateCcw },
  { name: 'Shipping', href: '/dashboard/shipping', icon: Truck },
  { name: 'Taxes', href: '/dashboard/taxes', icon: Calculator },
  { name: 'Blog', href: '/dashboard/blog', icon: FileTextIcon },
  { name: 'Loyalty', href: '/dashboard/loyalty', icon: Gift },
  { name: 'Promotions', href: '/dashboard/promotions', icon: ZapIcon },
  { name: 'Language', href: '/dashboard/language', icon: Globe },
  { name: 'Affiliate', href: '/dashboard/affiliate', icon: LinkIcon },
  { name: 'Webhooks', href: '/dashboard/webhooks', icon: Webhook },
  { name: 'API Docs', href: '/dashboard/api-docs', icon: BookOpen },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Advanced Settings', href: '/dashboard/settings-advanced', icon: Settings },
  { name: 'Email Marketing', href: '/dashboard/emails', icon: Mail },
  { name: 'Funnels', href: '/dashboard/funnels', icon: GitBranch },
  { name: 'Super Admin', href: '/dashboard/super-admin', icon: Crown },
  { name: 'Reports', href: '/dashboard/reports', icon: FileTextIcon },
  { name: 'Environment', href: '/dashboard/environment', icon: Key },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
  { name: 'Shipping', href: '/dashboard/shipping', icon: Truck },
  { name: 'Customers', href: '/dashboard/customers', icon: UsersIcon },
  { name: 'Loyalty', href: '/dashboard/loyalty', icon: Gift },
  { name: 'Affiliate Mgmt', href: '/dashboard/affiliate-management', icon: Handshake },
  { name: 'Returns Mgmt', href: '/dashboard/returns-management', icon: RotateCcw },
  { name: 'Suppliers Mgmt', href: '/dashboard/suppliers-management', icon: Truck },
  { name: 'Taxes Mgmt', href: '/dashboard/taxes-management', icon: Calculator },
  { name: 'Vendors', href: '/dashboard/vendors', icon: Store },
  { name: 'Vendor Reg', href: '/dashboard/vendor-registration', icon: Store },
  { name: 'Commissions', href: '/dashboard/commissions', icon: DollarSign },
  { name: 'Disputes', href: '/dashboard/disputes', icon: AlertTriangle },
  { name: 'Vendor Ratings', href: '/dashboard/vendor-ratings', icon: StarIcon },
  { name: 'Product Research', href: '/dashboard/product-research', icon: ZapIcon },
  { name: 'Profit Calc', href: '/dashboard/profit-calculator', icon: Calculator },
  { name: 'Competition', href: '/dashboard/competition-analysis', icon: Target },
  { name: 'Demand Forecast', href: '/dashboard/demand-forecast', icon: TrendingUp },
  { name: 'Sourcing', href: '/dashboard/sourcing-assistant', icon: Truck },
  { name: 'Subscriptions', href: '/dashboard/subscriptions', icon: RefreshCw },
  { name: 'Box Subs', href: '/dashboard/subscription-boxes', icon: Package },
  { name: 'Dropship', href: '/dashboard/dropshipping', icon: Truck },
  { name: 'Social', href: '/dashboard/social-commerce', icon: Globe },
  { name: 'Video Ads', href: '/dashboard/video-ads', icon: Video },
  { name: 'White-Label', href: '/dashboard/whitelabel', icon: Building2 },
  { name: 'AI Chatbot', href: '/dashboard/ai-chatbot', icon: Bot },
  { name: 'Crypto', href: '/dashboard/crypto-payments', icon: Wallet },
  { name: 'NFT Loyalty', href: '/dashboard/nft-loyalty', icon: Gift },
  { name: 'Flash Sales', href: '/dashboard/flash-sales', icon: Zap },
  { name: 'Auctions', href: '/dashboard/auction-system', icon: Gavel },
  { name: 'BI Reports', href: '/dashboard/bi-reports', icon: BarChart3 },
  { name: 'i18n SEO', href: '/dashboard/multilang-seo', icon: Globe },
]

const stats = [
  { label: 'Revenue', value: '$12,450', change: '+12%', icon: DollarSign },
  { label: 'Products', value: '156', change: '+8%', icon: Package },
  { label: 'ROAS', value: '3.2x', change: '+5%', icon: TrendingUp },
  { label: 'Users', value: '2,340', change: '+15%', icon: UsersIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-electron-black">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-electron-gray/50 backdrop-blur-xl border-r border-white/5 z-50 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold font-[var(--font-sora)]"
              >
                E-Seller
              </motion.span>
            )}
          </Link>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-electron-blue/20 to-electron-purple/20 text-electron-blue border border-electron-blue/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-0 right-0 p-4 border-t border-white/5">
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all ${!sidebarOpen ? 'justify-center' : ''}`}
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Settings</span>}
          </Link>
          <button className={`flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all w-full ${!sidebarOpen ? 'justify-center' : ''}`}>
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Header */}
        <header className="h-20 bg-electron-black/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold font-[var(--font-sora)]">
              {navItems.find(item => pathname.startsWith(item.href))?.name || 'Dashboard'}
            </h1>
          </div>

          {/* Stats Bar */}
          <div className="hidden md:flex items-center gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-right">
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-sm font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
            <span className="text-sm font-bold">U</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}