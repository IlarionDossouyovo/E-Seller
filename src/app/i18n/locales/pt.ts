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
  dashboard: 'Painel',
  products: 'Produtos',
  orders: 'Pedidos',
  customers: 'Clientes',
  analytics: 'Análises',
  settings: 'Configurações',
  
  // Common
  search: 'Pesquisar',
  save: 'Salvar',
  cancel: 'Cancelar',
  delete: 'Excluir',
  edit: 'Editar',
  add: 'Adicionar',
  view: 'Ver',
  loading: 'Carregando...',
  
  // Home
  welcome: 'Bem-vindo',
  welcomeMessage: 'Bem-vindo ao E-Seller',
  
  // Actions
  export: 'Exportar',
  import: 'Importar',
  filter: 'Filtrar',
  sort: 'Ordenar',
}
