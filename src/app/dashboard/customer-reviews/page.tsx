'use client'
import { useState } from 'react'
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Filter } from 'lucide-react'

interface Review {
  id: number
  customer: string
  avatar: string
  product: string
  rating: number
  comment: string
  date: string
  status: 'approved' | 'pending' | 'rejected'
}

const mockReviews: Review[] = [
  { id: 1, customer: 'Sophie Martin', avatar: '👩', product: 'Ecouteurs Sans Fil Pro', rating: 5, comment: 'Excellent produit! Tres bonne qualite sonore.', date: '2024-04-09', status: 'approved' },
  { id: 2, customer: 'Marc Dubois', avatar: '👨', product: 'Montre Connectee Serie X', rating: 4, comment: 'Tres bien, mais la batterie pourrait etre meilleure.', date: '2024-04-08', status: 'approved' },
  { id: 3, customer: 'Emma Bernard', avatar: '👩‍🦰', product: 'Tapis de Yoga Premium', rating: 5, comment: 'Parfait pour mes seances de yoga!', date: '2024-04-07', status: 'pending' },
  { id: 4, customer: 'Jacques Petit', avatar: '👨‍🦱', product: 'Enceinte Bluetooth', rating: 3, comment: 'Qualite moyenne pour le prix.', date: '2024-04-06', status: 'pending' },
  { id: 5, customer: 'Claire Moreau', avatar: '👩', product: 'Kit Serum Visage', rating: 5, comment: 'Ma peau est beaucoup plus belle!', date: '2024-04-05', status: 'approved' },
]

const stats = [
  { label: 'Total Avis', value: '234', change: '+12%', icon: Star },
  { label: 'Note Moyenne', value: '4.5', change: '+0.2', icon: Star },
  { label: 'En Attente', value: '8', change: '-3', icon: MessageSquare },
  { label: 'Taux de Satisfaction', value: '94%', change: '+2%', icon: ThumbsUp },
]

export default function CustomerReviewsPage() {
  const [reviews] = useState<Review[]>(mockReviews)
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all')
  const [notification, setNotification] = useState<string | null>(null)

  const filteredReviews = filter === 'all' ? reviews : reviews.filter(r => r.status === filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm border border-green-500/30">Approuve</span>
      case 'pending':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm border border-yellow-500/30">En Attente</span>
      case 'rejected':
        return <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm border border-red-500/30">Rejete</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 bg-gradient-to-r from-yellow-500/20 via-orange-500/10 to-transparent border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <Star className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)] text-white">Avis Clients</h1>
              <p className="text-gray-300">Gerez les avis et evaluations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-yellow-500" />
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'all', label: 'Tous' },
            { key: 'approved', label: 'Approuves' },
            { key: 'pending', label: 'En Attente' },
            { key: 'rejected', label: 'Rejetes' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => { setFilter(f.key as any); setNotification(f.label); setTimeout(() => setNotification(null), 1500) }}
              className={`px-4 py-2.5 rounded-xl transition-all font-medium ${
                filter === f.key
                  ? 'bg-electron-blue text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{review.avatar}</span>
                <div>
                  <p className="font-medium text-white">{review.customer}</p>
                  <p className="text-sm text-gray-400">{review.product}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(review.status)}
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
            </div>
            <p className="mt-4 text-gray-300">{review.comment}</p>
            {review.status === 'pending' && (
              <div className="flex gap-3 mt-4">
                <button onClick={() => { setNotification('Avis approuve!'); setTimeout(() => setNotification(null), 2000) }} className="px-4 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" /> Approuver
                </button>
                <button onClick={() => { setNotification('Avis rejete!'); setTimeout(() => setNotification(null), 2000) }} className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 flex items-center gap-2">
                  <ThumbsDown className="w-4 h-4" /> Rejeter
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
    </div>
  )
}