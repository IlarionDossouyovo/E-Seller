// Version 2.2 - DEPLOY THIS NOW - VERYM3

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
  const q = query.toLowerCase()
  
  // Log for debugging
  console.log('Mock query:', q)
  
  // Simple matching - always return relevant products based on query
  let products: any[] = []
  
  // Match watches - check HOMME first, then FEMME
  if (q.includes('montre') || q.includes('watch')) {
    // Check for homme FIRST
    if (q.includes('homme') || q.includes('man')) {
      // Male watches
      products = [
        { name: 'Montre Chronographe Homme', price: 149.99, margin: 50, revenue: 42500, growth: 156 },
        { name: 'Montre Automatique Or', price: 249.99, margin: 40, revenue: 28500, growth: 89 },
        { name: 'Montre Sport Titanium', price: 199.99, margin: 45, revenue: 35200, growth: 112 },
        { name: 'Montre Classique Cuir Noir', price: 179.99, margin: 42, revenue: 21800, growth: 78 }
      ]
    } else if (q.includes('femme') || q.includes('woman') || q.includes('dior')) {
      // Female watches
      products = [
        { name: 'Montre Connectée Sport Femme', price: 89.99, margin: 55, revenue: 35200, growth: 145 },
        { name: 'Montre Minimaliste Cuir', price: 129.99, margin: 45, revenue: 28500, growth: 89 },
        { name: 'Montre Smart Fitness Dior', price: 149.99, margin: 50, revenue: 42300, growth: 112 },
        { name: 'Montre Classique Or Rose', price: 199.99, margin: 40, revenue: 15800, growth: 78 }
      ]
    } else {
      // Default watches
      products = [
        { name: 'Montre Connectée Sport Femme', price: 89.99, margin: 55, revenue: 35200, growth: 145 },
        { name: 'Montre Minimaliste Cuir', price: 129.99, margin: 45, revenue: 28500, growth: 89 },
        { name: 'Montre Smart Fitness Dior', price: 149.99, margin: 50, revenue: 42300, growth: 112 },
        { name: 'Montre Classique Or Rose', price: 199.99, margin: 40, revenue: 15800, growth: 78 }
      ]
    }
  } else if (q.includes('electronique') || q.includes('ecouteurs') || q.includes('charger')) {
    products = [
      { name: 'Ecouteurs Sans Fil Pro', price: 49.99, margin: 65, revenue: 45200, growth: 156 },
      { name: 'Chargeur Rapide 65W', price: 24.99, margin: 58, revenue: 18500, growth: 89 },
      { name: 'Webcam HD Pro Streaming', price: 79.99, margin: 52, revenue: 27800, growth: 112 },
      { name: 'Microphone USB Condenser', price: 59.99, margin: 48, revenue: 16400, growth: 78 }
    ]
  } else if (q.includes('yoga') || q.includes('fitness') || q.includes('sport')) {
    products = [
      { name: 'Tapis Yoga Premium', price: 34.99, margin: 68, revenue: 21600, growth: 52 },
      { name: 'Haltères Adjustables', price: 49.99, margin: 62, revenue: 32400, growth: 89 },
      { name: 'Resistance Bands Pro', price: 19.99, margin: 72, revenue: 18200, growth: 145 },
      { name: 'Foam Roller_massage', price: 24.99, margin: 55, revenue: 12800, growth: 67 }
    ]
  } else {
    // Default products
    products = [
      { name: 'Produit Tendance Dropshipping', price: 29.99, margin: 65, revenue: 28500, growth: 145 },
      { name: 'Accessoire Populaire TikTok', price: 19.99, margin: 58, revenue: 18200, growth: 89 },
      { name: 'Article Viral Récent', price: 49.99, margin: 62, revenue: 32100, growth: 112 },
      { name: 'Nouveauté Importante', price: 24.99, margin: 55, revenue: 15800, growth: 78 }
    ]
  }

  let result = '# Recherche IA: "' + query + '"\n\n'
  result += 'En analysant votre requête, voici 4 opportunités:\n\n'

  products.forEach((p: any, i: number) => {
    result += (i + 1) + '. ' + p.name + '\n'
    result += '- Prix: ' + p.price + '€\n'
    result += '- Marge: ' + p.margin + '%\n'
    result += '- Revenu: ' + p.revenue.toLocaleString() + '€/mois\n'
    result += '- Croissance: +' + p.growth + '%\n\n'
  })

  result += '---\n'
  result += '*Connexion Ollama inactive sur Vercel*\n'

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