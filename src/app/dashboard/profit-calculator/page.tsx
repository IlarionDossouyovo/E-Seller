'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, Package, Truck, TrendingUp, Globe, Download, Save, RefreshCw, AlertTriangle, CheckCircle, Info } from 'lucide-react'

const shippingOptions = [
  { name: 'China Post', price: 2.50, days: '30-45', reliability: 75 },
  { name: 'ePacket', price: 4.50, days: '10-20', reliability: 90 },
  { name: 'DHL Express', price: 18.00, days: '3-5', reliability: 98 },
  { name: 'FedEx', price: 15.00, days: '4-7', reliability: 96 },
  { name: 'SAL', price: 6.00, days: '15-25', reliability: 85 },
]

const marketplaces = [
  { name: 'Shopify', fees: '2.9% + 30¢', monthly: '$29' },
  { name: 'Amazon', fees: '15%', monthly: '$39.99' },
  { name: 'eBay', fees: '13.25%', monthly: '$0' },
  { name: 'WooCommerce', fees: '2.9% + 30¢', monthly: '$12' },
]

export default function ProfitCalculatorPage() {
  const [product, setProduct] = useState({
    costPrice: 15,
    sellingPrice: 49.99,
    category: 'Electronics',
    weight: 0.5,
  })
  
  const [settings, setSettings] = useState({
    shipping: 'ePacket',
    marketplace: 'Shopify',
    adsSpend: 0,
    returnRate: 3,
  })

  const calculated = {
    revenue: product.sellingPrice,
    productCost: product.costPrice,
    shippingCost: shippingOptions.find(s => s.name === settings.shipping)?.price || 4.50,
    platformFee: product.sellingPrice * (settings.marketplace === 'Shopify' ? 0.029 : settings.marketplace === 'Amazon' ? 0.15 : 0.1325) + 0.30,
    paymentFee: product.sellingPrice * 0.029 + 0.30,
    adsCost: settings.adsSpend,
    returnCost: product.sellingPrice * (settings.returnRate / 100),
    grossProfit: product.sellingPrice - product.costPrice - (shippingOptions.find(s => s.name === settings.shipping)?.price || 4.50) - (product.sellingPrice * 0.029 + 0.30) - (product.sellingPrice * 0.029 + 0.30) - settings.adsSpend,
    netProfit: product.sellingPrice - product.costPrice - (shippingOptions.find(s => s.name === settings.shipping)?.price || 4.50) - (product.sellingPrice * 0.029 + 0.30) - (product.sellingPrice * 0.029 + 0.30) - settings.adsSpend - (product.sellingPrice * settings.returnRate / 100),
    profitMargin: ((product.sellingPrice - product.costPrice - (shippingOptions.find(s => s.name === settings.shipping)?.price || 4.50) - (product.sellingPrice * 0.029 + 0.30) - (product.sellingPrice * 0.029 + 0.30) - settings.adsSpend) / product.sellingPrice) * 100,
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-sora)]">Calculateur de Profit</h1>
            <p className="text-gray-400">Calculez vos marges bénéficiaires exactes</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Info */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Informations Produit</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Prix de Revient (€)</label>
                <input
                  type="number"
                  value={product.costPrice}
                  onChange={(e) => setProduct({ ...product, costPrice: parseFloat(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Prix de Vente (€)</label>
                <input
                  type="number"
                  value={product.sellingPrice}
                  onChange={(e) => setProduct({ ...product, sellingPrice: parseFloat(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Catégorie</label>
                <select
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400"
                >
                  <option>Électronique</option>
                  <option>Mode</option>
                  <option>Maison</option>
                  <option>Beauté</option>
                  <option>Sports</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Poids (kg)</label>
                <input
                  type="number"
                  value={product.weight}
                  onChange={(e) => setProduct({ ...product, weight: parseFloat(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* Costs Settings */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Paramètres des Coûts</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Mode de Livraison</label>
                <select
                  value={settings.shipping}
                  onChange={(e) => setSettings({ ...settings, shipping: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400"
                >
                  {shippingOptions.map(s => (
                    <option key={s.name} value={s.name}>{s.name} - ${s.price} ({s.days})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Marketplace/Plateforme</label>
                <select
                  value={settings.marketplace}
                  onChange={(e) => setSettings({ ...settings, marketplace: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400"
                >
                  {marketplaces.map(m => (
                    <option key={m.name} value={m.name}>{m.name} - {m.fees}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Budget Pub (€/vente)</label>
                <input
                  type="number"
                  value={settings.adsSpend}
                  onChange={(e) => setSettings({ ...settings, adsSpend: parseFloat(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Taux de Retour (%)</label>
                <input
                  type="number"
                  value={settings.returnRate}
                  onChange={(e) => setSettings({ ...settings, returnRate: parseFloat(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Résumé des Profits</h2>
            
            <div className={`text-center py-4 rounded-xl mb-4 ${calculated.netProfit > 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <p className="text-sm text-gray-400">Bénéfice Net</p>
              <p className={`text-4xl font-bold ${calculated.netProfit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {calculated.netProfit.toFixed(2)} €
              </p>
              <p className="text-sm text-gray-400">par vente</p>
            </div>

            <div className="text-center mb-4">
              <p className="text-sm text-gray-400">Marge Bénéficiaire</p>
              <p className={`text-2xl font-bold ${calculated.profitMargin > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {calculated.profitMargin.toFixed(1)}%
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Chiffre d'affaires</span>
                <span>{calculated.revenue.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Coût Produit</span>
                <span className="text-red-400">-{calculated.productCost.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Livraison</span>
                <span className="text-red-400">-{calculated.shippingCost.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Frais de Plateforme</span>
                <span className="text-red-400">-{calculated.platformFee.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Frais de Paiement</span>
                <span className="text-red-400">-{calculated.paymentFee.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Budget Pub</span>
                <span className="text-red-400">-{calculated.adsCost.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Réserve Retours</span>
                <span className="text-red-400">-{calculated.returnCost.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between p-2 border-t border-white/10 rounded-lg font-semibold">
                <span>Bénéfice Net</span>
                <span className={calculated.netProfit > 0 ? 'text-green-400' : 'text-red-400'}>
                  {calculated.netProfit.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="glass-card p-4">
            {calculated.netProfit > 20 ? (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Excellent Profit!</p>
                  <p className="text-sm text-gray-400">Marges excellentes pour scaler</p>
                </div>
              </div>
            ) : calculated.netProfit > 0 ? (
              <div className="flex items-center gap-2 text-yellow-400">
                <TrendingUp className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Marge Correcte</p>
                  <p className="text-sm text-gray-400">Envisagez d'optimiser les coûts</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Perte</p>
                  <p className="text-sm text-gray-400">Augmentez le prix ou réduisez les coûts</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button onClick={() => alert('Calcul enregistré!')} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl flex items-center justify-center gap-2 text-white font-medium transition-colors">
              <Save className="w-4 h-4" /> Sauvegarder
            </button>
            <button onClick={() => {
              const csvContent = [
                ['Prix Revient', 'Prix Vente', 'Catégorie', 'Poids', 'Livraison', 'Marketplace', 'Budget Pub', 'Taux Retour', 'Bénéfice Net', 'Marge'],
                [product.costPrice, product.sellingPrice, product.category, product.weight, settings.shipping, settings.marketplace, settings.adsSpend, settings.returnRate + '%', calculated.netProfit.toFixed(2) + ' €', calculated.profitMargin.toFixed(1) + '%']
              ].map(row => row.join(',')).join('\n');
              
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'calcul_profit.csv';
              link.click();
            }} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 text-white font-medium transition-colors">
              <Download className="w-4 h-4" /> Exporter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}