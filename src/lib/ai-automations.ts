// AI Automation System - Chains AI modules for automated workflows

export interface AutomationStep {
  module: string
  input: string
  output: string
  enabled: boolean
}

export interface Automation {
  id: string
  name: string
  description: string
  steps: AutomationStep[]
  schedule?: string // cron format
  trigger: 'manual' | 'scheduled' | 'webhook'
  enabled: boolean
}

// Predefined automations
export const automations: Automation[] = [
  {
    id: 'product-research',
    name: 'Recherche produit automatique',
    description: 'Analyse produit + Fournisseurs + Positioning',
    steps: [
      { module: 'product-intelligence', input: '${product}', output: 'productData', enabled: true },
      { module: 'supplier-engine', input: '${productData.name}', output: 'supplierData', enabled: true },
      { module: 'positioning-engine', input: '${productData}+${supplierData}', output: 'positioning', enabled: true }
    ],
    trigger: 'manual',
    enabled: true
  },
  {
    id: 'full-branding',
    name: 'Création marque complète',
    description: 'Génère nom + logo + packaging + storytelling',
    steps: [
      { module: 'product-intelligence', input: '${product}', output: 'productData', enabled: true },
      { module: 'branding-generator', input: '${productData}', output: 'brand', enabled: true }
    ],
    trigger: 'manual',
    enabled: true
  },
  {
    id: 'ad-campaign',
    name: 'Campagne publicitaire complète',
    description: 'Analyse + Ads + UGC',
    steps: [
      { module: 'product-intelligence', input: '${product}', output: 'productData', enabled: true },
      { module: 'ads-generator', input: '${productData}', output: 'ads', enabled: true }
    ],
    trigger: 'manual',
    enabled: true
  },
  {
    id: 'market-analysis',
    name: 'Analyse marché complète',
    description: 'Analytics + Recommendations + Trends',
    steps: [
      { module: 'market-analytics', input: '${period}', output: 'analytics', enabled: true },
      { module: 'recommendations', input: '${analytics}', output: 'recommendations', enabled: true }
    ],
    trigger: 'manual',
    enabled: true
  }
]

export const moduleConnections: Record<string, string[]> = {
  'product-intelligence': ['supplier-engine', 'positioning-engine', 'branding-generator', 'ads-generator'],
  'supplier-engine': ['positioning-engine'],
  'branding-generator': ['ads-generator'],
  'ads-generator': ['market-analytics'],
  'positioning-engine': ['ads-generator'],
  'market-analytics': ['recommendations', 'product-intelligence'],
  'recommendations': ['product-intelligence'],
  'business-assistant': ['all']
}