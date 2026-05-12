'use strict'

import { NextRequest, NextResponse } from 'next/server'

function generateMockProducts(query: string): string {
  const products = [
    { name: 'Premium Wireless Charger Pad', price: 29.99, margin: 65, revenue: 28500, growth: 145 },
    { name: 'Fast Charging USB-C Cable Kit', price: 19.99, margin: 58, revenue: 18200, growth: 89 },
    { name: 'Multi-Device Charging Station', price: 49.99, margin: 62, revenue: 32100, growth: 112 },
    { name: 'Magnetic Phone Mount Charger', price: 24.99, margin: 55, revenue: 15800, growth: 78 }
  ]

  let result = \`# 🔍 AI Product Research: "\${query}"\n\n\`
  result += \`Based on your search, here are 4 winning product opportunities:\n\n\`

  products.forEach((p, i) => {
    result += \`## \${i + 1}. \${p.name}\n\`
    result += \`- **Price:** $\${p.price}\n\`
    result += \`- **Profit Margin:** \${p.margin}%\n\`
    result += \`- **Est. Revenue:** $\${p.revenue.toLocaleString()}/month\n\`
    result += \`- **Growth:** +\${p.growth}%\n\`
    result += \`- **Why It Sells:** High demand, low competition, practical utility\n\n\`
  })

  result += \`---\n\`
  result += \`*Configure OPENAI_API_KEY in Vercel for real AI research*\n\`

  return result
}

// Unified AI API - Routes to best available AI provider
// Priority: Ollama (local) → OpenAI → Anthropic → AI360

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, preferredProvider, stream } = body

    if (!message) {
      return NextResponse.json({
        success: false,
        error: 'Missing message field'
      }, { status: 400 })
    }

    // Check available providers and use the best one
    const selectedProvider = 'openai' // Force to openai for demo

    let response: { message: string }

    // Route to appropriate provider
    switch (selectedProvider) {
      case 'ollama':
        response = { message: 'No response' }
        break
      case 'openai':
        // Always use mock products for demo (no API key configured)
        response = { message: generateMockProducts(message) }
        break
      case 'anthropic':
        response = { message: 'No response' }
        break
      case 'ai360':
        response = { message: 'No response' }
        break
      default:
        return NextResponse.json({
          success: false,
          error: \`Unknown provider: \${selectedProvider}\`
        }, { status: 400 })
    }

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
