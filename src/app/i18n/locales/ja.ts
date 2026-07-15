export const translation = {
  // Navigation
  nav: {
    dashboard: 'ダッシュボード',
    products: '商品',
    branding: 'ブランディング',
    ads: '広告',
    analytics: '分析',
    assistant: 'アシスタント',
    suppliers: 'サプライヤー',
    orders: '注文',
    payments: '支払い',
    settings: '設定',
    logout: 'ログアウト',
  },
  
  // Dashboard
  dashboard: {
    title: 'ダッシュボード',
    revenue: '売上',
    products: '商品',
    roas: 'ROAS',
    users: 'ユーザー',
    welcome: 'ようこそ',
  },
  
  // Common
  common: {
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    add: '追加',
    search: '検索',
    filter: 'フィルター',
    export: 'エクスポート',
    import: 'インポート',
    loading: '読み込み中...',
    noResults: '結果なし',
    confirm: '確認',
    back: '戻る',
    next: '次へ',
    previous: '前へ',
    submit: '送信',
    close: '閉じる',
  },
  
  // AI Agents
  ai: {
    title: 'AIダッシュボード',
    productIntelligence: '商品インテリジェンス',
    supplierEngine: 'サプライヤーエンジン',
    brandingGenerator: 'ブランドジェネレーター',
    adsGenerator: '広告ジェネレーター',
    positioningEngine: 'ポジショニングエンジン',
    marketAnalytics: '市場分析',
    businessAssistant: 'ビジネスアシスタント',
    recommendations: 'レコメンデーション',
  },
  
  // Status
  status: {
    active: 'アクティブ',
    inactive: '非アクティブ',
    pending: '保留中',
    error: 'エラー',
    success: '成功',
    online: 'オンライン',
    offline: 'オフライン',
  },
  
  // Footer
  footer: {
    allRightsReserved: '全著作権所有',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    contact: 'お問い合わせ',
  },
  
  // Auth
  auth: {
    login: 'ログイン',
    register: '登録',
    logout: 'ログアウト',
    email: 'メールアドレス',
    password: 'パスワード',
    forgotPassword: 'パスワードをお忘れですか？',
    rememberMe: 'ログイン状態を保持',
  },
  
  // Settings
  settings: {
    title: '設定',
    language: '言語',
    currency: '通貨',
    timezone: 'タイムゾーン',
    notifications: '通知',
    security: 'セキュリティ',
    profile: 'プロフィール',
    account: 'アカウント',
  },

  // Settings Page
  settingsPage: {
    title: '設定',
    subtitle: 'プラットフォームを設定',
    general: '一般',
    store: 'ストア',
    payments: '支払い',
    notifications: '通知',
    security: 'セキュリティ',
    appearance: '外観',
    email: 'メール',
    api: 'API',
    saveChanges: '保存',
    saved: '保存しました!',
  },

  // General Settings
  general: {
    storeName: 'ストア名',
    storeEmail: 'ストアメール',
    timezone: 'タイムゾーン',
    defaultLanguage: 'デフォルト言語',
    save: '保存',
  },

  // Store Settings
  store: {
    title: 'ストア設定',
    maintenanceMode: 'メンテナンスモード',
    maintenanceModeDesc: 'ストアを一時的に無効化',
    guestCheckout: 'ゲストチェックアウト',
    guestCheckoutDesc: 'アカウントなしで購入を許可',
    currencySelector: '通貨セレクター',
    currencySelectorDesc: '通貨切替を表示',
  },

  // Payment Settings
  payments: {
    title: '支払い設定',
    currency: '通貨',
    taxRate: '税率 (%)',
    taxIncluded: '税込み',
    taxIncludedDesc: '価格は税込み',
  },

  // Notifications
  notifications: {
    title: '通知',
    newOrder: '新規注文',
    newOrderDesc: '注文時に通知',
    lowStock: '在庫少',
    lowStockDesc: '在庫が少ない時のアラート',
    customerRegistration: '新規顧客',
    customerRegistrationDesc: '新規顧客登録を通知',
    paymentReceived: '入金確認',
    paymentReceivedDesc: '支払確認を通知',
  },

  // Security
  security: {
    title: 'セキュリティ',
    twoFactorAuth: '二要素認証',
    twoFactorAuthDesc: '管理者に2FAを要求',
    ipWhitelist: 'IPホワイトリスト',
    ipWhitelistDesc: 'IPでアクセスを制限',
    sessionTimeout: 'セッションタイムアウト',
    sessionTimeoutDesc: '30分後に自動ログアウト',
  },

  // Appearance
  appearance: {
    title: '外観',
    theme: 'テーマ',
    darkMode: 'ダークモード',
    lightMode: 'ライトモード',
  },

  // Email Settings
  email: {
    title: 'メール設定',
    smtpHost: 'SMTPサーバー',
    smtpPort: 'SMTPポート',
    smtpUser: 'SMTPユーザー',
    smtpPassword: 'SMTPパスワード',
    fromEmail: '送信者メール',
    fromName: '送信者名',
  },

  // API Settings
  api: {
    title: 'APIキー',
    productionKey: '本番キー',
    developmentKey: '開発キー',
    generateNewKey: '新しいキーを生成',
    view: '表示',
  },

  // Languages
  languages: {
    en: '英語',
    fr: 'フランス語',
    es: 'スペイン語',
    de: 'ドイツ語',
    zh: '中国語',
    ja: '日本語',
    pt: 'ポルトガル語',
    ar: 'アラビア語',
  },

  // Email Marketing
  emailMarketing: {
    title: 'メールマーケティング',
    subtitle: 'メールキャンペーンの作成と管理',
    newCampaign: '新規キャンペーン',
    editCampaign: 'キャンペーン編集',
    campaignName: 'キャンペーン名',
    campaignNamePlaceholder: '例：夏セール',
    subjectLine: '件名',
    subjectPlaceholder: '例：大セール！',
    status: 'ステータス',
    createCampaign: 'キャンペーン作成',
    saveChanges: '保存',
    cancel: 'キャンセル',
    totalSubscribers: '購読者数',
    avgOpenRate: '平均オープン率',
    avgClickRate: '平均クリック率',
    sentThisMonth: '今月送信',
    campaigns: 'キャンペーン',
    templates: 'テンプレート',
    automation: '自動化',
    newsletter: 'ニュースレター',
    searchPlaceholder: 'キャンペーンを検索...',
    all: 'すべて',
    draft: '下書き',
    scheduled: '予定',
    sending: '送信中',
    sent: '送信済み',
    failed: '失敗',
    notScheduled: '未予定',
    opened: '開封',
    clicked: 'クリック',
    send: '送信',
    edit: '編集',
    view: '表示',
    duplicate: '複製',
    delete: '削除',
    activate: '有効化',
    pause: '一時停止',
    stats: '統計',
    confirmDelete: 'このキャンペーンを削除してもよろしいですか？',
  },
}

export type Translation = typeof translation
