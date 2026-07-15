'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Bitcoin, TrendingUp, TrendingDown, DollarSign, Copy, ExternalLink, RefreshCw, Shield, Clock, CheckCircle, AlertTriangle, Plus, Settings, QrCode, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'

const transactions = [
  { id: 'TX1', type: 'receive', amount: '0.025 BTC', usd: '$1,234.50', from: '3Fhz...2kP9', status: 'confirmed', time: '2 min ago' },
  { id: 'TX2', type: 'send', amount: '0.005 ETH', usd: '$12.50', to: '0x78...9dF2', status: 'confirmed', time: '15 min ago' },
  { id: 'TX3', type: 'receive', amount: '1,500 USDT', usd: '$1,500.00', from: 'TRON...8jK3', status: 'pending', time: '1 hour ago' },
]

const cryptoPrices = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$49,380', change: '+2.4%', icon: '₿' },
  { name: 'Ethereum', symbol: 'ETH', price: '$2,650', change: '+1.8%', icon: 'Ξ' },
  { name: 'USDT', symbol: 'USDT', price: '$1.00', change: '0.0%', icon: '₮' },
  { name: 'BNB', symbol: 'BNB', price: '$312', change: '-0.5%', icon: '⬡' },
]

export default function CryptoPaymentsPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Crypto Payments</h1>
              <p className="text-gray-400">Accept cryptocurrency</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Currency
          </button>
        </div>
      </div>

      {/* Crypto Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cryptoPrices.map((crypto, i) => (
          <motion.div key={crypto.symbol} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{crypto.icon}</span>
              <span className={`text-sm ${crypto.change.startsWith('+') ? 'text-green-400' : crypto.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                {crypto.change}
              </span>
            </div>
            <p className="font-semibold">{crypto.symbol}</p>
            <p className="text-lg font-bold">{crypto.price}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['overview', 'receive', 'send', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-orange-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Crypto Wallet</h3>
            <div className="p-4 bg-orange-500/20 rounded-xl mb-4">
              <p className="text-sm text-gray-400 mb-1">Total Balance</p>
              <p className="text-3xl font-bold">$2,747.00</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl">₿</span>
                  <span>Bitcoin</span>
                </div>
                <span className="font-semibold">0.025 BTC</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl">Ξ</span>
                  <span>Ethereum</span>
                </div>
                <span className="font-semibold">0.005 ETH</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bitcoin className="w-6 h-6 text-orange-400" />
                  <div>
                    <p className="font-medium">Bitcoin</p>
                    <p className="text-sm text-gray-400">On-chain & Lightning</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">Ξ</span>
                  <div>
                    <p className="font-medium">Ethereum</p>
                    <p className="text-sm text-gray-400">ERC-20</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">₮</span>
                  <div>
                    <p className="font-medium">USDT</p>
                    <p className="text-sm text-gray-400">Multi-chain</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'receive' && (
        <div className="glass-card p-6 max-w-xl">
          <h3 className="font-semibold mb-4">Receive Crypto</h3>
          <div className="p-6 bg-white/5 rounded-xl text-center mb-4">
            <p className="text-sm text-gray-400 mb-2">Bitcoin Address</p>
            <p className="font-mono text-lg mb-4 break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                <QrCode className="w-24 h-24 text-orange-400" />
              </div>
            </div>
          </div>
          <button className="w-full py-3 bg-orange-500 rounded-xl flex items-center justify-center gap-2">
            <Copy className="w-4 h-4" /> Copy Address
          </button>
        </div>
      )}

      {activeTab === 'send' && (
        <div className="glass-card p-6 max-w-xl">
          <h3 className="font-semibold mb-4">Send Crypto</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Currency</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3">
                <option>Bitcoin (BTC)</option>
                <option>Ethereum (ETH)</option>
                <option>USDT</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Recipient Address</label>
              <input type="text" placeholder="Enter wallet address" className="w-full bg-white/5 border border-white/10 rounded-lg p-3" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Amount</label>
              <input type="number" placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-lg p-3" />
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl font-semibold">
              Send Crypto
            </button>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">USD Value</th>
                <th className="p-4">Address</th>
                <th className="p-4">Status</th>
                <th className="p-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <span className={`flex items-center gap-1 ${tx.type === 'receive' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'receive' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 font-semibold">{tx.amount}</td>
                  <td className="p-4">{tx.usd}</td>
                  <td className="p-4 font-mono text-sm text-gray-400">{tx.from || tx.to}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${tx.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{tx.status}</span>
                  </td>
                  <td className="p-4 text-gray-400">{tx.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-xl">
          <h3 className="font-semibold mb-4">Crypto Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Auto-convert</p>
                  <p className="text-sm text-gray-400">Auto-convert to USD</p>
                </div>
              </div>
              <button className="w-12 h-6 bg-orange-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium">Confirmations</p>
                  <p className="text-sm text-gray-400">3 confirmations</p>
                </div>
              </div>
              <button className="px-4 py-1 bg-white/10 rounded-lg text-sm">1</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}