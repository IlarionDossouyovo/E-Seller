import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock orders
const orders = [
  { id: '1', orderNumber: 'ORD-2024-001', userId: '1', status: 'PROCESSING', total: 379.98, currency: 'USD', paymentStatus: 'PAID', createdAt: '2024-04-09T10:30:00Z' },
  { id: '2', orderNumber: 'ORD-2024-002', userId: '1', status: 'PENDING', total: 149.99, currency: 'USD', paymentStatus: 'PENDING', createdAt: '2024-04-10T14:20:00Z' },
  { id: '3', orderNumber: 'ORD-2024-003', userId: '2', status: 'DELIVERED', total: 89.99, currency: 'EUR', paymentStatus: 'PAID', createdAt: '2024-04-08T09:15:00Z' },
]

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const limit = searchParams.get('limit') || '10'

  let filtered = [...orders]

  if (status) filtered = filtered.filter(o => o.status === status)

  return NextResponse.json({ 
    orders: filtered.slice(0, parseInt(limit)), 
    total: filtered.length 
  })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const orderNumber = `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`

  const newOrder = {
    id: String(orders.length + 1),
    orderNumber,
    ...body,
    createdAt: new Date().toISOString()
  }

  orders.push(newOrder)

  return NextResponse.json({ order: newOrder }, { status: 201 })
}