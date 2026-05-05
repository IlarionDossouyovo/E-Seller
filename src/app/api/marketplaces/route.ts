'use strict'

import { NextRequest, NextResponse } from 'next/server'

// Marketplace integration API
// Handles sync, orders, and product management across all marketplaces

// Mock marketplace data
const marketplaceConfigs = {
  shopify: {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecret: process.env.SHOPIFY_API_SECRET,
    storeUrl: process.env.SHOPIFY_STORE_URL
  },
  woocommerce: {
    consumerKey: process.env.WOOCOMMERCE_KEY,
    consumerSecret: process.env.WOOCOMMERCE_SECRET,
    storeUrl: process.env.WOOCOMMERCE_URL
  },
  amazon: {
    sellerId: process.env.AMAZON_SELLER_ID,
    marketplaceId: process.env.AMAZON_MARKETPLACE_ID
  },
  ebay: {
    apiKey: process.env.EBAY_API_KEY
  },
  etsy: {
    apiKey: process.env.ETSY_API_KEY
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, marketplace, productId, orderId } = body

    // List all connected marketplaces
    if (action === 'list') {
      const marketplaces = [
        { id: 'shopify', name: 'Shopify', status: 'connected', features: ['products', 'orders', 'inventory'] },
        { id: 'woocommerce', name: 'WooCommerce', status: 'connected', features: ['products', 'orders'] },
        { id: 'amazon', name: 'Amazon', status: 'connected', features: ['fba', 'advertising'] },
        { id: 'ebay', name: 'eBay', status: 'connected', features: ['auctions', 'global'] },
        { id: 'wish', name: 'Wish', status: 'connected', features: ['mobile'] },
        { id: 'tiktok', name: 'TikTok Shop', status: 'connected', features: ['live', 'video'] },
        { id: 'etsy', name: 'Etsy', status: 'pending', features: ['handmade', 'vintage'] },
        { id: 'aliexpress', name: 'AliExpress', status: 'disconnected', features: ['dropshipping'] },
        { id: 'shopee', name: 'Shopee', status: 'pending', features: ['sea'] },
        { id: 'lazada', name: 'Lazada', status: 'pending', features: ['sea', 'fulfillment'] }
      ]
      return NextResponse.json({ success: true, marketplaces })
    }

    // Sync products from marketplace
    if (action === 'sync' && marketplace) {
      // Check if API keys are configured
      const config = marketplaceConfigs[marketplace as keyof typeof marketplaceConfigs]
      if (!config) {
        return NextResponse.json({ success: false, error: 'Marketplace not found' }, { status: 404 })
      }
      
      // Return mock sync response
      return NextResponse.json({
        success: true,
        marketplace,
        synced: {
          products: Math.floor(Math.random() * 100) + 10,
          orders: Math.floor(Math.random() * 50) + 5,
          customers: Math.floor(Math.random() * 30) + 1
        },
        timestamp: new Date().toISOString()
      })
    }

    // Get orders from marketplace
    if (action === 'orders' && marketplace) {
      const orders = [
        { id: 'ORD-001', product: 'Wireless Earbuds', marketplace, status: 'processing', amount: 89.99, date: '2024-01-15' },
        { id: 'ORD-002', product: 'Smart Watch', marketplace, status: 'shipped', amount: 199.99, date: '2024-01-14' },
        { id: 'ORD-003', product: 'Phone Case', marketplace, status: 'delivered', amount: 24.99, date: '2024-01-13' }
      ]
      return NextResponse.json({ success: true, orders })
    }

    // Connect marketplace
    if (action === 'connect' && marketplace) {
      return NextResponse.json({
        success: true,
        marketplace,
        message: `Connecté à ${marketplace}`,
        instructions: 'Ajoutez les clés API dans les variables d\'environnement'
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Action invalide',
      validActions: ['list', 'sync', 'orders', 'connect']
    }, { status: 400 })

  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Marketplace Integration API',
    version: '1.0.0',
    supportedMarketplaces: ['shopify', 'woocommerce', 'amazon', 'ebay', 'etsy', 'wish', 'aliexpress', 'shopee', 'lazada', 'tiktok'],
    actions: ['list', 'sync', 'orders', 'connect'],
    storeLocations: [
      { name: 'Paris - Champs-Élysées', address: '75 Avenue des Champs-Élysées, Paris' },
      { name: 'Lyon - Part-Dieu', address: 'Centre Commercial Part-Dieu, Lyon' },
      { name: 'Marseille - Centre', address: '12 Rue de la République, Marseille' }
    ],
    usage: {
      list: { action: 'list' },
      sync: { action: 'sync', marketplace: 'shopify' },
      orders: { action: 'orders', marketplace: 'amazon' },
      connect: { action: 'connect', marketplace: 'etsy' }
    }
  })
}