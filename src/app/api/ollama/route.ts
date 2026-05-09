'use strict'

import { NextRequest, NextResponse } from 'next/server'

// Ollama Local AI API
// Runs self-hosted AI models locally

// Use hardcoded localtunnel URL (env var has old value)
const OLLAMA_HOST = 'https://nice-walls-bow.loca.lt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { model, message, stream } = body

    if (!model || !message) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: model, message'
      }, { status: 400 })
    }

    // Check if Ollama is running locally
    let ollamaAvailable = false
    try {
      const healthCheck = await fetch(`${OLLAMA_HOST}/api/tags`, { 
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      })
      ollamaAvailable = healthCheck.ok
    } catch {
      ollamaAvailable = false
    }

    if (!ollamaAvailable) {
      return NextResponse.json({
        success: false,
        error: 'Ollama not available',
        message: 'Ollama server is not running. Start with: ollama serve',
        installInstructions: [
          'curl -fsSL https://ollama.com/install.sh | sh',
          'ollama serve',
          'ollama pull llama3.2'
        ]
      }, { status: 503 })
    }

    // Call Ollama API
    const ollamaResponse = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are E-Seller AI Assistant, a helpful e-commerce assistant.' },
          { role: 'user', content: message }
        ],
        stream: false
      })
    })

    if (!ollamaResponse.ok) {
      const error = await ollamaResponse.text()
      return NextResponse.json({
        success: false,
        error: 'Ollama API error',
        details: error
      }, { status: 500 })
    }

    const data = await ollamaResponse.json()

    return NextResponse.json({
      success: true,
      message: data.message?.content || 'No response',
      model: data.model,
      done: data.done,
      provider: 'ollama',
      local: true
    })

  } catch (error) {
    console.error('Ollama API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process Ollama request'
    }, { status: 500 })
  }
}

export async function GET() {
  // Check available models
  let models = []
  let available = false

  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`, { 
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    })
    if (response.ok) {
      const data = await response.json()
      models = data.models || []
      available = true
    }
  } catch {
    available = false
  }

  return NextResponse.json({
    service: 'E-Seller Ollama API',
    available,
    host: OLLAMA_HOST,
    models: models.map((m: { name: string }) => m.name),
    setup: available ? null : {
      install: 'curl -fsSL https://ollama.com/install.sh | sh',
      start: 'ollama serve',
      pull: 'ollama pull llama3.2'
    },
    required_env: ['OLLAMA_HOST'],
    usage: 'POST with { model: "llama3.2", message: "your question" }'
  })
}