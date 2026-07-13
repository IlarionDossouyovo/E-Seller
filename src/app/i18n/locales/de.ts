export interface Translation {
  // Navigation
  dashboard: string
  products: string
  orders: string
  customers: string
  analytics: string
  settings: string
  
  // Common
  search: string
  save: string
  cancel: string
  delete: string
  edit: string
  add: string
  view: string
  loading: string
  
  // Home
  welcome: string
  welcomeMessage: string
  
  // Actions
  export: string
  import: string
  filter: string
  sort: string
}

export const translation: Translation = {
  // Navigation
  dashboard: 'Dashboard',
  products: 'Produkte',
  orders: 'Bestellungen',
  customers: 'Kunden',
  analytics: 'Analysen',
  settings: 'Einstellungen',
  
  // Common
  search: 'Suchen',
  save: 'Speichern',
  cancel: 'Abbrechen',
  delete: 'Löschen',
  edit: 'Bearbeiten',
  add: 'Hinzufügen',
  view: 'Ansehen',
  loading: 'Laden...',
  
  // Home
  welcome: 'Willkommen',
  welcomeMessage: 'Willkommen bei E-Seller',
  
  // Actions
  export: 'Exportieren',
  import: 'Importieren',
  filter: 'Filtern',
  sort: 'Sortieren',
}
