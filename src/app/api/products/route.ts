import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProducts, createProduct } from '@/lib/supabase-http'

// Products array
let products = [
  { id: '1', name: 'Wireless Earbuds Pro Max', price: 49.99, originalPrice: 79.99, category: 'Electronics', categoryIcon: '📱', stock: 200, status: 'ACTIVE', sku: 'WEPM-001', rating: 4.8, image: 'https://picsum.photos/seed/earbuds1/400/400', description: 'Premium wireless earbuds with ANC', badge: 'Winner', badgeIcon: '🏆', platforms: ['TikTok', 'Instagram'], aiScore: 92, revenue: 45200, growth: 156, margin: 65 },
  { id: '2', name: 'Smart Water Bottle with Temp Display', price: 29.99, originalPrice: 39.99, category: 'Home & Garden', categoryIcon: '🏠', stock: 150, status: 'ACTIVE', sku: 'SWB-002', rating: 4.7, image: 'https://picsum.photos/seed/bottle2/400/400', description: 'Smart bottle with temperature display', badge: 'Winner', badgeIcon: '🏆', platforms: ['TikTok', 'Facebook'], aiScore: 88, revenue: 32500, growth: 89, margin: 72 },
  { id: '3', name: 'Portable Ring Light Kit', price: 24.99, originalPrice: 34.99, category: 'Electronics', categoryIcon: '📱', stock: 300, status: 'ACTIVE', sku: 'PRL-003', rating: 4.6, image: 'https://picsum.photos/seed/light3/400/400', description: 'Professional ring light for creators', badge: 'Winner', badgeIcon: '🏆', platforms: ['Instagram', 'Meta'], aiScore: 76, revenue: 18900, growth: 34, margin: 58 },
  { id: '4', name: 'Ergonomic Laptop Stand', price: 39.99, originalPrice: 49.99, category: 'Office', categoryIcon: '💼', stock: 180, status: 'ACTIVE', sku: 'ELS-004', rating: 4.9, image: 'https://picsum.photos/seed/laptop4/400/400', description: 'Adjustable aluminum laptop stand', badge: 'Winner', badgeIcon: '🏆', platforms: ['TikTok', 'Google'], aiScore: 84, revenue: 28400, growth: 67, margin: 61 },
  { id: '5', name: 'Minimalist Watch Collection', price: 89.99, originalPrice: 129.99, category: 'Fashion', categoryIcon: '👗', stock: 100, status: 'ACTIVE', sku: 'MWC-005', rating: 4.5, image: 'https://picsum.photos/seed/watch5/400/400', description: 'Elegant minimalist watches', badge: 'Winner', badgeIcon: '🏆', platforms: ['Instagram'], aiScore: 68, revenue: 12300, growth: -12, margin: 45 },
  { id: '6', name: 'Yoga Mat with Alignment Lines', price: 34.99, originalPrice: 44.99, category: 'Sports', categoryIcon: '⚽', stock: 250, status: 'ACTIVE', sku: 'YML-006', rating: 4.8, image: 'https://picsum.photos/seed/yoga6/400/400', description: 'Premium yoga mat with guides', badge: 'Winner', badgeIcon: '🏆', platforms: ['TikTok', 'Instagram'], aiScore: 81, revenue: 21600, growth: 52, margin: 68 },
  { id: '7', name: 'Smart Watch Series X', price: 299.99, originalPrice: 399.99, category: 'Electronics', categoryIcon: '📱', stock: 75, status: 'ACTIVE', sku: 'SWX-007', rating: 4.9, image: 'https://picsum.photos/seed/smart7/400/400', description: 'Advanced smartwatch', badge: null, badgeIcon: null },
  { id: '8', name: 'Portable Charger 20K', price: 49.99, originalPrice: 69.99, category: 'Electronics', categoryIcon: '📱', stock: 200, status: 'ACTIVE', sku: 'PCA-008', rating: 4.6, image: 'https://picsum.photos/seed/charger8/400/400', description: '20,000mAh portable charger', badge: 'Sale', badgeIcon: '🔋' },
  { id: '9', name: 'Yoga Mat Premium', price: 39.99, originalPrice: 59.99, category: 'Sports', categoryIcon: '⚽', stock: 150, status: 'ACTIVE', sku: 'YMP-009', rating: 4.8, image: 'https://picsum.photos/seed/yoga9/400/400', description: 'Non-slip yoga mat', badge: null, badgeIcon: null },
  { id: '10', name: 'LED Desk Lamp', price: 44.99, originalPrice: 54.99, category: 'Home', categoryIcon: '🏠', stock: 100, status: 'ACTIVE', sku: 'LDL-010', rating: 4.5, image: 'https://picsum.photos/seed/lamp10/400/400', description: 'Adjustable LED desk lamp', badge: null, badgeIcon: null },
  // Montres HOMME
  { id: 'w1', name: 'Montre Chronographe Homme', price: 149.99, originalPrice: 199.99, category: 'Montres', categoryIcon: '⌚', stock: 80, status: 'ACTIVE', sku: 'MCH-001', rating: 4.7, image: 'https://picsum.photos/seed/watchM1/400/400', description: 'Montre chronographe homme', badge: 'Winner', badgeIcon: '🏆', platforms: ['Instagram', 'TikTok'], aiScore: 89, revenue: 42500, growth: 156, margin: 50 },
  { id: 'w2', name: 'Montre Automatique Or', price: 249.99, originalPrice: 349.99, category: 'Montres', categoryIcon: '⌚', stock: 40, status: 'ACTIVE', sku: 'MAO-002', rating: 4.9, image: 'https://picsum.photos/seed/watchM2/400/400', description: 'Montre automatique en or', badge: 'Premium', badgeIcon: '👑', platforms: ['Instagram'], aiScore: 85, revenue: 28500, growth: 89, margin: 40 },
  { id: 'w3', name: 'Montre Sport Titanium', price: 199.99, originalPrice: 279.99, category: 'Montres', categoryIcon: '⌚', stock: 60, status: 'ACTIVE', sku: 'MST-003', rating: 4.6, image: 'https://picsum.photos/seed/watchM3/400/400', description: 'Montre sport titanium', badge: 'Winner', badgeIcon: '🏆', platforms: ['TikTok', 'Facebook'], aiScore: 82, revenue: 35200, growth: 112, margin: 45 },
  { id: 'w4', name: 'Montre Classique Cuir Noir', price: 179.99, originalPrice: 249.99, category: 'Montres', categoryIcon: '⌚', stock: 90, status: 'ACTIVE', sku: 'MCN-004', rating: 4.5, image: 'https://picsum.photos/seed/watchM4/400/400', description: 'Montre classique cuir noir', badge: null, badgeIcon: null, platforms: ['Instagram'], aiScore: 78, revenue: 21800, growth: 78, margin: 42 },
  // Montres FEMME
  { id: 'f1', name: 'Montre Connectee Sport Femme', price: 89.99, originalPrice: 129.99, category: 'Montres', categoryIcon: '⌚', stock: 120, status: 'ACTIVE', sku: 'CSF-001', rating: 4.8, image: 'https://picsum.photos/seed/watchF1/400/400', description: 'Montre connectee femme', badge: 'Winner', badgeIcon: '🏆', platforms: ['TikTok', 'Instagram'], aiScore: 92, revenue: 35200, growth: 145, margin: 55 },
  { id: 'f2', name: 'Montre Minimaliste Cuir', price: 129.99, originalPrice: 179.99, category: 'Montres', categoryIcon: '⌚', stock: 70, status: 'ACTIVE', sku: 'MNC-002', rating: 4.7, image: 'https://picsum.photos/seed/watchF2/400/400', description: 'Montre minimaliste cuir', badge: 'Winner', badgeIcon: '🏆', platforms: ['Instagram'], aiScore: 88, revenue: 28500, growth: 89, margin: 45 },
  { id: 'f3', name: 'Montre Smart Fitness Dior', price: 149.99, originalPrice: 199.99, category: 'Montres', categoryIcon: '⌚', stock: 50, status: 'ACTIVE', sku: 'MSF-003', rating: 4.9, image: 'https://picsum.photos/seed/watchF3/400/400', description: 'Montre smart fitness Dior', badge: 'Premium', badgeIcon: '👑', platforms: ['Instagram', 'TikTok'], aiScore: 95, revenue: 42300, growth: 112, margin: 50 },
  { id: 'f4', name: 'Montre Classique Or Rose', price: 199.99, originalPrice: 279.99, category: 'Montres', categoryIcon: '⌚', stock: 30, status: 'ACTIVE', sku: 'MCR-004', rating: 4.8, image: 'https://picsum.photos/seed/watchF4/400/400', description: 'Montre classique or rose', badge: 'Luxury', badgeIcon: '💎', platforms: ['Instagram'], aiScore: 90, revenue: 15800, growth: 78, margin: 40 },
]

// GET all products
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