import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock customers
const customers = [
  { id: '1', email: 'john@example.com', name: 'John Doe', phone: '+1234567890', segment: 'VIP', lifetime: 2549.99, ordersCount: 12, createdAt: '2024-01-15T10:00:00Z' },
  { id: '2', email: 'jane@example.com', name: 'Jane Smith', phone: '+1987654321', segment: 'Regular', lifetime: 899.50, ordersCount: 5, createdAt: '2024-02-20T14:30:00Z' },
  { id: '3', email: 'bob@example.com', name: 'Bob Wilson', phone: '+1122334455', segment: 'New', lifetime: 149.99, ordersCount: 1, createdAt: '2024-04-05T09:45:00Z' },
]

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  const { searchParams } = new URL(request.url)
  const segment = searchParams.get('segment')
  const search = searchParams.get('search')

  let filtered = [...customers]

  if (segment) filtered = filtered.filter(c => c.segment === segment)
  if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.includes(search))

  return NextResponse.json({ customers: filtered, total: filtered.length })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const newCustomer = {
    id: String(customers.length + 1),
    ...body,
    segment: 'New',
    lifetime: 0,
    ordersCount: 0,
    createdAt: new Date().toISOString()
  }

  customers.push(newCustomer)

  return NextResponse.json({ customer: newCustomer }, { status: 201 })
}