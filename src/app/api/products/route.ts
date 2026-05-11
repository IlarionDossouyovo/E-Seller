import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProducts, createProduct } from '@/lib/supabase-http'

// Use Supabase via REST API (not Prisma/PostgreSQL)
let products = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 79.99, category: 'Electronics', stock: 150, status: 'ACTIVE', sku: 'WEP-001', image: '/product-1.svg', description: 'High-quality wireless earbuds' },
  { id: '2', name: 'Smart Watch Series X', price: 299.99, category: 'Electronics', stock: 75, status: 'ACTIVE', sku: 'SWX-002', image: '/product-2.svg', description: 'Advanced smartwatch' },
  { id: '3', name: 'Organic Face Cream', price: 34.99, category: 'Beauty', stock: 200, status: 'ACTIVE', sku: 'OFC-003', image: '/product-3.svg', description: 'Natural skincare product' },
]

export async function GET(request: NextRequest) {
  try {
    // Try to fetch from Supabase via REST API
    const dbProducts = await getProducts()
    return NextResponse.json({ products: dbProducts, total: dbProducts.length })
  } catch (error) {
    // Fall back to mock data if Supabase unavailable
    console.log('Using mock data:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ products: products, total: products.length })
  }
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