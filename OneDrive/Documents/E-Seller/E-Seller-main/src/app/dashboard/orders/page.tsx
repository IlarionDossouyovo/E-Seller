'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
  DollarSign,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  RefreshCw
} from 'lucide-react'

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  products: { name: string; quantity: number; price: number }[]
  total: number
  status: OrderStatus
  date: string
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      address: '123 Main St, New York, NY 10001'
    },
    products: [
      { name: 'Wireless Earbuds Pro', quantity: 2, price: 49.99 },
      { name: 'Portable Charger', quantity: 1, price: 29.99 }
    ],
    total: 129.97,
    status: 'pending',
    date: '2024-04-09'
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 234 567 891',
      address: '456 Oak Ave, Los Angeles, CA 90001'
    },
    products: [
      { name: 'Smart Watch Ultra', quantity: 1, price: 89.99 }
    ],
    total: 89.99,
    status: 'processing',
    date: '2024-04-08'
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Mike Brown',
      email: 'mike@example.com',
      phone: '+1 234 567 892',
      address: '789 Pine Rd, Chicago, IL 60601'
    },
    products: [
      { name: 'LED Desk Lamp', quantity: 3, price: 24.99 },
      { name: 'Bluetooth Speaker', quantity: 1, price: 39.99
    }],
    total: 114.96,
    status: 'shipped',
    date: '2024-04-07'
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 234 567 893',
      address: '321 Elm St, Houston, TX 77001'
    },
    products: [
      { name: 'Wireless Earbuds Pro', quantity: 1, price: 49.99 }
    ],
    total: 49.99,
    status: 'delivered',
    date: '2024-04-05'
  },
  {
    id: 'ORD-005',
    customer: {
      name: 'Alex Wilson',
      email: 'alex@example.com',
      phone: '+1 234 567 894',
      address: '654 Maple Dr, Phoenix, AZ 85001'
    },
    products: [
      { name: 'Smart Watch Ultra', quantity: 2, price: 89.99 }
    ],
    total: 179.98,
    status: 'cancelled',
    date: '2024-04-04'
  },
]

const statusConfig = {
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Clock },
  processing: { label: 'Processing', color: 'text-blue-400', bg: 'bg-blue-500/20', icon: Package },
  shipped: { label: 'Shipped', color: 'text-purple-400', bg: 'bg-purple-500/20', icon: Truck },
  delivered: { label: 'Delivered', color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-400', bg: 'bg-red-500/20', icon: XCircle },
}

export default function OrdersPage() {
  const [orders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false
    if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: Package },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: Clock },
    { label: 'Revenue', value: `$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`, icon: DollarSign },
    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-sora)]">Orders Management</h1>
          <p className="text-gray-400">Track and manage all your orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-electron-blue to-electron-purple hover:opacity-90 transition-opacity text-sm">
            Create Order
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-electron-blue/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-electron-blue" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electron-blue/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  statusFilter === status 
                    ? 'bg-electron-blue text-white' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status === 'all' ? 'All' : statusConfig[status as OrderStatus].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-sm text-gray-400 font-medium">Order ID</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400 font-medium">Customer</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400 font-medium">Products</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400 font-medium">Total</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-sm text-gray-400 font-medium">Date</th>
                <th className="text-right py-4 px-6 text-sm text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, i) => {
                const status = statusConfig[order.status]
                return (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-medium">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-gray-400">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        {order.products.map((p, j) => (
                          <p key={j}>{p.quantity}x {p.name}</p>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400">{order.date}</td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold">Order {selectedOrder.id}</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full ${
                  statusConfig[selectedOrder.status].bg
                } ${statusConfig[selectedOrder.status].color}`}>
                  {statusConfig[selectedOrder.status].label}
                </span>
                <span className="text-gray-400">{selectedOrder.date}</span>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-sm text-gray-400 mb-3">Customer Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-electron-blue" />
                      <span className="font-medium">{selectedOrder.customer.name}</span>
                    </div>
                    <p className="text-sm text-gray-400">{selectedOrder.customer.email}</p>
                    <p className="text-sm text-gray-400">{selectedOrder.customer.phone}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-electron-blue" />
                      <span className="font-medium">Shipping Address</span>
                    </div>
                    <p className="text-sm text-gray-400">{selectedOrder.customer.address}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-sm text-gray-400 mb-3">Products</h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-400">Qty: {product.quantity}</p>
                      </div>
                      <p className="font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-electron-blue/20 to-electron-purple/20 border border-electron-blue/20">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedOrder.status === 'pending' && (
                  <button className="flex-1 py-3 rounded-xl bg-electron-blue hover:opacity-90 transition-opacity">
                    Start Processing
                  </button>
                )}
                {selectedOrder.status === 'processing' && (
                  <button className="flex-1 py-3 rounded-xl bg-electron-blue hover:opacity-90 transition-opacity">
                    Mark as Shipped
                  </button>
                )}
                {selectedOrder.status === 'shipped' && (
                  <button className="flex-1 py-3 rounded-xl bg-green-500 hover:opacity-90 transition-opacity">
                    Mark as Delivered
                  </button>
                )}
                {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                  <button className="py-3 px-6 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition-colors">
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}