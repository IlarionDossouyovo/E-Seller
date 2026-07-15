'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/app/i18n'
import { Store, User, Mail, MapPin, Phone, Globe, Upload, DollarSign, CheckCircle, AlertCircle, Building } from 'lucide-react'

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh', 'Belgium', 'Brazil',
  'Bulgaria', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic', 'Denmark', 'Egypt', 'Finland',
  'France', 'Germany', 'Ghana', 'Greece', 'Hong Kong', 'Hungary', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kenya', 'South Korea', 'Kuwait', 'Lebanon', 'Malaysia',
  'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Serbia', 'Singapore', 'South Africa', 'Spain',
  'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Venezuela', 'Vietnam'
]
const categories = [
  'Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports', 'Toys', 'Books', 'Automotive', 'Food & Beverages', 'Health & Wellness', 'Software', 'Services'
]

const getCountryName = (country: string): string => {
  const countryNames: Record<string, string> = {
    'Afghanistan': 'Afghanistan',
    'Albania': 'Albanie',
    'Algeria': 'Algerie',
    'Argentina': 'Argentine',
    'Australia': 'Australie',
    'Austria': 'Autriche',
    'Bahrain': 'Bahrein',
    'Bangladesh': 'Bangladesh',
    'Belgium': 'Belgique',
    'Brazil': 'Bresil',
    'Bulgaria': 'Bulgarie',
    'Canada': 'Canada',
    'Chile': 'Chili',
    'China': 'Chine',
    'Colombia': 'Colombie',
    'Croatia': 'Croatie',
    'Czech Republic': 'Republique tcheque',
    'Denmark': 'Danemark',
    'Egypt': 'Egypte',
    'Finland': 'Finlande',
    'France': 'France',
    'Germany': 'Allemagne',
    'Ghana': 'Ghana',
    'Greece': 'Grece',
    'Hong Kong': 'Hong Kong',
    'Hungary': 'Hongrie',
    'India': 'Inde',
    'Indonesia': 'Indonesie',
    'Iran': 'Iran',
    'Iraq': 'Irak',
    'Ireland': 'Irlande',
    'Israel': 'Israel',
    'Italy': 'Italie',
    'Japan': 'Japon',
    'Jordan': 'Jordanie',
    'Kenya': 'Kenya',
    'South Korea': 'Coree du Sud',
    'Kuwait': 'Koweit',
    'Lebanon': 'Liban',
    'Malaysia': 'Malaisie',
    'Mexico': 'Mexique',
    'Morocco': 'Maroc',
    'Netherlands': 'Pays-Bas',
    'New Zealand': 'Nouvelle-Zelande',
    'Nigeria': 'Nigeria',
    'Norway': 'Norvege',
    'Oman': 'Oman',
    'Pakistan': 'Pakistan',
    'Peru': 'Perou',
    'Philippines': 'Philippines',
    'Poland': 'Pologne',
    'Portugal': 'Portugal',
    'Qatar': 'Qatar',
    'Romania': 'Roumanie',
    'Russia': 'Russie',
    'Saudi Arabia': 'Arabie Saoudite',
    'Serbia': 'Serbie',
    'Singapore': 'Singapour',
    'South Africa': 'Afrique du Sud',
    'Spain': 'Espagne',
    'Sri Lanka': 'Sri Lanka',
    'Sweden': 'Suede',
    'Switzerland': 'Suisse',
    'Taiwan': 'Taiwan',
    'Thailand': 'Thailande',
    'Turkey': 'Turquie',
    'Ukraine': 'Ukraine',
    'United Arab Emirates': 'Emirats arabes unis',
    'United Kingdom': 'Royaume-Uni',
    'United States': 'Etats-Unis',
    'Venezuela': 'Venezuela',
    'Vietnam': 'Vietnam',
  }
  return countryNames[country] || country
}

export default function VendorRegistrationPage() {
  const { t } = useI18n()
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
      if (!formData.storeName) newErrors.storeName = t.vendorRegistration?.storeNameRequired || 'Store name is required'
      if (!formData.slug) newErrors.slug = t.vendorRegistration?.storeUrlRequired || 'Store URL is required'
      if (!formData.email) newErrors.email = t.vendorRegistration?.emailRequired || 'Email is required'
      if (!formData.phone) newErrors.phone = t.vendorRegistration?.phoneRequired || 'Phone is required'
    }
    
    if (currentStep === 2) {
      if (!formData.country) newErrors.country = t.vendorRegistration?.selectCountry || 'Country is required'
      if (!formData.address) newErrors.address = t.vendorRegistration?.businessAddress || 'Address is required'
      if (!formData.category) newErrors.category = t.vendorRegistration?.productCategory || 'Category is required'
    }
    
    if (currentStep === 3) {
      if (!formData.taxId) newErrors.taxId = t.vendorRegistration?.taxId || 'Tax ID is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1)
  }

  const handleSubmit = async () => {
    console.log('Submitting vendor application:', formData)
    alert(t.vendorRegistration?.applicationSubmitted || 'Application submitted!')
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
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">{t.vendorRegistration?.title || 'Become a Vendor'}</h1>
            <p className="text-gray-400">{t.vendorRegistration?.subtitle || 'Join the E-Seller marketplace'}</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: t.vendorRegistration?.storeInfo || 'Store Info' },
            { num: 2, label: t.vendorRegistration?.location || 'Location' },
            { num: 3, label: t.vendorRegistration?.verification || 'Verification' },
            { num: 4, label: t.vendorRegistration?.payment || 'Payment' },
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
            <h2 className="text-xl font-semibold mb-4">{t.vendorRegistration?.storeInfo || 'Store Information'}</h2>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">{t.vendorRegistration?.storeName || 'Store Name'} *</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => {
                  setFormData({ ...formData, storeName: e.target.value, slug: generateSlug(e.target.value) })
                }}
                className={`w-full bg-white/5 border ${errors.storeName ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white`}
                placeholder={t.vendorRegistration?.yourStoreName || 'Your Store Name'}
              />
              {errors.storeName && <p className="text-red-400 text-sm mt-1">{errors.storeName}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">{t.vendorRegistration?.storeUrl || 'Store URL'} *</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">e-seller.com/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                  className={`flex-1 bg-white/5 border ${errors.slug ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white`}
                  placeholder={t.vendorRegistration?.yourStore || 'your-store'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">{t.vendorRegistration?.email || 'Email'} *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white`}
                placeholder={t.vendorRegistration?.vendorAtStore || 'vendor@store.com'}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">{t.vendorRegistration?.phone || 'Phone'} *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white`}
                placeholder={t.vendorRegistration?.phoneNumber || '+1 (555) 000-0000'}
              />
            </div>

            <button onClick={handleNext} className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold cursor-pointer">
              {t.vendorRegistration?.continue || 'Continue'}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">{t.vendorRegistration?.location || 'Location & Category'}</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">{t.vendorRegistration?.country || 'Country'} *</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className={`w-full bg-gray-800 border ${errors.country ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white`}
                style={{ backgroundColor: '#1f2937', color: 'white' }}
              >
                <option value="" style={{ backgroundColor: '#1f2937', color: 'white' }}>{t.vendorRegistration?.selectCountry || 'Select Country'}</option>
                {countries.map(c => <option key={c} value={c} style={{ backgroundColor: '#1f2937', color: 'white' }}>{getCountryName(c)}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">{t.vendorRegistration?.businessAddress || 'Business Address'} *</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full bg-white/5 border ${errors.address ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white`}
                rows={3}
                placeholder={t.vendorRegistration?.fullAddress || 'Full business address'}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">{t.vendorRegistration?.productCategory || 'Product Category'} *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full bg-gray-800 border ${errors.category ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white`}
                style={{ backgroundColor: '#1f2937', color: 'white' }}
              >
                <option value="" style={{ backgroundColor: '#1f2937', color: 'white' }}>{t.vendorRegistration?.selectCategory || 'Select Category'}</option>
                {categories.map(c => <option key={c} value={c} style={{ backgroundColor: '#1f2937', color: 'white' }}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">{t.vendorRegistration?.storeDescription || 'Store Description'}</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                rows={4}
                placeholder={t.vendorRegistration?.describeStore || 'Describe your store and products...'}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 bg-white/5 rounded-xl font-semibold cursor-pointer">
                {t.vendorRegistration?.back || 'Back'}
              </button>
              <button onClick={handleNext} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold cursor-pointer">
                {t.vendorRegistration?.continue || 'Continue'}
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