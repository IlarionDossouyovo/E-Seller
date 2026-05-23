'use strict'

import { NextRequest, NextResponse } from 'next/server'

// Environment variables
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'https://api.ollama.com'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'tinyllama'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const OPENHANDS_API_KEY = process.env.OPENHANDS_API_KEY || ''

const SYSTEM_PROMPT = `You are E-Seller AI Assistant. 
Based on the user's search query, find 4 winning product opportunities.
Return in this format:
1. Product Name
- Price: $XX.XX
- Profit Margin: XX%
- Est. Revenue: $XX,XXX/month
- Growth: +XX%`

// ============== OLLAMA (Local) ==============
async function callOllama(query: string): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: query }
        ],
        stream: false
      })
    })

    if (!response.ok) {
      return ''
    }

    const data = await response.json()
    return data.message?.content || ''
  } catch (error) {
    console.error('Ollama error:', error)
    return ''
  }
}

// ============== OPENAI ==============
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
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: query }
        ]
      })
    })

    if (!response.ok) {
      return ''
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || ''
  } catch (error) {
    console.error('OpenAI error:', error)
    return ''
  }
}

// ============== OPENHANDS CLOUD ==============
async function callOpenHands(query: string): Promise<string> {
  if (!OPENHANDS_API_KEY) {
    return ''
  }
  
  try {
    const response = await fetch('https://app.all-hands.dev/api/v1/app-conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENHANDS_API_KEY}`
      },
      body: JSON.stringify({
        initial_message: {
          content: [{ type: 'text', text: query }]
        },
        title: 'E-Seller Product Research'
      })
    })

    if (!response.ok) {
      return ''
    }

    const data = await response.json()
    // OpenHands starts async, return status URL
    return `OpenHands Cloud conversation started. Check: https://app.all-hands.dev/conversations/${data.app_conversation_id}`
  } catch (error) {
    console.error('OpenHands error:', error)
    return ''
  }
}

// ============== MOCK FALLBACK ==============
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
  
  const providers = []
  if (OPENHANDS_API_KEY) providers.push('OpenHands')
  if (OPENAI_API_KEY) providers.push('OpenAI')
  if (process.env.OLLAMA_HOST) providers.push('Ollama')
  
  if (providers.length > 0) {
    result += `Available AI: ${providers.join(', ')}\n`
    result += `Configure missing keys in Vercel settings.\n`
  } else {
    result += '*Configure AI in Vercel for real results*\n'
  }

  return result
}

// ============== MAIN HANDLER ==============
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, provider } = body

    if (!message) {
      return NextResponse.json({
        success: false,
        error: 'Missing message field'
      }, { status: 400 })
    }

    // Priority: user choice > Ollama > OpenAI > OpenHands > Mock
    let resultMessage = ''
    let selectedProvider = ''
    let ollamaAvailable = false
    let openaiAvailable = false
    let openhandsAvailable = false

    // Check availability
    try {
      const testOllama = await fetch(`${OLLAMA_HOST}/api/tags`, { method: 'GET' })
      ollamaAvailable = testOllama.ok
    } catch { ollamaAvailable = false }
    openaiAvailable = !!OPENAI_API_KEY
    openhandsAvailable = !!OPENHANDS_API_KEY

    // User-specified provider or auto-detect
    if (provider === 'ollama' || (!provider && ollamaAvailable)) {
      resultMessage = await callOllama(message)
      selectedProvider = 'ollama'
    } else if (provider === 'openai' || (!provider && openaiAvailable)) {
      resultMessage = await callOpenAI(message)
      selectedProvider = 'openai'  
    } else if (provider === 'openhands' || (!provider && openhandsAvailable)) {
      resultMessage = await callOpenHands(message)
      selectedProvider = 'openhands'
    }

    // Fallback chain
    if (!resultMessage) {
      if (!provider) {
        // Try all
        resultMessage = await callOllama(message) || await callOpenAI(message) || await callOpenHands(message)
      }
      
      if (resultMessage) {
        selectedProvider = 'ollama'
        if (!await callOllama(message).then(r => r, () => '')) {
          selectedProvider = 'openai'
          if (!await callOpenAI(message).then(r => r, () => '')) {
            selectedProvider = 'openhands'
          }
        }
      }
    }

    // Final fallback
    if (!resultMessage) {
      resultMessage = generateMockProducts(message)
      selectedProvider = 'mock'
    }

    return NextResponse.json({
      success: true,
      message: resultMessage,
      provider: selectedProvider,
      available: {
        ollama: ollamaAvailable,
        openai: openaiAvailable,
        openhands: openhandsAvailable
      }
    })

  } catch (error) {
    console.error('Unified AI Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}