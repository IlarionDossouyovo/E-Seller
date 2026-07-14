'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Shield,
  Lock,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Zap
} from 'lucide-react'

const testCards = [
  { number: '4242 4242 4242 4242', expiry: '12/25', cvc: '123', brand: 'Visa', valid: true },
  { number: '5555 5555 5555 4444', expiry: '12/25', cvc: '123', brand: 'Mastercard', valid: true },
  { number: '4000 0566 5566 5556', expiry: '12/25', cvc: '123', brand: 'Visa (Refuse)', valid: false },
]

export default function StripeIntegrationPage() {
  const [stripeKey, setStripeKey] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState<'test' | 'live' | 'identity'>('test')

  const handleConnect = () => {
    if (stripeKey.includes('sk_test_')) {
      setIsConnected(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Integration Stripe</h1>
            <p className="text-gray-400">Configurez votre passerelle de paiement</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {[
            { key: 'test', label: 'Mode test', icon: Zap },
            { key: 'live', label: 'Mode direct', icon: Globe },
            { key: 'identity', label: 'Verification identite', icon: Building2 },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.key
                  ? 'bg-electron-blue text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Test Mode */}
      {activeTab === 'test' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Configuration du mode test</h2>
            <p className="text-gray-400 mb-6">
              Utilisez le mode test de Stripe pour simuler des paiements sans effectuer de veritables transactions. Aucun argent reel ne sera transfere.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cle secrète Stripe (Test)</label>
                <input
                  type="text"
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  placeholder="sk_test_..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Recuperez vos cles depuis le{' '}
                  <a href="https://dashboard.stripe.com/test/apikeys" target="_blank" className="text-electron-blue hover:underline">
                    tableau de bord Stripe
                  </a>
                </p>
              </div>

              <button
                onClick={handleConnect}
                disabled={!stripeKey}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition-opacity font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" />
                Connecter le mode test
              </button>
            </div>
          </div>

          {/* Test Cards */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Numeros de la carte de test</h2>
            <p className="text-gray-400 mb-6">
              Utilisez ces numeros de carte en mode test pour simuler differents scenarios de paiement.
            </p>

            <div className="space-y-3">
              {testCards.map((card, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-mono">{card.number}</p>
                      <p className="text-sm text-gray-400">
                        {card.brand} • Exp : {card.expiry} • CVC : {card.cvc}
                      </p>
                    </div>
                  </div>
                  {card.valid ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Succes
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Decline
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Securite du mode test</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5">
                <Shield className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-1">Environnement bac a sable</h3>
                <p className="text-sm text-gray-400">Toutes les transactions sont simulees</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <Lock className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-1">Tests securises</h3>
                <p className="text-sm text-gray-400">Aucun argent reel en jeu</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <Zap className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-1">Resultats instantanes</h3>
                <p className="text-sm text-gray-400">Commentaires immediats sur le paiement</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Mode */}
      {activeTab === 'live' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Conditions pour passer en direct</h2>
            
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <div className="flex items-center gap-2 text-yellow-400">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Completez d'abord la verification d'identite</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Vous devez completer la verification d'identite avant d'accepter des paiements reels.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Compte Stripe</p>
                    <p className="text-sm text-gray-400">Creer un compte Stripe</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-electron-blue hover:opacity-90 transition-opacity text-sm">
                  Configurer
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium">Verification identite</p>
                    <p className="text-sm text-gray-400">Verifiez l'identite de votre entreprise</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('identity')}
                  className="px-4 py-2 rounded-lg bg-electron-blue hover:opacity-90 transition-opacity text-sm"
                >
                  Complete
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Cles API en direct</p>
                    <p className="text-sm text-gray-400">Obtenez vos cles de production</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm">
                  Configurer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Identity Verification */}
      {activeTab === 'identity' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Verification identite</h2>
            <p className="text-gray-400 mb-6">
              Pour accepter des paiements reels, Stripe exige la verification d'identite. 
              C'est une exigence legale pour prevenir la fraude et le blanchiment d'argent.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Required Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Informations requises</h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <User className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Informations personnelles</p>
                      <p className="text-xs text-gray-400">Nom complet, date de naissance</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Informations entreprise</p>
                      <p className="text-xs text-gray-400">Nom, type, numero fiscal</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Email et contact</p>
                      <p className="text-xs text-gray-400">Email professionnel, telephone</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Adresse</p>
                      <p className="text-xs text-gray-400">Adresse de l'entreprise</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Site web</p>
                      <p className="text-xs text-gray-400">URL de votre site</p>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5 flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-electron-blue" />
                    <div>
                      <p className="font-medium text-sm">Compte bancaire</p>
                      <p className="text-xs text-gray-400">Pour recevoir les paiements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Needed */}
              <div className="space-y-4">
                <h3 className="font-semibold">Documents requis</h3>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="font-medium text-sm">Piece d'identite</p>
                    <p className="text-xs text-gray-400">Passeport, permis de conduire, carte nationale</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="font-medium text-sm">Justificatif de domicile</p>
                    <p className="text-xs text-gray-400">Facture ou releve bancaire (3 mois)</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="font-medium text-sm">Documents entreprise</p>
                    <p className="text-xs text-gray-400">Certificat d'immatriculation, documents fiscaux</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="font-medium text-sm">Relevé bancaire</p>
                    <p className="text-xs text-gray-400">Releve bancaire recent pour les paiements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Pret a verifier ?</h3>
                  <p className="text-sm text-gray-400">Completez la verification sur le tableau de bord Stripe</p>
                </div>
                <a 
                  href="https://dashboard.stripe.com/identity/verification" 
                  target="_blank"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition-opacity font-semibold flex items-center gap-2"
                >
                  Aller sur Stripe
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}