'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Settings, 
  Globe, 
  FileText, 
  Link, 
  Image,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  Download,
  Plus
} from 'lucide-react'

type Keyword = {
  keyword: string
  position: number
  volume: number
  difficulty: number
  trend: 'up' | 'down' | 'stable'
}

type PageSEO = {
  url: string
  title: string
  metaDescription: string
  score: number
  issues: number
}

const mockKeywords: Keyword[] = [
  { keyword: 'wireless earbuds', position: 5, volume: 12500, difficulty: 65, trend: 'up' },
  { keyword: 'smart watch', position: 12, volume: 8900, difficulty: 72, trend: 'up' },
  { keyword: 'yoga mat premium', position: 3, volume: 4200, difficulty: 45, trend: 'stable' },
  { keyword: 'bluetooth speaker', position: 8, volume: 6700, difficulty: 58, trend: 'down' },
  { keyword: 'protein shaker', position: 15, volume: 3100, difficulty: 38, trend: 'up' },
]

const mockPages: PageSEO[] = [
  { url: '/products', title: 'Products - E-Seller', metaDescription: 'Browse our collection of premium products...', score: 85, issues: 2 },
  { url: '/checkout', title: 'Checkout', metaDescription: 'Complete your purchase securely...', score: 72, issues: 5 },
  { url: '/about', title: 'About Us', metaDescription: 'Learn more about E-Seller...', score: 90, issues: 1 },
  { url: '/contact', title: 'Contact Us', metaDescription: 'Get in touch with our team...', score: 88, issues: 1 },
  { url: '/blog', title: 'Blog - E-Seller', metaDescription: 'Latest news and updates...', score: 65, issues: 8 },
]

const seoStats = [
  { label: 'Organic Traffic', value: '12,450', change: '+18%', icon: TrendingUp },
  { label: 'Indexed Pages', value: '45/45', change: '100%', icon: CheckCircle },
  { label: 'Avg. Position', value: '8.5', change: '-1.2', icon: BarChart3 },
  { label: 'SEO Score', value: '78', change: '+5', icon: Search },
]

export default function SEOPage() {
  const [keywords] = useState<Keyword[]>(mockKeywords)
  const [pages] = useState<PageSEO[]>(mockPages)
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'pages' | 'settings'>('overview')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">SEO Tools</h1>
              <p className="text-gray-400">Optimize your site for search engines</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Scan Site
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {seoStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-green-400" />
              <span className={`text-sm ${stat.change.startsWith('+') || stat.change.includes('%') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'keywords', label: 'Keywords', icon: Search },
            { key: 'pages', label: 'Page Analysis', icon: FileText },
            { key: 'settings', label: 'Settings', icon: Settings },
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

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Keywords */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Top Ranking Keywords</h3>
            <div className="space-y-3">
              {keywords.slice(0, 5).map((kw, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div>
                    <p className="font-medium">{kw.keyword}</p>
                    <p className="text-sm text-gray-400">{kw.volume.toLocaleString()} searches/mo</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-electron-blue">#{kw.position}</p>
                    <p className="text-xs text-gray-400">Difficulty: {kw.difficulty}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Issues */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Priority Issues</h3>
            <div className="space-y-3">
              {[
                { issue: 'Missing meta descriptions', page: '/blog', severity: 'high' },
                { issue: 'Image alt tags missing', page: '/products', severity: 'medium' },
                { issue: 'H1 tag too long', page: '/checkout', severity: 'low' },
                { issue: 'Low word count', page: '/about', severity: 'medium' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <AlertCircle className={`w-5 h-5 ${
                      item.severity === 'high' ? 'text-red-400' :
                      item.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{item.issue}</p>
                      <p className="text-xs text-gray-400">{item.page}</p>
                    </div>
                  </div>
                  <button className="text-electron-blue text-sm hover:underline">Fix</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'keywords' && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Keyword Tracking</h3>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Keyword
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium">Keyword</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Position</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Volume</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Difficulty</th>
                  <th className="text-center p-4 text-gray-400 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="p-4 font-medium">{kw.keyword}</td>
                    <td className="p-4 text-right font-bold text-electron-blue">#{kw.position}</td>
                    <td className="p-4 text-right text-gray-400">{kw.volume.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        kw.difficulty > 70 ? 'bg-red-500/20 text-red-400' :
                        kw.difficulty > 40 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {kw.difficulty}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {kw.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-400 inline" />}
                      {kw.trend === 'down' && <TrendingUp className="w-5 h-5 text-red-400 inline rotate-180" />}
                      {kw.trend === 'stable' && <span className="text-gray-400">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'pages' && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Page SEO Analysis</h3>
          <div className="space-y-3">
            {pages.map((page, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-white/5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium">{page.url}</p>
                    <p className="text-sm text-gray-400">{page.title}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-2xl">{page.score}</p>
                      <p className="text-xs text-gray-400">SEO Score</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      page.score > 80 ? 'bg-green-500/20' :
                      page.score > 60 ? 'bg-yellow-500/20' : 'bg-red-500/20'
                    }`}>
                      <span className={`text-lg font-bold ${
                        page.score > 80 ? 'text-green-400' :
                        page.score > 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {page.score}%
                      </span>
                    </div>
                  </div>
                </div>
                {page.issues > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-400">{page.issues} issues found</span>
                    <button className="text-electron-blue hover:underline ml-auto">View Details</button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-6">SEO Settings</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">XML Sitemap</p>
                  <p className="text-sm text-gray-400">Automatically generate sitemap.xml</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-electron-blue">
                  <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                </button>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Robots.txt</p>
                  <p className="text-sm text-gray-400">Control search engine crawling</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-electron-blue">
                  <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                </button>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Open Graph Tags</p>
                  <p className="text-sm text-gray-400">Social media preview tags</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-electron-blue">
                  <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                </button>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Canonical URLs</p>
                  <p className="text-sm text-gray-400">Prevent duplicate content</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-electron-blue">
                  <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}