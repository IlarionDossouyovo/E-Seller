// E-Seller Service Configuration
// All API keys and service credentials

// Supabase
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bauggttibriqdkfnlfhh.supabase.co',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kYW5lYSIsInJlZiI6ImJh,dWdndHRpYnJpcWRrZm5sZmhoIiwicm9vbSI6Im9ubHkiLCJpbnQiOjIxLCJzY29wZSI6WyJwdWJsaWMiXSwiaWF0IjoxNjQyODQwODc5fQ.tVOIDM3SokDpqeGRANDANg0vKfW22M3SokDpqeGRA',
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
}

// Groq API (primary AI for E-Seller)
export const groqConfig = {
  apiKey: process.env.GROQ_API_KEY || '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',
}

// Stripe
export const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_demo',
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}

// Check if Stripe is properly configured
export function isStripeConfigured() {
  return Boolean(stripeConfig.secretKey && stripeConfig.secretKey !== 'sk_test_demo')
}

// OpenAI / Anthropic / AI 360
export const aiConfig = {
  openAIKey: process.env.OPENAI_API_KEY || 'sk-demo-key',
  anthropicKey: process.env.ANTHROPIC_API_KEY,
  ai360Key: process.env.AI360_API_KEY,
  ai360BaseUrl: process.env.AI360_BASE_URL,
}

// Check which AI providers are available
export function getAvailableAIProviders() {
  const providers = []
  if (aiConfig.openAIKey && aiConfig.openAIKey !== 'sk-demo-key') providers.push('openai')
  if (aiConfig.anthropicKey) providers.push('anthropic')
  if (aiConfig.ai360Key) providers.push('ai360')
  // Ollama is always available via local server
  providers.push('ollama')
  return providers
}

// Ollama (local AI)
export const ollamaConfig = {
  host: process.env.OLLAMA_HOST || 'http://localhost:11434',
  model: process.env.OLLAMA_MODEL || 'tinyllama',
}

// Cloudinary
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
  apiKey: process.env.CLOUDINARY_API_KEY || 'demo',
  apiSecret: process.env.CLOUDINARY_API_SECRET,
}

// Get Cloudinary signed URL for uploads
export function getCloudinarySignature() {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = process.env.CLOUDINARY_API_SECRET 
    ? `timestamp=${timestamp}&api_key=${cloudinaryConfig.apiKey}`
    : ''
  return { timestamp, signature }
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
  if (groqConfig.apiKey) {
    services.push('groq')
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
    groq: {
      hasKey: Boolean(groqConfig.apiKey),
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