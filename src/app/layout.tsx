import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'E-Seller by ELECTRON | AI-Powered E-Commerce Platform',
  description: 'E-Seller by ELECTRON est une plateforme SaaS IA tout-en-un permettant de trouver des produits gagnants, créer une marque automatiquement, et lancer des campagnes publicitaires performantes.',
  keywords: ['e-commerce', 'AI', 'dropshipping', 'SaaS', 'marketing', 'branding'],
  robots: 'noindex, nofollow', // Prevent indexing until launch
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="noise-overlay antialiased">
        {children}
      </body>
    </html>
  )
}
