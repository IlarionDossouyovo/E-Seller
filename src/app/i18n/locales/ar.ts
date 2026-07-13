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
  dashboard: 'لوحة التحكم',
  products: 'المنتجات',
  orders: 'الطلبات',
  customers: 'العملاء',
  analytics: 'التحليلات',
  settings: 'الإعدادات',
  
  // Common
  search: 'بحث',
  save: 'حفظ',
  cancel: 'إلغاء',
  delete: 'حذف',
  edit: 'تعديل',
  add: 'إضافة',
  view: 'عرض',
  loading: 'جاري التحميل...',
  
  // Home
  welcome: 'مرحباً',
  welcomeMessage: 'مرحباً بك في E-Seller',
  
  // Actions
  export: 'تصدير',
  import: 'استيراد',
  filter: 'تصفية',
  sort: 'ترتيب',
}
