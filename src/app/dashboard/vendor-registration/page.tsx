'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Store, User, Mail, MapPin, Phone, Globe, Upload, DollarSign, CheckCircle, AlertCircle, Building } from 'lucide-react'

const countries = ['United States', 'China', 'France', 'Germany', 'United Kingdom', 'Japan', 'Canada', 'Australia', 'Brazil', 'India']
const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports', 'Toys', 'Books', 'Automotive', 'Food', 'Health']

export default function VendorRegistrationPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    storeName: '',
    slug: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    category: '',
    description: '',
    taxId: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    paypalEmail: '',
    logo: '',
    documents: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}
    
    if (currentStep === 1) {
      if (!formData.storeName) newErrors.storeName = 'Store name is required'
      if (!formData.slug) newErrors.slug = 'Store URL is required'
      if (!formData.email) newErrors.email = 'Email is required'
      if (!formData.phone) newErrors.phone = 'Phone is required'
    }
    
    if (currentStep === 2) {
      if (!formData.country) newErrors.country = 'Country is required'
      if (!formData.address) newErrors.address = 'Address is required'
      if (!formData.category) newErrors.category = 'Category is required'
    }
    
    if (currentStep === 3) {
      if (!formData.taxId) newErrors.taxId = 'Tax ID is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1)
  }

  const handleSubmit = async () => {
    // In production, this would submit to the API
    console.log('Submitting vendor application:', formData)
    alert('Application submitted! We will review your application within 24-48 hours.')
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Become a Vendor</h1>
            <p className="text-gray-400">Join the E-Seller marketplace</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Store Info' },
            { num: 2, label: 'Location' },
            { num: 3, label: 'Verification' },
            { num: 4, label: 'Payment' },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s.num ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
              </div>
              <span className={`ml-2 hidden md:inline ${step >= s.num ? 'text-white' : 'text-gray-400'}`}>{s.label}</span>
              {i < 3 && <div className={`w-8 md:w-16 h-0.5 mx-2 ${step > s.num ? 'bg-blue-500' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Store Information</h2>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Store Name *</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => {
                  setFormData({ ...formData, storeName: e.target.value, slug: generateSlug(e.target.value) })
                }}
                className={`w-full bg-white/5 border ${errors.storeName ? 'border-red-500' : 'border-white/10'} rounded-xl p-3`}
                placeholder="Your Store Name"
              />
              {errors.storeName && <p className="text-red-400 text-sm mt-1">{errors.storeName}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Store URL *</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">e-seller.com/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                  className={`flex-1 bg-white/5 border ${errors.slug ? 'border-red-500' : 'border-white/10'} rounded-xl p-3`}
                  placeholder="your-store"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl p-3`}
                placeholder="vendor@store.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl p-3`}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <button onClick={handleNext} className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold">
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Location & Category</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Country *</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className={`w-full bg-white/5 border ${errors.country ? 'border-red-500' : 'border-white/10'} rounded-xl p-3`}
              >
                <option value="">Select Country</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Business Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full bg-white/5 border ${errors.address ? 'border-red-500' : 'border-white/10'} rounded-xl p-3`}
                rows={3}
                placeholder="Full business address"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Product Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full bg-white/5 border ${errors.category ? 'border-red-500' : 'border-white/10'} rounded-xl p-3`}
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Store Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                rows={4}
                placeholder="Describe your store and products..."
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 bg-white/5 rounded-xl font-semibold">
                Back
              </button>
              <button onClick={handleNext} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold">
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Verification</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Tax ID / VAT Number *</label>
              <input
                type="text"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                className={`w-full bg-white/5 border ${errors.taxId ? 'border-red-500' : 'border-white/10'} rounded-xl p-3`}
                placeholder="XX-XXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Business License</label>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-400">Upload business license or registration</p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG - Max 10MB</p>
              </div>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Verification Required</p>
                  <p className="text-sm text-gray-400">We will verify your business within 24-48 hours. You can start adding products while verification is pending.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 bg-white/5 rounded-xl font-semibold">
                Back
              </button>
              <button onClick={handleNext} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold">
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Bank Name</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                placeholder="Bank of America"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                  placeholder="XXXX XXXX XXXX"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Routing Number</label>
                <input
                  type="text"
                  value={formData.routingNumber}
                  onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                  placeholder="XXXXXXX"
                />
              </div>
            </div>

            <div className="text-center text-gray-400 py-2">- OR -</div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">PayPal Email</label>
              <input
                type="email"
                value={formData.paypalEmail}
                onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                placeholder="paypal@vendor.com"
              />
            </div>

            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <p className="text-white">Commission: <span className="font-bold">10%</span> on each sale</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex-1 py-3 bg-white/5 rounded-xl font-semibold">
                Back
              </button>
              <button onClick={handleSubmit} className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold">
                Submit Application
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <Store className="w-8 h-8 text-blue-400 mb-2" />
          <h3 className="font-semibold">Free to Join</h3>
          <p className="text-sm text-gray-400">No upfront fees. Only pay 10% commission on sales.</p>
        </div>
        <div className="glass-card p-4">
          <Globe className="w-8 h-8 text-green-400 mb-2" />
          <h3 className="font-semibold">Global Reach</h3>
          <p className="text-sm text-gray-400">Sell to customers in 190+ countries with localized checkout.</p>
        </div>
        <div className="glass-card p-4">
          <DollarSign className="w-8 h-8 text-yellow-400 mb-2" />
          <h3 className="font-semibold">Fast Payouts</h3>
          <p className="text-sm text-gray-400">Get paid weekly via bank transfer or PayPal.</p>
        </div>
      </div>
    </div>
  )
}