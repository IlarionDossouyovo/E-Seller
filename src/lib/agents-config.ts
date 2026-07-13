// E-Seller AI Agents Configuration
// Configure each agent with specific Ollama models based on their needs

// Available Ollama Models
export const availableModels = {
  llama32: {
    name: 'llama3.2:latest',
    size: '2.0 GB',
    description: 'General purpose - Best for general conversations and tasks',
    useCase: 'default'
  },
  llama31: {
    name: 'llama3.1:8b',
    size: '4.9 GB',
    description: 'Advanced reasoning - Better for complex analysis',
    useCase: 'complex'
  },
  qwen: {
    name: 'qwen2.5-coder:7b',
    size: '4.7 GB',
    description: 'Code & technical - Optimized for code generation',
    useCase: 'coding'
  },
  phi: {
    name: 'phi3:mini',
    size: '2.2 GB',
    description: 'Fast & lightweight - Quick responses',
    useCase: 'fast'
  },
  nomic: {
    name: 'nomic-embed-text:latest',
    size: '274 MB',
    description: 'Embeddings - For text embeddings',
    useCase: 'embeddings'
  }
}

// Agent Model Assignments
export const agentModelConfig = {
  // 1. Product Director - Research and product analysis
  'product-director': {
    model: 'llama3.2:latest',
    fallback: 'phi3:mini',
    temperature: 0.7,
    maxTokens: 2048,
    description: 'Recherche produits tendance, analyse marché'
  },

  // 2. Brand Director - Brand identity creation
  'brand-director': {
    model: 'llama3.2:latest',
    fallback: 'llama3.1:8b',
    temperature: 0.8,
    maxTokens: 2048,
    description: 'Création identité de marque, logos, palettes'
  },

  // 3. Ads Director - Advertising and marketing
  'ads-director': {
    model: 'llama3.2:latest',
    fallback: 'phi3:mini',
    temperature: 0.9,
    maxTokens: 2048,
    description: 'Publicités TikTok, Facebook, scripts UGC'
  },

  // 4. Analytics Director - Data analysis
  'analytics-director': {
    model: 'llama3.1:8b',
    fallback: 'llama3.2:latest',
    temperature: 0.3,
    maxTokens: 2048,
    description: 'Métriques, prévisions, insights prédictifs'
  },

  // 5. Assistant Director - Customer support
  'assistant-director': {
    model: 'llama3.2:latest',
    fallback: 'phi3:mini',
    temperature: 0.5,
    maxTokens: 1024,
    description: 'Support client 24/7, conseils business'
  },

  // 6. Content Director - Content generation
  'content-director': {
    model: 'llama3.2:latest',
    fallback: 'phi3:mini',
    temperature: 0.8,
    maxTokens: 2048,
    description: 'Contenus blog, emails, descriptions produits'
  },

  // 7. SEO Director - Search optimization
  'seo-director': {
    model: 'llama3.1:8b',
    fallback: 'llama3.2:latest',
    temperature: 0.4,
    maxTokens: 2048,
    description: 'Optimisation SEO, mots-clés, audit technique'
  },

  // 8. Health Director - System monitoring (IMPORTANT)
  'health-director': {
    model: 'llama3.1:8b',
    fallback: 'llama3.2:latest',
    temperature: 0.2,
    maxTokens: 1024,
    description: 'Surveillance services, health checks, alertes'
  },

  // 9. Maintenance Director - System maintenance (IMPORTANT)
  'maintenance-director': {
    model: 'llama3.1:8b',
    fallback: 'llama3.2:latest',
    temperature: 0.2,
    maxTokens: 1024,
    description: 'Mises à jour, backups, sécurité, optimisation'
  },

  // 10. Automation Director - Workflow automation
  'automation-director': {
    model: 'phi3:mini',
    fallback: 'llama3.2:latest',
    temperature: 0.4,
    maxTokens: 1024,
    description: 'Chaînes automatisées, triggers, scheduling'
  },

  // 11. Chatbot Director - Customer chat
  'chatbot-director': {
    model: 'phi3:mini',
    fallback: 'llama3.2:latest',
    temperature: 0.5,
    maxTokens: 512,
    description: 'Chatbot support, conversations multi-langues'
  },

  // 12. Email Marketing Director
  'email-director': {
    model: 'llama3.2:latest',
    fallback: 'phi3:mini',
    temperature: 0.8,
    maxTokens: 2048,
    description: 'Campagnes email, séquences, templates'
  },

  // 13. Supplier Director - Supplier management
  'supplier-director': {
    model: 'llama3.2:latest',
    fallback: 'phi3:mini',
    temperature: 0.5,
    maxTokens: 2048,
    description: 'Fournisseurs, commandes, négociation'
  },

  // 14. Financial Director - Finance management
  'financial-director': {
    model: 'llama3.1:8b',
    fallback: 'llama3.2:latest',
    temperature: 0.3,
    maxTokens: 2048,
    description: 'Rapports financiers, trésorerie, factures'
  },

  // 15. Security Director - Security monitoring
  'security-director': {
    model: 'llama3.1:8b',
    fallback: 'llama3.2:latest',
    temperature: 0.2,
    maxTokens: 1024,
    description: 'Audit sécurité, détection menaces, incidents'
  },

  // 16. Inventory Director - Stock management
  'inventory-director': {
    model: 'phi3:mini',
    fallback: 'llama3.2:latest',
    temperature: 0.4,
    maxTokens: 1024,
    description: 'Gestion stock, alertes rupture, prévisions'
  }
}

// Model selection based on task type
export function getModelForTask(taskType: string): string {
  const taskModels: Record<string, string> = {
    'research': 'llama3.2:latest',
    'analysis': 'llama3.1:8b',
    'creative': 'llama3.2:latest',
    'code': 'qwen2.5-coder:7b',
    'fast': 'phi3:mini',
    'embedding': 'nomic-embed-text:latest',
    'complex': 'llama3.1:8b',
    'default': 'llama3.2:latest'
  }
  return taskModels[taskType] || taskModels.default
}

// Get all agents with their configurations
export function getAllAgentsConfig() {
  return Object.entries(agentModelConfig).map(([id, config]) => ({
    id,
    ...config,
    modelInfo: Object.values(availableModels).find(m => m.name === config.model)
  }))
}

// Health Director specific monitoring models
export const healthMonitoringConfig = {
  critical: {
    model: 'llama3.1:8b',
    temperature: 0.1,
    maxTokens: 512,
    description: 'Analyse critique des incidents'
  },
  standard: {
    model: 'llama3.2:latest',
    temperature: 0.3,
    maxTokens: 1024,
    description: 'Monitoring standard'
  },
  quick: {
    model: 'phi3:mini',
    temperature: 0.3,
    maxTokens: 512,
    description: 'Checks rapides'
  }
}

// Maintenance Director specific tasks
export const maintenanceConfig = {
  updates: {
    model: 'llama3.2:latest',
    temperature: 0.2,
    maxTokens: 1024,
    description: 'Vérification mises à jour'
  },
  backup: {
    model: 'phi3:mini',
    temperature: 0.1,
    maxTokens: 512,
    description: 'Gestion backups'
  },
  security: {
    model: 'llama3.1:8b',
    temperature: 0.2,
    maxTokens: 1024,
    description: 'Audit sécurité'
  },
  optimization: {
    model: 'qwen2.5-coder:7b',
    temperature: 0.3,
    maxTokens: 1024,
    description: 'Optimisation performance'
  }
}

export default {
  availableModels,
  agentModelConfig,
  healthMonitoringConfig,
  maintenanceConfig,
  getModelForTask,
  getAllAgentsConfig
}
