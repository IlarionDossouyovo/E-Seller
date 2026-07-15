import { NextResponse } from 'next/server'
import { getConfiguredServices, getAllServiceConfigs, supabaseConfig, stripeConfig, aiConfig, ollamaConfig, cloudinaryConfig } from '@/lib/config'

export async function GET() {
  const services = getConfiguredServices()
  const configs = getAllServiceConfigs()
  
  const status = {
    app: 'E-Seller',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      supabase: {
        configured: Boolean(supabaseConfig.url && supabaseConfig.anonKey),
        url: supabaseConfig.url,
        hasAnonKey: Boolean(supabaseConfig.anonKey),
        hasServiceKey: Boolean(supabaseConfig.serviceKey),
        tables: ['products', 'orders', 'customers', 'analytics'],
      },
      stripe: {
        configured: Boolean(stripeConfig.publishableKey),
        hasSecretKey: Boolean(stripeConfig.secretKey),
        hasPublishableKey: Boolean(stripeConfig.publishableKey),
        hasWebhookSecret: Boolean(stripeConfig.webhookSecret),
        features: ['checkout', 'webhooks', 'subscriptions'],
      },
      openai: {
        configured: Boolean(aiConfig.openAIKey),
        required: ['AI Assistant', 'Voice Audit'],
        models: ['gpt-4o', 'gpt-4-turbo', 'whisper-1'],
      },
      anthropic: {
        configured: Boolean(aiConfig.anthropicKey),
        required: ['AI Assistant (alternative)'],
        models: ['claude-3-5-sonnet'],
      },
      ai360: {
        configured: Boolean(aiConfig.ai360Key),
        baseUrl: aiConfig.ai360BaseUrl,
        providers: ['openai', 'anthropic', 'google', 'cohere', 'meta'],
      },
      ollama: {
        configured: true, // Always configured (local)
        host: ollamaConfig.host,
        model: ollamaConfig.model,
        required: ['Local AI', 'Offline inference'],
        setup: 'curl -fsSL https://ollama.com/install.sh | sh',
      },
      cloudinary: {
        configured: Boolean(cloudinaryConfig.cloudName),
        hasCloudName: Boolean(cloudinaryConfig.cloudName),
        hasApiKey: Boolean(cloudinaryConfig.apiKey),
        hasApiSecret: Boolean(cloudinaryConfig.apiSecret),
        required: ['Image uploads', 'Media optimization'],
      },
    },
    configuredServices: services,
    totalServices: services.length,
    endpoints: {
      status: '/api/status',
      unifiedAI: '/api/unified-ai',
      aiAssistant: '/api/ai-assistant',
      ai360: '/api/ai-360',
      ollama: '/api/ollama',
      voiceAudit: '/api/voice-audit',
      checkout: '/api/checkout',
      products: '/api/products',
      orders: '/api/orders',
      customers: '/api/customers',
      upload: '/api/upload',
    },
  }
  
  return NextResponse.json(status)
}