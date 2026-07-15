'use strict'

import { NextRequest, NextResponse } from 'next/server'

// AI Assistant API - Handles chat, voice, and AI functions
// Requires OPENAI_API_KEY or ANTHROPIC_API_KEY environment variable

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, mode, voice } = body

    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'API key not configured',
        message: 'Please add OPENAI_API_KEY or ANTHROPIC_API_KEY to environment variables'
      }, { status: 500 })
    }

    // Determine which AI provider to use
    const useOpenAI = Boolean(process.env.OPENAI_API_KEY)
    
    let response
    if (useOpenAI) {
      // OpenAI API call
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are E-Seller AI Assistant, a helpful e-commerce assistant.' },
            { role: 'user', content: message }
          ],
          max_tokens: 500
        })
      })
      
      const data = await openAIResponse.json()
      response = {
        success: true,
        message: data.choices?.[0]?.message?.content || 'No response',
        model:data.model,
        mode: voice ? 'voice' : 'text'
      }
    } else {
      // Anthropic API call
      const anthropicHeaders = new Headers()
      anthropicHeaders.set('x-api-key', process.env.ANTHROPIC_API_KEY || '')
      anthropicHeaders.set('Content-Type', 'application/json')
      anthropicHeaders.set('anthropic-version', '2023-06-01')
      
      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: anthropicHeaders,
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 500,
          messages: [{ role: 'user', content: message }]
        })
      })
      
      const data = await anthropicResponse.json()
      response = {
        success: true,
        message: data.content?.[0]?.text || 'No response',
        model: data.model,
        mode: voice ? 'voice' : 'text'
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('AI Assistant Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process AI request'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'E-Seller AI Assistant',
    modes: ['text', 'voice'],
    providers: ['OpenAI (GPT-4)', 'Anthropic (Claude)'],
    required_env: ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY']
  })
}