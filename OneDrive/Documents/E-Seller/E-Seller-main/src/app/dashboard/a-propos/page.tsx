'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Info, 
  Users, 
  Target, 
  Rocket,
  Heart,
  Star,
  Award,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Zap,
  Bot,
  Brain,
  Cpu,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Handshake,
  Lightbulb,
  TrendingUp,
  Shield,
  HeadphonesIcon,
  Wrench,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

const team = [
  { name: 'IA Product Director', role: 'Recherche produits', icon: Search, color: 'text-blue-400' },
  { name: 'IA Brand Director', role: 'Création marque', icon: Palette, color: 'text-purple-400' },
  { name: 'IA Ads Director', role: 'Publicités', icon: Megaphone, color: 'text-green-400' },
  { name: 'IA Analytics Director', role: 'Analytique', icon: BarChart3, color: 'text-cyan-400' },
  { name: 'IA Assistant Director', role: 'Support 24/7', icon: HeadphonesIcon, color: 'text-orange-400' },
  { name: 'IA Content Director', role: 'Contenu', icon: FileText, color: 'text-yellow-400' },
  { name: 'IA SEO Director', role: 'Référencement', icon: Search, color: 'text-emerald-400' },
  { name: 'IA Health Director', role: 'Surveillance', icon: Heart, color: 'text-rose-400' },
  { name: 'IA Maintenance Director', role: 'Maintenance', icon: Wrench, color: 'text-slate-400' },
]

import { Search, Palette, Megaphone, FileText } from 'lucide-react'

const stats = [
  { label: 'Agents IA', value: '9', icon: Bot, color: 'text-blue-400' },
  { label: 'Fonctions', value: '54+', icon: Zap, color: 'text-yellow-400' },
  { label: 'Services', value: '5', icon: Cpu, color: 'text-green-400' },
  { label: 'Uptime', value: '99.9%', icon: Clock, color: 'text-purple-400' },
]

const features = [
  { title: 'Automatisation Intelligente', description: '9 agents IA qui работают ensemble pour optimiser votre e-commerce', icon: Bot },
  { title: 'Analyse en Temps Réel', description: 'Surveillance continue avec alertes intelligentes', icon: BarChart3 },
  { title: 'Support 24/7', description: 'Assistant IA disponible à tout moment pour vos clients', icon: HeadphonesIcon },
  { title: 'Sécurité Avancée', description: 'Audit automatique et maintenance proactive', icon: Shield },
]

const timeline = [
  { year: '2024', title: 'Lancement Alpha', description: 'Première version avec 3 agents IA' },
  { year: '2025', title: 'Expansion', description: 'Ajout de 6 agents supplémentaires' },
  { year: '2026', title: 'Version Stable', description: 'Plateforme complète avec 9 agents' },
]

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Info className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">À Propos</h1>
            <p className="text-slate-400">Découvrez E-Seller - Votre assistant e-commerce intelligent</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800/50 rounded-xl p-5 border border-slate-700"
          >
            <div className={`w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Notre Mission</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">
            E-Seller est une plateforme e-commerce révolutionnaire alimentée par 9 agents IA spécialisés. 
            Notre objectif est de democratiser l'accès aux outils professionnels de vente en ligne pour 
            tous les entrepreneurs, du startup au grand compte.
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-8 h-8 text-green-400" />
            <h2 className="text-xl font-bold text-white">Notre Vision</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Devenir la plateforme de référence pour le commerce électronique alimenté par l'intelligence 
            artificielle. Nous voulons permettre à chaque entrepreneur de bénéficier d'une équipe virtuelle 
            disponible 24/7 pour optimiser ses performances.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />
          Fonctionnalités Clés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-5"
            >
              <feature.icon className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team - Agents */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-400" />
          Notre Équipe IA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center`}>
                <member.icon className={`w-6 h-6 ${member.color}`} />
              </div>
              <div>
                <h3 className="text-white font-medium">{member.name}</h3>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-cyan-400" />
          Notre Parcours
        </h2>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex-1 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-400 font-bold">{item.year}</span>
                </div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-400" />
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Lightbulb, title: 'Innovation', desc: 'Toujours à la pointe de la technologie' },
            { icon: Handshake, title: 'Confiance', desc: 'Transparence et fiabilité' },
            { icon: TrendingUp, title: 'Excellence', desc: 'Performance et qualité' },
          ].map((value, i) => (
            <div key={value.title} className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 text-center">
              <value.icon className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">{value.title}</h3>
              <p className="text-slate-400 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour Dashboard
        </Link>
        
        <div className="flex items-center gap-2">
          <Link href="/dashboard/faq" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            FAQ
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
