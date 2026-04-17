'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, Globe, DollarSign, ShoppingBag, Settings, Plus, Search, Copy, ExternalLink, Edit, Trash2, Key, Shield, Palette, BarChart3, CheckCircle, XCircle, Clock, Link2, Mail, Crown, Star } from 'lucide-react'

const brands = [
  { id: 'B1', name: 'TechStore Pro', domain: 'shop.techstore.com', logo: '🛒', status: 'active', plan: 'Enterprise', users: 5, revenue: '$2,450/mo', color: 'blue' },
  { id: 'B2', name: 'Fashion Hub', domain: 'myfashion.hub', logo: '👗', status: 'active', plan: 'Business', users: 2, revenue: '$890/mo', color: 'pink' },
  { id: 'B3', name: 'Home Essentials', domain: 'home-essentials.store', logo: '🏠', status: 'pending', plan: 'Starter', users: 1, revenue: '$0/mo', color: 'green' },
]

const resellers = [
  { id: 'R1', name: 'John Seller', email: 'john@reseller.com', plan: 'Platinum', clients: 45, revenue: '$4,500/mo', status: 'active', joinDate: '2024-01-15' },
  { id: 'R2', name: 'Maria Retail', email: 'maria@retail.com', plan: 'Gold', clients: 23, revenue: '$2,100/mo', status: 'active', joinDate: '2024-02-20' },
  { id: 'R3', name: 'Bulk Sales Co', email: 'info@bulksales.com', plan: 'Silver', clients: 12, revenue: '$890/mo', status: 'paused', joinDate: '2024-03-10' },
]

const plans = [
  { name: 'Starter', price: 29, features: ['1 Brand', '100 Products', 'Basic Analytics', 'Email Support'], color: 'gray' },
  { name: 'Business', price: 79, features: ['5 Brands', '1000 Products', 'Advanced Analytics', 'Priority Support', 'API Access'], color: 'blue' },
  { name: 'Enterprise', price: 199, features: ['Unlimited Brands', 'Unlimited Products', 'Full Analytics', '24/7 Support', 'API Access', 'Custom Domain'], color: 'purple' },
]

export default function WhiteLabelPage() {
  const [activeTab, setActiveTab] = useState('brands')

  const stats = {
    totalBrands: brands.length,
    activeBrands: brands.filter(b => b.status === 'active').length,
    totalResellers: resellers.length,
    totalRevenue: '$7,840/mo',
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">White-Label & Reseller</h1>
              <p className="text-gray-400">Manage brands and resellers</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Brand
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalBrands}</p>
          <p className="text-sm text-gray-400">Total Brands</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.activeBrands}</p>
          <p className="text-sm text-gray-400">Active Brands</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">{stats.totalResellers}</p>
          <p className="text-sm text-gray-400">Resellers</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-indigo-400">{stats.totalRevenue}</p>
          <p className="text-sm text-gray-400">MRR</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['brands', 'resellers', 'plans', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-indigo-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'brands' && (
        <div className="grid md:grid-cols-3 gap-4">
          {brands.map((brand, i) => (
            <motion.div key={brand.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{brand.logo}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  brand.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>{brand.status}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{brand.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{brand.domain}</span>
                <button className="p-1 hover:bg-white/10 rounded">
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="px-2 py-0.5 bg-white/5 rounded text-xs">{brand.plan}</span>
                <span className="text-gray-400">{brand.users} users</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg mb-4">
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="font-semibold text-green-400">{brand.revenue}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm flex items-center justify-center gap-1">
                  <Settings className="w-4 h-4" /> Manage
                </button>
                <button className="p-2 bg-white/5 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Add New Brand Card */}
          <div className="glass-card p-6 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold mb-2">Add New Brand</h3>
            <p className="text-sm text-gray-400 mb-4">Create a white-label instance for your brand</p>
            <button className="px-4 py-2 bg-indigo-500 rounded-lg">Create Brand</button>
          </div>
        </div>
      )}

      {activeTab === 'resellers' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Reseller</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Clients</th>
                <th className="p-4">Revenue</th>
                <th className="p-4">Join Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resellers.map((reseller, i) => (
                <motion.tr key={reseller.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{reseller.name}</p>
                      <p className="text-sm text-gray-400">{reseller.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      reseller.plan === 'Platinum' ? 'bg-purple-500/20 text-purple-400' :
                      reseller.plan === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>{reseller.plan}</span>
                  </td>
                  <td className="p-4">{reseller.clients}</td>
                  <td className="p-4 text-green-400 font-semibold">{reseller.revenue}</td>
                  <td className="p-4 text-gray-400">{reseller.joinDate}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      reseller.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>{reseller.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-white/10 rounded"><Mail className="w-4 h-4" /></button>
                      <button className="p-1 hover:bg-white/10 rounded"><Key className="w-4 h-4" /></button>
                      <button className="p-1 hover:bg-white/10 rounded"><Settings className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card p-6 border-2 ${plan.name === 'Business' ? 'border-indigo-500' : 'border-transparent'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${
                  plan.color === 'gray' ? 'text-gray-400' :
                  plan.color === 'blue' ? 'text-blue-400' :
                  'text-purple-400'
                }`}>{plan.name}</h3>
                {plan.name === 'Business' && <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-xs">Popular</span>}
              </div>
              <p className="text-3xl font-bold mb-1">${plan.price}</p>
              <p className="text-sm text-gray-400 mb-4">/month</p>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 bg-white/5 rounded-xl">Edit Plan</button>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-2xl">
          <h3 className="font-semibold mb-4">White-Label Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="font-medium">Custom Domains</p>
                  <p className="text-sm text-gray-400">Allow custom domain names</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-indigo-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-pink-400" />
                <div>
                  <p className="font-medium">Branding Options</p>
                  <p className="text-sm text-gray-400">Custom logo, colors, favicon</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-indigo-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium">Reseller Mode</p>
                  <p className="text-sm text-gray-400">Allow sub-accounts</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-indigo-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Link2 className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">API Access</p>
                  <p className="text-sm text-gray-400">Allow API integrations</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-white/10 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}