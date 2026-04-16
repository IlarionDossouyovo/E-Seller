import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock data for demo
let products = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 79.99, category: 'Electronics', stock: 150, status: 'ACTIVE', sku: 'WEP-001', images: ['/product-1.jpg'], description: 'High-quality wireless earbuds' },
  { id: '2', name: 'Smart Watch Series X', price: 299.99, category: 'Electronics', stock: 75, status: 'ACTIVE', sku: 'SWX-002', images: ['/product-2.jpg'], description: 'Advanced smartwatch' },
  { id: '3', name: 'Organic Face Cream', price: 34.99, category: 'Beauty', stock: 200, status: 'ACTIVE', sku: 'OFC-003', images: ['/product-3.jpg'], description: 'Natural skincare product' },
]

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  let filtered = [...products]

  if (category) filtered = filtered.filter(p => p.category === category)
  if (status) filtered = filtered.filter(p => p.status === status)
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return NextResponse.json({ products: filtered, total: filtered.length })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const newProduct = {
    id: String(products.length + 1),
    ...body,
    createdAt: new Date().toISOString()
  }

  products.push(newProduct)

  return NextResponse.json({ product: newProduct }, { status: 201 })
}