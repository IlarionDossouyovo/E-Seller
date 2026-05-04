import { NextResponse } from 'next/server'
import { getConfiguredServices, supabaseConfig, stripeConfig, aiConfig, cloudinaryConfig } from '@/lib/config'

export async function GET() {
  const services = getConfiguredServices()
  
  const status = {
    app: 'E-Seller',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    services: {
      supabase: {
        configured: Boolean(supabaseConfig.url && supabaseConfig.anonKey),
        url: supabaseConfig.url,
        hasAnonKey: Boolean(supabaseConfig.anonKey),
      },
      stripe: {
        configured: Boolean(stripeConfig.publishableKey),
        hasSecretKey: Boolean(stripeConfig.secretKey),
        hasPublishableKey: Boolean(stripeConfig.publishableKey),
      },
      openai: {
        configured: Boolean(aiConfig.openAIKey),
        required: ['Voice Audit', 'AI Assistant'],
      },
      anthropic: {
        configured: Boolean(aiConfig.anthropicKey),
        required: ['AI Assistant (alternative)'],
      },
      cloudinary: {
        configured: Boolean(cloudinaryConfig.cloudName),
        required: ['Image uploads'],
      },
    },
    configuredServices: services,
    totalServices: services.length,
  }
  
  return NextResponse.json(status)
}