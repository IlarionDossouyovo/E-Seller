import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProducts, createProduct } from '@/lib/supabase-http'

// Use Supabase via REST API (not Prisma/PostgreSQL)
let products = [
  // Electronics - 120 products
  { id: '1', name: 'Wireless Earbuds Pro', price: 79.99, originalPrice: 99.99, category: 'Electronics', categoryIcon: '📱', stock: 150, status: 'ACTIVE', sku: 'WEP-001', rating: 4.8, image: '/product-1.svg', description: 'High-quality wireless earbuds', badge: 'Best Seller', badgeIcon: '🎧' },
  { id: '2', name: 'Smart Watch Series X', price: 299.99, originalPrice: 399.99, category: 'Electronics', categoryIcon: '📱', stock: 75, status: 'ACTIVE', sku: 'SWX-002', rating: 4.9, image: '/product-2.svg', description: 'Advanced smartwatch', badge: 'New', badgeIcon: '⌚' },
  { id: '4', name: 'Portable Charger 20K', price: 49.99, originalPrice: 69.99, category: 'Electronics', categoryIcon: '📱', stock: 200, status: 'ACTIVE', sku: 'PCA-004', rating: 4.6, image: '/product-1.svg', description: '20,000mAh portable charger', badge: 'Sale', badgeIcon: '🔋' },
  // Beauty - 85 products
  { id: '3', name: 'Organic Face Cream', price: 34.99, originalPrice: 49.99, category: 'Beauty', categoryIcon: '💄', stock: 200, status: 'ACTIVE', sku: 'OFC-003', rating: 4.7, image: '/product-3.svg', description: 'Natural skincare product', badge: null, badgeIcon: null },
  // Fashion - 200 products
  { id: '5', name: 'Premium Cotton T-Shirt', price: 29.99, originalPrice: 39.99, category: 'Fashion', categoryIcon: '👗', stock: 300, status: 'ACTIVE', sku: 'PCT-005', rating: 4.5, image: '/product-3.svg', description: '100% organic cotton t-shirt', badge: null, badgeIcon: null },
  // Home - 150 products
  { id: '6', name: 'LED Desk Lamp', price: 44.99, originalPrice: 54.99, category: 'Home', categoryIcon: '🏠', stock: 100, status: 'ACTIVE', sku: 'LDL-006', rating: 4.5, image: '/product-3.svg', description: 'Adjustable LED desk lamp', badge: null, badgeIcon: null },
  // Sports - 90 products
  { id: '7', name: 'Yoga Mat Premium', price: 39.99, originalPrice: 59.99, category: 'Sports', categoryIcon: '⚽', stock: 150, status: 'ACTIVE', sku: 'YMP-007', rating: 4.8, image: '/product-3.svg', description: 'Non-slip yoga mat', badge: null, badgeIcon: null },
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