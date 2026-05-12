'use strict'

import { NextRequest, NextResponse } from 'next/server'

function generateMockProducts(query: string): string {
  const products = [
    { name: 'Premium Wireless Charger Pad', price: 29.99, margin: 65, revenue: 28500, growth: 145 },
    { name: 'Fast Charging USB-C Cable Kit', price: 19.99, margin: 58, revenue: 18200, growth: 89 },
    { name: 'Multi-Device Charging Station', price: 49.99, margin: 62, revenue: 32100, growth: 112 },
    { name: 'Magnetic Phone Mount Charger', price: 24.99, margin: 55, revenue: 15800, growth: 78 }
  ]

  let result = '# AI Product Research: "' + query + '"\n\n'
  result += 'Based on your search, here are 4 winning product opportunities:\n\n'

  products.forEach((p: any, i: number) => {
    result += (i + 1) + '. ' + p.name + '\n'
    result += '- Price: $' + p.price + '\n'
    result += '- Profit Margin: ' + p.margin + '%\n'
    result += '- Est. Revenue: $' + p.revenue.toLocaleString() + '/month\n'
    result += '- Growth: +' + p.growth + '%\n\n'
  })

  result += '---\n'
  result += '*Configure OPENAI_API_KEY in Vercel for real AI research*\n'

  return result
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({
        success: false,
        error: 'Missing message field'
      }, { status: 400 })
    }

    const selectedProvider = 'openai'
    const response = { message: generateMockProducts(message) }

    const result = {
      success: true,
      message: response.message,
      provider: selectedProvider
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Unified AI Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}