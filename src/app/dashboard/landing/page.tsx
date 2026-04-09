'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Palette,
  Type,
  Image,
  Layout,
  Zap,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  RefreshCw,
  ExternalLink
} from 'lucide-react'

type Template = 'minimal' | 'bold' | 'modern' | 'premium'

const templates: { key: Template; name: string; description: string }[] = [
  { key: 'minimal', name: 'Minimal', description: 'Clean and simple design' },
  { key: 'bold', name: 'Bold', description: 'Eye-catching with strong CTAs' },
  { key: 'modern', name: 'Modern', description: 'Contemporary and sleek' },
  { key: 'premium', name: 'Premium', description: 'Luxury and exclusive feel' },
]

const mockSections = [
  { name: 'Hero Section', included: true },
  { name: 'Features', included: true },
  { name: 'Testimonials', included: true },
  { name: 'Pricing', included: true },
  { name: 'FAQ', included: false },
  { name: 'Blog', included: false },
  { name: 'Contact Form', included: true },
  { name: 'Footer', included: true },
]

export default function LandingGeneratorPage() {
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('modern')
  const [primaryColor, setPrimaryColor] = useState('#0066FF')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const handleGenerate = async () => {
    if (!productName || !productDescription) return
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setGenerated(true)
  }

  const copyCode = () => {
    navigator.clipboard.writeText('<!-- Generated Landing Page Code -->')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electron-blue to-electron-purple flex items-center justify-center">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">AI Landing Page Generator</h1>
            <p className="text-gray-400">Create stunning landing pages in seconds</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Smart Watch Pro"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product Description</label>
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Brief description of your product"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Tech enthusiasts"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !productName || !productDescription}
          className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-pulse" />
              Generating your landing page...
            </>
          ) : (
            <>
              <Layout className="w-5 h-5" />
              Generate Landing Page
            </>
          )}
        </button>
      </div>

      {generated && (
        <>
          {/* Template Selection */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Choose Template</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {templates.map((template, i) => (
                <motion.button
                  key={template.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedTemplate(template.key)}
                  className={`p-4 rounded-xl border transition-all ${
                    selectedTemplate === template.key
                      ? 'border-electron-blue bg-electron-blue/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-400">{template.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Primary Color</h2>
            <div className="flex gap-3">
              {['#0066FF', '#7B3FE4', '#10B981', '#F59E0B', '#EF4444', '#EC4899'].map(color => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className={`w-12 h-12 rounded-xl transition-transform ${
                    primaryColor === color ? 'scale-110 ring-2 ring-white' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Preview Area */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Preview</h2>
                <div className="flex gap-2">
                  {[
                    { key: 'desktop', icon: Monitor },
                    { key: 'tablet', icon: Tablet },
                    { key: 'mobile', icon: Smartphone },
                  ].map(device => (
                    <button
                      key={device.key}
                      onClick={() => setPreviewDevice(device.key as any)}
                      className={`p-2 rounded-lg transition-colors ${
                        previewDevice === device.key 
                          ? 'bg-electron-blue text-white' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <device.icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8 min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{productName}</h3>
                  <p className="text-gray-400 mb-4 max-w-md">{productDescription}</p>
                  <button 
                    className="px-6 py-3 rounded-xl font-semibold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-4">
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Included Sections</h3>
                <div className="space-y-3">
                  {mockSections.map((section, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{section.name}</span>
                      {section.included ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={copyCode}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied!' : 'Copy HTML Code'}
                  </button>
                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download ZIP
                  </button>
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Publish to Netlify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!generated && (
        <div className="glass-card p-12 text-center">
          <Layout className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Enter your product details above and click generate to create a beautiful landing page in seconds.
          </p>
        </div>
      )}
    </div>
  )
}