'use client'

import { useState } from 'react'
import { useI18n } from '../i18n'
import { Globe, ChevronDown } from 'lucide-react'

const languageFlags: Record<string, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  de: '🇩🇪',
  zh: '🇨🇳',
  ja: '🇯🇵',
  pt: '🇧🇷',
  ar: '🇸🇦',
}

export function LanguageSwitcher() {
  const { locale, setLocale, availableLocales } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:bg-slate-700 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{languageFlags[locale]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
          {availableLocales.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setLocale(loc as any)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-left text-white hover:bg-slate-700 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg ${
                locale === loc ? 'bg-slate-700' : ''
              }`}
            >
              <span>{languageFlags[loc]}</span>
              <span>{loc.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}