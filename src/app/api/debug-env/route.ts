import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    groq: process.env.GROQ_API_KEY ? 'SET' : 'NOT SET',
    groqValue: process.env.GROQ_API_KEY?.substring(0, 10) + '...' || 'empty',
    allEnv: Object.keys(process.env).filter(k => k.includes('API') || k.includes('KEY') || k.includes('TOKEN'))
  })
}
