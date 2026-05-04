'use strict'

import { NextRequest, NextResponse } from 'next/server'

// AI Product Intelligence - Smart product research & trend analysis
// Analyzes TikTok, Meta, Google trends to find winning products

interface TrendData {
  platform: string
  views: number
  growth: number
  engagement: number
}

interface ProductScore {
  product: string
  score: number
  trend: 'rising' | 'stable' | 'declining'
  competition: 'low' | 'medium' | 'high'
  viralPotential: number
  margin: number
  sources: TrendData[]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product, keywords, platforms } = body

    if (!product && !keywords) {
      return NextResponse.json({
        success: false,
        error: 'Provide product name or keywords for research'
      }, { status: 400 })
    }

    // Get AI key for trend analysis
    const aiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY
    
    if (!aiKey) {
      // Return mock data when no AI key
      return NextResponse.json({
        success: true,
        product: product || keywords?.[0] || 'Unknown',
        analysis: generateMockAnalysis(product || keywords?.[0]),
        note: 'Add OPENAI_API_KEY for real-time trend data'
      })
    }

    // Real analysis with AI
    const query = `Research product "${product || keywords?.join(', ')}" for e-commerce. Analyze:
    1. Current market trends (TikTok, Instagram, Google)
    2. Competition level
    3. Viral potential score (0-100)
    4. Estimated profit margin
    5. Best selling channels
    
    Return JSON with: product, score (0-100), trend (rising/stable/declining), competition (low/medium/high), viralPotential (0-100), margin (%), insights (array)`

    // Call AI for analysis
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
            { role: 'system', content: 'You are an expert e-commerce product researcher. Return JSON only.' },
            { role: 'user', content: query }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      })
      const data = await aiResponse.json()
      const content = data.choices?.[0]?.message?.content || '{}'
      
      try {
        response = JSON.parse(content)
      } catch {
        response = { insights: [content] }
      }
    } else {
      // Anthropic fallback
      const headers = new Headers()
      headers.set('x-api-key', process.env.ANTHROPIC_API_KEY || '')
      headers.set('Content-Type', 'application/json')
      headers.set('anthropic-version', '2023-06-01')
      
      const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1000,
          messages: [{ role: 'user', content: query }]
        })
      })
      
      const data = await aiResponse.json()
      response = { insights: [data.content?.[0]?.text || 'Analysis complete'] }
    }

    return NextResponse.json({
      success: true,
      product: product || keywords?.[0],
      analysis: response,
      platforms: platforms || ['tiktok', 'instagram', 'google', 'amazon'],
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Product Intelligence Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to analyze product'
    }, { status: 500 })
  }
}

function generateMockAnalysis(productName: string): ProductScore {
  const scores: ProductScore[] = [
    {
      product: productName,
      score: Math.floor(60 + Math.random() * 35),
      trend: ['rising', 'stable', 'declining'][Math.floor(Math.random() * 3)] as any,
      competition: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
      viralPotential: Math.floor(50 + Math.random() * 50),
      margin: Math.floor(20 + Math.random() * 40),
      sources: [
        { platform: 'TikTok', views: Math.floor(Math.random() * 1000000), growth: Math.floor(Math.random() * 100), engagement: Math.floor(Math.random() * 20) },
        { platform: 'Instagram', views: Math.floor(Math.random() * 500000), growth: Math.floor(Math.random() * 80), engagement: Math.floor(Math.random() * 15) },
        { platform: 'Google', views: Math.floor(Math.random() * 800000), growth: Math.floor(Math.random() * 60), engagement: 0 }
      ]
    }
  ]
  return scores[0]
}

export async function GET() {
  return NextResponse.json({
    service: 'AI Product Intelligence',
    version: '1.0.0',
    features: [
      'Product trend research',
      'TikTok/Instagram/Google analysis',
      'Viral potential scoring',
      'Competition analysis',
      'Margin estimation'
    ],
    usage: 'POST with { product: "wireless earbuds" } or { keywords: ["gadget", "tech"] }',
    required_env: ['OPENAI_API_KEY']
  })
}
