import { NextRequest, NextResponse } from 'next/server'
const K = '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'
async function c(q) {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer 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'},
    body: JSON.stringify({model: 'llama-3.1-8b-instant', messages: [{role: 'system', content: 'You are E-Seller AI'}, {role: 'user', content: q}], max_tokens: 256})})
  if (!r.ok) return ''
  return (await r.json()).choices?.[0]?.message?.content || ''
}
export async function GET(r) {
  const x = r.nextUrl.searchParams.get('message')||''
  const m = await c(x) || 'Demo: ' + x
  return NextResponse.json({success:true, message:m, provider:'groq'})
}
export async function POST(r) {
  const {message:x}=await r.json()
  return NextResponse.json({success:true, message:await c(x)||'Demo', provider:'groq'})
}
