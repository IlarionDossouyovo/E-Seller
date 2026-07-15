'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Plus, 
  Search, 
  Eye, 
  MessageSquare,
  Calendar,
  Tag,
  Edit,
  Trash2,
  Share2,
  Image
} from 'lucide-react'

type Post = {
  id: number
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  status: 'published' | 'draft' | 'scheduled'
  views: number
  comments: number
  image: string
}

const mockPosts: Post[] = [
  { id: 1, title: '10 Tips for E-commerce Success in 2024', excerpt: 'Discover the top strategies to grow your online store...', category: 'Marketing', author: 'Admin', date: '2024-04-09', status: 'published', views: 1250, comments: 15, image: '📈' },
  { id: 2, title: 'How to Choose Winning Products', excerpt: 'Learn the secrets of finding profitable products...', category: 'Products', author: 'Admin', date: '2024-04-07', status: 'published', views: 890, comments: 8, image: '🎯' },
  { id: 3, title: 'Complete Guide to Facebook Ads', excerpt: 'Master Facebook advertising with this comprehensive guide...', category: 'Advertising', author: 'Admin', date: '2024-04-05', status: 'draft', views: 0, comments: 0, image: '📱' },
  { id: 4, title: 'Shipping Best Practices', excerpt: 'Optimize your shipping process for better customer satisfaction...', category: 'Operations', author: 'Admin', date: '2024-04-10', status: 'scheduled', views: 0, comments: 0, image: '📦' },
  { id: 5, title: 'Customer Retention Strategies', excerpt: 'Keep your customers coming back with these proven strategies...', category: 'Marketing', author: 'Admin', date: '2024-04-01', status: 'published', views: 650, comments: 12, image: '❤️' },
]

const categories = ['All', 'Marketing', 'Products', 'Advertising', 'Operations', 'News']

const stats = [
  { label: 'Total Posts', value: '24', icon: FileText },
  { label: 'Published', value: '18', icon: FileText },
  { label: 'Total Views', value: '15,420', icon: Eye },
  { label: 'Comments', value: '156', icon: MessageSquare },
]

export default function BlogPage() {
  const [posts] = useState<Post[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Published</span>
      case 'draft':
        return <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm">Draft</span>
      case 'scheduled':
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">Scheduled</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[var(--font-sora)]">Blog & CMS</h1>
              <p className="text-gray-400">Create and manage your content</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Post
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
            <stat.icon className="w-5 h-5 text-indigo-400 mb-2" />
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
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1"
          />
        </div>
        
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                categoryFilter === cat 
                  ? 'bg-electron-blue text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-br from-electron-blue/20 to-electron-purple/20 flex items-center justify-center text-6xl">
              {post.image}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 rounded-full bg-white/5 text-xs">{post.category}</span>
                {getStatusBadge(post.status)}
              </div>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  {post.status === 'published' && (
                    <>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 text-red-400">
                    <Trash2 className="w-4 h-4" />
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