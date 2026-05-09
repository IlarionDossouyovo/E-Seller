// E-Seller Service Configuration
// All API keys and service credentials

// Supabase
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bauggttibriqdkfnlfhh.supabase.co',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ZesBx2jVeccDjJB56B2SWA_ZEKzoEWg',
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
}

// Stripe
export const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}

// OpenAI / Anthropic / AI 360
export const aiConfig = {
  openAIKey: process.env.OPENAI_API_KEY,
  anthropicKey: process.env.ANTHROPIC_API_KEY,
  ai360Key: process.env.AI360_API_KEY,
  ai360BaseUrl: process.env.AI360_BASE_URL,
}

// Ollama (local AI)
export const ollamaConfig = {
  host: process.env.OLLAMA_HOST || 'https://weak-stars-rush.loca.lt',
  model: process.env.OLLAMA_MODEL || 'llama3.2',
}

// Cloudinary
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
}

// App Config
export const appConfig = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
}

// Get service headers for Supabase REST API
export function getSupabaseHeaders() {
  return {
    'apikey': supabaseConfig.anonKey,
    'Authorization': `Bearer ${supabaseConfig.anonKey}`,
    'Content-Type': 'application/json',
  }
}

// Check which services are configured
export function getConfiguredServices() {
  const services = []
  
  if (supabaseConfig.url && supabaseConfig.anonKey) {
    services.push('supabase')
  }
  if (stripeConfig.publishableKey) {
    services.push('stripe')
  }
  if (aiConfig.openAIKey) {
    services.push('openai')
  }
  if (aiConfig.anthropicKey) {
    services.push('anthropic')
  }
  if (aiConfig.ai360Key) {
    services.push('ai360')
  }
  if (ollamaConfig.host) {
    services.push('ollama')
  }
  if (cloudinaryConfig.cloudName) {
    services.push('cloudinary')
  }
  
  return services
}

// Get all service configurations for debugging
export function getAllServiceConfigs() {
  return {
    supabase: {
      url: supabaseConfig.url,
      hasAnonKey: Boolean(supabaseConfig.anonKey),
      hasServiceKey: Boolean(supabaseConfig.serviceKey),
    },
    stripe: {
      hasSecretKey: Boolean(stripeConfig.secretKey),
      hasPublishableKey: Boolean(stripeConfig.publishableKey),
      hasWebhookSecret: Boolean(stripeConfig.webhookSecret),
    },
    openai: {
      hasKey: Boolean(aiConfig.openAIKey),
    },
    anthropic: {
      hasKey: Boolean(aiConfig.anthropicKey),
    },
    ai360: {
      hasKey: Boolean(aiConfig.ai360Key),
      baseUrl: aiConfig.ai360BaseUrl,
    },
    ollama: {
      host: ollamaConfig.host,
      model: ollamaConfig.model,
    },
    cloudinary: {
      hasCloudName: Boolean(cloudinaryConfig.cloudName),
      hasApiKey: Boolean(cloudinaryConfig.apiKey),
    },
  }
}