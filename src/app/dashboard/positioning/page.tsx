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
    name: 'The Busy Professional',
    age: '25-35',
    income: '$50K-80K',
    painPoints: ['Time-constrained', 'Values quality over price', 'Wants convenience'],
    channels: ['LinkedIn', 'Instagram', 'Email'],
    messaging: 'Premium, time-saving solutions for busy lifestyles',
  },
  {
    id: 2,
    name: 'The Budget-Conscious Parent',
    age: '30-45',
    income: '$30K-60K',
    painPoints: ['Limited budget', 'Needs durability', 'Family-focused'],
    channels: ['Facebook', 'TikTok', 'Google'],
    messaging: 'Affordable quality that lasts for the whole family',
  },
  {
    id: 3,
    name: 'The Trendsetter',
    age: '18-28',
    income: '$25K-50K',
    painPoints: ['Wants latest trends', 'Social media driven', 'FOMO'],
    channels: ['TikTok', 'Instagram', 'Snapchat'],
    messaging: 'Be the first to experience what everyone is talking about',
  },
]

const mockCompetitors = [
  { name: 'Competitor A', strength: 'Brand awareness', weakness: 'High prices' },
  { name: 'Competitor B', strength: 'Wide distribution', weakness: 'Low quality' },
  { name: 'Competitor C', strength: 'Innovation', weakness: 'Poor service' },
]

const mockOffers = [
  {
    id: 1,
    type: 'Lead Magnet',
    title: 'Free Product Guide',
    description: 'Download our comprehensive guide to choosing the right product',
    conversion: '12%',
  },
  {
    id: 2,
    type: 'Bonus',
    title: 'Buy 2 Get 1 Free',
    description: 'Limited time offer on all accessories',
    conversion: '8%',
  },
  {
    id: 3,
    type: 'Urgency',
    title: '24-Hour Sale',
    description: 'Flash sale ending soon - Don\'t miss out!',
    conversion: '15%',
  },
]

export default function PositioningPage() {
  const [productNiche, setProductNiche] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAnalyze = async () => {
    if (!productNiche || !targetAudience) return
    setIsAnalyzing(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
    setShowResults(true)
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
            <Crosshair className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">AI Positioning Engine</h1>
            <p className="text-gray-400">Define your market position and customer targeting</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product / Niche</label>
            <input
              type="text"
              value={productNiche}
              onChange={(e) => setProductNiche(e.target.value)}
              placeholder="e.g., Smart home devices"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Current Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Young professionals"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !productNiche || !targetAudience}
          className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-5 h-5 animate-pulse" />
              Analyzing market position...
            </>
          ) : (
            <>
              <Target className="w-5 h-5" />
              Analyze Positioning
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
                <h2 className="text-xl font-semibold font-[var(--font-sora)]">Target Personas</h2>
                <p className="text-gray-400 text-sm">AI-generated customer profiles based on your audience</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Export
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
                      <label className="text-xs text-electron-blue">Pain Points</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.painPoints.map((pp, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-full bg-white/5 text-xs">
                            {pp}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-electron-purple">Channels</label>
                      <p className="text-sm text-gray-300">{persona.channels.join(', ')}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-electron-blue/10 border border-electron-blue/20">
                    <label className="text-xs text-gray-400">Messaging</label>
                    <p className="text-sm font-medium">&quot;{persona.messaging}&quot;</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Competitive Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold font-[var(--font-sora)] mb-6">Competitive Analysis</h2>
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
                        <span className="text-green-400 text-xs">Strength</span>
                        <p className="text-gray-300">{comp.strength}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-red-500/10">
                        <span className="text-red-400 text-xs">Weakness</span>
                        <p className="text-gray-300">{comp.weakness}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Unique Value Proposition */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold font-[var(--font-sora)] mb-6">Your Unique Position</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-electron-blue/20 to-electron-purple/20 border border-electron-blue/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-electron-blue" />
                    <span className="font-semibold">Differentiation</span>
                  </div>
                  <p className="text-gray-300">
                    Focus on &quot;Smart Innovation at Accessible Prices&quot; - Position between premium competitors (higher quality, lower price) and budget options (better quality, similar price)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">Market Gap</span>
                  </div>
                  <p className="text-gray-300">
                    Underserved segment: Quality-conscious millennials who want premium features without premium pricing
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">Competitive Advantage</span>
                  </div>
                  <p className="text-gray-300">
                    2-year warranty + 30-day returns + Premium customer support = Trust building
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Irresistible Offers */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold font-[var(--font-sora)] mb-6">Suggested Irresistible Offers</h2>
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
            <h2 className="text-xl font-semibold font-[var(--font-sora)] mb-6">Recommended Action Plan</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Primary Persona', desc: 'Focus on "The Busy Professional" as primary target' },
                { step: 2, title: 'Messaging', desc: 'Use "Smart Innovation at Accessible Prices" tagline' },
                { step: 3, title: 'Channels', desc: 'Prioritize Instagram and Email marketing' },
                { step: 4, title: 'Offer', desc: 'Start with "Free Product Guide" lead magnet' },
                { step: 5, title: 'Differentiation', desc: 'Emphasize 2-year warranty in all marketing' },
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
          <h3 className="text-xl font-semibold mb-2">Ready to Define Your Position</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Enter your product niche and target audience above, then click analyze to get AI-powered positioning recommendations.
          </p>
        </div>
      )}
    </div>
  )
}