import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.GROQ_API_KEY || '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'

async function callGroq(q: string): Promise<string> {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are E-Seller AI' },
        { role: 'user', content: q }
      ],
      max_tokens: 256
    })
  })
  if (!r.ok) return ''
  const data = await r.json() as { choices?: Array<{ message?: { content?: string } }> }
  return data.choices?.[0]?.message?.content || ''
}

function m(q: string): string {
  return `Research: ${q}\n1. Product A\n2. Product B`
}

export async function POST(req: NextRequest) {
  const { message: x } = await req.json() as { message: string }
  return NextResponse.json({
    success: true,
    message: await callGroq(x) || m(x),
    provider: 'groq'
  })
}
