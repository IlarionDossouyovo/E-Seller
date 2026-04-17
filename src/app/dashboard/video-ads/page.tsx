'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Play, Download, Wand2, Mic, Image, FileVideo, Clock, TrendingUp, Zap, Layers, Settings, RefreshCw, Eye, Edit, Trash2, Share2, Instagram, Youtube, Facebook, MessageSquare, Sparkles, Volume2, Music, Type, Palette, Crop, Scissors, VolumeX } from 'lucide-react'

const videos = [
  { id: 'V1', name: 'Wireless Earbuds Ad', product: 'Wireless Earbuds Pro', duration: '30s', platform: 'Instagram', status: 'completed', views: 125000, ctr: '3.2%', thumbnail: '🎧' },
  { id: 'V2', name: 'Smart Watch Promo', product: 'Smart Watch Series X', duration: '15s', platform: 'TikTok', status: 'completed', views: 89000, ctr: '4.8%', thumbnail: '⌚' },
  { id: 'V3', name: 'Phone Case Demo', product: 'Phone Case Premium', duration: '60s', platform: 'YouTube', status: 'processing', views: null, ctr: null, thumbnail: '📱' },
]

const templates = [
  { id: 'T1', name: 'Product Showcase', duration: '15-60s', style: 'Modern', platforms: ['Instagram', 'TikTok', 'YouTube'], icon: '🎬' },
  { id: 'T2', name: 'Unboxing', duration: '30-90s', style: 'Lifestyle', platforms: ['Instagram', 'YouTube'], icon: '📦' },
  { id: 'T3', name: 'Testimonial', duration: '30-60s', style: 'Authentic', platforms: ['Facebook', 'YouTube'], icon: '💬' },
  { id: 'T4', name: 'Animated Ad', duration: '15-30s', style: 'Animated', platforms: ['All'], icon: '✨' },
]

export default function VideoAdsPage() {
  const [activeTab, setActiveTab] = useState('create')
  const [generationStep, setGenerationStep] = useState(0)

  const stats = {
    totalVideos: videos.length,
    totalViews: videos.filter(v => v.views).reduce((sum, v) => sum + v.views!, 0),
    avgCtr: '4.0%',
    campaigns: 12,
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">AI Video Ads Generator</h1>
              <p className="text-gray-400">Create video ads with AI</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center gap-2">
            <Wand2 className="w-4 h-4" /> New Video
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalVideos}</p>
          <p className="text-sm text-gray-400">Total Videos</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">{(stats.totalViews / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-400">Total Views</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.avgCtr}</p>
          <p className="text-sm text-gray-400">Avg CTR</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-pink-400">{stats.campaigns}</p>
          <p className="text-sm text-gray-400">Campaigns</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['create', 'videos', 'templates', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-purple-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'create' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Creation Steps */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Create New Video Ad</h3>
            
            {/* Step 1: Product */}
            <div className={`p-4 rounded-xl mb-3 ${generationStep >= 0 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">1</span>
                <span className="font-medium">Select Product</span>
              </div>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2">
                <option>Wireless Earbuds Pro</option>
                <option>Smart Watch Series X</option>
                <option>Phone Case Premium</option>
              </select>
            </div>

            {/* Step 2: Template */}
            <div className={`p-4 rounded-xl mb-3 ${generationStep >= 1 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">2</span>
                <span className="font-medium">Choose Template</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {templates.map(t => (
                  <button key={t.id} className="p-3 bg-white/5 rounded-lg text-left">
                    <span className="text-xl">{t.icon}</span>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.duration}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Customize */}
            <div className={`p-4 rounded-xl mb-3 ${generationStep >= 2 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">3</span>
                <span className="font-medium">Customize</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <button className="p-2 bg-white/5 rounded-lg flex flex-col items-center">
                  <Type className="w-5 h-5 mb-1" />
                  <span className="text-xs">Text</span>
                </button>
                <button className="p-2 bg-white/5 rounded-lg flex flex-col items-center">
                  <Image className="w-5 h-5 mb-1" />
                  <span className="text-xs">Image</span>
                </button>
                <button className="p-2 bg-white/5 rounded-lg flex flex-col items-center">
                  <Mic className="w-5 h-5 mb-1" />
                  <span className="text-xs">Voice</span>
                </button>
                <button className="p-2 bg-white/5 rounded-lg flex flex-col items-center">
                  <Music className="w-5 h-5 mb-1" />
                  <span className="text-xs">Music</span>
                </button>
              </div>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-2" rows={2} placeholder="Enter ad script or description..." />
            </div>

            {/* Step 4: Generate */}
            <div className={`p-4 rounded-xl ${generationStep >= 3 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">4</span>
                <span className="font-medium">Generate</span>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" /> Generate Video with AI
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Preview</h3>
            <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl flex items-center justify-center mb-4">
              <Play className="w-16 h-16 text-white/50" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Duration</span>
                <span>30 seconds</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Platform</span>
                <div className="flex gap-1">
                  <Instagram className="w-4 h-4" />
                  <Youtube className="w-4 h-4" />
                  <Facebook className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">AI Voice</span>
                <span>English (US)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Music</span>
                <span>Upbeat Corporate</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 bg-white/5 rounded-xl flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Export
              </button>
              <button className="flex-1 py-2 bg-white/5 rounded-xl flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="grid md:grid-cols-3 gap-4">
          {videos.map((video, i) => (
            <motion.div key={video.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
              <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-3 relative">
                <span className="text-4xl">{video.thumbnail}</span>
                {video.status === 'processing' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-white" />
                  </div>
                )}
              </div>
              <h4 className="font-semibold mb-1">{video.name}</h4>
              <p className="text-sm text-gray-400 mb-2">{video.product}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="px-2 py-0.5 bg-white/5 rounded text-xs">{video.duration}</span>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">{video.platform}</span>
              </div>
              {video.views && (
                <div className="flex items-center justify-between mt-3 text-sm">
                  <span>{video.views.toLocaleString()} views</span>
                  <span className="text-green-400">{video.ctr} CTR</span>
                </div>
              )}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 bg-white/5 rounded-lg text-sm">Edit</button>
                <button className="flex-1 py-1.5 bg-white/5 rounded-lg text-sm">Duplicate</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid md:grid-cols-4 gap-4">
          {templates.map((template, i) => (
            <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4 text-center">
              <span className="text-4xl block mb-3">{template.icon}</span>
              <h4 className="font-semibold mb-1">{template.name}</h4>
              <p className="text-sm text-gray-400 mb-2">{template.duration}</p>
              <p className="text-sm mb-3">{template.style}</p>
              <div className="flex justify-center gap-1 mb-3">
                {template.platforms.map(p => (
                  <span key={p} className="px-2 py-0.5 bg-white/5 rounded text-xs">{p}</span>
                ))}
              </div>
              <button className="w-full py-2 bg-purple-500 rounded-lg">Use Template</button>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-2xl">
          <h3 className="font-semibold mb-4">Video Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">AI Voice Default</p>
                <p className="text-sm text-gray-400">Default voice for new videos</p>
              </div>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1">
                <option>English (US) - Male</option>
                <option>English (US) - Female</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Auto-subtitles</p>
                <p className="text-sm text-gray-400">Generate subtitles automatically</p>
              </div>
              <button className="w-12 h-6 bg-purple-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Watermark</p>
                <p className="text-sm text-gray-400">Add your logo to videos</p>
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