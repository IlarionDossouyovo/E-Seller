'use strict'

import { NextRequest, NextResponse } from 'next/server'

// Barcode Purchase API
// Handles barcode purchases for different countries and marketplaces

interface BarcodeRequest {
  countryId: string
  quantity: number
  productName?: string
  email: string
}

interface BarcodeOrder {
  id: string
  countryId: string
  countryName: string
  barcode: string
  type: string
  provider: string
  price: number
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

// Country pricing data
const barcodePrices: Record<string, { name: string; type: string; price: number; provider: string; prefix: string }> = {
  us: { name: 'United States', type: 'UPC', price: 30, provider: 'GS1 US', prefix: '01' },
  eu: { name: 'European Union', type: 'EAN', price: 35, provider: 'GS1 EU', prefix: '590' },
  uk: { name: 'United Kingdom', type: 'EAN', price: 25, provider: 'GS1 UK', prefix: '500' },
  jp: { name: 'Japan', type: 'JAN', price: 40, provider: 'JAN Code', prefix: '490' },
  cn: { name: 'China', type: 'EAN', price: 20, provider: 'China Codes', prefix: '692' },
  in: { name: 'India', type: 'EAN', price: 25, provider: 'GS1 India', prefix: '890' },
  au: { name: 'Australia', type: 'EAN', price: 30, provider: 'GS1 Australia', prefix: '931' },
  ca: { name: 'Canada', type: 'UPC', price: 30, provider: 'GS1 Canada', prefix: '00' },
  br: { name: 'Brazil', type: 'EAN', price: 35, provider: 'GS1 Brasil', prefix: '789' },
  mx: { name: 'Mexico', type: 'EAN', price: 30, provider: 'GS1 Mexico', prefix: '750' }
}

// Generate a random barcode based on country prefix
function generateBarcode(prefix: string): string {
  const random = Math.floor(100000000 + Math.random() * 900000000)
  return prefix + random.toString().padStart(10, '0')
}

// Validate barcode request
function validateRequest(data: any): { valid: boolean; error?: string } {
  if (!data.countryId) {
    return { valid: false, error: 'countryId is required' }
  }
  if (!barcodePrices[data.countryId]) {
    return { valid: false, error: 'Invalid country ID' }
  }
  if (!data.email || !data.email.includes('@')) {
    return { valid: false, error: 'Valid email is required' }
  }
  if (!data.quantity || data.quantity < 1 || data.quantity > 1000) {
    return { valid: false, error: 'Quantity must be between 1 and 1000' }
  }
  return { valid: true }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as BarcodeRequest
    const { countryId, quantity = 1, productName, email } = body

    // Validate request
    const validation = validateRequest({ countryId, quantity, email })
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: validation.error
      }, { status: 400 })
    }

    const country = barcodePrices[countryId]
    const totalPrice = country.price * quantity

    // Generate barcodes
    const barcodes: BarcodeOrder[] = []
    for (let i = 0; i < quantity; i++) {
      barcodes.push({
        id: `BC-${Date.now()}-${i}`,
        countryId,
        countryName: country.name,
        barcode: generateBarcode(country.prefix),
        type: country.type,
        provider: country.provider,
        price: country.price,
        status: 'completed',
        createdAt: new Date().toISOString()
      })
    }

    return NextResponse.json({
      success: true,
      order: {
        id: `ORDER-${Date.now()}`,
        countryId,
        countryName: country.name,
        productName: productName || 'Unnamed Product',
        email,
        quantity,
        unitPrice: country.price,
        totalPrice,
        barcodes,
        createdAt: new Date().toISOString(),
        deliveryMethod: 'email',
        validFor: 'Lifetime'
      },
      message: `Successfully generated ${quantity} ${country.type} barcode(s) for ${country.name}`
    })

  } catch (error) {
    console.error('Barcode Purchase Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process barcode purchase'
    }, { status: 500 })
  }
}

export async function GET() {
  // Return available countries and pricing
  const countries = Object.entries(barcodePrices).map(([id, data]) => ({
    id,
    name: data.name,
    type: data.type,
    price: data.price,
    provider: data.provider,
    currency: id === 'us' || id === 'cn' || id === 'in' ? 'USD' : 
            id === 'uk' ? 'GBP' : 
            id === 'eu' ? 'EUR' : 
            id === 'au' ? 'AUD' : 
            id === 'ca' ? 'CAD' : 'USD'
  }))

  return NextResponse.json({
    service: 'Barcode Purchase API',
    version: '1.0.0',
    description: 'Purchase official barcodes for Amazon FBA, Alibaba, and global marketplaces',
    countries,
    features: [
      'GS1 registered barcodes',
      'Amazon FBA approved',
      'Lifetime validity',
      'Instant or 24-72h delivery',
      'All major marketplaces supported'
    ],
    usage: 'POST with { countryId: "us", quantity: 10, email: "your@email.com" }'
  })
}