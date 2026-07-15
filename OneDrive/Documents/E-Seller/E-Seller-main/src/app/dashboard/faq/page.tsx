'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Search,
  MessageSquare,
  Mail,
  Phone,
  ArrowLeft,
  ArrowRight,
  Bot,
  Cpu,
  Shield,
  Zap,
  ShoppingCart,
  Globe,
  CreditCard,
  FileText,
  HeadphonesIcon
} from 'lucide-react'
import Link from 'next/link'

const faqCategories = [
  { id: 'general', label: 'Général', icon: HelpCircle },
  { id: 'technical', label: 'Technique', icon: Cpu },
  { id: 'billing', label: 'Facturation', icon: CreditCard },
  { id: 'support', label: 'Support', icon: HeadphonesIcon },
]

const faqs = [
  {
    category: 'general',
    question: 'Qu\'est-ce que E-Seller?',
    answer: 'E-Seller est une plateforme e-commerce complète alimentée par 9 agents IA spécialisés. Elle permet de gérer votre boutique en ligne de manière intelligente et automatisée.'
  },
  {
    category: 'general',
    question: 'Combien d\'agents IA sont disponibles?',
    answer: 'E-Seller dispose de 9 agents IA: Product Director, Brand Director, Ads Director, Analytics Director, Assistant Director, Content Director, SEO Director, Health Director, et Maintenance Director.'
  },
  {
    category: 'general',
    question: 'Quelle est la différence entre les plans?',
    answer: 'Le plan Gratuit inclut les fonctionnalités de base. Le plan Pro unlock toutes les fonctionnalités avancées avec des limites plus élevées.'
  },
  {
    category: 'technical',
    question: 'Quelles sont les exigences techniques?',
    answer: 'E-Seller nécessite Node.js 18+, PostgreSQL, et Optionnel: Ollama pour l\'IA locale. L\'application fonctionne sur tous les navigateurs modernes.'
  },
  {
    category: 'technical',
    question: 'Les données sont-elles sécurisées?',
    answer: 'Oui! E-Seller utilise le chiffrement SSL/TLS, des sauvegardes automatiques, et un audit de sécurité régulier via Health et Maintenance Directors.'
  },
  {
    category: 'technical',
    question: 'Puis-je utiliser Ollama en local?',
    answer: 'Absolument! Ollama peut être installé localement pour bénéficier de modèles IA privés et，离线可用。'
  },
  {
    category: 'billing',
    question: 'Quels moyens de paiement sont acceptés?',
    answer: 'Nous acceptons les cartes de crédit/débit (Visa, Mastercard, American Express) et PayPal.'
  },
  {
    category: 'billing',
    question: 'Puis-je annuler mon abonnement?',
    answer: 'Oui, vous pouvez annuler à tout moment depuis votre tableau de bord. L\'accès reste actif jusqu\'à la fin de la période payée.'
  },
  {
    category: 'support',
    question: 'Comment obtenir du support?',
    answer: 'Vous pouvez contacter notre support via le chat en direct, par email à support@eseller.com, ou via la page Contact du dashboard.'
  },
  {
    category: 'support',
    question: 'Le support est-il disponible 24/7?',
    answer: 'Oui! Notre Assistant IA est disponible 24/7 pour répondre à vos questions. Le support humain est disponible du lundi au vendredi.'
  },
]

const quickAnswers = [
  { icon: ShoppingCart, label: 'Créer une boutique', answer: 'Allez sur /dashboard/products' },
  { icon: Bot, label: 'Configurer les agents', answer: 'Allez sur /dashboard/seller-stack' },
  { icon: Shield, label: 'Vérifier la sécurité', answer: 'Allez sur /dashboard/health' },
  { icon: FileText, label: 'Voir les analyses', answer: 'Allez sur /dashboard/analytics' },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.filter(faq => 
    faq.category === activeCategory &&
    (searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">F.A.Q</h1>
            <p className="text-slate-400">Questions Fréquemment Posées</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {faqCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeCategory === category.id
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.label}
          </button>
        ))}
      </div>

      {/* Quick Answers */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Réponses Rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickAnswers.map((item, i) => (
            <Link
              key={item.label}
              href={item.answer}
              className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors"
            >
              <item.icon className="w-5 h-5 text-blue-400 mb-2" />
              <p className="text-white font-medium text-sm">{item.label}</p>
              <p className="text-slate-400 text-xs">{item.answer}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-3 mb-8">
        <AnimatePresence>
          {filteredFaqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-slate-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Still Need Help */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-400" />
          Vous ne trouvez pas la réponse?
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/contact" className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
            <Mail className="w-4 h-4" />
            Nous contacter
          </Link>
          <a href="mailto:support@eseller.com" className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
            <Mail className="w-4 h-4" />
            support@eseller.com
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour Dashboard
        </Link>
        
        <div className="flex items-center gap-2">
          <Link href="/dashboard/a-propos" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            À Propos
          </Link>
          <Link href="/dashboard/contact" className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-colors">
            Contact
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
