'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gavel, TrendingUp, DollarSign, Clock, Users, Package, Plus, Settings, Play, Pause, Filter, Search, ExternalLink, AlertTriangle, CheckCircle, Edit, Trash2, Ban } from 'lucide-react'

const auctions = [
  { id: 'A1', name: 'Vintage Watch Collection', currentBid: 450, startingPrice: 200, bids: 12, endsIn: '2h 15m', status: 'active', watchers: 45 },
  { id: 'A2', name: 'Limited Edition Sneakers', currentBid: 890, startingPrice: 500, bids: 23, endsIn: '1d 4h', status: 'active', watchers: 78 },
  { id: 'A3', name: 'Designer Handbag', currentBid: 1250, startingPrice: 800, bids: 8, endsIn: 'Ended', status: 'ended', watchers: 34 },
]

const bids = [
  { id: 'B1', bidder: 'User***7x2', amount: 450, time: '2 min ago' },
  { id: 'B2', bidder: 'User***9k1', amount: 425, time: '5 min ago' },
  { id: 'B3', bidder: 'User***3p4', amount: 400, time: '12 min ago' },
  { id: 'B4', bidder: 'User***8v2', amount: 380, time: '25 min ago' },
]

export default function AuctionSystemPage() {
  const [activeTab, setActiveTab] = useState('auctions')
  const [selectedAuction, setSelectedAuction] = useState(auctions[0])

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Gavel className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Auction System</h1>
              <p className="text-gray-400">Bid-based sales</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Auction
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-white">{auctions.filter(a => a.status === 'active').length}</p>
          <p className="text-sm text-gray-400">Active Auctions</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-purple-400">$2,590</p>
          <p className="text-sm text-gray-400">Total Revenue</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-green-400">43</p>
          <p className="text-sm text-gray-400">Total Bids</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4">
          <p className="text-2xl font-bold text-blue-400">157</p>
          <p className="text-sm text-gray-400">Watchers</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['auctions', 'bids', 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl ${activeTab === tab ? 'bg-violet-500' : 'bg-white/5'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'auctions' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Auctions List */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            {auctions.map((auction, i) => (
              <motion.div 
                key={auction.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                className={`glass-card p-6 cursor-pointer ${selectedAuction.id === auction.id ? 'ring-2 ring-violet-500' : ''}`}
                onClick={() => setSelectedAuction(auction)}
              >
                <div className="flex items-center justify-between mb-4">
                  <Package className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-2xl">📦</Package>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    auction.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>{auction.status}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{auction.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{auction.endsIn}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Current Bid</p>
                    <p className="text-2xl font-bold text-green-400">${auction.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{auction.bids} bids</p>
                    <p className="text-sm text-gray-400">{auction.watchers} watchers</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bid History */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Bid History: {selectedAuction.name}</h3>
            <div className="space-y-3">
              {bids.map((bid, i) => (
                <div key={bid.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <span className="font-mono text-sm">{bid.bidder}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${bid.amount}</p>
                    <p className="text-xs text-gray-400">{bid.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-violet-500/20 border border-violet-500/30 rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Place Bid</p>
              <div className="flex gap-2">
                <input type="number" placeholder="Your bid" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
                <button className="px-4 py-2 bg-violet-500 rounded-lg">Bid</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="glass-card p-6 max-w-xl">
          <h3 className="font-semibold mb-4">Auction Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Minimum Increment</p>
                <p className="text-sm text-gray-400">$5 minimum bid increase</p>
              </div>
              <button className="px-4 py-1 bg-white/10 rounded-lg text-sm">$5</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Anti-snipe</p>
                <p className="text-sm text-gray-400">Extend 5 min if bid in last 5 min</p>
              </div>
              <button className="w-12 h-6 bg-violet-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="font-medium">Reserve Price</p>
                <p className="text-sm text-gray-400">Set minimum reserve</p>
              </div>
              <button className="w-12 h-6 bg-white/10 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}