'use strict'

import { NextRequest, NextResponse } from 'next/server'

// AI Business Assistant - Chat GPT for business strategies

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context, mode } = body

    if (!message) {
      return NextResponse.json({ success: false, error: 'Provide your question' }, { status: 400 })
    }

    const aiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY
    
    // Response modes
    const modes = {
      strategy: 'Provide strategic business advice with data-backed recommendations',
      general: 'Answer e-commerce and business questions',
      optimization: 'Analyze and optimize campaigns, pricing, operations',
      product: 'Product research and sourcing advice'
    }

    if (!aiKey) {
      // Mock response without AI
      return NextResponse.json({
        success: true,
        message: message.toLowerCase().includes('product') 
          ? 'For product research, I recommend analyzing TikTok and Google Trends first. Look for products with: high engagement, reasonable competition, 30%+ margin potential.'
          : message.toLowerCase().includes('ads')
          ? 'For ad optimization, start with A/B testing hooks. TikTok works best with authentic UGC content. Aim for 3-5 ROAS minimum.'
          : 'I can help with strategy, product research, and campaign optimization. What specific area would you like to focus on?',
        suggestions: [
          'How to find winning products?',
          'Best ad creatives for TikTok?',
          'How to optimize pricing?',
          'Campaign optimization tips?'
        ],
        resources: [
          'TikTok Ads Manager',
          'Google Trends',
          'Helium10',
          'Jungle Scout'
        ]
      })
    }

    // Real AI response
    const systemPrompt = `You are E-Seller AI Business Assistant. You are an expert in:
    - E-commerce strategy
    - Product research and sourcing
    - Digital marketing (TikTok, Facebook, Instagram)
    - Pricing and positioning
    - Supply chain optimization
    
    ${modes[mode as keyof typeof modes] || modes.general}

    Provide actionable, specific advice.`

    let response
    if (process.env.OPENAI_API_KEY) {
      const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Context: ${context || 'General'}\n\nQuestion: ${message}` }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      })
      const data = await aiResponse.json()
      response = { answer: data.choices?.[0]?.message?.content || 'Analysis complete' }
    } else {
      const headers = new Headers()
      headers.set('x-api-key', process.env.ANTHROPIC_API_KEY || '')
      headers.set('Content-Type', 'application/json')
      headers.set('anthropic-version', '2023-06-01')
      
      const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 800,
          messages: [{ role: 'user', content: `${systemPrompt}\n\nQuestion: ${message}` }]
        })
      })
      
      const data = await aiResponse.json()
      response = { answer: data.content?.[0]?.text || 'Analysis complete' }
    }

    return NextResponse.json({
      success: true,
      message: response.answer,
      mode: mode || 'general',
      suggestions: [
        'Tell me about product trends',
        'Optimize my ad campaign',
        'Pricing strategy help',
        'Supplier negotiation tips'
      ]
    })

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Assistant error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'AI Business Assistant',
    version: '1.0.0',
    modes: ['strategy', 'general', 'optimization', 'product'],
    exampleQuestions: [
      'What products are trending?',
      'How to optimize my Facebook ads?',
      'Best pricing strategy for new product?',
      'How to negotiate with suppliers?'
    ],
    usage: 'POST with { message: "your question", mode: "strategy" }',
    required_env: ['OPENAI_API_KEY or ANTHROPIC_API_KEY']
  })
}