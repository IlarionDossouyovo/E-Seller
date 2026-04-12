'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Filter, 
  Search, 
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

type Review = {
  id: number
  product: string
  productImage: string
  customer: string
  avatar: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
  status: 'approved' | 'pending' | 'rejected'
}

const mockReviews: Review[] = [
  { id: 1, product: 'Wireless Earbuds Pro', productImage: '🎧', customer: 'Sarah J.', avatar: '👩', rating: 5, title: 'Amazing quality!', content: 'These earbuds are fantastic. Great sound quality and battery life.', date: '2024-04-09', verified: true, helpful: 12, status: 'approved' },
  { id: 2, product: 'Smart Watch X', productImage: '⌚', customer: 'Mike C.', avatar: '👨', rating: 4, title: 'Good but pricey', content: 'Great features but a bit expensive compared to competitors.', date: '2024-04-08', verified: true, helpful: 8, status: 'approved' },
  { id: 3, product: 'Yoga Mat Premium', productImage: '🧘', customer: 'Emma W.', avatar: '👩‍🦰', rating: 3, title: 'Decent product', content: 'The mat is okay but I expected better quality for this price.', date: '2024-04-07', verified: false, helpful: 3, status: 'pending' },
  { id: 4, product: 'Bluetooth Speaker', productImage: '🔊', customer: 'James B.', avatar: '👨‍🦱', rating: 2, title: 'Not impressed', content: 'Sound quality is not as good as advertised. Returning it.', date: '2024-04-06', verified: true, helpful: 5, status: 'rejected' },
  { id: 5, product: 'Face Serum Set', productImage: '🧴', customer: 'Lisa A.', avatar: '👩', rating: 5, title: 'Holy grail product!', content: 'This serum has transformed my skin. Highly recommend!', date: '2024-04-05', verified: true, helpful: 20, status: 'approved' },
]

const stats = [
  { label: 'Total Reviews', value: '156', icon: Star },
  { label: 'Average Rating', value: '4.5', icon: Star },
  { label: 'Verified Reviews', value: '89%', icon: CheckCircle },
  { label: 'Pending Review', value: '12', icon: Clock },
]

export default function ReviewsPage() {
  const [reviews] = useState<Review[]>(mockReviews)
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || review.status === filter
    const matchesSearch = review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.customer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Product Reviews</h1>
              <p className="text-gray-400">Manage customer reviews and ratings</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Request Reviews
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <stat.icon className="w-5 h-5 text-yellow-400 mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1"
          />
        </div>
        
        <div className="flex gap-2">
          {(['all', 'approved', 'pending', 'rejected'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                filter === status 
                  ? 'bg-electron-blue text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{review.productImage}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{review.product}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{review.customer}</span>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {review.verified && (
                      <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      review.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      review.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {review.status}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star 
                      key={j} 
                      className={`w-4 h-4 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                    />
                  ))}
                </div>

                <h4 className="font-medium mb-1">{review.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{review.content}</p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
                    <ThumbsDown className="w-4 h-4" />
                    Not helpful
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white ml-auto">
                    <MessageSquare className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}