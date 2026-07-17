'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Calendar, Package, DollarSign, AlertTriangle, BarChart3, LineChart, Download, Filter, RefreshCw, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react'

const forecastData = [
  { month: 'Jan', actual: 120, forecast: null },
  { month: 'Feb', actual: 145, forecast: null },
  { month: 'Mar', actual: 168, forecast: null },
  { month: 'Apr', actual: null, forecast: 190 },
  { month: 'May', actual: null, forecast: 210 },
  { month: 'Jun', actual: null, forecast: 245 },
]

const seasonalTrends = [
  { month: 'Jan', demand: 85 },
  { month: 'Feb', demand: 78 },
  { month: 'Mar', demand: 92 },
  { month: 'Apr', demand: 95 },
  { month: 'May', demand: 88 },
  { month: 'Jun', demand: 72 },
  { month: 'Jul', demand: 65 },
  { month: 'Aug', demand: 70 },
  { month: 'Sep', demand: 88 },
  { month: 'Oct', demand: 102 },
  { month: 'Nov', demand: 125 },
  { month: 'Dec', demand: 145 },
]

const productForecasts = [
  { name: 'Wireless Earbuds Pro', current: 234, nextMonth: 280, trend: '+19.7%', confidence: 92 },
  { name: 'Smart Watch Series X', current: 89, nextMonth: 95, trend: '+6.7%', confidence: 78 },
  { name: 'Phone Case Premium', current: 567, nextMonth: 620, trend: '+9.3%', confidence: 85 },
  { name: 'Fast Charger 65W', current: 123, nextMonth: 145, trend: '+17.9%', confidence: 88 },
]

export default function DemandForecastPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    totalSales: 12450,
    growthRate: '+18.5%',
    nextMonthForecast: 14720,
    accuracy: '94.2%',
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Prévisions de la Demande</h1>
              <p className="text-gray-400">Prédictions de ventes par IA</p>
            </div>
          </div>
          <button onClick={() => alert('Prévisions actualisées!')} className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-xl flex items-center gap-2 text-white transition-all">
            <RefreshCw className="w-4 h-4" /> Actualiser les Prévisions
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{stats.totalSales.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Ventes Actuelles</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{stats.growthRate}</p>
          <p className="text-sm text-gray-400">Taux de Croissance</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">{stats.nextMonthForecast.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Mois Suivant</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">{stats.accuracy}</p>
          <p className="text-sm text-gray-400">Précision IA</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'overview', label: 'Aperçu' },
          { key: 'products', label: 'Produits' },
          { key: 'seasonal', label: 'Saisonnier' },
          { key: 'alerts', label: 'Alertes' }
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-xl ${activeTab === tab.key ? 'bg-violet-500 text-white' : 'bg-gray-700 text-gray-300'} transition-colors`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Tendances des Ventes & Prévisions</h3>
            <div className="h-64 flex items-end gap-2">
              {forecastData.map((data, i) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: data.actual ? `${(data.actual / 250) * 100}%` : `${(data.forecast! / 250) * 100}%` }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-full rounded-t-lg ${data.actual ? 'bg-gradient-to-t from-blue-500 to-cyan-500' : 'bg-gradient-to-t from-violet-500 to-purple-500 opacity-70'}`}
                  />
                  <span className="text-xs text-gray-400">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-sm text-gray-400">Réel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-purple-500" />
                <span className="text-sm text-gray-400">Prévision</span>
              </div>
            </div>
          </div>

          {/* Points Clés */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Points Clés</h3>
            <div className="space-y-3">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-400">Opportunité de Croissance</span>
                </div>
                <p className="text-sm text-gray-400">Les ventes devraient augmenter de 18.5% le mois prochain. Envisagez d'augmenter les stocks.</p>
              </div>
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-blue-400">Meilleur Moment pour Lancer</span>
                </div>
                <p className="text-sm text-gray-400">Les nouveaux produits performent mieux au T4 (Oct-Déc) avec 45% de conversion en plus.</p>
              </div>
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Alerte de Risque</span>
                </div>
                <p className="text-sm text-gray-400">Attendez-vous à une demande plus faible en Juin-Juillet. Planifiez des promotions en conséquence.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Produit</th>
                <th className="p-4">Ventes Actuelles</th>
                <th className="p-4">Mois Suivant</th>
                <th className="p-4">Tendance</th>
                <th className="p-4">Confiance</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {productForecasts.map((product, i) => (
                <motion.tr key={product.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.current}</td>
                  <td className="p-4 font-semibold">{product.nextMonth}</td>
                  <td className="p-4">
                    <span className="text-green-400 flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4" />
                      {product.trend}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${product.confidence}%` }} />
                      </div>
                      <span>{product.confidence}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button onClick={() => alert('Action: ' + product.name)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white transition-colors">
                      {product.trend.startsWith('+') ? 'Augmenter Stock' : 'Surveiller'}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'seasonal' && (
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Modèle de Demande Saisonnière</h3>
          <div className="h-48 flex items-end gap-1">
            {seasonalTrends.map((trend, i) => (
              <div key={trend.month} className="flex-1 flex flex-col items-center gap-1">
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: `${trend.demand}%` }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-full rounded-t ${trend.demand > 100 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                />
                <span className="text-xs text-gray-400 text-[10px]">{trend.month}</span>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-red-500/20 rounded-xl">
              <p className="font-semibold text-red-400">Basse Saison</p>
              <p className="text-sm text-gray-400">Juin-Août: Planifier des promotions</p>
            </div>
            <div className="p-4 bg-yellow-500/20 rounded-xl">
              <p className="font-semibold text-yellow-400">Modéré</p>
              <p className="text-sm text-gray-400">Jan-Mai, Sept: Maintenir</p>
            </div>
            <div className="p-4 bg-green-500/20 rounded-xl">
              <p className="font-semibold text-green-400">Pic de Saison</p>
              <p className="text-sm text-gray-400">Oct-Déc: Maximiser les pubs</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Alertes de Prévision</h3>
          <div className="space-y-3">
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-semibold">Alerte de Stock</p>
                  <p className="text-sm text-gray-400">Les Wireless Earbuds Pro peuvent être épuisés dans 5 jours</p>
                </div>
              </div>
              <button onClick={() => alert('Commande passée!')} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm text-white transition-colors">Réapprovisionner</button>
            </div>
            <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-semibold">Demande en baisse</p>
                  <p className="text-sm text-gray-400">Les ventes de Smart Watch devraient chuter de 15%</p>
                </div>
              </div>
              <button onClick={() => alert('Promo planifiée!')} className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm text-white transition-colors">Planifier Promo</button>
            </div>
            <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-semibold">Opportunité</p>
                  <p className="text-sm text-gray-400">Coque de téléphone en tendance en Europe</p>
                </div>
              </div>
              <button onClick={() => alert('Pub boostée!')} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white transition-colors">Augmenter les Pubs</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}