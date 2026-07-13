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
  dashboard: 'Panel',
  products: 'Productos',
  orders: 'Pedidos',
  customers: 'Clientes',
  analytics: 'Analíticas',
  settings: 'Configuración',
  
  // Common
  search: 'Buscar',
  save: 'Guardar',
  cancel: 'Cancelar',
  delete: 'Eliminar',
  edit: 'Editar',
  add: 'Añadir',
  view: 'Ver',
  loading: 'Cargando...',
  
  // Home
  welcome: 'Bienvenido',
  welcomeMessage: 'Bienvenido a E-Seller',
  
  // Actions
  export: 'Exportar',
  import: 'Importar',
  filter: 'Filtrar',
  sort: 'Ordenar',
}
