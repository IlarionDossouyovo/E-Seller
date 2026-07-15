export const translation = {
  // Navigation
  nav: {
    dashboard: '仪表板',
    products: '产品',
    branding: '品牌',
    ads: '广告',
    analytics: '分析',
    assistant: '助手',
    suppliers: '供应商',
    orders: '订单',
    payments: '支付',
    settings: '设置',
    logout: '退出登录',
  },
  
  // Dashboard
  dashboard: {
    title: '仪表板',
    revenue: '收入',
    products: '产品',
    roas: '广告支出回报率',
    users: '用户',
    welcome: '欢迎',
  },
  
  // Common
  common: {
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    search: '搜索',
    filter: '筛选',
    export: '导出',
    import: '导入',
    loading: '加载中...',
    noResults: '无结果',
    confirm: '确认',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    submit: '提交',
    close: '关闭',
  },
  
  // AI Agents
  ai: {
    title: 'AI仪表板',
    productIntelligence: '产品智能',
    supplierEngine: '供应商引擎',
    brandingGenerator: '品牌生成器',
    adsGenerator: '广告生成器',
    positioningEngine: '定位引擎',
    marketAnalytics: '市场分析',
    businessAssistant: '商业助手',
    recommendations: '推荐',
  },
  
  // Status
  status: {
    active: '活跃',
    inactive: '不活跃',
    pending: '待处理',
    error: '错误',
    success: '成功',
    online: '在线',
    offline: '离线',
  },
  
  // Footer
  footer: {
    allRightsReserved: '版权所有',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
    contact: '联系我们',
  },
  
  // Auth
  auth: {
    login: '登录',
    register: '注册',
    logout: '退出登录',
    email: '邮箱',
    password: '密码',
    forgotPassword: '忘记密码？',
    rememberMe: '记住我',
  },
  
  // Settings
  settings: {
    title: '设置',
    language: '语言',
    currency: '货币',
    timezone: '时区',
    notifications: '通知',
    security: '安全',
    profile: '个人资料',
    account: '账户',
  },

  // Settings Page
  settingsPage: {
    title: '设置',
    subtitle: '配置您的平台',
    general: '通用',
    store: '商店',
    payments: '支付',
    notifications: '通知',
    security: '安全',
    appearance: '外观',
    email: '邮件',
    api: 'API',
    saveChanges: '保存',
    saved: '已保存!',
  },

  // General Settings
  general: {
    storeName: '商店名称',
    storeEmail: '商店邮箱',
    timezone: '时区',
    defaultLanguage: '默认语言',
    save: '保存',
  },

  // Store Settings
  store: {
    title: '商店配置',
    maintenanceMode: '维护模式',
    maintenanceModeDesc: '暂时关闭商店',
    guestCheckout: '访客结账',
    guestCheckoutDesc: '允许无账户购买',
    currencySelector: '货币选择器',
    currencySelectorDesc: '显示货币切换器',
  },

  // Payment Settings
  payments: {
    title: '支付设置',
    currency: '货币',
    taxRate: '税率 (%)',
    taxIncluded: '含税',
    taxIncludedDesc: '价格含税',
  },

  // Notifications
  notifications: {
    title: '通知',
    newOrder: '新订单',
    newOrderDesc: '下单时通知',
    lowStock: '库存不足',
    lowStockDesc: '产品库存低时提醒',
    customerRegistration: '新客户',
    customerRegistrationDesc: '新客户注册通知',
    paymentReceived: '收到付款',
    paymentReceivedDesc: '确认付款通知',
  },

  // Security
  security: {
    title: '安全',
    twoFactorAuth: '双因素认证',
    twoFactorAuthDesc: '要求管理员使用2FA',
    ipWhitelist: 'IP白名单',
    ipWhitelistDesc: '按IP限制访问',
    sessionTimeout: '会话超时',
    sessionTimeoutDesc: '30分钟后自动登出',
  },

  // Appearance
  appearance: {
    title: '外观',
    theme: '主题',
    darkMode: '深色模式',
    lightMode: '浅色模式',
  },

  // Email Settings
  email: {
    title: '邮件配置',
    smtpHost: 'SMTP服务器',
    smtpPort: 'SMTP端口',
    smtpUser: 'SMTP用户名',
    smtpPassword: 'SMTP密码',
    fromEmail: '发件人邮箱',
    fromName: '发件人名称',
  },

  // API Settings
  api: {
    title: 'API密钥',
    productionKey: '生产密钥',
    developmentKey: '开发密钥',
    generateNewKey: '生成新密钥',
    view: '查看',
  },

  // Languages
  languages: {
    en: '英语',
    fr: '法语',
    es: '西班牙语',
    de: '德语',
    zh: '中文',
    ja: '日语',
    pt: '葡萄牙语',
    ar: '阿拉伯语',
  },
}

export type Translation = typeof translation
