'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CreditCard, Lock, Check, ArrowLeft, Loader2, ShoppingBag } from 'lucide-react'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', country: '', postalCode: '',
    cardNumber: '', cardExpiry: '', cardCvc: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      // Call Stripe checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            { name: 'Ecouteurs Sans Fil Pro', price: 79.99, quantity: 1 }
          ],
          customerEmail: formData.email,
        }),
      })
      
      const data = await response.json()
      
      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        // Demo mode - continue to success
        setStep(3)
      }
    } catch (error) {
      // Demo mode - continue to success
      setStep(3)
    }
    
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <style jsx global>{`
        select option {
          background-color: #1e293b !important;
          color: white !important;
          padding: 12px !important;
        }
        select optgroup {
          background-color: #0f172a !important;
          color: #60a5fa !important;
          font-weight: bold !important;
        }
      `}</style>
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/store/cart" className="flex items-center gap-2 text-white hover:text-blue-400">
            <ArrowLeft className="w-5 h-5" /> Retour au panier
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Lock className="w-4 h-4" /> Paiement securise
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {['Informations', 'Paiement', 'Confirmation'].map((s, i) => (
            <div key={i} className={`flex items-center gap-2 ${step > i ? 'text-green-400' : step === i + 1 ? 'text-blue-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > i + 1 ? 'bg-green-500' : step === i + 1 ? 'bg-blue-500' : 'bg-white/10'}`}>
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className="hidden md:inline">{s}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Informations de contact</h2>
              <input type="email" placeholder="E-mail" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              
              <h2 className="text-xl font-semibold text-white pt-4">Adresse de livraison</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Prenom" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                <input type="text" placeholder="Nom" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              </div>
              <input type="text" placeholder="Adresse" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Ville" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                <input type="text" placeholder="Code postal" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} />
              </div>
              <select required className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}>
                <option value="">Selectionner un pays</option>
                <optgroup label="Europe">
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="CH">Suisse</option>
                  <option value="DE">Allemagne</option>
                  <option value="ES">Espagne</option>
                  <option value="IT">Italie</option>
                  <option value="PT">Portugal</option>
                  <option value="NL">Pays-Bas</option>
                  <option value="AT">Autriche</option>
                  <option value="PL">Pologne</option>
                  <option value="SE">Suede</option>
                  <option value="NO">Norvege</option>
                  <option value="DK">Danemark</option>
                  <option value="FI">Finlande</option>
                  <option value="IE">Irlande</option>
                  <option value="GR">Grece</option>
                  <option value="CZ">Republique tcheque</option>
                  <option value="RO">Roumanie</option>
                  <option value="HU">Hongrie</option>
                  <option value="GB">Royaume-Uni</option>
                </optgroup>
                <optgroup label="Ameriques">
                  <option value="US">Etats-Unis</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexique</option>
                  <option value="BR">Bresil</option>
                  <option value="AR">Argentine</option>
                  <option value="CL">Chili</option>
                  <option value="CO">Colombie</option>
                  <option value="PE">Perou</option>
                </optgroup>
                <optgroup label="Afrique">
                  <option value="BJ">Benin</option>
                  <option value="SN">Senegal</option>
                  <option value="CI">Cote d'Ivoire</option>
                  <option value="CM">Cameroun</option>
                  <option value="MA">Maroc</option>
                  <option value="TN">Tunisie</option>
                  <option value="ZA">Afrique du Sud</option>
                  <option value="NG">Nigeria</option>
                  <option value="GH">Ghana</option>
                  <option value="KE">Kenya</option>
                  <option value="EG">Egypte</option>
                </optgroup>
                <optgroup label="Asie">
                  <option value="JP">Japon</option>
                  <option value="CN">Chine</option>
                  <option value="KR">Coree du Sud</option>
                  <option value="IN">Inde</option>
                  <option value="TH">Thailande</option>
                  <option value="VN">Vietnam</option>
                  <option value="SG">Singapour</option>
                  <option value="MY">Malaisie</option>
                  <option value="PH">Philippines</option>
                  <option value="ID">Indonesie</option>
                  <option value="AE">Emirats arabes unis</option>
                  <option value="SA">Arabie Saoudite</option>
                  <option value="IL">Israel</option>
                  <option value="TR">Turquie</option>
                  <option value="RU">Russie</option>
                </optgroup>
                <optgroup label="Oceanie">
                  <option value="AU">Australie</option>
                  <option value="NZ">Nouvelle-Zelande</option>
                </optgroup>
              </select>
              <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold">
                Passer au paiement
              </button>
            </div>

            <div className="glass-card p-6 h-fit">
              <h3 className="font-semibold text-white mb-4">Resume de la commande</h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3"><span className="text-4xl">🎧</span><div><p className="text-white">Ecouteurs Sans Fil Pro</p><p className="text-gray-400">79.99€</p></div></div>
                <div className="flex gap-3"><span className="text-4xl">⌚</span><div><p className="text-white">Montre Connectee Serie X</p><p className="text-gray-400">299.99€</p></div></div>
                <div className="flex justify-between pt-4 border-t border-white/10"><span className="text-gray-400">Total</span><span className="text-white text-xl font-bold">379.98€</span></div>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Paiement</h2>
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Carte bancaire</span>
                </div>
                <input type="text" placeholder="Numero de carte" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-3" value={formData.cardNumber} onChange={e => setFormData({...formData, cardNumber: e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/AA" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.cardExpiry} onChange={e => setFormData({...formData, cardExpiry: e.target.value})} />
                  <input type="text" placeholder="CVC" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.cardCvc} onChange={e => setFormData({...formData, cardCvc: e.target.value})} />
                </div>
              </div>
              <button onClick={() => setStep(3)} className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold">
                Payer 379.98€
              </button>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white mb-4">Livrer a</h3>
              <p className="text-gray-300">{formData.firstName} {formData.lastName}</p>
              <p className="text-gray-400">{formData.address}</p>
              <p className="text-gray-400">{formData.city}, {formData.postalCode}</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Commande confirmee!</h2>
            <p className="text-gray-400 mb-8">Merci pour votre achat. Un email de confirmation a ete envoye.</p>
            <Link href="/store" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold inline-block">
              Continuer vos achats
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  )
}