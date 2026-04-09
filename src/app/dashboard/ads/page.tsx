'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Megaphone, 
  Sparkles, 
  Play, 
  Pause, 
  Download, 
  Copy, 
  Check, 
  Video,
  FileText,
  Image,
  MessageSquare,
  TrendingUp,
  Users,
  DollarSign,
  RefreshCw,
  Share2,
  Heart,
  Eye
} from 'lucide-react'

const mockAdScripts = [
  {
    id: 1,
    platform: 'TikTok',
    type: 'Video Script',
    hook: "You won't believe what happened when I tried this product...",
    body: "I've been struggling with [PAIN POINT] for years. Then I discovered [PRODUCT]. Within just [TIME], I noticed incredible results. Here's my real experience...",
    cta: "Click the link to try it yourself!",
    duration: '15-30 sec',
    views: '2.4M',
    engagement: '4.8%',
  },
  {
    id: 2,
    platform: 'Facebook',
    type: 'UGC Script',
    hook: "My friends couldn't believe what I achieved in just 30 days!",
    body: "Like most of you, I was skeptical at first. But after trying [PRODUCT], I had to share my results. This isn't a sponsored post - it's my genuine experience.",
    cta: "Get your own copy - link in bio!",
    duration: '30-60 sec',
    views: '1.8M',
    engagement: '3.2%',
  },
]

const mockCreatives = [
  {
    id: 1,
    type: 'Video',
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400',
    duration: '0:28',
    platform: 'TikTok',
    status: 'Ready',
  },
  {
    id: 2,
    type: 'Image',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    size: '1080x1080',
    platform: 'Instagram',
    status: 'Ready',
  },
  {
    id: 3,
    type: 'Carousel',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    slides: 5,
    platform: 'Facebook',
    status: 'Processing',
  },
]

export default function AdsPage() {
  const [productName, setProductName] = useState('')
  const [productBenefits, setProductBenefits] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['TikTok', 'Facebook'])
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'scripts' | 'creatives' | 'analysis'>('scripts')
  const [copied, setCopied] = useState<number | null>(null)

  const platforms = ['TikTok', 'Facebook', 'Instagram', 'Meta']

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const handleGenerate = async () => {
    if (!productName || !productBenefits) return
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
  }

  const copyScript = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
            <Megaphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">AI Ads Generator</h1>
            <p className="text-gray-400">Create high-converting ad scripts and creatives</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Smart Watch Pro"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Key Benefits</label>
            <input
              type="text"
              value={productBenefits}
              onChange={(e) => setProductBenefits(e.target.value)}
              placeholder="e.g., 7-day battery, heart rate monitor"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Fitness enthusiasts"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-400 mb-2">Platforms</label>
          <div className="flex gap-2">
            {platforms.map(platform => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`px-4 py-2 rounded-xl transition-colors ${
                  selectedPlatforms.includes(platform)
                    ? 'bg-electron-blue text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !productName || !productBenefits}
          className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-pulse" />
              Generating ads...
            </>
          ) : (
            <>
              <Megaphone className="w-5 h-5" />
              Generate Ad Scripts
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'scripts', label: 'Scripts', icon: FileText },
            { key: 'creatives', label: 'Creatives', icon: Image },
            { key: 'analysis', label: 'Analysis', icon: TrendingUp },
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
      <AnimatePresence mode="wait">
        {activeTab === 'scripts' && (
          <motion.div
            key="scripts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Scripts */}
            {mockAdScripts.map((script, i) => (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{script.platform} - {script.type}</h3>
                      <p className="text-xs text-gray-400">{script.duration} • {script.views} views</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-400">{script.engagement} engagement</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-electron-blue uppercase tracking-wider">Hook</label>
                    <p className="text-lg font-medium mt-1">{script.hook}</p>
                  </div>
                  <div>
                    <label className="text-xs text-electron-purple uppercase tracking-wider">Body</label>
                    <p className="text-gray-300 mt-1">{script.body}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">CTA</label>
                    <p className="text-white mt-1">{script.cta}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button 
                    onClick={() => copyScript(script.hook, script.id)}
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    {copied === script.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    Copy Script
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-electron-blue/20 text-electron-blue hover:bg-electron-blue/30 transition-colors text-sm">
                    Edit Script
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity text-sm">
                    Generate Video
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'creatives' && (
          <motion.div
            key="creatives"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {mockCreatives.map((creative, i) => (
              <motion.div
                key={creative.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <div className="relative aspect-video bg-white/5">
                  <img 
                    src={creative.thumbnail} 
                    alt={creative.type}
                    className="w-full h-full object-cover"
                  />
                  {creative.type === 'Video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/50 text-xs">
                    {creative.duration || '1080x1080'}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{creative.type}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      creative.status === 'Ready' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {creative.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{creative.platform}</p>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'analysis' && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Avg. ROAS', value: '3.2x', change: '+12%', icon: TrendingUp },
                { label: 'Cost per Click', value: '$0.45', change: '-8%', icon: DollarSign },
                { label: 'Conversion Rate', value: '4.8%', change: '+15%', icon: Users },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-8 h-8 text-electron-blue" />
                    <span className="text-green-400 text-sm">{stat.change}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Top Performing Ads</h3>
              <div className="space-y-4">
                {[
                  { name: 'TikTok - UGC Style 1', clicks: 12500, conversions: 480, roas: '4.2x' },
                  { name: 'Facebook - Carousel', clicks: 8200, conversions: 320, roas: '3.8x' },
                  { name: 'Instagram - Story', clicks: 5600, conversions: 180, roas: '2.9x' },
                ].map((ad, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <h4 className="font-medium">{ad.name}</h4>
                      <p className="text-xs text-gray-400">{ad.clicks.toLocaleString()} clicks • {ad.conversions} conversions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">{ad.roas}</p>
                      <p className="text-xs text-gray-400">ROAS</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}