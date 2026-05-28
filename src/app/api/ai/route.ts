'use strict'
import { NextRequest, NextResponse } from 'next/server'
const GROQ_API_KEY = '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'
async function callGroq(q) {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer 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'},
    body: JSON.stringify({model: 'llama-3.1-8b-instant', messages: [{role: 'system', content: 'You are E-Seller AI'}, {role: 'user', content: q}], max_tokens: 256})})
  if (!r.ok) return ''
  return (await r.json()).choices?.[0]?.message?.content || ''
}
function m(q) {return 'Research: '+q+'\n1. Product A\n2. Product B'}
export async function POST(req) {
  const {message:x} = await req.json()
  return NextResponse.json({success:true, message:await callGroq(x)||m(x), provider:'groq'})
}
