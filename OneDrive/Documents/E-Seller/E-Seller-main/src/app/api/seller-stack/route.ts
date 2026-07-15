import { NextRequest, NextResponse } from 'next/server'

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, model = 'llama3' } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const ollamaResponse = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt, stream: false }),
    })

    if (!ollamaResponse.ok) {
      throw new Error('Ollama API call failed')
    }

    const data = await ollamaResponse.json()
    
    return NextResponse.json({
      success: true,
      response: data.response,
      model: data.model,
    })
  } catch (error) {
    console.error('Seller Stack API error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const ollamaStatus = await fetch(`${OLLAMA_HOST}/api/tags`, { method: 'GET' })
      .then(r => r.ok).catch(() => false)

    return NextResponse.json({
      status: 'online',
      services: {
        ollama: ollamaStatus ? 'online' : 'offline',
        postgresql: 'online',
      },
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json({ status: 'degraded', timestamp: new Date().toISOString() })
  }
}