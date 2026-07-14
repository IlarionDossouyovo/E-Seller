'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Chrome,
  Facebook,
  AlertCircle
} from 'lucide-react'

// Credentials de demo pre-definies
const DEMO_CREDENTIALS = {
  email: 'admin@graphisme.electron',
  password: 'admin123',
  name: 'Administrateur'
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@graphisme.electron')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  // Verifier si deja connecte
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('eseller_logged_in')
    if (isLoggedIn === 'true') {
      router.push('/dashboard')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simuler le chargement
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Verifier les identifiants
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      // Connexion reussie
      if (rememberMe) {
        localStorage.setItem('eseller_logged_in', 'true')
        localStorage.setItem('eseller_user', DEMO_CREDENTIALS.name)
      }
      sessionStorage.setItem('eseller_logged_in', 'true')
      sessionStorage.setItem('eseller_user', DEMO_CREDENTIALS.name)
      
      router.push('/dashboard')
    } else if (!email || !password) {
      setError('Veuillez remplir tous les champs')
    } else {
      setError('Email ou mot de passe incorrect')
    }
    
    setIsLoading(false)
  }

  // Connexion Google (simulation)
  const handleGoogleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (rememberMe) {
        localStorage.setItem('eseller_logged_in', 'true')
        localStorage.setItem('eseller_user', 'Google User')
      }
      sessionStorage.setItem('eseller_logged_in', 'true')
      sessionStorage.setItem('eseller_user', 'Google User')
      router.push('/dashboard')
    }, 1500)
  }

  // Connexion Facebook (simulation)
  const handleFacebookLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (rememberMe) {
        localStorage.setItem('eseller_logged_in', 'true')
        localStorage.setItem('eseller_user', 'Facebook User')
      }
      sessionStorage.setItem('eseller_logged_in', 'true')
      sessionStorage.setItem('eseller_user', 'Facebook User')
      router.push('/dashboard')
    }, 1500)
  }

  // Mot de passe oublie
  const handleForgotPassword = () => {
    alert('Fonctionnalité de récupération de mot de passe:\n\nUn email de réinitialisation sera envoyé à votre adresse.')
  }

  return (
    <div className="min-h-screen bg-electron-black flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
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
            Bon retour 👋
          </h1>
          <p className="text-gray-400 mb-8">
            Connectez-vous pour accéder à votre tableau de bord
          </p>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/5 border-white/10 accent-electron-blue" 
                />
                <span className="text-gray-400">Souviens-toi de moi</span>
              </label>
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-electron-blue hover:underline bg-transparent border-none cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
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
              <span className="px-4 bg-electron-black text-gray-500">Ou continuez avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Chrome className="w-5 h-5" />
              Google
            </button>
            <button 
              onClick={handleFacebookLogin}
              disabled={isLoading}
              className="py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </button>
          </div>

          <p className="mt-8 text-center text-gray-400">
            Vous n&apos;avez pas de compte ?{' '}
            <Link href="/signup" className="text-electron-blue hover:underline font-medium">
              Inscrivez-vous gratuitement
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-electron-blue/30 via-electron-purple/20 to-electron-black" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,102,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,102,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="text-center"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-electron-blue to-electron-purple mx-auto mb-6 flex items-center justify-center">
              <Zap className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-[var(--font-sora)]">E-Seller</h2>
            <p className="text-gray-400 mt-2">Plateforme E-Commerce IA</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}