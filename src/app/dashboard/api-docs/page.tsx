'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Copy, 
  Check, 
  Play, 
  Terminal,
  Database,
  Users,
  ShoppingCart,
  Package,
  CreditCard,
  Key,
  Globe,
  Shield,
  Clock,
  Zap
} from 'lucide-react'

const endpoints = [
  { 
    category: 'Authentication', 
    icon: Key,
    endpoints: [
      { method: 'POST', path: '/api/auth/login', description: 'User login', status: 'active' },
      { method: 'POST', path: '/api/auth/register', description: 'User registration', status: 'active' },
      { method: 'POST', path: '/api/auth/refresh', description: 'Refresh token', status: 'active' },
      { method: 'POST', path: '/api/auth/logout', description: 'User logout', status: 'active' },
    ]
  },
  { 
    category: 'Products', 
    icon: Package,
    endpoints: [
      { method: 'GET', path: '/api/products', description: 'List all products', status: 'active' },
      { method: 'GET', path: '/api/products/:id', description: 'Get product details', status: 'active' },
      { method: 'POST', path: '/api/products', description: 'Create product', status: 'active' },
      { method: 'PUT', path: '/api/products/:id', description: 'Update product', status: 'active' },
      { method: 'DELETE', path: '/api/products/:id', description: 'Delete product', status: 'active' },
    ]
  },
  { 
    category: 'Orders', 
    icon: ShoppingCart,
    endpoints: [
      { method: 'GET', path: '/api/orders', description: 'List orders', status: 'active' },
      { method: 'GET', path: '/api/orders/:id', description: 'Get order details', status: 'active' },
      { method: 'POST', path: '/api/orders', description: 'Create order', status: 'active' },
      { method: 'PATCH', path: '/api/orders/:id/status', description: 'Update order status', status: 'active' },
    ]
  },
  { 
    category: 'Customers', 
    icon: Users,
    endpoints: [
      { method: 'GET', path: '/api/customers', description: 'List customers', status: 'active' },
      { method: 'GET', path: '/api/customers/:id', description: 'Get customer details', status: 'active' },
      { method: 'POST', path: '/api/customers', description: 'Create customer', status: 'active' },
      { method: 'PUT', path: '/api/customers/:id', description: 'Update customer', status: 'active' },
    ]
  },
  { 
    category: 'Payments', 
    icon: CreditCard,
    endpoints: [
      { method: 'POST', path: '/api/payments/create', description: 'Create payment', status: 'active' },
      { method: 'GET', path: '/api/payments/:id', description: 'Get payment status', status: 'active' },
      { method: 'POST', path: '/api/payments/refund', description: 'Refund payment', status: 'active' },
    ]
  },
]

const codeExamples = {
  curl: `curl -X GET "https://api.e-seller.com/v1/products" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  
  javascript: `const response = await fetch('https://api.e-seller.com/v1/products', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();`,

  python: `import requests

response = requests.get(
    'https://api.e-seller.com/v1/products',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)
data = response.json()`,
}

export default function APIDocsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'authentication'>('overview')
  const [codeTab, setCodeTab] = useState<'curl' | 'javascript' | 'python'>('curl')
  const [copied, setCopied] = useState('')

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">API Documentation</h1>
              <p className="text-gray-400">RESTful API reference for developers</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              API Status
            </button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-electron-blue to-electron-purple flex items-center gap-2">
              <Key className="w-4 h-4" />
              Get API Key
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'API Version', value: 'v1', icon: Zap },
          { label: 'Total Endpoints', value: '24', icon: BookOpen },
          { label: 'Rate Limit', value: '100/min', icon: Clock },
          { label: 'Uptime', value: '99.9%', icon: Shield },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <stat.icon className="w-5 h-5 text-indigo-400 mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'overview', label: 'Overview', icon: BookOpen },
            { key: 'endpoints', label: 'Endpoints', icon: Terminal },
            { key: 'authentication', label: 'Authentication', icon: Key },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${activeTab === tab.key ? 'bg-electron-blue text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Introduction */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
            <div className="prose prose-invert max-w-none text-gray-400">
              <p>The E-Seller API allows you to integrate our e-commerce platform with your applications. All API requests require authentication using an API key.</p>
              <p className="mt-4">Base URL: <code className="bg-white/10 px-2 py-1 rounded">https://api.e-seller.com/v1</code></p>
            </div>
          </div>

          {/* Code Example */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quick Start</h3>
              <div className="flex gap-2">
                {(['curl', 'javascript', 'python'] as const).map(lang => (
                  <button key={lang} onClick={() => setCodeTab(lang)} className={`px-3 py-1 rounded-lg text-sm capitalize ${codeTab === lang ? 'bg-electron-blue text-white' : 'bg-white/5 text-gray-400'}`}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <pre className="bg-black/50 p-4 rounded-xl overflow-x-auto text-sm font-mono">
                {codeExamples[codeTab]}
              </pre>
              <button onClick={() => copyCode(codeExamples[codeTab], codeTab)} className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20">
                {copied === codeTab ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Rate Limits</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium mb-2">Standard</h4>
                <p className="text-2xl font-bold">100/min</p>
                <p className="text-sm text-gray-400">per API key</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium mb-2">Professional</h4>
                <p className="text-2xl font-bold">500/min</p>
                <p className="text-sm text-gray-400">per API key</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium mb-2">Enterprise</h4>
                <p className="text-2xl font-bold">Unlimited</p>
                <p className="text-sm text-gray-400">Custom limits</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'endpoints' && (
        <div className="space-y-4">
          {endpoints.map((cat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <cat.icon className="w-5 h-5 text-electron-blue" />
                <h3 className="text-lg font-semibold">{cat.category}</h3>
              </div>
              <div className="space-y-2">
                {cat.endpoints.map((ep, j) => (
                  <div key={j} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-mono ${ep.method === 'GET' ? 'bg-green-500/20 text-green-400' : ep.method === 'POST' ? 'bg-blue-500/20 text-blue-400' : ep.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {ep.method}
                      </span>
                      <code className="text-sm font-mono">{ep.path}</code>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">{ep.description}</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">{ep.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'authentication' && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Authentication</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="font-medium mb-2">API Key Authentication</h4>
              <p className="text-sm text-gray-400 mb-3">Include your API key in the Authorization header:</p>
              <code className="block bg-black/50 p-3 rounded-lg font-mono text-sm">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="font-medium mb-2">Getting Your API Key</h4>
              <ol className="list-decimal list-inside text-sm text-gray-400 space-y-2">
                <li>Go to Settings → API Keys</li>
                <li>Click "Generate New Key"</li>
                <li>Copy and store your key securely</li>
                <li>Never share your API key publicly</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}