'use strict'

import { NextRequest, NextResponse } from 'next/server'

function generateMockProducts(query: string): string {
  const products = [
    { name: 'Premium Wireless Charger Pad', price: 29.99, margin: 65, revenue: 28500, growth: 145 },
    { name: 'Fast Charging USB-C Cable Kit', price: 19.99, margin: 58, revenue: 18200, growth: 89 },
    { name: 'Multi-Device Charging Station', price: 49.99, margin: 62, revenue: 32100, growth: 112 },
    { name: 'Magnetic Phone Mount Charger', price: 24.99, margin: 55, revenue: 15800, growth: 78 }
  ]
  
  const queryLower = query.toLowerCase()
  
  let result = `# 🔍 AI Product Research: "${query}"\n\n`
  result += `Based on your search, here are 4 winning product opportunities:\n\n`
  
  products.forEach((p, i) => {
    result += `## ${i + 1}. ${p.name}\n`
    result += `- **Price:** $${p.price}\n`
    result += `- **Profit Margin:** ${p.margin}%\n`
    result += `- **Est. Revenue:** $${p.revenue.toLocaleString()}/month\n`
    result += `- **Growth:** +${p.growth}%\n`
    result += `- **Why It Sells:** High demand, low competition, practical utility\n\n`
  })
  
  result += `---\n`
  result += `*Configure OPENAI_API_KEY in Vercel for real AI research*\n`
  
  return result
}

import { NextRequest, NextResponse } from 'next/server'

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
    const providers = {
      ollama: await checkOllama(),
      openai: Boolean(process.env.OPENAI_API_KEY),
      anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
      ai360: Boolean(process.env.AI360_API_KEY)
    }

    // Select provider based on preference or availability
    let selectedProvider = preferredProvider || 'auto'
    
    if (selectedProvider === 'auto') {
      // Priority order: Ollama > OpenAI > Anthropic > AI360
      if (providers.ollama) selectedProvider = 'ollama'
      else if (providers.openai) selectedProvider = 'openai'
      else if (providers.anthropic) selectedProvider = 'anthropic'
      else if (providers.ai360) selectedProvider = 'ai360'
      else selectedProvider = 'none'
    }

    if (selectedProvider === 'none') {
      return NextResponse.json({
        success: false,
        error: 'No AI provider available',
        availableProviders: providers,
        setup: {
          ollama: 'curl -fsSL https://ollama.com/install.sh | sh',
          openai: 'Add OPENAI_API_KEY',
          anthropic: 'Add ANTHROPIC_API_KEY',
          ai360: 'Add AI360_API_KEY'
        }
      }, { status: 503 })
    }

    let response

    // If no AI provider is available, provide mock product research
    if (selectedProvider === 'none') {
      const mockProducts = generateMockProducts(message)
      return NextResponse.json({
        success: true,
        response: mockProducts,
        provider: 'demo',
        message: 'Demo mode - Configure AI provider for real results'
      })
    }

    // Route to appropriate provider
    switch (selectedProvider) {
      case 'ollama':
        response = await callOllama(message)
        break
      case 'openai':
        response = await callOpenAI(message)
        break
      case 'anthropic':
        response = await callAnthropic(message)
        break
      case 'ai360':
        response = await callAI360(message)
        break
      default:
        return NextResponse.json({
          success: false,
          error: `Unknown provider: ${selectedProvider}`
        }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      ...response,
      provider: selectedProvider
    })

  } catch (error) {
    console.error('Unified AI Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

async function checkOllama(): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.OLLAMA_HOST || 'https://swiftness-heave-smirk.ngrok-free.dev'}/api/tags`, {
      signal: AbortSignal.timeout(3000)
    })
    return response.ok
  } catch {
    return false
  }
}

async function callOllama(message: string) {
  const host = process.env.OLLAMA_HOST || 'https://swiftness-heave-smirk.ngrok-free.dev'
  const model = process.env.OLLAMA_MODEL || 'llama3.2'
  
  const response = await fetch(`${host}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: message }],
      stream: false
    })
  })

  const data = await response.json()
  return {
    message: data.message?.content || 'No response',
    model: data.model,
    local: true
  }
}

async function callOpenAI(message: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are E-Seller AI Assistant.' },
        { role: 'user', content: message }
      ],
      max_tokens: 1000
    })
  })

  const data = await response.json()
  return {
    message: data.choices?.[0]?.message?.content || 'No response',
    model: data.model
  }
}

async function callAnthropic(message: string) {
  const headers = new Headers()
  headers.set('x-api-key', process.env.ANTHROPIC_API_KEY || '')
  headers.set('Content-Type', 'application/json')
  headers.set('anthropic-version', '2023-06-01')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [{ role: 'user', content: message }]
    })
  })

  const data = await response.json()
  return {
    message: data.content?.[0]?.text || 'No response',
    model: data.model
  }
}

async function callAI360(message: string) {
  const response = await fetch(`${process.env.AI360_BASE_URL || 'https://api.ai360.com/v1'}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.AI360_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are E-Seller AI Assistant.' },
        { role: 'user', content: message }
      ]
    })
  })

  const data = await response.json()
  return {
    message: data.choices?.[0]?.message?.content || 'No response',
    model: data.model
  }
}

export async function GET() {
  // Check all providers
  const providers = {
    ollama: await checkOllama(),
    openai: Boolean(process.env.OPENAI_API_KEY),
    anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
    ai360: Boolean(process.env.AI360_API_KEY)
  }

  return NextResponse.json({
    service: 'E-Seller Unified AI',
    version: '1.0.0',
    providers,
    defaultProvider: providers.ollama ? 'ollama' : 
                   providers.openai ? 'openai' : 
                   providers.anthropic ? 'anthropic' : 
                   providers.ai360 ? 'ai360' : 'none',
    usage: {
      route: 'POST /api/unified-ai with { message: "hello" }',
      specify: 'POST /api/unified-ai with { message: "hi", preferredProvider: "openai" }'
    },
    endpoints: {
      ollama: '/api/ollama',
      openai: '/api/ai-assistant',
      ai360: '/api/ai-360'
    }
  })
}