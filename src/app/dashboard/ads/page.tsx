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
    type: 'Script Video',
    hook: "Vous ne croirez pas ce qui s'est passe quand j'ai essaye ce produit...",
    body: "Je lutte avec [POINT DOULEUR] depuis des annees. Ensuite, j'ai decouvert [PRODUIT]. En juste [TEMPS], j'ai notice des resultats incredibles. Voici mon experience reelle...",
    cta: "Cliquez sur le lien pour essayer vous-meme!",
    duration: '15-30 sec',
    views: '2.4M',
    engagement: '4.8%',
  },
  {
    id: 2,
    platform: 'Facebook',
    type: 'Script UGC',
    hook: "Mes amis n'ont pas cru ce que j'ai accompli en seulement 30 jours!",
    body: "Comme la plupart d'entre vous, j'etais sceptique au debut. Mais apres avoir essaye [PRODUIT], j'ai du partager mes resultats. Ce n'est pas un poste奉 - c'est mon experience authentique.",
    cta: "Obtenez le votre - lien dans la bio!",
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
    status: 'Pret',
  },
  {
    id: 2,
    type: 'Image',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    size: '1080x1080',
    platform: 'Instagram',
    status: 'Pret',
  },
  {
    id: 3,
    type: 'Carousel',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    slides: 5,
    platform: 'Facebook',
    status: 'En cours',
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
  const [notification, setNotification] = useState<string | null>(null)

  const platforms = ['TikTok', 'Facebook', 'Instagram', 'Meta']

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setNotification('Generation des publicites en cours...')
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setNotification('Publicites generees avec succes!')
    setTimeout(() => setNotification(null), 3000)
  }

  const copyScript = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setNotification('Script copie dans le presse-papiers!')
    setTimeout(() => {
      setCopied(null)
      setNotification(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-electron-blue/20 via-electron-purple/10 to-transparent border border-electron-blue/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electron-blue via-electron-purple to-blue-600 flex items-center justify-center shadow-lg shadow-electron-blue/30">
            <Megaphone className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Generateur de Publicites IA</h1>
            <p className="text-gray-300">Creez des scripts et creatifs publicitaires a forte conversion</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">Nom du Produit</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Ex: Montre Connectee Pro"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electron-blue/50 focus:bg-white/15 transition-all backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">Benefices Cles</label>
            <input
              type="text"
              value={productBenefits}
              onChange={(e) => setProductBenefits(e.target.value)}
              placeholder="Ex: Batterie 7 jours, moniteur cardiaque"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electron-blue/50 focus:bg-white/15 transition-all backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">Audience Cible</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Ex: Passionnes de fitness"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electron-blue/50 focus:bg-white/15 transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-300 mb-2 font-medium">Plateformes</label>
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
          disabled={isGenerating}
          className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-electron-blue via-electron-purple to-blue-600 font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg hover:shadow-electron-blue/30 transition-all disabled:opacity-70 cursor-pointer shadow-lg"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-pulse" />
              Generation des publicites...
            </>
          ) : (
            <>
              <Megaphone className="w-5 h-5" />
              Generer les Scripts Publicitaires
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'scripts', label: 'Scripts', icon: FileText },
            { key: 'creatives', label: 'Creatifs', icon: Image },
            { key: 'analysis', label: 'Analyse', icon: TrendingUp },
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
                    <label className="text-xs text-electron-blue uppercase tracking-wider">Accroche</label>
                    <p className="text-lg font-medium mt-1">{script.hook}</p>
                  </div>
                  <div>
                    <label className="text-xs text-electron-purple uppercase tracking-wider">Corps</label>
                    <p className="text-gray-300 mt-1">{script.body}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Appel a l'Action</label>
                    <p className="text-white mt-1">{script.cta}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button 
                    onClick={() => copyScript(script.hook, script.id)}
                    className="flex-1 py-2.5 rounded-lg bg-electron-blue/20 hover:bg-electron-blue/30 text-electron-blue font-medium transition-colors flex items-center justify-center gap-2 text-sm border border-electron-blue/30"
                  >
                    {copied === script.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    Copier le Script
                  </button>
                  <button onClick={() => setNotification('Edition du script...')} className="flex-1 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm border border-white/20">
                    Editer le Script
                  </button>
                  <button onClick={() => setNotification('Generation de la video...')} className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 text-white font-medium transition-opacity text-sm">
                    Generer Video
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
              <h3 className="text-lg font-semibold mb-4">Publicites les Plus Performantes</h3>
              <div className="space-y-4">
                {[
                  { name: 'TikTok - Style UGC 1', clicks: 12500, conversions: 480, roas: '4.2x' },
                  { name: 'Facebook - Carousel', clicks: 8200, conversions: 320, roas: '3.8x' },
                  { name: 'Instagram - Story', clicks: 5600, conversions: 180, roas: '2.9x' },
                ].map((ad, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <h4 className="font-medium">{ad.name}</h4>
                      <p className="text-xs text-gray-400">{ad.clicks.toLocaleString()} clics • {ad.conversions} conversions</p>
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

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}