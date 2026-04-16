'use client'

import { useState } from 'react'
import { Globe, Check } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

export default function LanguageSwitcher({ currentLang = 'en' }: { currentLang?: string }) {
  const [open, setOpen] = useState(false)
  const current = languages.find(l => l.code === currentLang) || languages[0]

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10">
        <Globe className="w-4 h-4" />
        <span>{current.flag} {current.name}</span>
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-slate-800 border border-white/10 rounded-xl overflow-hidden z-50">
          {languages.map(lang => (
            <button key={lang.code} onClick={() => setOpen(false)} className="w-full px-4 py-2 flex items-center justify-between hover:bg-white/5">
              <span>{lang.flag} {lang.name}</span>
              {lang.code === currentLang && <Check className="w-4 h-4 text-blue-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}