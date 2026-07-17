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
  const [demoMode, setDemoMode] = useState(false)
  const [demoVideo, setDemoVideo] = useState<string | null>(null)
  
  // Demo video descriptions for tutorial
  const demoVideos = [
    {
      id: 'demo1',
      title: 'Comment créer une publicité vidéo',
      description: 'Guide pas à pas pour créer votre première publicité vidéo IA',
      thumbnail: '🎬',
      duration: '2:30',
      steps: [
        '1. Entrez le nom de votre produit',
        '2. Choisissez un modèle de vidéo',
        '3. Personnalisez le texte et les images',
        '4. Ajoutez une voix IA',
        '5. Générez votre vidéo'
      ]
    },
    {
      id: 'demo2',
      title: 'Optimisation des performances',
      description: 'Comment améliorer le CTR de vos publicités',
      thumbnail: '📈',
      duration: '3:15',
      steps: [
        '1. Analysez les métriques',
        '2. Identifiez les points faibles',
        '3. Modifiez le hook initial',
        '4. Testez différentes voces',
        '5. Mesurez les résultats'
      ]
    },
    {
      id: 'demo3',
      title: 'Multi-plateforme',
      description: 'Adaptez vos vidéos pour TikTok, Instagram, YouTube',
      thumbnail: '🌐',
      duration: '2:45',
      steps: [
        '1. Sélectionnez les plateformes',
        '2. Ajustez le format',
        '3. Modifiez les dimensions',
        '4. Exportez pour chaque plateforme'
      ]
    }
  ]

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
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Générateur de Publicités Vidéo IA</h1>
              <p className="text-gray-400">Créer des publicités vidéo avec l'IA</p>
            </div>
          </div>
          <button onClick={() => alert('Créer une nouvelle vidéo!')} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl flex items-center gap-2 text-white transition-all">
            <Wand2 className="w-4 h-4" /> Nouvelle Vidéo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalVideos}</p>
          <p className="text-sm text-gray-400">Total Vidéos</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">{(stats.totalViews / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-400">Vues Totales</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.avgCtr}</p>
          <p className="text-sm text-gray-400">CTR Moyen</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-pink-400">{stats.campaigns}</p>
          <p className="text-sm text-gray-400">Campagnes</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'create', label: 'Créer' },
          { key: 'videos', label: 'Vidéos' },
          { key: 'templates', label: 'Modèles' },
          { key: 'demo', label: '🎬 Démo' },
          { key: 'settings', label: 'Paramètres' }
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-xl ${activeTab === tab.key ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'} transition-colors`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'create' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Creation Steps */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Créer une Nouvelle Publicité Vidéo</h3>
            
            {/* Step 1: Product */}
            <div className={`p-4 rounded-xl mb-3 ${generationStep >= 0 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">1</span>
                <span className="font-medium">Sélectionner un Produit</span>
              </div>
              <select className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white">
                <option>Wireless Earbuds Pro</option>
                <option>Smart Watch Series X</option>
                <option>Phone Case Premium</option>
              </select>
            </div>

            {/* Step 2: Template */}
            <div className={`p-4 rounded-xl mb-3 ${generationStep >= 1 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">2</span>
                <span className="font-medium">Choisir un Modèle</span>
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
                <span className="font-medium">Personnaliser</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <button onClick={() => alert('Personnaliser le texte')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg flex flex-col items-center transition-colors">
                  <Type className="w-5 h-5 mb-1 text-white" />
                  <span className="text-xs text-gray-300">Texte</span>
                </button>
                <button onClick={() => alert('Personnaliser l\'image')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg flex flex-col items-center transition-colors">
                  <Image className="w-5 h-5 mb-1 text-white" />
                  <span className="text-xs text-gray-300">Image</span>
                </button>
                <button onClick={() => alert('Personnaliser la voix')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg flex flex-col items-center transition-colors">
                  <Mic className="w-5 h-5 mb-1 text-white" />
                  <span className="text-xs text-gray-300">Voix</span>
                </button>
                <button onClick={() => alert('Personnaliser la musique')} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg flex flex-col items-center transition-colors">
                  <Music className="w-5 h-5 mb-1 text-white" />
                  <span className="text-xs text-gray-300">Musique</span>
                </button>
              </div>
              <textarea className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white" rows={2} placeholder="Entrez le script ou la description de la publicité..." />
            </div>

            {/* Step 4: Generate */}
            <div className={`p-4 rounded-xl ${generationStep >= 3 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">4</span>
                <span className="font-medium">Générer</span>
              </div>
              <button onClick={() => alert('Générer la vidéo avec l\'IA!')} className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition-all">
                <Sparkles className="w-5 h-5" /> Générer la Vidéo avec l'IA
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Aperçu</h3>
            <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl flex items-center justify-center mb-4">
              <Play className="w-16 h-16 text-white/50" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Durée</span>
                <span>30 secondes</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Plateforme</span>
                <div className="flex gap-1">
                  <Instagram className="w-4 h-4" />
                  <Youtube className="w-4 h-4" />
                  <Facebook className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Voix IA</span>
                <span>Anglais (US)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Musique</span>
                <span>Corporate Dynamique</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => alert('Exporter la vidéo!')} className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl flex items-center justify-center gap-2 text-white transition-colors">
                <Download className="w-4 h-4" /> Exporter
              </button>
              <button onClick={() => alert('Partager la vidéo!')} className="flex-1 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center gap-2 text-white transition-colors">
                <Share2 className="w-4 h-4" /> Partager
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
                  <span>{video.views.toLocaleString()} vues</span>
                  <span className="text-green-400">{video.ctr} CTR</span>
                </div>
              )}
              <div className="flex gap-2 mt-3">
                <button onClick={() => alert('Modifier la vidéo')} className="flex-1 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm text-white transition-colors">Modifier</button>
                <button onClick={() => alert('Dupliquer la vidéo')} className="flex-1 py-1.5 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm text-white transition-colors">Dupliquer</button>
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
              <button onClick={() => alert('Utiliser ce modèle!')} className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors">Utiliser</button>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'demo' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎬</span>
              <div>
                <h3 className="text-xl font-semibold">Vidéos Tutoriels</h3>
                <p className="text-gray-400">Apprenez à utiliser le générateur de vidéos IA</p>
              </div>
            </div>
          </div>
          
          {/* Demo Videos Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {demoVideos.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 cursor-pointer hover:ring-2 hover:ring-purple-500"
                onClick={() => setDemoVideo(demo.id)}
              >
                <div className="text-4xl mb-3">{demo.thumbnail}</div>
                <h4 className="font-semibold mb-1">{demo.title}</h4>
                <p className="text-sm text-gray-400 mb-2">{demo.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Play className="w-4 h-4" />
                  <span>{demo.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Demo Video Player (simulated) */}
          {demoVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">
                  {demoVideos.find(d => d.id === demoVideo)?.title}
                </h4>
                <button onClick={() => setDemoVideo(null)} className="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>
              
              {/* Simulated video player */}
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <Play className="w-20 h-20 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70">Lecture de la démo...</p>
                </div>
              </div>
              
              {/* Steps */}
              <div className="space-y-3">
                <h5 className="font-medium mb-2">Étapes du tutoriel:</h5>
                {demoVideos.find(d => d.id === demoVideo)?.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-2xl">
          <h3 className="font-semibold mb-4">Paramètres Vidéo</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Voix IA par Défaut</p>
                <p className="text-sm text-gray-400">Voix par défaut pour les nouvelles vidéos</p>
              </div>
              <select className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 text-white">
                <option>Anglais (US) - Homme</option>
                <option>Anglais (US) - Femme</option>
                <option>Français</option>
                <option>Espagnol</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Sous-titres Auto</p>
                <p className="text-sm text-gray-400">Générer les sous-titres automatiquement</p>
              </div>
              <button onClick={() => alert('Paramètres des sous-titres')} className="w-12 h-6 bg-purple-500 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Filigrane</p>
                <p className="text-sm text-gray-400">Ajouter votre logo aux vidéos</p>
              </div>
              <button onClick={() => alert('Paramètres du filigrane')} className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}