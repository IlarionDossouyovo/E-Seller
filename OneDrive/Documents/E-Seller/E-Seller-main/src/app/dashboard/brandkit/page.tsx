'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Download, 
  Copy, 
  Check, 
  ExternalLink,
  Sun,
  Moon,
  Layout,
  Type,
  Grid,
  Zap,
  Sparkles,
  Layers,
  Image,
  FileText,
  Box,
  Tag,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Eye,
  EyeOff,
  RefreshCw,
  Share2,
  Download as DownloadIcon,
  Copy as CopyIcon,
  Check as CheckIcon
} from 'lucide-react'

// Brand Colors as per design specs
const brandColors = {
  background: '#0B0F1A',
  primary: '#0066FF',
  secondary: '#7B3FE4',
  accent: '#F5F7FA',
  surface: '#121829',
  surfaceLight: '#1A2035',
  border: 'rgba(255,255,255,0.1)',
  text: '#F5F7FA',
  textSecondary: 'rgba(245,247,250,0.7)',
  textMuted: 'rgba(245,247,250,0.5)',
}

// Mock Logo with SVG - Modern E-Commerce AI Logo
const LogoIcon = ({ size = 40, animated = false }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066FF" />
        <stop offset="100%" stopColor="#7B3FE4" />
      </linearGradient>
      <linearGradient id="logoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#7B3FE4" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Background glow */}
    <circle cx="50" cy="50" r="45" fill="url(#logoGlow)" opacity={animated ? "0.5" : "0.3"} />
    {/* Main shape - stylized E with neural network dots */}
    <path 
      d="M25 30 L75 30 L75 45 L40 45 L40 55 L70 55 L70 70 L40 70 L40 80 L75 80 L75 95 L25 95 Z" 
      fill="url(#logoGrad)"
    />
    {/* Neural network dots */}
    <circle cx="30" cy="25" r="4" fill="#0066FF" />
    <circle cx="50" cy="20" r="3" fill="#7B3FE4" />
    <circle cx="70" cy="25" r="4" fill="#0066FF" />
    <circle cx="82" cy="50" r="3" fill="#7B3FE4" />
    <circle cx="82" cy="75" r="4" fill="#0066FF" />
    {/* Connection lines (dashed effect via opacity) */}
    <path d="M30 25 L50 20 L70 25" stroke="#0066FF" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
  </svg>
)

// Logo Components
function LogoDarkMode({ variant = 'full' }) {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0B0F1A] to-[#1A2035] border border-white/10 flex items-center justify-center gap-4">
      <LogoIcon size={60} animated={true} />
      {variant === 'full' && (
        <div className="text-left">
          <span className="text-3xl font-bold text-white font-[var(--font-sora)]">E-Seller</span>
          <p className="text-sm text-gray-400">by ELECTRON</p>
        </div>
      )}
    </div>
  )
}

function LogoLightMode({ variant = 'full' }) {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-100 border border-gray-200 flex items-center justify-center gap-4">
      <LogoIcon size={60} />
      {variant === 'full' && (
        <div className="text-left">
          <span className="text-3xl font-bold text-gray-900 font-[var(--font-sora)]">E-Seller</span>
          <p className="text-sm text-gray-500">by ELECTRON</p>
        </div>
      )}
    </div>
  )
}

// Color Palette Component
function ColorSwatch({ color, name, code, gradient }: { color?: string, name: string, code: string, gradient?: string | null }) {
  const [copied, setCopied] = useState(false)

  const copyColor = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer group"
      onClick={copyColor}
    >
      <div 
        className="w-full h-24 rounded-xl mb-3 relative overflow-hidden"
        style={{ 
          background: gradient || (color || '#000000'),
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}
      >
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white" />}
        </div>
      </div>
      <h4 className="font-semibold text-sm mb-1">{name}</h4>
      <p className="text-xs text-gray-400 font-mono">{code}</p>
    </motion.div>
  )
}

// Typography Component
function TypographyShowcase() {
  const fonts = [
    { name: 'Sora', usage: 'Headlines & Brand', weight: 'Bold 700', size: '48px' },
    { name: 'DM Sans', usage: 'Body Text', weight: 'Regular 400', size: '16px' },
    { name: 'Inter', usage: 'UI Elements', weight: 'Medium 500', size: '14px' },
  ]

  return (
    <div className="space-y-4">
      {fonts.map((font, i) => (
        <motion.div
          key={font.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold" style={{ fontFamily: font.name === 'Sora' ? 'var(--font-sora)' : font.name }}>
              {font.name}
            </span>
            <span className="px-2 py-1 rounded-full bg-white/5 text-xs">{font.usage}</span>
          </div>
          <div className="text-gray-400 text-sm mb-2">Aa Bb Cc Dd Ee Ff Gg Hh</div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{font.weight}</span>
            <span>{font.size}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Component Library Showcase
function ComponentShowcase() {
  const components = [
    { name: 'Buttons', icon: Square, desc: 'Primary, Secondary, Ghost' },
    { name: 'Inputs', icon: Square, desc: 'Text, Email, Password' },
    { name: 'Cards', icon: Square, desc: 'Glassmorphism, Solid' },
    { name: 'Badges', icon: Tag, desc: 'Status, Count, Label' },
    { name: 'Navigation', icon: Layout, desc: 'Sidebar, Tabs, Breadcrumb' },
    { name: 'Modals', icon: Square, desc: 'Dialog, Drawer, Alert' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {components.map((comp, i) => (
        <motion.div
          key={comp.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-electron-blue/30 transition-colors cursor-pointer"
        >
          <comp.icon className="w-6 h-6 text-electron-blue mb-2" />
          <h4 className="font-medium text-sm">{comp.name}</h4>
          <p className="text-xs text-gray-400">{comp.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Mockups Showcase
function MockupsShowcase() {
  const mockups = [
    { name: 'Desktop Dashboard', emoji: '🖥️', size: '1920x1080' },
    { name: 'Tablet View', emoji: '📱', size: '768x1024' },
    { name: 'Mobile App', emoji: '📲', size: '375x812' },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {mockups.map((mockup, i) => (
        <motion.div
          key={mockup.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="space-y-3"
        >
          <div className="aspect-video rounded-xl bg-gradient-to-br from-electron-blue/20 to-electron-purple/20 border border-white/10 flex items-center justify-center">
            <span className="text-6xl">{mockup.emoji}</span>
          </div>
          <div className="text-center">
            <h4 className="font-medium text-sm">{mockup.name}</h4>
            <p className="text-xs text-gray-500">{mockup.size}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function BrandKitPage() {
  const [activeTab, setActiveTab] = useState<'logos' | 'colors' | 'typography' | 'components' | 'mockups'>('logos')
  const [darkMode, setDarkMode] = useState(true)

  const tabs = [
    { key: 'logos', label: 'Logo', icon: Square },
    { key: 'colors', label: 'Colors', icon: Palette },
    { key: 'typography', label: 'Typography', icon: Type },
    { key: 'components', icon: Grid, label: 'Components' },
    { key: 'mockups', label: 'Mockups', icon: Image },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Brand Kit</h1>
              <p className="text-gray-400">Official brand guidelines & assets</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              {darkMode ? 'Dark' : 'Light'}
            </button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
              <DownloadIcon className="w-4 h-4" />
              Download Kit
            </button>
          </div>
        </div>
      </div>

      {/* Brand Introduction */}
      <div className="glass-card p-8 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6"
        >
          <LogoIcon size={100} animated={true} />
        </motion.div>
        <h2 className="text-4xl font-bold font-[var(--font-sora)] mb-2 bg-gradient-to-r from-electron-blue to-electron-purple bg-clip-text text-transparent">
          E-Seller by ELECTRON
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          AI-Powered E-Commerce Operating System
        </p>
        <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto">
          Premium SaaS platform for e-commerce entrepreneurs. Advanced, intelligent, automated. 
          A billion-dollar startup brand.
        </p>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2 overflow-x-auto">
        <div className="flex gap-2">
          {tabs.map(tab => (
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

      {/* Content */}
      <div className="space-y-6">
        {/* Logos */}
        {activeTab === 'logos' && (
          <div className="space-y-6">
            {/* Full Logo */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Full Logo</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-3">Dark Mode (Default)</p>
                  <LogoDarkMode variant="full" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-3">Light Mode</p>
                  <LogoLightMode variant="full" />
                </div>
              </div>
            </div>

            {/* Icon Only */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Icon Only (App Icon)</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-3">Dark Background</p>
                  <div className="p-8 rounded-2xl bg-[#0B0F1A] flex items-center justify-center">
                    <LogoIcon size={80} animated={true} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-3">White Background</p>
                  <div className="p-8 rounded-2xl bg-white flex items-center justify-center">
                    <LogoIcon size={80} />
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Variations */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Logo Variations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Primary', bg: '#0B0F1A' },
                  { name: 'Gradient', bg: 'gradient' },
                  { name: 'White', bg: '#FFFFFF' },
                  { name: 'Blue', bg: '#0066FF' },
                ].map((variation, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl border border-white/10 cursor-pointer"
                  >
                    <div 
                      className="h-24 rounded-lg mb-3 flex items-center justify-center"
                      style={{ 
                        background: variation.bg === 'gradient' 
                          ? 'linear-gradient(135deg, #0066FF 0%, #7B3FE4 100%)'
                          : variation.bg 
                      }}
                    >
                      <span className="text-3xl font-bold" style={{ color: variation.bg === '#FFFFFF' ? '#0B0F1A' : '#FFFFFF' }}>
                        E
                      </span>
                    </div>
                    <p className="text-center text-sm">{variation.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Clear Space */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Clear Space</h3>
              <div className="p-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-8">
                <div className="flex items-center gap-4">
                  <LogoIcon size={40} />
                  <div className="w-8 h-8 border border-white/20 rounded border-dashed flex items-center justify-center">
                    <span className="text-xs text-gray-500">x</span>
                  </div>
                  <div className="w-8 h-8 border border-white/20 rounded border-dashed flex items-center justify-center">
                    <span className="text-xs text-gray-500">x</span>
                  </div>
                  <div className="w-8 h-8 border border-white/20 rounded border-dashed flex items-center justify-center">
                    <span className="text-xs text-gray-500">x</span>
                  </div>
                  <div className="w-8 h-8 border border-white/20 rounded border-dashed flex items-center justify-center">
                    <span className="text-xs text-gray-500">x</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-3">Maintain minimum clear space equal to 25% of logo height</p>
            </div>
          </div>
        )}

        {/* Colors */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Primary Colors */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Primary Colors</h3>
                <div className="grid grid-cols-2 gap-4">
                  <ColorSwatch color={brandColors.primary} name="Electric Blue" code="#0066FF" />
                  <ColorSwatch color={brandColors.secondary} name="AI Purple" code="#7B3FE4" />
                </div>
              </div>

              {/* Background Colors */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Background Colors</h3>
                <div className="grid grid-cols-2 gap-4">
                  <ColorSwatch color={brandColors.background} name="Deep Black" code="#0B0F1A" />
                  <ColorSwatch color={brandColors.surface} name="Surface" code="#121829" />
                </div>
              </div>

              {/* Accent Colors */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Accent Colors</h3>
                <div className="grid grid-cols-2 gap-4">
                  <ColorSwatch color={brandColors.accent} name="Pure White" code="#F5F7FA" />
                  <ColorSwatch 
                    gradient="linear-gradient(135deg, #0066FF 0%, #7B3FE4 100%)" 
                    name="Brand Gradient" 
                    code="linear-gradient(135deg, #0066FF 0%, #7B3FE4 100%)" 
                  />
                </div>
              </div>

              {/* Semantic Colors */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Semantic Colors</h3>
                <div className="grid grid-cols-3 gap-4">
                  <ColorSwatch color="#10B981" name="Success" code="#10B981" />
                  <ColorSwatch color="#EF4444" name="Error" code="#EF4444" />
                  <ColorSwatch color="#F59E0B" name="Warning" code="#F59E0B" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typography */}
        {activeTab === 'typography' && (
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Typography System</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <TypographyShowcase />
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5">
                  <h4 className="font-medium mb-2">Font Usage</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• <strong>Sora</strong> - Headlines, brand elements, CTAs</li>
                    <li>• <strong>DM Sans</strong> - Body text, paragraphs, descriptions</li>
                    <li>• <strong>Inter</strong> - UI elements, buttons, labels</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <h4 className="font-medium mb-2">Web Safe Fallback</h4>
                  <code className="text-sm text-gray-400">
                    font-family: 'Sora', system-ui, sans-serif;
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Components */}
        {activeTab === 'components' && (
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">UI Components Library</h3>
            <ComponentShowcase />
          </div>
        )}

        {/* Mockups */}
        {activeTab === 'mockups' && (
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Brand Mockups</h3>
            <MockupsShowcase />
          </div>
        )}
      </div>

      {/* Download Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Download Brand Assets</h3>
            <p className="text-gray-400 text-sm">Get all brand assets in one package</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
              <DownloadIcon className="w-4 h-4" />
              Download All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}