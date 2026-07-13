'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translation as en } from './locales/en'
import { translation as fr } from './locales/fr'
import { translation as es } from './locales/es'
import { translation as de } from './locales/de'
import { translation as zh } from './locales/zh'
import { translation as ja } from './locales/ja'
import { translation as pt } from './locales/pt'
import { translation as ar } from './locales/ar'
import type { Translation } from './locales/en'

type Locale = 'en' | 'fr' | 'es' | 'de' | 'zh' | 'ja' | 'pt' | 'ar'

const translations: Record<Locale, Translation> = {
  en,
  fr,
  es,
  de,
  zh,
  ja,
  pt,
  ar,
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translation
  availableLocales: Locale[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const STORAGE_KEY = 'e-seller-locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load from localStorage or browser preference
    const stored = localStorage.getItem(STORAGE_KEY) as Locale
    if (stored && translations[stored]) {
      setLocaleState(stored)
    } else {
      // Try browser language
      const browserLang = navigator.language.split('-')[0] as Locale
      if (translations[browserLang]) {
        setLocaleState(browserLang)
      }
    }
    setIsLoaded(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }

  if (!isLoaded) {
    return <>{children}</>
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations[locale], availableLocales: Object.keys(translations) as Locale[] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  // Return default values if not in provider (during SSG/SSR)
  if (!context) {
    return {
      locale: 'fr',
      setLocale: () => {},
      t: translations.fr,
      availableLocales: ['en', 'fr', 'es', 'de', 'zh', 'ja', 'pt', 'ar']
    }
  }
  return context
}

export function useTranslation() {
  const { t, locale, setLocale, availableLocales } = useI18n()
  return { t, locale, setLocale, availableLocales }
}