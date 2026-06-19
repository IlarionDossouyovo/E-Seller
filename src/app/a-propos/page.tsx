'use client'

import Link from 'next/link'
import { useTranslation } from '@/app/i18n'
import { 
  Bot, 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield, 
  Users,
  ArrowRight,
  Star,
  Rocket
} from 'lucide-react'

export default function AProposPage() {
  const { t } = useTranslation()
  
  const features = [
    {
      icon: Brain,
      title: t.ai.productIntelligence,
      description: 'Models IA puissants pour analyse predictive et generation automatique de contenu'
    },
  {
    icon: Zap,
    title: 'Automatisation Complete',
    description: '10 workflows N8N + Ollama pour automatiser toutes vos taches recurrentes'
  },
  {
    icon: TrendingUp,
    title: 'Analytique Temps Reel',
    description: 'Tableau de bord ROI, CPA, ROAS en direct avec alertes intelligentes'
  },
  {
    icon: Shield,
    title: 'Securite Enterprise',
    description: 'Protection de niveau bancaire pour vos donnees et transactions'
  },
  {
    icon: Users,
    title: 'Collaboration Equipe',
    description: 'Gestion des acces et permissions pour votre equipe'
  },
  {
    icon: Bot,
    title: 'Support 24/7',
    description: 'Assistant IA disponible pour vous aider a tout moment'
  }
]

const stats = [
  { value: '10+', label: 'AI Agents' },
  { value: '100+', label: 'Fonctionnalites' },
  { value: '24/7', label: 'Support' },
  { value: '99.9%', label: 'Uptime' }
]

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Fondateur, Shopify Store',
    content: 'E-Seller a revolu mon business dropshipping. Les AI agents trouvent des produits gagnants en quelques secondes.',
    rating: 5
  },
  {
    name: 'Jean-Pierre M.',
    role: 'E-commercant Amazon',
    content: 'Incroyable! Ma productivity a augmente de 300% depuis que j\'utilise les automations N8N.',
    rating: 5
  },
  {
    name: 'Sophie Chen',
    role: 'CEO, Brand Locale',
    content: 'Le generateur de marque IA m\'a fait economiser des milliers d\'euros en design.',
    rating: 5
  }
]

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
              <Rocket className="w-4 h-4" />
              Plateforme E-Commerce AI #1 en France
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              A Propos de <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">E-Seller</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              E-Seller est la plateforme e-commerce IA tout-en-un qui revolutionne la vente en ligne. 
              Trouvez des produits gagnants, creez votre marque automatiquement, et lancez des campagnes publicitaires performantes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center gap-2">
                Voir la Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-700 transition-colors border border-slate-700">
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Pourquoi Choisir E-Seller?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Une plateforme complete avec tous les outils dont vous avez besoin pour succeed dans l'e-commerce
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-slate-800/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-gray-400">Des milliers de marchands nous font confiance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="border-t border-slate-700 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pret a revolutionner votre e-commerce?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de marchands qui ont deja adopte E-Seller
          </p>
          <Link href="/demo" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            <Rocket className="w-5 h-5" />
            Commencer Gratuitement
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/a-propos" className="text-gray-400 hover:text-white transition-colors">A propos</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/demo" className="text-gray-400 hover:text-white transition-colors">Demo</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  )
}