'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  RefreshCw,
  Type,
  Image,
  PenTool,
  Box,
  Building2,
  Wand2,
  Heart,
  Share2,
  RefreshCcw,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

type BrandElement = 'name' | 'logo' | 'colors' | 'typography' | 'packaging' | 'story'

const mockResults = {
  name: {
    suggestions: [
      { name: 'NexGen', tagline: 'Innovation meets simplicity', score: 95 },
      { name: 'Eleva', tagline: 'Rise above the ordinary', score: 88 },
      { name: 'PureLine', tagline: 'Clean design, pure experience', score: 82 },
    ]
  },
  colors: {
    palettes: [
      { name: 'Midnight Electric', primary: '#0B0F1A', secondary: '#0066FF', accent: '#7B3FE4' },
      { name: 'Ocean Breeze', primary: '#0A1929', secondary: '#00D4FF', accent: '#FF6B6B' },
      { name: 'Forest Premium', primary: '#0D1F17', secondary: '#2ECC71', accent: '#F1C40F' },
    ]
  },
  typography: {
    fonts: [
      { heading: 'Sora', body: 'DM Sans', style: 'Modern Tech' },
      { heading: 'Playfair Display', body: 'Lato', style: 'Luxury' },
      { heading: 'Space Grotesk', body: 'Inter', style: 'Startup' },
    ]
  },
  logos: [
    'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
  ],
  packaging: [
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
    'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400',
  ],
  story: [
    "Born from a passion for innovation, we believe everyone deserves access to premium products without compromise. Our journey began in a small garage with a simple mission: make quality accessible.",
    "We exist to bridge the gap between luxury and everyday essentials. Every product we create is a testament to our commitment to excellence and sustainability.",
  ]
}

export default function BrandingPage() {
  const [productNiche, setProductNiche] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedElements, setGeneratedElements] = useState<BrandElement[]>([])
  const [activeTab, setActiveTab] = useState<BrandElement>('name')
  const [copied, setCopied] = useState(false)

  const brandTabs: { key: BrandElement; label: string; icon: any }[] = [
    { key: 'name', label: 'Nom de marque', icon: Building2 },
    { key: 'logo', label: 'Logo', icon: Image },
    { key: 'colors', label: 'Couleurs', icon: Palette },
    { key: 'typography', label: 'Typographie', icon: Type },
    { key: 'packaging', label: 'Emballage', icon: Box },
    { key: 'story', label: 'Histoire', icon: PenTool },
  ]

  const handleGenerate = async () => {
    if (!productNiche || !targetAudience) return
    setIsGenerating(true)
    setGeneratedElements(['name', 'logo', 'colors', 'typography', 'packaging', 'story'])
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Generateur de Marque IA</h1>
            <p className="text-gray-400">Creez votre identite de marque complete en quelques secondes</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Produit / Niche</label>
            <input
              type="text"
              value={productNiche}
              onChange={(e) => setProductNiche(e.target.value)}
              placeholder="ex: Appareils maison connectee, Cosmetiques bio..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Cible</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="ex: Jeunes professionnels, 25-35 ans..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !productNiche || !targetAudience}
          className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-pulse" />
              Generation de votre identite de marque...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generer l'identite de marque
            </>
          )}
        </button>
      </div>

      {generatedElements.length > 0 ? (
        <>
          {/* Brand Tabs */}
          <div className="glass-card p-2 overflow-x-auto">
            <div className="flex gap-2">
              {brandTabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
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
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Brand Name */}
              {activeTab === 'name' && (
                <div className="grid md:grid-cols-3 gap-6">
                  {mockResults.name.suggestions.map((suggestion, i) => (
                    <motion.div
                      key={suggestion.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-6 group cursor-pointer hover:border-electron-blue/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold">{suggestion.name}</h3>
                          <p className="text-gray-400 text-sm">{suggestion.tagline}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                          <span className="text-green-400 font-bold">{suggestion.score}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Copy className="w-4 h-4" />
                          Copier
                        </button>
                        <button className="flex-1 py-2 rounded-lg bg-electron-blue/20 text-electron-blue hover:bg-electron-blue/30 transition-colors text-sm">
                          Selectionner
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Logo */}
              {activeTab === 'logo' && (
                <div className="grid md:grid-cols-3 gap-6">
                  {mockResults.logos.map((logo, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-4 group cursor-pointer hover:border-electron-blue/30 transition-all"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-white/5 mb-4">
                        <img src={logo} alt={`Logo ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="flex-1 py-2 rounded-lg bg-electron-blue/20 text-electron-blue hover:bg-electron-blue/30 transition-colors text-sm">
                          Selectionner
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Colors */}
              {activeTab === 'colors' && (
                <div className="grid md:grid-cols-3 gap-6">
                  {mockResults.colors.palettes.map((palette, i) => (
                    <motion.div
                      key={palette.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-6 group cursor-pointer hover:border-electron-blue/30 transition-all"
                    >
                      <div className="flex gap-2 mb-4">
                        <div 
                          className="w-12 h-12 rounded-lg" 
                          style={{ backgroundColor: palette.primary }} 
                        />
                        <div 
                          className="w-12 h-12 rounded-lg" 
                          style={{ backgroundColor: palette.secondary }} 
                        />
                        <div 
                          className="w-12 h-12 rounded-lg" 
                          style={{ backgroundColor: palette.accent }} 
                        />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{palette.name}</h3>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex justify-between">
                          <span>Primaire</span>
                          <code className="bg-white/5 px-2 py-1 rounded">{palette.primary}</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Secondaire</span>
                          <code className="bg-white/5 px-2 py-1 rounded">{palette.secondary}</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Accent</span>
                          <code className="bg-white/5 px-2 py-1 rounded">{palette.accent}</code>
                        </div>
                      </div>
                      <button className="mt-4 w-full py-2 rounded-lg bg-electron-blue/20 text-electron-blue hover:bg-electron-blue/30 transition-colors text-sm">
                        Appliquer la palette
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Typography */}
              {activeTab === 'typography' && (
                <div className="grid md:grid-cols-3 gap-6">
                  {mockResults.typography.fonts.map((font, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-6 group cursor-pointer hover:border-electron-blue/30 transition-all"
                    >
                      <div className="mb-4">
                        <h3 className="text-4xl font-bold mb-2" style={{ fontFamily: font.heading }}>{font.heading}</h3>
                        <p className="text-gray-400 text-sm">Police de titre</p>
                      </div>
                      <div className="mb-4 pb-4 border-b border-white/10">
                        <p className="text-xl" style={{ fontFamily: font.body }}>
                          Portez ce vieux whisky au juge blond qui fume.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">Police de texte</p>
                      </div>
                      <p className="text-electron-blue text-sm mb-4">{font.style}</p>
                      <button className="w-full py-2 rounded-lg bg-electron-blue/20 text-electron-blue hover:bg-electron-blue/30 transition-colors text-sm">
                        Appliquer les polices
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Packaging */}
              {activeTab === 'packaging' && (
                <div className="grid md:grid-cols-3 gap-6">
                  {mockResults.packaging.map((pkg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-4 group cursor-pointer hover:border-electron-blue/30 transition-all"
                    >
                      <div className="aspect-video rounded-xl overflow-hidden bg-white/5 mb-4">
                        <img src={pkg} alt={`Packaging ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Download className="w-4 h-4" />
                          Telecharger
                        </button>
                        <button className="flex-1 py-2 rounded-lg bg-electron-blue/20 text-electron-blue hover:bg-electron-blue/30 transition-colors text-sm">
                          Selectionner
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Story */}
              {activeTab === 'story' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {mockResults.story.map((story, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-6 group cursor-pointer hover:border-electron-blue/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold">Option histoire de marque {i + 1}</h3>
                        <button 
                          onClick={() => copyToClipboard(story)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{story}</p>
                      <button className="mt-4 w-full py-2 rounded-lg bg-electron-blue/20 text-electron-blue hover:bg-electron-blue/30 transition-colors text-sm">
                        Utiliser cette histoire
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Generate More */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Besoin de plus d'options?</h3>
                <p className="text-gray-400 text-sm">Regenerez n'importe quel element pour de nouvelles idees</p>
              </div>
              <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2">
                <RefreshCcw className="w-5 h-5" />
                Tout regenerer
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="glass-card p-12 text-center">
          <Palette className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Pret a creer votre marque</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Entrez votre niche de produit et votre cible ci-dessus, puis cliquez sur generer pour creer votre identite de marque complete incluant le nom, le logo, les couleurs, et plus encore.
          </p>
        </div>
      )}
    </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour Dashboard
        </Link>
        <Link href="/dashboard/brandkit" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          Brand Kit
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}