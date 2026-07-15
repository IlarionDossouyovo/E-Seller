'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  HeadphonesIcon,
  Bot,
  Globe,
  CheckCircle,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Instagram
} from 'lucide-react'
import Link from 'next/link'

const contactMethods = [
  { 
    icon: Mail, 
    title: 'Email', 
    description: 'Contactez-nous par email',
    value: 'support@eseller.com',
    color: 'text-blue-400 bg-blue-500/20'
  },
  { 
    icon: Phone, 
    title: 'Téléphone', 
    description: 'Lun-Ven 9h-18h',
    value: '+33 1 23 45 67 89',
    color: 'text-green-400 bg-green-500/20'
  },
  { 
    icon: MessageSquare, 
    title: 'Chat', 
    description: 'Discussion en direct',
    value: 'Disponible 24/7',
    color: 'text-purple-400 bg-purple-500/20'
  },
  { 
    icon: MapPin, 
    title: 'Adresse', 
    description: 'Notre siège',
    value: 'Paris, France',
    color: 'text-orange-400 bg-orange-500/20'
  },
]

const socialLinks = [
  { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
  { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
  { icon: Github, label: 'GitHub', color: 'hover:text-white' },
  { icon: Youtube, label: 'YouTube', color: 'hover:text-red-400' },
  { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400' },
]

const departments = [
  { name: 'Support Technique', email: 'support@eseller.com', icon: HeadphonesIcon },
  { name: 'Commercial', email: 'sales@eseller.com', icon: Bot },
  { name: 'Partenariats', email: 'partners@eseller.com', icon: Globe },
  { name: 'Presse', email: 'press@eseller.com', icon: Mail },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simuler l'envoi
    setTimeout(() => {
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Contactez-Nous</h1>
            <p className="text-slate-400">Nous sommes là pour vous aider</p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {contactMethods.map((method, i) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800/50 rounded-xl border border-slate-700 p-5"
          >
            <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center mb-4`}>
              <method.icon className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-1">{method.title}</h3>
            <p className="text-slate-400 text-sm mb-2">{method.description}</p>
            <p className="text-blue-400 font-medium">{method.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Contact Form */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-400" />
            Envoyer un Message
          </h2>
          
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Message Envoyé!</h3>
              <p className="text-slate-400 mb-4">Nous vous répondrons sous 24-48h</p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Nom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Sujet</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Sélectionner un sujet</option>
                  <option value="support">Support Technique</option>
                  <option value="sales">Question Commerciale</option>
                  <option value="partnership">Partenariat</option>
                  <option value="feedback">Commentaires</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Décrivez votre demande..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Envoyer le Message
              </button>
            </form>
          )}
        </div>

        {/* Departments & Social */}
        <div className="space-y-6">
          {/* Departments */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <HeadphonesIcon className="w-5 h-5 text-purple-400" />
              Départements
            </h2>
            <div className="space-y-3">
              {departments.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <dept.icon className="w-5 h-5 text-blue-400" />
                    <span className="text-white">{dept.name}</span>
                  </div>
                  <a href={`mailto:${dept.email}`} className="text-blue-400 hover:underline text-sm">
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              Réseaux Sociaux
            </h2>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={`w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 transition-colors ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-green-400" />
              <h3 className="text-white font-semibold">Temps de Réponse</h3>
            </div>
            <ul className="space-y-2 text-slate-400">
              <li className="flex justify-between">
                <span>Chat en direct</span>
                <span className="text-green-400">Immédiat</span>
              </li>
              <li className="flex justify-between">
                <span>Email</span>
                <span className="text-yellow-400">24-48h</span>
              </li>
              <li className="flex justify-between">
                <span>Appel téléphonique</span>
                <span className="text-blue-400">Lun-Ven 9h-18h</span>
              </li>
            </ul>
          </div>
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
          <Link href="/dashboard/a-propos" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            À Propos
          </Link>
        </div>
      </div>
    </div>
  )
}
