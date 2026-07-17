import { NextRequest, NextResponse } from 'next/server'

// Ollama Configuration (Local AI - Prioritaire)
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2'

// Fallback response if Ollama is not available
function m(q: string): string {
  return `Research: ${q}\n1. Product A\n2. Product B`
}

// Call Ollama API (Local)
async function callOllama(q: string): Promise<string> {
  try {
    const r = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: 'You are E-Seller AI, a helpful e-commerce assistant.' },
          { role: 'user', content: q }
        ],
        stream: false
      })
    })
    if (!r.ok) return ''
    const data = await r.json() as { message?: { content?: string } }
    return data.message?.content || ''
  } catch (error) {
    console.error('Ollama error:', error)
    return ''
  }
}

export async function POST(req: NextRequest) {
  const { message: x } = await req.json() as { message: string }
  
  // Try Ollama first (local AI)
  const response = await callOllama(x)
  
  return NextResponse.json({
    success: true,
    message: response || m(x),
    provider: 'ollama',
    model: OLLAMA_MODEL
  })
}
