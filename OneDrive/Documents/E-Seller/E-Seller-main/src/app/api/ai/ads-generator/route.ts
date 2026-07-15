'use strict'

import { NextRequest, NextResponse } from 'next/server'

// AI Ads Generator - Create TikTok Ads, UGC scripts, competitor analysis

interface AdScript {
  hook: string
  body: string
  cta: string
  duration: number
  platform: string
  style: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product, platform, adType, targetAudience, goal } = body

    if (!product) {
      return NextResponse.json({ success: false, error: 'Provide product name' }, { status: 400 })
    }

    // Generate ad scripts
    const scripts = generateAdScripts(product, targetAudience, goal)
    const hooks = generateHooks(product, adType)
    const ugcScripts = generateUGCScripts(product)
    
    return NextResponse.json({
      success: true,
      product,
      platform: platform || 'tiktok',
      targetAudience: targetAudience || '18-35',
      goal: goal || ' conversions',
      ads: {
        scripts: scripts,
        hooks: hooks.slice(0, 5),
        ugc: ugcScripts.slice(0, 3),
        ctas: ['Shop now', 'Limited time offer', 'Free shipping', 'Buy one get one']
      },
      video: {
        duration: [15, 30, 60],
        aspectRatio: '9:16',
        style: 'UGC authentic'
      },
      budget: {
        daily: '$50-100',
        recommended: '$75',
        platforms: ['TikTok', 'Facebook', 'Instagram']
      }
    })

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to generate ads' }, { status: 500 })
  }
}

function generateAdScripts(product: string, audience?: string, goal?: string): string[] {
  return [
    `Ever tried ${product}? Game changer! 🔥`,
    `Stop scrolling! This ${product} is everything.`,
    `POV: You found the best ${product} ever 🫡`,
    `Not clickbait - this ${product} actually works.`,
    `My wallet thanks me every time I buy this ${product} 💸`
  ]
}

function generateHooks(product: string, adType?: string): string[] {
  return [
    `STOP scrolling if you want the best ${product}! 🛑`,
    `POV: You just discovered the ${product} everyone is talking about`,
    `The ${product} that changed everything for me...`,
    `$product Hack: You need this! | Tech TikTok`,
    `Nobody talks about this ${product} but...`
  ]
}

function generateUGCScripts(product: string): object[] {
  return [
    { type: 'testimonial', script: `I've been using this ${product} for 3 months and...`, duration: 30 },
    { type: 'unboxing', script: `Opening this ${product} was insane!`, duration: 45 },
    { type: 'comparison', script: `${product} vs expensive brand - results?`, duration: 60 },
    { type: 'beforeafter', script: `Before and after using ${product}...`, duration: 30 }
  ]
}

export async function GET() {
  return NextResponse.json({
    service: 'AI Ads Generator',
    features: ['TikTok Ads', 'UGC Scripts', 'Competitor Analysis', 'Budget recommendations'],
    usage: 'POST with { product: "phone charger", platform: "tiktok", goal: "conversions" }'
  })
}