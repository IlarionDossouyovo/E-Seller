'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Sparkles, 
  Search, 
  Package, 
  Palette, 
  Megaphone, 
  Target, 
  BarChart3, 
  Bot, 
  ArrowRight, 
  Play, 
  CheckCircle2,
  Zap,
  Brain,
  Globe,
  Rocket,
  ChevronDown
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const float = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Feature Card Component
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  delay: number 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-card p-6 group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-electron-blue/5 to-electron-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2 font-[var(--font-sora)]">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

// Pricing Card Component
function PricingCard({ 
  name, 
  price, 
  features, 
  popular = false,
  delay 
}: { 
  name: string, 
  price: number, 
  features: string[], 
  popular?: boolean,
  delay: number 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={`relative glass-card p-8 ${popular ? 'border-electron-blue glow-blue' : ''}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-electron-blue text-white text-xs font-bold px-4 py-1 rounded-full">
            PLUS POPULAIRE
          </span>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 font-[var(--font-sora)]">{name}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-bold gradient-text">${price}</span>
        <span className="text-gray-400">/mois</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-electron-blue flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
        popular 
          ? 'bg-gradient-to-r from-electron-blue to-electron-purple text-white hover:opacity-90 glow-blue' 
          : 'border border-gray-600 hover:border-electron-blue hover:text-electron-blue'
      }`}>
        Commencer maintenant
      </button>
    </motion.div>
  )
}

// Navigation Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card !bg-electron-black/90 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold font-[var(--font-sora)]">E-Seller</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Fonctionnalités', 'Tarifs', 'À propos', 'Contact'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: '#0066FF' }}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-electron-blue to-electron-purple px-6 py-2 rounded-xl font-semibold text-sm"
        >
          Essai gratuit
        </motion.button>
      </div>
    </motion.nav>
  )
}

// Hero Section
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-electron-gradient">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(0,102,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,102,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Glowing Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-electron-blue/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electron-purple/20 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div 
        style={{ y }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <Sparkles className="w-4 h-4 text-electron-blue" />
          <span className="text-sm text-gray-300">L'IA qui révolutionne l'e-commerce</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 font-[var(--font-sora)] leading-tight"
        >
          De l'idée au scaling
          <br />
          <span className="gradient-text">en 1 seule plateforme</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Remplacez 10 outils en 1 seule. Trouvez des produits gagnants, créez votre marque automatiquement, lancez des campagnes publicitaires performantes.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-electron-blue to-electron-purple px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 glow-blue"
          >
            Commencer gratuitement
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Voir la démo
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center justify-center gap-8 text-gray-500"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electron-blue" />
            <span className="text-sm">Gratuit pendant 14 jours</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electron-blue" />
            <span className="text-sm">Sans carte bancaire</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electron-blue" />
            <span className="text-sm">Annulation facile</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Features Section
function Features() {
  const features = [
    {
      icon: Search,
      title: "AI Product Intelligence",
      description: "Recherche produit via IA, analyse des tendances TikTok/Meta/Google, score produit et détection de produits viraux."
    },
    {
      icon: Package,
      title: "AI Supplier Engine",
      description: "Intégration fournisseurs, matching intelligent, calcul des marges et optimisation logistique."
    },
    {
      icon: Palette,
      title: "AI Branding Generator",
      description: "Génération nom de marque, logo, identité visuelle, packaging et storytelling automatique."
    },
    {
      icon: Megaphone,
      title: "AI Ads Generator",
      description: "Création vidéos TikTok Ads, scripts UGC, analyse des ads concurrents et recommandations budget."
    },
    {
      icon: Target,
      title: "AI Positioning Engine",
      description: "Définition client cible, angle marketing automatique, analyse concurrence et offres irrésistibles."
    },
    {
      icon: BarChart3,
      title: "AI Market Analytics",
      description: "Dashboard temps réel avec analyse ROI, CPA, ROAS et prédiction des tendances."
    },
    {
      icon: Bot,
      title: "AI Business Assistant",
      description: "Chat intelligent type GPT capable de donner des stratégies et optimiser vos campagnes."
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Analyse comportement utilisateur et recommandations personnalisées basées sur vos données."
    }
  ]

  return (
    <section id="fonctionnalités" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electron-blue text-sm font-semibold uppercase tracking-wider">Fonctionnalités</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-[var(--font-sora)]">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Une plateforme complète qui remplace 10 outils différents
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} delay={i * 0.1} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Stats Section
function Stats() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-electron-blue/10 to-electron-purple/10" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {[
            { number: '10K+', label: 'Utilisateurs actifs' },
            { number: '50M+', label: 'Produits analysés' },
            { number: '95%', label: 'Satisfaction client' },
            { number: '24/7', label: 'Support IA' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 font-[var(--font-sora)]">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Pricing Section
function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 29,
      features: [
        'Recherche produit IA',
        'Dashboard basique',
        '5 analyses par jour',
        'Support email'
      ]
    },
    {
      name: 'Pro',
      price: 99,
      popular: true,
      features: [
        'Tout dans Starter',
        'Branding IA complet',
        'Générateur Ads',
        'Analytics avancé',
        'API access',
        'Support prioritaire'
      ]
    },
    {
      name: 'Elite',
      price: 299,
      features: [
        'Tout dans Pro',
        'Assistant IA illimité',
        'Store auto-launch',
        'Funnel automation',
        'Account manager',
        'Formation incluse'
      ]
    }
  ]

  return (
    <section id="tarifs" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electron-blue text-sm font-semibold uppercase tracking-wider">Tarifs</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-[var(--font-sora)]">
            Investissez dans votre succès
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Des tarifs adaptés à tous les niveaux de développement
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={i} {...plan} delay={i * 0.2} />
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-electron-blue/20 via-electron-purple/10 to-electron-black" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
      >
        <Rocket className="w-16 h-16 mx-auto mb-8 text-electron-blue" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[var(--font-sora)]">
          Prêt à révolutionner votre e-commerce ?
        </h2>
        <p className="text-xl text-gray-400 mb-10">
          Rejoignez des milliers d'entrepreneurs qui font confiance à E-Seller
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-electron-blue to-electron-purple px-10 py-4 rounded-xl font-semibold text-lg glow-blue"
        >
          Essai gratuit de 14 jours
        </motion.button>
        <p className="mt-6 text-gray-500 text-sm">
          Aucune carte bancaire requise • Annulation à tout moment
        </p>
      </motion.div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[var(--font-sora)]">E-Seller</span>
            </div>
            <p className="text-gray-400 text-sm">
              La plateforme SaaS IA qui révolutionne l'e-commerce.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 E-Seller by ELECTRON. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-gray-500" />
            <span className="text-gray-500 text-sm">Français</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="bg-electron-black min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
