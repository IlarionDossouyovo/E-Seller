'use strict'

import { NextRequest, NextResponse } from 'next/server'

// AI 360 - Enterprise AI Integration Platform
// Provides unified access to multiple AI providers

const AI360_API_KEY = process.env.AI360_API_KEY
const AI360_BASE_URL = process.env.AI360_BASE_URL || 'https://api.ai360.com/v1'

export async function POST(request: NextRequest) {
  try {
    if (!AI360_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'AI360_API_KEY not configured',
        message: 'Please add AI360_API_KEY to environment variables',
        required_env: ['AI360_API_KEY'],
        alternative: 'Use OPENAI_API_KEY or ANTHROPIC_API_KEY instead'
      }, { status: 500 })
    }

    const body = await request.json()
    const { model, message, provider, stream } = body

    if (!message) {
      return NextResponse.json({
        success: false,
        error: 'Missing message field'
      }, { status: 400 })
    }

    // Determine provider - AI360 supports multiple backends
    const selectedProvider = provider || 'openai'
    
    // Map AI360 provider names
    const providerMap: Record<string, string> = {
      'openai': 'gpt-4',
      'anthropic': 'claude-3',
      'google': 'gemini-pro',
      'cohere': 'command-r',
      'meta': 'llama-3'
    }

    const modelName = model || providerMap[selectedProvider] || 'gpt-4'

    // Call AI360 API
    const ai360Response = await fetch(`${AI360_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI360_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: 'You are E-Seller AI Assistant, a helpful e-commerce assistant.' },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        stream: false
      })
    })

    if (!ai360Response.ok) {
      const errorText = await ai360Response.text()
      return NextResponse.json({
        success: false,
        error: 'AI360 API error',
        details: errorText,
        status: ai360Response.status
      }, { status: ai360Response.status })
    }

    const data = await ai360Response.json()

    return NextResponse.json({
      success: true,
      message: data.choices?.[0]?.message?.content || 'No response',
      model: data.model,
      provider: 'ai360',
      usage: data.usage,
      done: true
    })

  } catch (error) {
    console.error('AI360 API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process AI360 request'
    }, { status: 500 })
  }
}

export async function GET() {
  const configured = Boolean(AI360_API_KEY)
  
  return NextResponse.json({
    service: 'AI 360 Integration',
    configured,
    providers: ['openai', 'anthropic', 'google', 'cohere', 'meta'],
    baseUrl: AI360_BASE_URL,
    required_env: ['AI360_API_KEY'],
    optional_env: ['AI360_BASE_URL'],
    usage: 'POST with { message: "your question", provider: "openai" }',
    note: 'AI360 provides unified API for multiple AI providers with enterprise features'
  })
}