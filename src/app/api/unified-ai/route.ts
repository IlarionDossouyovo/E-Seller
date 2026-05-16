'use strict'

import { NextRequest, NextResponse } from 'next/server'

// Use environment variables
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'https://swiftness-heave-smirk.ngrok-free.dev'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''

async function callOllama(query: string): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: 'You are E-Seller AI Assistant. Respond ALWAYS in French (always answer in French). Return 4 product suggestions with names, prices, profit margins, estimated monthly revenue, and growth potential. Format as a numbered list. Always respond in French.' },
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
    return ''
  }
}

async function callOpenAI(query: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    return ''
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are E-Seller AI Assistant. Respond ALWAYS in French (always answer in French). Return 4 product suggestions with names, prices, profit margins, estimated monthly revenue, and growth potential. Format as a numbered list. Always respond in French.' },
          { role: 'user', content: query }
        ]
      })
    })

    if (!response.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || ''
  } catch (error) {
    console.error('OpenAI error:', error)
    return ''
  }
}

function generateMockProducts(query: string): string {
  const products = [
    { name: 'Premium Wireless Charger Pad', price: 29.99, margin: 65, revenue: 28500, growth: 145 },
    { name: 'Fast Charging USB-C Cable Kit', price: 19.99, margin: 58, revenue: 18200, growth: 89 },
    { name: 'Multi-Device Charging Station', price: 49.99, margin: 62, revenue: 32100, growth: 112 },
    { name: 'Magnetic Phone Mount Charger', price: 24.99, margin: 55, revenue: 15800, growth: 78 }
  ]

  let result = '# Recherche AI: "' + query + '"\n\n'
  result += 'Basé sur votre recherche, voici 4 opportunités de produits gagnants:\n\n'

  products.forEach((p: any, i: number) => {
    result += (i + 1) + '. ' + p.name + '\n'
    result += '- Prix: ' + p.price + '€\n'
    result += '- Marge: ' + p.margin + '%\n'
    result += '- Revenu estimé: ' + p.revenue.toLocaleString() + '€/mois\n'
    result += '- Croissance: +' + p.growth + '%\n\n'
  })

  result += '---\n'
  result += '*IA locale Ollama actif - Configurez OLLAMA_HOST dans Vercel*\n'

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

    return handleRequest(message)
  } catch (error) {
    console.error('Unified AI Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const message = searchParams.get('message') || ''

  if (!message) {
    return NextResponse.json({
      success: false,
      error: 'Missing message parameter'
    }, { status: 400 })
  }

  return handleRequest(message)
}

async function handleRequest(message: string) {
    // Try to use AI in order: Ollama -> OpenAI -> Mock
    const ollamaResponse = await callOllama(message)
    const openAIResponse = ollamaResponse ? '' : await callOpenAI(message)
    
    const resultMessage = ollamaResponse || openAIResponse || generateMockProducts(message)
    const provider = ollamaResponse ? 'ollama' : (openAIResponse ? 'openai' : 'mock')

    return NextResponse.json({
      success: true,
      message: resultMessage,
      provider: provider,
      ollamaAvailable: !!ollamaResponse,
      openaiAvailable: !!openAIResponse
    })
}