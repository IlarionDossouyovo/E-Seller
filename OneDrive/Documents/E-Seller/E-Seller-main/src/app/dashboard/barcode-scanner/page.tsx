'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScanBarcode, Package, Search, Camera, Plus, Settings, CheckCircle, AlertTriangle, Edit, Trash2, History, ShoppingBag, ExternalLink, RefreshCw } from 'lucide-react'

const scanHistory = [
  { id: 'S1', barcode: '8901234567890', product: 'Wireless Earbuds Pro', found: true, time: '2 min ago' },
  { id: 'S2', barcode: '8901234567883', product: 'Smart Watch Series X', found: true, time: '15 min ago' },
  { id: 'S3', barcode: '8901234567876', product: 'Phone Case Premium', found: true, time: '1 hour ago' },
  { id: 'S4', barcode: '1234567890123', product: 'Not found', found: false, time: '3 hours ago' },
]

const products = [
  { barcode: '8901234567890', name: 'Wireless Earbuds Pro', sku: 'WEP-001', stock: 245, price: 49.99 },
  { barcode: '8901234567883', name: 'Smart Watch Series X', sku: 'SWX-002', stock: 89, price: 299.99 },
  { barcode: '8901234567876', name: 'Phone Case Premium', sku: 'PCP-003', stock: 1250, price: 24.99 },
]

export default function BarcodeScannerPage() {
  const [activeTab, setActiveTab] = useState('scan')
  const [manualCode, setManualCode] = useState('')
  const [lastScan, setLastScan] = useState<any>(null)

  const handleScan = (barcode: string) => {
    const product = products.find(p => p.barcode === barcode)
    setLastScan(product || { barcode, found: false })
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-cyan-600 flex items-center justify-center">
              <ScanBarcode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Barcode Scanner</h1>
              <p className="text-gray-400">Quick product lookup</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-600 rounded-xl flex items-center gap-2">
            <Camera className="w-4 h-4" /> Scan
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{products.length}</p>
          <p className="text-sm text-gray-400">Products</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">{scanHistory.filter(s => s.found).length}</p>
          <p className="text-sm text-gray-400">Scans Today</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">98%</p>
          <p className="text-sm text-gray-400">Success Rate</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">1,584</p>
          <p className="text-sm text-gray-400">Total Scans</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['scan', 'history', 'products'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-green-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'scan' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Scanner UI */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Scan Barcode</h3>
            
            {/* Camera Preview */}
            <div className="aspect-video bg-black/50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <ScanBarcode className="w-24 h-24 text-green-400/50" />
              </div>
              <div className="absolute left-4 right-4 h-0.5 bg-green-400 animate-pulse" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 rounded-lg text-sm">
                Camera ready - Point at barcode
              </div>
            </div>

            {/* Manual Entry */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Or enter manually:</p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <ScanBarcode className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="Enter barcode..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 font-mono"
                  />
                </div>
                <button onClick={() => handleScan(manualCode)} className="px-6 py-3 bg-green-500 rounded-xl">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Scan Result</h3>
            {lastScan ? (
              <div className={`p-6 rounded-xl ${lastScan.found ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                <div className="flex items-center gap-3 mb-4">
                  {lastScan.found ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  )}
                  <div>
                    <p className={`font-semibold text-lg ${lastScan.found ? 'text-green-400' : 'text-red-400'}`}>
                      {lastScan.found ? 'Product Found!' : 'Not Found'}
                    </p>
                    <p className="text-sm text-gray-400">Barcode: {lastScan.barcode}</p>
                  </div>
                </div>
                {lastScan.found && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name</span>
                      <span>{lastScan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SKU</span>
                      <span>{lastScan.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stock</span>
                      <span>{lastScan.stock} units</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Price</span>
                      <span className="text-green-400">${lastScan.price}</span>
                    </div>
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  {lastScan.found && (
                    <>
                      <button className="flex-1 py-2 bg-white/5 rounded-lg text-sm">View</button>
                      <button className="flex-1 py-2 bg-green-500 rounded-lg text-sm">Add to Order</button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <ScanBarcode className="w-16 h-16 mb-4" />
                <p>Scan a barcode to see product details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Barcode</th>
                <th className="p-4">Product</th>
                <th className="p-4">Status</th>
                <th className="p-4">Time</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scanHistory.map((scan, i) => (
                <motion.tr key={scan.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-mono">{scan.barcode}</td>
                  <td className="p-4">{scan.product}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${scan.found ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {scan.found ? 'Found' : 'Not Found'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{scan.time}</td>
                  <td className="p-4">
                    <button className="px-3 py-1 bg-white/5 rounded-lg text-sm">View</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Barcode</th>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <motion.tr key={product.barcode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-mono">{product.barcode}</td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-gray-400">{product.sku}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 100 ? 'bg-green-500/20 text-green-400' : product.stock > 20 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4 font-semibold">${product.price}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-white/10 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 hover:bg-white/10 rounded"><RefreshCw className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}