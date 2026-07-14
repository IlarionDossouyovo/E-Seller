'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Check, 
  Search,
  Plus,
  FileEdit,
  Trash2,
  Clock,
  AlertCircle
} from 'lucide-react'

type Language = {
  code: string
  name: string
  nativeName: string
  flag: string
  status: 'active' | 'draft'
  translationProgress: number
}

const mockLanguages: Language[] = [
  { code: 'en', name: 'Anglais', nativeName: 'English', flag: '🇺🇸', status: 'active', translationProgress: 100 },
  { code: 'fr', name: 'Francais', nativeName: 'Francais', flag: '🇫🇷', status: 'active', translationProgress: 100 },
  { code: 'es', name: 'Espagnol', nativeName: 'Espanol', flag: '🇪🇸', status: 'active', translationProgress: 85 },
  { code: 'de', name: 'Allemand', nativeName: 'Deutsch', flag: '🇩🇪', status: 'active', translationProgress: 72 },
  { code: 'it', name: 'Italien', nativeName: 'Italiano', flag: '🇮🇹', status: 'draft', translationProgress: 45 },
  { code: 'pt', name: 'Portugais', nativeName: 'Portugues', flag: '🇵🇹', status: 'draft', translationProgress: 30 },
  { code: 'zh', name: 'Chinois', nativeName: '中文', flag: '🇨🇳', status: 'draft', translationProgress: 20 },
  { code: 'ja', name: 'Japonais', nativeName: '日本語', flag: '🇯🇵', status: 'draft', translationProgress: 15 },
]

const stats = [
  { label: 'Langues Actives', value: '4', icon: Globe },
  { label: 'Total Langues', value: '8', icon: Globe },
  { label: 'Trad. Moyenne', value: '59%', icon: Check },
  { label: 'En Attente', value: '125', icon: Clock },
]

export default function LanguagePage() {
  const [languages] = useState<Language[]>(mockLanguages)
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState<string | null>(null)

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-transparent border border-teal-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Support Multi-Langue</h1>
              <p className="text-gray-300">Gerez les traductions et parametres de langue</p>
            </div>
          </div>
          <button onClick={() => { setNotification('Ajout langue...'); setTimeout(() => { setNotification('Formulaire ouvert!'); setTimeout(() => setNotification(null), 2000) }, 1000) }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Ajouter Langue
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <stat.icon className="w-5 h-5 text-cyan-400 mb-2" />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Language Selection */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Langues Disponibles</h3>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher langues..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setNotification('Recherche: ' + e.target.value); setTimeout(() => setNotification(null), 1000) }}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 flex-1 outline-none focus:border-electron-blue"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredLanguages.map((lang, i) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-electron-blue/30 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{lang.flag}</span>
                {lang.status === 'active' ? (
                  <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30">Actif</span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs border border-yellow-500/30">Brouillon</span>
                )}
              </div>
              <h4 className="font-medium text-white">{lang.name}</h4>
              <p className="text-sm text-gray-400 mb-3">{lang.nativeName}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Traduction</span>
                  <span className={lang.translationProgress === 100 ? 'text-green-400' : 'text-yellow-400'}>
                    {lang.translationProgress}%
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${lang.translationProgress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-500 to-orange-500'}`}
                    style={{ width: `${lang.translationProgress}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button onClick={() => { setNotification('Modification: ' + lang.name); setTimeout(() => setNotification(null), 2000) }} className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm border border-white/10 font-medium">
                  Modifier
                </button>
                <button onClick={() => { setNotification('Activation: ' + lang.name); setTimeout(() => setNotification(null), 2000) }} className="p-1.5 rounded-lg hover:bg-white/10">
                  <Globe className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Translation Status */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Statut des Traductions par Section</h3>
        <div className="space-y-3">
          {[
            { section: 'General', en: 100, fr: 100, es: 85, de: 70 },
            { section: 'Produits', en: 100, fr: 95, es: 80, de: 65 },
            { section: 'Paiement', en: 100, fr: 100, es: 90, de: 75 },
            { section: 'Dashboard', en: 100, fr: 90, es: 70, de: 60 },
            { section: 'Emails', en: 100, fr: 85, es: 60, de: 50 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-white">{item.section}</span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">EN: <span className="text-green-400">{item.en}%</span></span>
                  <span className="text-gray-400">FR: <span className={item.fr === 100 ? 'text-green-400' : 'text-yellow-400'}>{item.fr}%</span></span>
                  <span className="text-gray-400">ES: <span className={item.es >= 80 ? 'text-green-400' : 'text-yellow-400'}>{item.es}%</span></span>
                  <span className="text-gray-400">DE: <span className={item.de >= 70 ? 'text-green-400' : 'text-yellow-400'}>{item.de}%</span></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Missing Translations Alert */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Traductions Manquantes</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { lang: 'Espagnol', missing: 145, progress: '85%' },
            { lang: 'Allemand', missing: 280, progress: '72%' },
            { lang: 'Italien', missing: 550, progress: '45%' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{item.lang}</span>
                <span className="text-yellow-400">{item.progress}</span>
              </div>
              <p className="text-sm text-gray-400">{item.missing} chaines manquantes</p>
              <button onClick={() => { setNotification('Traduction: ' + item.lang); setTimeout(() => setNotification(null), 2000) }} className="mt-3 w-full py-2 rounded-lg bg-electron-blue hover:opacity-90 text-sm font-medium">
                Traduire Maintenant
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}
