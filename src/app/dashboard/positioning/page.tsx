'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Crosshair, 
  Target, 
  Users, 
  Sparkles, 
  CheckCircle,
  Copy,
  Download,
  TrendingUp,
  Shield,
  Gem,
  Crown,
  Zap,
  ArrowRight
} from 'lucide-react'

const mockPersonas = [
  {
    id: 1,
    name: 'Le Professionnel Occupe',
    age: '25-35 ans',
    income: '50 000 a 80 000 EUR',
    painPoints: ['Contraint par le temps', 'Prefere la qualite au prix', 'Veut de la commodite'],
    channels: ['LinkedIn', 'Instagram', 'Email'],
    messaging: 'Solutions premium et gain de temps pour styles de vie charges',
  },
  {
    id: 2,
    name: 'Parent Econome',
    age: '30-45 ans',
    income: '30 000 a 60 000 EUR',
    painPoints: ['Budget limite', 'A besoin de durability', 'Oriente famille'],
    channels: ['Facebook', 'TikTok', 'Google'],
    messaging: 'Qualite abordable qui dure pour toute la famille',
  },
  {
    id: 3,
    name: 'Innoveur',
    age: '18-28 ans',
    income: '25 000 a 50 000 EUR',
    painPoints: ['Veut les dernieres tendances', 'Guide par les reseaux sociaux', 'FOMO'],
    channels: ['TikTok', 'Instagram', 'Snapchat'],
    messaging: 'Soyez le premier a vivre ce dont tout le monde parle',
  },
]

const mockCompetitors = [
  { name: 'Concurrent A', strength: 'Notoriete de marque', weakness: 'Prix eleves' },
  { name: 'Concurrent B', strength: 'Large distribution', weakness: 'Qualite faible' },
  { name: 'Concurrent C', strength: 'Innovation', weakness: 'Service mediocre' },
]

const mockOffers = [
  {
    id: 1,
    type: 'Lead Magnet',
    title: 'Guide Produit Gratuit',
    description: 'Telechargez notre guide complet pour choisir le bon produit',
    conversion: '12%',
  },
  {
    id: 2,
    type: 'Bonus',
    title: 'Achetez 2 Obtenez 1 Gratuit',
    description: 'Offre limitee sur tous les accessoires',
    conversion: '8%',
  },
  {
    id: 3,
    type: 'Urgence',
    title: 'Vente 24 Heures',
    description: 'Flash sale terminant bientot - Ne manquez pas!',
    conversion: '15%',
  },
]

export default function PositioningPage() {
  const [productNiche, setProductNiche] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setNotification('Analyse du positionnement en cours...')
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
    setShowResults(true)
    setNotification('Analyse terminee!')
    setTimeout(() => setNotification(null), 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setNotification('Copie dans le presse-papiers!')
    setTimeout(() => {
      setCopied(false)
      setNotification(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-electron-blue/20 via-electron-purple/10 to-transparent border border-electron-blue/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electron-blue via-electron-purple to-blue-600 flex items-center justify-center shadow-lg shadow-electron-blue/30">
            <Crosshair className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Moteur de Positionnement IA</h1>
            <p className="text-gray-300">Definis votre position sur le marche et votre ciblage clients</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">Produit / Niches</label>
            <input
              type="text"
              value={productNiche}
              onChange={(e) => setProductNiche(e.target.value)}
              placeholder="Ex: Appareils maison connectee"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electron-blue/50 focus:bg-white/15 transition-all backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2 font-medium">Audience Cible Actuelle</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Ex: Jeunes professionnels"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electron-blue/50 focus:bg-white/15 transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-electron-blue via-electron-purple to-blue-600 font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg hover:shadow-electron-blue/30 transition-all disabled:opacity-70 cursor-pointer shadow-lg"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-5 h-5 animate-pulse" />
              Analyse du positionnement...
            </>
          ) : (
            <>
              <Target className="w-5 h-5" />
              Analyser le positionnement
            </>
          )}
        </button>
      </div>

      {showResults && (
        <>
          {/* Personas */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold font-[var(--font-sora)]">Personas Cibles</h2>
                <p className="text-gray-400 text-sm">Profils clients generes par IA selon votre audience</p>
              </div>
              <button onClick={() => setNotification('Export en cours...')} className="px-4 py-2 rounded-lg bg-electron-blue/20 hover:bg-electron-blue/30 text-electron-blue border border-electron-blue/30 transition-colors flex items-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" />
                Exporter
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {mockPersonas.map((persona, i) => (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{persona.name}</h3>
                      <p className="text-xs text-gray-400">{persona.age} • {persona.income}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-xs text-electron-blue">Points de Douleur</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.painPoints.map((pp, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-full bg-white/5 text-xs">
                            {pp}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-electron-purple">Canaux</label>
                      <p className="text-sm text-gray-300">{persona.channels.join(', ')}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-electron-blue/10 border border-electron-blue/20">
                    <label className="text-xs text-gray-400">Message</label>
                    <p className="text-sm font-medium">&quot;{persona.messaging}&quot;</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Competitive Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold font-[var(--font-sora)] mb-6">Analyse Concurrentielle</h2>
              <div className="space-y-4">
                {mockCompetitors.map((comp, i) => (
                  <motion.div
                    key={comp.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5"
                  >
                    <h3 className="font-medium mb-2">{comp.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <span className="text-green-400 text-xs">Force</span>
                        <p className="text-gray-300">{comp.strength}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-red-500/10">
                        <span className="text-red-400 text-xs">Faiblesse</span>
                        <p className="text-gray-300">{comp.weakness}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Unique Value Proposition */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold font-[var(--font-sora)] mb-6">Votre Position Unique</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-electron-blue/20 to-electron-purple/20 border border-electron-blue/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-electron-blue" />
                    <span className="font-semibold">Differentiation</span>
                  </div>
                  <p className="text-gray-300">
                    Concentrez-vous sur "Innovation Intelligente a Prix Accessibles" - Positionnez-vous entre les concurrents premium (qualite superieure, prix inferieur) et les options budget (meilleure qualite, prix similaire)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">Marche Non Servi</span>
                  </div>
                  <p className="text-gray-300">
                    Segment desserti: Millenials soucieux de la qualite qui veulent des fonctionnalites premium sans le prix premium
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">Avantage Concurrentiel</span>
                  </div>
                  <p className="text-gray-300">
                    Garantie 2 ans + Retours 30 jours + Support client premium = Construction de confiance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Irresistible Offers */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold font-[var(--font-sora)] mb-6">Offres Irresistibles Suggerees</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mockOffers.map((offer, i) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-electron-blue/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-electron-blue/20 text-electron-blue text-sm">
                      {offer.type}
                    </span>
                    <span className="text-green-400 font-bold">{offer.conversion} conv.</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-electron-blue transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{offer.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Plan */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold font-[var(--font-sora)] mb-6">Plan d'Action Recommande</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Persona Principal', desc: 'Concentrez-vous sur "Le Professionnel Occupe" comme cible principale' },
                { step: 2, title: 'Message', desc: 'Utilisez le slogan "Innovation Intelligente a Prix Accessibles"' },
                { step: 3, title: 'Canaux', desc: 'Priorisez Instagram et l\'email marketing' },
                { step: 4, title: 'Offre', desc: 'Commencez avec le lead magnet "Guide Produit Gratuit"' },
                { step: 5, title: 'Differentiation', desc: 'Mettez en avant la garantie 2 ans dans tous vos marketing' },
              ].map((action, i) => (
                <motion.div
                  key={action.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
                >
                  <div className="w-8 h-8 rounded-full bg-electron-blue flex items-center justify-center font-bold">
                    {action.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-gray-400">{action.desc}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!showResults && (
        <div className="glass-card p-12 text-center">
          <Crosshair className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Pret a Definir Votre Position</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Entrez votre niche de produit et votre audience cible ci-dessus, puis cliquez sur analyser pour obtenir des recommandations de positionnement IA.
          </p>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}