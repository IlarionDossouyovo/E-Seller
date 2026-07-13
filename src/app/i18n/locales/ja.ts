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
  dashboard: 'ダッシュボード',
  products: '商品',
  orders: '注文',
  customers: '顧客',
  analytics: '分析',
  settings: '設定',
  
  // Common
  search: '検索',
  save: '保存',
  cancel: 'キャンセル',
  delete: '削除',
  edit: '編集',
  add: '追加',
  view: '表示',
  loading: '読み込み中...',
  
  // Home
  welcome: 'ようこそ',
  welcomeMessage: 'E-Sellerへようこそ',
  
  // Actions
  export: 'エクスポート',
  import: 'インポート',
  filter: 'フィルター',
  sort: '並べ替え',
}
