'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, Globe, Bell, Shield, Palette, Database, Server,
  Mail, Zap, Layout, Key, Save, CheckCircle, AlertCircle
} from 'lucide-react'
import { useI18n } from '@/app/i18n'

export default function SettingsAdvancedPage() {
  const { t, locale, setLocale } = useI18n()
  
  const tabs = [
    { id: 'general', label: t.settingsPage?.general || 'General', icon: Settings },
    { id: 'store', label: t.settingsPage?.store || 'Store', icon: Globe },
    { id: 'payments', label: t.settingsPage?.payments || 'Payments', icon: Key },
    { id: 'notifications', label: t.settingsPage?.notifications || 'Notifications', icon: Bell },
    { id: 'security', label: t.settingsPage?.security || 'Security', icon: Shield },
    { id: 'appearance', label: t.settingsPage?.appearance || 'Appearance', icon: Palette },
    { id: 'email', label: t.settingsPage?.email || 'Email', icon: Mail },
    { id: 'api', label: t.settingsPage?.api || 'API', icon: Zap },
  ]

  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)
  
  // Settings state
  const [storeSettings, setStoreSettings] = useState({
    maintenanceMode: false,
    guestCheckout: true,
    currencySelector: true,
  })
  
  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'USD',
    taxRate: 20,
    taxIncluded: true,
  })
  
  const [notificationSettings, setNotificationSettings] = useState({
    newOrder: true,
    lowStock: true,
    customerRegistration: true,
    paymentReceived: true,
  })
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    ipWhitelist: false,
    sessionTimeout: true,
  })
  
  const [selectedTheme, setSelectedTheme] = useState(0)
  
  // Map locale to settings language format
  const localeToLanguage: Record<string, string> = {
    'en': 'English',
    'fr': 'French',
    'es': 'Spanish',
    'de': 'German',
    'zh': 'Chinese',
    'ja': 'Japanese',
    'pt': 'Portuguese',
    'ar': 'Arabic',
  }

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'E-SELLER Store',
    storeEmail: 'contact@e-seller.com',
    timezone: 'UTC',
    language: localeToLanguage[locale] || 'English',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleStore = (key: keyof typeof storeSettings) => {
    setStoreSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const togglePayment = (key: keyof typeof paymentSettings) => {
    if (key !== 'currency' && key !== 'taxRate') {
      setPaymentSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }
  }
  
  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const toggleSecurity = (key: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">{t.settingsPage?.title || 'Settings'}</h1>
            <p className="text-gray-400">{t.settingsPage?.subtitle || 'Configure your platform'}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="glass-card p-2 w-56 shrink-0">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-electron-blue text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t.general?.storeName ? 'Paramètres généraux' : 'General Settings'}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.general?.storeName || 'Store Name'}</label>
                  <input 
                    type="text" 
                    value={generalSettings.storeName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeName: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:bg-white/15 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.general?.storeEmail || 'Store Email'}</label>
                  <input 
                    type="email" 
                    value={generalSettings.storeEmail}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:bg-white/15 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.general?.timezone || 'Timezone'}</label>
                  <div className="relative">
                    <select 
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="UTC" className="bg-gray-800">UTC</option>
                      <option value="Europe/Paris" className="bg-gray-800">Europe/Paris</option>
                      <option value="America/New_York" className="bg-gray-800">America/New_York</option>
                      <option value="Asia/Tokyo" className="bg-gray-800">Asia/Tokyo</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.general?.defaultLanguage || 'Default Language'}</label>
                  <div className="relative">
                    <select 
                      value={generalSettings.language}
                      onChange={(e) => {
                        setGeneralSettings(prev => ({ ...prev, language: e.target.value }))
                        // Map language back to locale and update i18n
                        const languageToLocale: Record<string, string> = {
                          'English': 'en',
                          'French': 'fr',
                          'Spanish': 'es',
                          'German': 'de',
                          'Chinese': 'zh',
                          'Japanese': 'ja',
                          'Portuguese': 'pt',
                          'Arabic': 'ar',
                        }
                        const newLocale = languageToLocale[e.target.value]
                        if (newLocale) setLocale(newLocale as any)
                      }}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="English" className="bg-gray-800">English</option>
                      <option value="French" className="bg-gray-800">Français</option>
                      <option value="Spanish" className="bg-gray-800">Español</option>
                      <option value="German" className="bg-gray-800">Deutsch</option>
                      <option value="Chinese" className="bg-gray-800">中文</option>
                      <option value="Japanese" className="bg-gray-800">日本語</option>
                      <option value="Portuguese" className="bg-gray-800">Português</option>
                      <option value="Arabic" className="bg-gray-800">العربية</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'store' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t.store?.title || 'Configuration de la boutique'}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">{t.store?.maintenanceMode || 'Mode maintenance'}</p><p className="text-sm text-gray-400">{t.store?.maintenanceModeDesc || 'Desactiver temporairement la boutique'}</p></div>
                  <button onClick={() => toggleStore('maintenanceMode')} className={`w-14 h-7 rounded-full transition-colors relative ${storeSettings.maintenanceMode ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${storeSettings.maintenanceMode ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">{t.store?.guestCheckout || 'Achats invite'}</p><p className="text-sm text-gray-400">{t.store?.guestCheckoutDesc || 'Autoriser les achats sans compte'}</p></div>
                  <button onClick={() => toggleStore('guestCheckout')} className={`w-14 h-7 rounded-full transition-colors relative ${storeSettings.guestCheckout ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${storeSettings.guestCheckout ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">{t.store?.currencySelector || 'Selecteur de devise'}</p><p className="text-sm text-gray-400">{t.store?.currencySelectorDesc || 'Afficher le changeur de devise'}</p></div>
                  <button onClick={() => toggleStore('currencySelector')} className={`w-14 h-7 rounded-full transition-colors relative ${storeSettings.currencySelector ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${storeSettings.currencySelector ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t.payments?.title || 'Parametres de paiement'}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.payments?.currency || 'Devise'}</label>
                  <div className="relative">
                    <select 
                      value={paymentSettings.currency}
                      onChange={(e) => setPaymentSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="USD" className="bg-gray-800">USD - Dollar americain</option>
                      <option value="EUR" className="bg-gray-800">EUR - Euro</option>
                      <option value="GBP" className="bg-gray-800">GBP - Livre sterling</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.payments?.taxRate || 'Taux de taxe (%)'}</label>
                  <input 
                    type="number" 
                    value={paymentSettings.taxRate}
                    onChange={(e) => setPaymentSettings(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:bg-white/15 transition-colors cursor-text"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">{t.payments?.taxIncluded || 'Taxe incluse'}</p><p className="text-sm text-gray-400">{t.payments?.taxIncludedDesc || 'Les prix incluent la taxe'}</p></div>
                  <button onClick={() => togglePayment('taxIncluded')} className={`w-14 h-7 rounded-full transition-colors relative ${paymentSettings.taxIncluded ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${paymentSettings.taxIncluded ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t.notifications?.title || 'Notifications'}</h3>
              <div className="space-y-3">
                {[
                  { key: 'newOrder', label: t.notifications?.newOrder || 'Nouvelle commande', desc: t.notifications?.newOrderDesc || 'Notifier pour chaque nouvelle commande' },
                  { key: 'lowStock', label: t.notifications?.lowStock || 'Stock faible', desc: t.notifications?.lowStockDesc || 'Alerte quand le stock est faible' },
                  { key: 'customerRegistration', label: t.notifications?.customerRegistration || 'Nouveau client', desc: t.notifications?.customerRegistrationDesc || 'Notifier lors dun nouveau compte' },
                  { key: 'paymentReceived', label: t.notifications?.paymentReceived || 'Paiement recu', desc: t.notifications?.paymentReceivedDesc || 'Notifier lors dun paiement' }
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div><p className="font-medium">{n.label}</p><p className="text-sm text-gray-400">{n.desc}</p></div>
                    <button onClick={() => toggleNotification(n.key as keyof typeof notificationSettings)} className={`w-14 h-7 rounded-full transition-colors relative ${notificationSettings[n.key as keyof typeof notificationSettings] ? 'bg-green-500' : 'bg-gray-500'}`}>
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${notificationSettings[n.key as keyof typeof notificationSettings] ? 'left-8' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t.security?.title || 'Securite'}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">{t.security?.twoFactorAuth || 'Authentification a deux facteurs'}</p><p className="text-sm text-gray-400">{t.security?.twoFactorAuthDesc || 'Exiger 2FA pour tous les comptes'}</p></div>
                  <button onClick={() => toggleSecurity('twoFactorAuth')} className={`w-14 h-7 rounded-full transition-colors relative ${securitySettings.twoFactorAuth ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${securitySettings.twoFactorAuth ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">{t.security?.ipWhitelist || 'Liste blanche IP'}</p><p className="text-sm text-gray-400">{t.security?.ipWhitelistDesc || 'Restreindre acces par IP'}</p></div>
                  <button onClick={() => toggleSecurity('ipWhitelist')} className={`w-14 h-7 rounded-full transition-colors relative ${securitySettings.ipWhitelist ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${securitySettings.ipWhitelist ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div><p className="font-medium">{t.security?.sessionTimeout || 'Delai de session'}</p><p className="text-sm text-gray-400">{t.security?.sessionTimeoutDesc || 'Deconnexion automatique apres inactivite'}</p></div>
                  <button onClick={() => toggleSecurity('sessionTimeout')} className={`w-14 h-7 rounded-full transition-colors relative ${securitySettings.sessionTimeout ? 'bg-green-500' : 'bg-gray-500'}`}>
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${securitySettings.sessionTimeout ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t.appearance?.title || 'Apparence'}</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  t.appearance?.darkMode || 'Sombre',
                  t.appearance?.lightMode || 'Clair',
                  'Personnalise'
                ].map((theme, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedTheme(i)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${selectedTheme === i ? 'border-electron-blue bg-electron-blue/10' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <p className="text-center font-medium">{theme}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t.email?.title || 'Configuration email'}</h3>
              <div className="space-y-4">
                <div><label className="block text-sm text-gray-400 mb-2">{t.email?.smtpHost || 'Serveur SMTP'}</label><input type="text" placeholder="smtp.example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">{t.email?.smtpPort || 'Port SMTP'}</label><input type="text" defaultValue="587" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">{t.email?.smtpUser || 'Utilisateur SMTP'}</label><input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">{t.email?.smtpPassword || 'Mot de passe SMTP'}</label><input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" /></div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t.api?.title || 'Cles API'}</h3>
              <div className="space-y-3">
                {[
                  { name: t.api?.productionKey || 'Production', key: 'sk_live_xxxxx' },
                  { name: t.api?.developmentKey || 'Developpement', key: 'sk_test_xxxxx' }
                ].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div><p className="font-medium">{api.name}</p><p className="text-sm text-gray-400 font-mono">{api.key}</p></div>
                    <button className="px-3 py-1 rounded-lg bg-electron-blue text-sm">{t.api?.view || 'Voir'}</button>
                  </div>
                ))}
                <button className="w-full p-4 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40">+ {t.api?.generateNewKey || 'Generer une nouvelle cle'}</button>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button onClick={handleSave} className="px-6 py-3 bg-gradient-to-r from-electron-blue to-electron-purple rounded-xl flex items-center gap-2">
              {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              {saved ? (t.settingsPage?.saved || 'Saved!') : (t.settingsPage?.saveChanges || 'Save Changes')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}