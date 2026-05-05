'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Barcode, 
  ShoppingCart, 
  CreditCard, 
  CheckCircle, 
  Globe, 
  Package,
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  Zap,
  ExternalLink,
  Calculator,
  FileText,
  Mail
} from 'lucide-react'

// Country barcode information
const barcodeCountries = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    marketplace: 'Amazon US',
    provider: 'GS1 US',
    prefix: '01',
    type: 'UPC',
    price: 30,
    currency: 'USD',
    features: ['Amazon FBA', 'Walmart', 'Target', 'Best Buy'],
    leadTime: 'Instant',
    validFor: 'Lifetime'
  },
  {
    id: 'eu',
    name: 'European Union',
    flag: '🇪🇺',
    marketplace: 'Amazon EU',
    provider: 'GS1 EU',
    prefix: '590',
    type: 'EAN',
    price: 35,
    currency: 'EUR',
    features: ['Amazon DE', 'Amazon FR', 'Amazon IT', 'Amazon ES'],
    leadTime: '24-48 hours',
    validFor: 'Lifetime'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    marketplace: 'Amazon UK',
    provider: 'GS1 UK',
    prefix: '500',
    type: 'EAN',
    price: 25,
    currency: 'GBP',
    features: ['Amazon UK', 'Tesco', 'Sainsbury'],
    leadTime: 'Instant',
    validFor: 'Lifetime'
  },
  {
    id: 'jp',
    name: 'Japan',
    flag: '🇯🇵',
    marketplace: 'Amazon Japan',
    provider: 'JAN Code',
    prefix: '490',
    type: 'JAN',
    price: 40,
    currency: 'USD',
    features: ['Amazon JP', 'Rakuten', 'Yahoo Japan'],
    leadTime: '24-72 hours',
    validFor: 'Lifetime'
  },
  {
    id: 'cn',
    name: 'China',
    flag: '🇨🇳',
    marketplace: 'Alibaba / TMall',
    provider: 'China Codes',
    prefix: '692',
    type: 'EAN',
    price: 20,
    currency: 'USD',
    features: ['Alibaba', 'Taobao', 'Tmall', 'JD.com'],
    leadTime: '24-48 hours',
    validFor: 'Lifetime'
  },
  {
    id: 'in',
    name: 'India',
    flag: '🇮🇳',
    marketplace: 'Amazon India',
    provider: 'GS1 India',
    prefix: '890',
    type: 'EAN',
    price: 25,
    currency: 'USD',
    features: ['Amazon IN', 'Flipkart', 'Myntra'],
    leadTime: '48 hours',
    validFor: 'Lifetime'
  },
  {
    id: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    marketplace: 'Amazon Australia',
    provider: 'GS1 Australia',
    prefix: '931',
    type: 'EAN',
    price: 30,
    currency: 'AUD',
    features: ['Amazon AU', 'Woolworths', 'Coles'],
    leadTime: '48 hours',
    validFor: 'Lifetime'
  },
  {
    id: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    marketplace: 'Amazon Canada',
    provider: 'GS1 Canada',
    prefix: '00',
    type: 'UPC',
    price: 30,
    currency: 'CAD',
    features: ['Amazon CA', 'Walmart CA', 'Costco CA'],
    leadTime: 'Instant',
    validFor: 'Lifetime'
  },
  {
    id: 'br',
    name: 'Brazil',
    flag: '🇧🇷',
    marketplace: 'Amazon Brazil',
    provider: 'GS1 Brasil',
    prefix: '789',
    type: 'EAN',
    price: 35,
    currency: 'USD',
    features: ['Amazon BR', 'Magazine Luiza'],
    leadTime: '48-72 hours',
    validFor: 'Lifetime'
  },
  {
    id: 'mx',
    name: 'Mexico',
    flag: '🇲🇽',
    marketplace: 'Amazon Mexico',
    provider: 'GS1 Mexico',
    prefix: '750',
    type: 'EAN',
    price: 30,
    currency: 'USD',
    features: ['Amazon MX', 'Walmart MX'],
    leadTime: '48 hours',
    validFor: 'Lifetime'
  }
]

// Bundle packages
const barcodeBundles = [
  {
    id: 'basic',
    name: 'Basic Starter',
    description: 'Perfect for single marketplace',
    countries: 1,
    price: 29,
    popular: false,
    features: ['1 Country Code', 'Lifetime validity', 'Amazon ready', 'Email support']
  },
  {
    id: 'multi',
    name: 'Multi-Market',
    description: 'Sell across multiple countries',
    countries: 3,
    price: 69,
    popular: true,
    features: ['3 Countries', 'Lifetime validity', 'Amazon + Walmart', 'Priority support']
  },
  {
    id: 'global',
    name: 'Global Business',
    description: 'Maximum reach worldwide',
    countries: 10,
    price: 199,
    popular: false,
    features: ['All 10 Countries', 'Lifetime validity', 'All marketplaces', '24/7 Support', 'API Access']
  }
]

export default function BarcodeMarketplace() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [cart, setCart] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [showCheckout, setShowCheckout] = useState(false)

  const addToCart = (country: any) => {
    setCart([...cart, { ...country, cartId: Date.now() }])
  }

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  const getCurrencySymbol = (currency: string) => {
    const symbols: any = { USD: '$', EUR: '€', GBP: '£', AUD: 'A$' }
    return symbols[currency] || '$'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Barcode className="w-10 h-10 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Barcode Marketplace</h1>
          </div>
          <p className="text-slate-400">
            Purchase official barcodes for Amazon FBA, Alibaba, and global marketplaces
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">10+</p>
              <p className="text-sm text-slate-400">Countries</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{cart.length}</p>
              <p className="text-sm text-slate-400">In Cart</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-sm text-slate-400">Amazon Ready</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800 rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Lifetime</p>
              <p className="text-sm text-slate-400">Valid Forever</p>
            </div>
          </motion.div>
        </div>

        {/* Bundle Packages */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">💰 Bundle Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {barcodeBundles.map((bundle, index) => (
              <motion.div
                key={bundle.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-800 rounded-xl p-6 ${
                  bundle.popular ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {bundle.popular && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white mt-2">{bundle.name}</h3>
                <p className="text-sm text-slate-400 mb-3">{bundle.description}</p>
                <p className="text-3xl font-bold text-white mb-3">
                  ${bundle.price}
                  <span className="text-sm font-normal text-slate-400">/bundle</span>
                </p>
                <ul className="space-y-2 mb-4">
                  {bundle.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                  Select Bundle
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Country List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">🌍 Individual Country Barcodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {barcodeCountries.map((country, index) => (
              <motion.div
                key={country.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-800 rounded-xl p-5 hover:ring-2 hover:ring-blue-500 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="font-semibold text-white">{country.name}</h3>
                    <p className="text-sm text-slate-400">{country.marketplace}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div>
                    <p className="text-slate-400">Type</p>
                    <p className="text-white font-medium">{country.type}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Provider</p>
                    <p className="text-white font-medium">{country.provider}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Lead Time</p>
                    <p className="text-white font-medium">{country.leadTime}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Valid For</p>
                    <p className="text-white font-medium">{country.validFor}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {country.features.slice(0, 3).map((feature, i) => (
                    <span 
                      key={i} 
                      className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-white">
                    {getCurrencySymbol(country.currency)}{country.price}
                  </p>
                  <button
                    onClick={() => addToCart(country)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cart Floating Button */}
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 cursor-pointer"
            onClick={() => setShowCheckout(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">{cart.length} Items</span>
            <span className="bg-white text-green-600 px-2 py-0.5 rounded-full text-sm font-bold">
              ${totalPrice}
            </span>
          </motion.div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-800 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">🛒 Your Cart</h2>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div 
                    key={item.cartId}
                    className="bg-slate-700 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.flag}</span>
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-sm text-slate-400">{item.type} - {item.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-white font-bold">${item.price}</p>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-4 mb-4">
                <div className="flex justify-between text-lg">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white font-bold">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-slate-400">Service Fee</span>
                  <span className="text-white font-bold">$0</span>
                </div>
                <div className="flex justify-between text-xl font-bold mt-2">
                  <span className="text-white">Total</span>
                  <span className="text-green-400">${totalPrice}</span>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Checkout with Stripe
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-sm">
                <Shield className="w-4 h-4" />
                Secure payment with SSL encryption
              </div>
            </motion.div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-slate-800 rounded-xl p-6 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">📋 How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-medium text-white">1. Select Country</h3>
              <p className="text-sm text-slate-400">Choose your target marketplace</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calculator className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-medium text-white">2. Add to Cart</h3>
              <p className="text-sm text-slate-400">Select quantity needed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-medium text-white">3. Checkout</h3>
              <p className="text-sm text-slate-400">Pay securely</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="font-medium text-white">4. Receive Codes</h3>
              <p className="text-sm text-slate-400">Instant or 24-72h delivery</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-800 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">❓ FAQs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-white">Are these barcodes Amazon FBA approved?</h3>
              <p className="text-sm text-slate-400">Yes! All our barcodes are GS1 registered and 100% accepted by Amazon FBA, Walmart, Target, and all major retailers.</p>
            </div>
            <div>
              <h3 className="font-medium text-white">How long are the barcodes valid?</h3>
              <p className="text-sm text-slate-400">All barcodes come with lifetime validity. Once purchased, you can use them forever.</p>
            </div>
            <div>
              <h3 className="font-medium text-white">Can I use one barcode on multiple products?</h3>
              <p className="text-sm text-slate-400">No, each unique product requires its own barcode. You can purchase multiple codes at discounted bundle rates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}