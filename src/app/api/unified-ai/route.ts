import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = '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'
const HF_TOKEN = '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'

async function callGroq(q): Promise<string> {
  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': Bearer  },
      body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'system', content: 'You are E-Seller AI' }, { role: 'user', content: q }], max_tokens: 256 })
    })
    if (!r.ok) return ''
    const d = await r.json()
    return d.choices?.[0]?.message?.content || ''
  } catch { return '' }
}

function mock(q): string { return '# Recherche: ' + q + '\n\n1. Produit A\n2. Produit B\n3. Produit C\n4. Produit D' }

export async function GET(request) {
  const msg = new URL(request.url).searchParams.get('message') || ''
  const res = await callGroq(msg) || mock(msg)
  return NextResponse.json({ success: true, message: res, provider: GROQ_API_KEY ? 'groq' : 'mock' })
}

export async function POST(request) {
  const { message } = await request.json()
  const res = await callGroq(message) || mock(message)
  return NextResponse.json({ success: true, message: res, provider: GROQ_API_KEY ? 'groq' : 'mock' })
}
