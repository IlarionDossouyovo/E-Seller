'use strict'

import { NextRequest, NextResponse } from 'next/server'

// Use environment variables
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'https://swiftness-heave-smirk.ngrok-free.dev'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral'

async function callOllama(query: string): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: 'You are E-Seller AI Assistant. Return product suggestions with names, prices, profit margins, estimated monthly revenue, and growth potential. Format as a numbered list.' },
          { role: 'user', content: query }
        ],
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error('Ollama not available')
    }

    const data = await response.json()
    return data.message?.content || ''
  } catch (error) {
    console.error('Ollama error:', error)
    return null
  }
}

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
  result += '*Using Ollama local AI - Configure OLLAMA_HOST and OLLAMA_MODEL in Vercel for production*\n'

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

    // Try to use Ollama first
    const aiResponse = await callOllama(message)
    
    // Use Ollama response or fallback to mock
    const resultMessage = aiResponse || generateMockProducts(message)
    const provider = aiResponse ? 'ollama' : 'mock'

    const result = {
      success: true,
      message: resultMessage,
      provider: provider,
      ollamaAvailable: !!aiResponse
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