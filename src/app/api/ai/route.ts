'use strict'

import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = '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'

const SYSTEM_PROMPT = 'You are E-Seller AI.'

async function callGroq(q): Promise<string> {
  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': Bearer  },
      body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: q }], max_tokens: 256 })
    })
    if (!r.ok) return ''
    const d = await r.json()
    return d.choices?.[0]?.message?.content || ''
  } catch { return '' }
}

function mock(q): string { return '# Research: ' + q + '\n\n1. Product A\n2. Product B\n3. Product C\n4. Product D' }

export async function POST(request) {
  const { message } = await request.json()
  const res = await callGroq(message) || mock(message)
  return NextResponse.json({ success: true, message: res, provider: GROQ_API_KEY ? 'groq' : 'mock' })
}
