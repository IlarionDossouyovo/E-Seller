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
  dashboard: '仪表板',
  products: '产品',
  orders: '订单',
  customers: '客户',
  analytics: '分析',
  settings: '设置',
  
  // Common
  search: '搜索',
  save: '保存',
  cancel: '取消',
  delete: '删除',
  edit: '编辑',
  add: '添加',
  view: '查看',
  loading: '加载中...',
  
  // Home
  welcome: '欢迎',
  welcomeMessage: '欢迎使用 E-Seller',
  
  // Actions
  export: '导出',
  import: '导入',
  filter: '筛选',
  sort: '排序',
}
