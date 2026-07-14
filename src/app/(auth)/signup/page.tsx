'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Zap, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Chrome,
  Facebook,
  CheckCircle
} from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) {
      alert('Veuillez accepter les conditions générales')
      return
    }
    
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    localStorage.setItem('eseller_logged_in', 'true')
    localStorage.setItem('eseller_user', name || 'Nouvel utilisateur')
    router.push('/dashboard')
    setIsLoading(false)
  }

  // Inscription Google
  const handleGoogleSignup = () => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem('eseller_logged_in', 'true')
      localStorage.setItem('eseller_user', 'Utilisateur Google')
      router.push('/dashboard')
    }, 1500)
  }

  // Inscription Facebook
  const handleFacebookSignup = () => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem('eseller_logged_in', 'true')
      localStorage.setItem('eseller_user', 'Utilisateur Facebook')
      router.push('/dashboard')
    }, 1500)
  }

  const benefits = [
    'Essai gratuit de 14 jours',
    'Pas de carte bancaire requise',
    'Annulation à tout moment',
  ]

  return (
    <div className="min-h-screen bg-electron-black flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-electron-purple/30 via-electron-blue/20 to-electron-black" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(123,63,228,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(123,63,228,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="text-center"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-electron-purple to-electron-blue mx-auto mb-6 flex items-center justify-center">
              <Zap className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-[var(--font-sora)]">Commencez Votre Aventure</h2>
            <p className="text-gray-400 mt-2">Rejoignez des milliers d'entrepreneurs</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[var(--font-sora)]">E-Seller</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2 font-[var(--font-sora)]">
            Créez votre compte 🚀
          </h1>
          <p className="text-gray-400 mb-8">
            Commencez votre essai gratuit de 14 jours
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {benefit}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Nom complet</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded bg-white/5 border-white/10" 
              />
              <span className="text-sm text-gray-400">
                J'accepte les{' '}
                <a href="#" className="text-electron-blue hover:underline">Conditions d'utilisation</a>
                {' '}et la{' '}
                <a href="#" className="text-electron-blue hover:underline">Politique de confidentialité</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading || !agreed}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-electron-black text-gray-500">Ou inscrivez-vous avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Chrome className="w-5 h-5" />
              Google
            </button>
            <button 
              onClick={handleFacebookSignup}
              disabled={isLoading}
              className="py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </button>
          </div>

          <p className="mt-8 text-center text-gray-400">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="text-electron-blue hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}