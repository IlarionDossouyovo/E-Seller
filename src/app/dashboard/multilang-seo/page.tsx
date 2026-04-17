'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Search, Languages, MapPin, DollarSign, ExternalLink, Settings, Plus, Edit, Trash2, RefreshCw, CheckCircle, AlertTriangle, BarChart3, TrendingUp, Link2 } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', status: 'active', translations: 1250, seo: 'Good' },
  { code: 'fr', name: 'French', status: 'active', translations: 890, seo: 'Good' },
  { code: 'de', name: 'German', status: 'active', translations: 756, seo: 'Average' },
  { code: 'es', name: 'Spanish', status: 'pending', translations: 0, seo: 'Not set' },
  { code: 'it', name: 'Italian', status: 'pending', translations: 0, seo: 'Not set' },
  { code: 'pt', name: 'Portuguese', status: 'pending', translations: 0, seo: 'Not set' },
]

const seoData = [
  { keyword: 'wireless earbuds', rank: 3, country: 'US', volume: 12500 },
  { keyword: 'smart watch', rank: 8, country: 'US', volume: 8900 },
  { keyword: 'phone case', rank: 12, country: 'US', volume: 15200 },
]

export default function MultilangSeoPage() {
  const [activeTab, setActiveTab] = useState('languages')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Multi-language SEO</h1>
              <p className="text-gray-400">Global translation & SEO</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center gap-2">
            <Languages className="w-4 h-4" /> Add Language
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{languages.filter(l => l.status === 'active').length}</p>
          <p className="text-sm text-gray-400">Active Languages</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">2,896</p>
          <p className="text-sm text-gray-400">Translations</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">67%</p>
          <p className="text-sm text-gray-400">SEO Coverage</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">5</p>
          <p className="text-sm text-gray-400">Countries</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['languages', 'seo', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-blue-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'languages' && (
        <div className="grid md:grid-cols-3 gap-4">
          {languages.map((lang, i) => (
            <motion.div key={lang.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`glass-card p-6 ${lang.status === 'pending' ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">
                  {lang.code === 'en' ? '🇺🇸' : lang.code === 'fr' ? '🇫🇷' : lang.code === 'de' ? '🇩🇪' : lang.code === 'es' ? '🇪🇸' : lang.code === 'it' ? '🇮🇹' : '🇧🇷'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${lang.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{lang.status}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{lang.name}</h3>
              {lang.status === 'active' ? (
                <>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Translations</span>
                      <span>{lang.translations}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">SEO Score</span>
                      <span className={`${lang.seo === 'Good' ? 'text-green-400' : 'text-yellow-400'}`}>{lang.seo}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">Edit</button>
                    <button className="py-2 px-3 bg-white/5 rounded-lg">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <button className="w-full py-2 bg-blue-500 rounded-lg">Activate</button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Keyword Rankings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr className="text-left text-sm text-gray-400">
                    <th className="p-3">Keyword</th>
                    <th className="p-3">Rank</th>
                    <th className="p-3">Country</th>
                    <th className="p-3">Volume</th>
                    <th className="p-3">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {seoData.map((seo, i) => (
                    <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-t border-white/5">
                      <td className="p-3 font-medium">{seo.keyword}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${seo.rank <= 3 ? 'bg-green-500/20 text-green-400' : seo.rank <= 10 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>#{seo.rank}</span>
                      </td>
                      <td className="p-3">{seo.country}</td>
                      <td className="p-3">{seo.volume.toLocaleString()}</td>
                      <td className="p-3">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">SEO Checklist</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Meta descriptions</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> hreflang tags</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                  <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400" /> Local schemas</span>
                  <span className="text-yellow-400">Partial</span>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Country Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>United States (USD)</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>European Union (EUR)</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-xl">
          <h3 className="font-semibold mb-4">Translation Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Auto-translate</p>
                <p className="text-sm text-gray-400">AI-powered translations</p>
              </div>
              <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">SEO Optimization</p>
                <p className="text-sm text-gray-400">Auto-generate meta tags</p>
              </div>
              <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Default Currency</p>
                <p className="text-sm text-gray-400">Currency per country</p>
              </div>
              <button className="px-4 py-1 bg-white/10 rounded-lg text-sm">Configure</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}