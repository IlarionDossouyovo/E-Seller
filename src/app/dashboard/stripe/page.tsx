'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Shield,
  Lock,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Zap
} from 'lucide-react'

const testCards = [
  { number: '4242 4242 4242 4242', expiry: '12/25', cvc: '123', brand: 'Visa', valid: true },
  { number: '5555 5555 5555 4444', expiry: '12/25', cvc: '123', brand: 'Mastercard', valid: true },
  { number: '4000 0566 5566 5556', expiry: '12/25', cvc: '123', brand: 'Visa (Decline)', valid: false },
]

export default function StripeIntegrationPage() {
  const [stripeKey, setStripeKey] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState<'test' | 'live' | 'identity'>('test')

  const handleConnect = () => {
    if (stripeKey.includes('sk_test_')) {
      setIsConnected(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Stripe Integration</h1>
            <p className="text-gray-400">Configure your payment gateway</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'test', label: 'Test Mode', icon: Zap },
            { key: 'live', label: 'Live Mode', icon: Globe },
            { key: 'identity', label: 'Identity Verification', icon: Building2 },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.key
                  ? 'bg-electron-blue text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Test Mode */}
      {activeTab === 'test' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Test Mode Configuration</h2>
            <p className="text-gray-400 mb-6">
              Use Stripe test mode to simulate payments without processing real transactions.
              No real money will be transferred.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Stripe Secret Key (Test)</label>
                <input
                  type="text"
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  placeholder="sk_test_..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Get your keys from{' '}
                  <a href="https://dashboard.stripe.com/test/apikeys" target="_blank" className="text-electron-blue hover:underline">
                    Stripe Dashboard
                  </a>
                </p>
              </div>

              <button
                onClick={handleConnect}
                disabled={!stripeKey}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition-opacity font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" />
                Connect Test Mode
              </button>
            </div>
          </div>

          {/* Test Cards */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Test Card Numbers</h2>
            <p className="text-gray-400 mb-6">
              Use these card numbers in test mode to simulate different payment scenarios.
            </p>

            <div className="space-y-3">
              {testCards.map((card, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-mono">{card.number}</p>
                      <p className="text-sm text-gray-400">
                        {card.brand} • Exp: {card.expiry} • CVC: {card.cvc}
                      </p>
                    </div>
                  </div>
                  {card.valid ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Success
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Decline
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Test Mode Security</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5">
                <Shield className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-1">Sandbox Environment</h3>
                <p className="text-sm text-gray-400">All transactions are simulated</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <Lock className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-1">Secure Testing</h3>
                <p className="text-sm text-gray-400">No real money involved</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <Zap className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-1">Instant Results</h3>
                <p className="text-sm text-gray-400">Immediate payment feedback</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Mode */}
      {activeTab === 'live' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Go Live Requirements</h2>
            
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <div className="flex items-center gap-2 text-yellow-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Complete Identity Verification First</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                You must complete identity verification before accepting real payments.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Stripe Account</p>
                    <p className="text-sm text-gray-400">Create Stripe account</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-electron-blue hover:opacity-90 transition-opacity text-sm">
                  Setup
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium">Identity Verification</p>
                    <p className="text-sm text-gray-400">Verify your business identity</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('identity')}
                  className="px-4 py-2 rounded-lg bg-electron-blue hover:opacity-90 transition-opacity text-sm"
                >
                  Complete
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Live API Keys</p>
                    <p className="text-sm text-gray-400">Get your production keys</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                  Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Identity Verification */}
      {activeTab === 'identity' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Identity Verification</h2>
            <p className="text-gray-400 mb-6">
              To accept real payments, Stripe requires identity verification. 
              This is a legal requirement to prevent fraud and money laundering.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Required Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Informations Requises</h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <User className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Personal Information</p>
                      <p className="text-xs text-gray-400">Full name, date of birth</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Business Information</p>
                      <p className="text-xs text-gray-400">Company name, type, tax ID</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Email & Contact</p>
                      <p className="text-xs text-gray-400">Business email, phone</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Address</p>
                      <p className="text-xs text-gray-400">Business address</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Website</p>
                      <p className="text-xs text-gray-400">Your website URL</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Bank Account</p>
                      <p className="text-xs text-gray-400">For receiving payouts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Needed */}
              <div className="space-y-4">
                <h3 className="font-semibold">Documents Required</h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="font-medium text-sm">Government ID</p>
                    <p className="text-xs text-gray-400">Passport, driver's license, or national ID</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="font-medium text-sm">Proof of Address</p>
                    <p className="text-xs text-gray-400">Utility bill or bank statement (3 months)</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="font-medium text-sm">Business Documents</p>
                    <p className="text-xs text-gray-400">Registration certificate, tax documents</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="font-medium text-sm">Bank Statement</p>
                    <p className="text-xs text-gray-400">Recent bank statement for payouts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Ready to Verify?</h3>
                  <p className="text-sm text-gray-400">Complete verification on Stripe dashboard</p>
                </div>
                <a 
                  href="https://dashboard.stripe.com/identity/verification" 
                  target="_blank"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition-opacity font-semibold flex items-center gap-2"
                >
                  Go to Stripe
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}