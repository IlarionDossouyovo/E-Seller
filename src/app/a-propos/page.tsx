'use client'

import Link from 'next/link'
import { Bot, Brain, Zap, TrendingUp, Shield, Users, Star, Rocket, ArrowRight } from 'lucide-react'

export default function AProposPage() {
  const features = [
    { icon: Brain, title: 'AI Product Intelligence', description: 'Models IA puissants pour analyse predictive' },
    { icon: Zap, title: 'Automatisation Complete', description: '10 workflows N8N + Ollama' },
    { icon: TrendingUp, title: 'Analytique Temps Reel', description: 'Tableau de bord ROI, CPA, ROAS' },
    { icon: Shield, title: 'Securite Enterprise', description: 'Protection de niveau bancaire' },
    { icon: Users, title: 'Collaboration Equipe', description: 'Gestion des acces et permissions' },
    { icon: Bot, title: 'Support 24/7', description: 'Assistant IA disponible' }
  ]

  const stats = [
    { value: '10+', label: 'AI Agents' },
    { value: '100+', label: 'Fonctionnalites' },
    { value: '24/7', label: 'Support' },
    { value: '99.9%', label: 'Uptime' }
  ]

  const testimonials = [
    { name: 'Marie Dubois', role: 'Fondateur', content: 'E-Seller a revolu mon business.', rating: 5 },
    { name: 'Jean-Pierre M.', role: 'E-commercant', content: 'Ma productivity a augmente.', rating: 5 },
    { name: 'Sophie Chen', role: 'CEO', content: 'Le generateur de marque IA est incroyable.', rating: 5 }
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to-br, #0f172a, #1e293b, #0f172a)' }}>
      <header style={{ position: 'relative', padding: '20px 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(37, 99, 235, 0.2), rgba(147, 51, 234, 0.2))' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', position: 'relative' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>
              A Propos de <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>E-Seller</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#9ca3af', maxWidth: '768px', margin: '0 auto 32px' }}>
              E-Seller est la plateforme e-commerce IA tout-en-un qui revolutionne la vente en ligne.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <Link href="/demo" style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', color: 'white', padding: '16px 32px', borderRadius: '12px', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Voir la Demo <ArrowRight size={20} />
              </Link>
              <Link href="/contact" style={{ background: '#1e293b', color: 'white', padding: '16px 32px', borderRadius: '12px', fontWeight: '600', textDecoration: 'none', border: '1px solid #334155' }}>
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderTop: '1px solid #334155', borderBottom: '1px solid #334155' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ color: '#9ca3af' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Pourquoi Choisir E-Seller?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(to right, #2563eb, #9333ea)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={24} color="white" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ color: '#9ca3af' }}>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.3)', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>Ce que disent nos utilisateurs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {testimonials.map((t, index) => (
              <div key={index} style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={20} color="#fbbf24" fill="#fbbf24" />)}
                </div>
                <p style={{ color: '#d1d5db', marginBottom: '16px' }}>"{t.content}"</p>
                <div style={{ borderTop: '1px solid #334155', paddingTop: '16px' }}>
                  <div style={{ fontWeight: '600', color: 'white' }}>{t.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 16px' }}>
        <div style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Pret a revolutionner votre e-commerce?</h2>
          <Link href="/demo" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', color: '#2563eb', padding: '16px 32px', borderRadius: '12px', fontWeight: '600', textDecoration: 'none', marginTop: '16px' }}>
            <Rocket size={20} />
            Commencer Gratuitement
          </Link>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px' }}>
            <Link href="/a-propos" style={{ color: '#9ca3af', textDecoration: 'none' }}>A propos</Link>
            <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</Link>
            <Link href="/demo" style={{ color: '#9ca3af', textDecoration: 'none' }}>Demo</Link>
            <Link href="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none' }}>Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  )
}