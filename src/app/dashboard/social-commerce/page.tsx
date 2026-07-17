'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Video, Users, DollarSign, TrendingUp, ShoppingBag, MessageSquare, Globe, Link2, Zap, BarChart3, Settings, ExternalLink, CheckCircle, AlertCircle, Play, Calendar, Clock } from 'lucide-react'

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: '📸', followers: '12.5K', sales: '4 560 €', orders: 89, status: 'connected', color: 'pink' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', followers: '8.2K', sales: '3 890 €', orders: 67, status: 'connected', color: 'cyan' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', followers: '5.1K', sales: '2 340 €', orders: 34, status: 'pending', color: 'red' },
  { id: 'facebook', name: 'Facebook', icon: '📘', followers: '15.8K', sales: '5 670 €', orders: 112, status: 'connected', color: 'blue' },
]

const influencers = [
  { id: 'I1', name: 'TechReview Pro', platform: 'YouTube', followers: '500K', engagement: '4.8%', sales: '12 500 €', posts: 5, status: 'active' },
  { id: 'I2', name: 'Lifestyle Maria', platform: 'Instagram', followers: '250K', engagement: '6.2%', sales: '8 900 €', posts: 12, status: 'active' },
  { id: 'I3', name: 'Gadget Guru', platform: 'TikTok', followers: '1.2M', engagement: '8.5%', sales: '15 600 €', posts: 23, status: 'active' },
]

const liveStreams = [
  { id: 'L1', title: 'Lancement: Écouteurs Sans Fil', platform: 'Instagram', viewers: 1234, sales: '2 340 €', duration: '45 min', status: 'completed' },
  { id: 'L2', title: 'Vendredi Promo Flash', platform: 'TikTok', viewers: 567, sales: '1 890 €', duration: '30 min', status: 'live' },
  { id: 'L3', title: 'Dans les Coulisses', platform: 'YouTube', viewers: null, sales: null, duration: '1 heure', status: 'scheduled' },
]

export default function SocialCommercePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    totalFollowers: platforms.reduce((sum, p) => sum + parseFloat(p.followers.replace('K', '000').replace('.', '')), 0) / 1000,
    totalSales: '16 460 €',
    totalOrders: 302,
    avgEngagement: '5.2%',
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Commerce Social</h1>
              <p className="text-gray-400">Vendre sur les plateformes sociales</p>
            </div>
          </div>
          <button onClick={() => alert('Connecter une plateforme!')} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-xl flex items-center gap-2 text-white transition-all">
            <Link2 className="w-4 h-4" /> Connecter une Plateforme
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{(stats.totalFollowers / 1000).toFixed(1)}M</p>
          <p className="text-sm text-gray-400">Total Abonnés</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.totalSales}</p>
          <p className="text-sm text-gray-400">Ventes Totales</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-pink-400">{stats.totalOrders}</p>
          <p className="text-sm text-gray-400">Commandes</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-yellow-400">{stats.avgEngagement}</p>
          <p className="text-sm text-gray-400">Engagement Moyen</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'overview', label: 'Aperçu' },
          { key: 'platforms', label: 'Plateformes' },
          { key: 'influencers', label: 'Influenceurs' },
          { key: 'live', label: 'Direct' },
          { key: 'pixels', label: 'Pixels' }
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-xl ${activeTab === tab.key ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'} transition-colors`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Platforms */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Plateformes Connectées</h3>
            <div className="space-y-3">
              {platforms.map((platform, i) => (
                <motion.div key={platform.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <div>
                      <p className="font-semibold">{platform.name}</p>
                      <p className="text-sm text-gray-400">{platform.followers} abonnés</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-400">{platform.sales}</p>
                    <p className="text-sm text-gray-400">{platform.orders} commandes</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Actions Rapides</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => alert('Démarrer un direct!')} className="p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 hover:from-pink-500/30 hover:to-purple-500/30 rounded-xl text-left transition-all">
                <Video className="w-6 h-6 text-pink-400 mb-2" />
                <p className="font-medium">Aller en Direct</p>
                <p className="text-xs text-gray-400">Commencer le streaming</p>
              </button>
              <button onClick={() => alert('Trouver des influenceurs!')} className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-500/30 rounded-xl text-left transition-all">
                <Users className="w-6 h-6 text-cyan-400 mb-2" />
                <p className="font-medium">Trouver des Influenceurs</p>
                <p className="text-xs text-gray-400">Contacter des partenaires</p>
              </button>
              <button onClick={() => alert('Créer des posts shoppable!')} className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:from-orange-500/30 hover:to-red-500/30 rounded-xl text-left transition-all">
                <ShoppingBag className="w-6 h-6 text-orange-400 mb-2" />
                <p className="font-medium">Posts Shoppable</p>
                <p className="text-xs text-gray-400">Créer du contenu</p>
              </button>
              <button onClick={() => alert('Voir les analytiques!')} className="p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-indigo-500/30 rounded-xl text-left transition-all">
                <BarChart3 className="w-6 h-6 text-blue-400 mb-2" />
                <p className="font-medium">Analytiques</p>
                <p className="text-xs text-gray-400">Voir les rapports</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'platforms' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform, i) => (
            <motion.div key={platform.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{platform.icon}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  platform.status === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>{platform.status === 'connected' ? 'Connecté' : 'En attente'}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{platform.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Abonnés</span>
                  <span>{platform.followers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Ventes</span>
                  <span className="text-green-400">{platform.sales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Commandes</span>
                  <span>{platform.orders}</span>
                </div>
              </div>
              <button onClick={() => alert('Paramètres: ' + platform.name)} className="w-full mt-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center gap-2 text-white transition-colors">
                <Settings className="w-4 h-4" /> Paramètres
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'influencers' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Influenceur</th>
                <th className="p-4">Plateforme</th>
                <th className="p-4">Abonnés</th>
                <th className="p-4">Engagement</th>
                <th className="p-4">Ventes Générées</th>
                <th className="p-4">Posts</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {influencers.map((influencer, i) => (
                <motion.tr key={influencer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">{influencer.name}</td>
                  <td className="p-4">{influencer.platform}</td>
                  <td className="p-4">{influencer.followers}</td>
                  <td className="p-4 text-green-400">{influencer.engagement}</td>
                  <td className="p-4 text-green-400 font-semibold">{influencer.sales}</td>
                  <td className="p-4">{influencer.posts}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${influencer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{influencer.status === 'active' ? 'Actif' : 'Inactif'}</span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => alert('Envoyer un message à ' + influencer.name)} className="px-3 py-1 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm text-white transition-colors">Message</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'live' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Directs</h3>
            <button onClick={() => alert('Démarrer un direct!')} className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center gap-2 text-white transition-colors">
              <Video className="w-4 h-4" /> Démarrer un Direct
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {liveStreams.map((stream, i) => (
              <motion.div key={stream.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    stream.status === 'live' ? 'bg-red-500/20 text-red-400' :
                    stream.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {stream.status === 'live' && <span className="w-2 h-2 bg-red-400 rounded-full inline-block mr-1 animate-pulse" />}
                    {stream.status === 'live' ? 'En direct' : stream.status === 'completed' ? 'Terminé' : 'Planifié'}
                  </span>
                  <span className="text-gray-400">{stream.duration}</span>
                </div>
                <h4 className="font-semibold mb-2">{stream.title}</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{stream.platform}</span>
                  {stream.viewers && <span>{stream.viewers} spectateurs</span>}
                  {stream.sales && <span className="text-green-400">{stream.sales}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pixels' && (
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Pixels de Suivi</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📸</span>
                <div>
                  <p className="font-medium">Pixel Instagram</p>
                  <p className="text-sm text-gray-400">Suivre les conversions depuis Instagram</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Actif</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎵</span>
                <div>
                  <p className="font-medium">Pixel TikTok</p>
                  <p className="text-sm text-gray-400">Suivre les conversions depuis TikTok</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Actif</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📘</span>
                <div>
                  <p className="font-medium">Pixel Facebook</p>
                  <p className="text-sm text-gray-400">Suivre les conversions depuis Facebook</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Actif</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}