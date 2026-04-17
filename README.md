# 🛒 E-SELLER - AI-Powered E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Prisma-2D68C6?style=for-the-badge&logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

<p align="center">
  <strong>E-SELLER</strong> is the most advanced AI-powered e-commerce platform built with Next.js. Includes Electron-Pay for international payments, 7 AI modules, and enterprise-grade security.
</p>

---

## ✨ Features

### 🛒 E-Commerce Core
- [x] Complete store with products, cart, checkout
- [x] Stripe + Electron-Pay (12+ payment methods)
- [x] Customer management (CRM)
- [x] Inventory & shipping management
- [x] Tax calculation & filings

### 🤖 AI Modules (7)
- [x] **AI Product Discovery** - Find winning products automatically
- [x] **AI Branding** - Auto-generate logos & brand identity
- [x] **AI Ads Generator** - Create high-converting ads
- [x] **AI Analytics** - Predictive insights
- [x] **AI Assistant** - Smart chatbot
- [x] **AI SEO** - Optimize for search
- [x] **AI Content** - Generate product descriptions

### 💳 Electron-Pay (Unique)
| Payment Method | Status |
|----------------|--------|
| 💳 Stripe Cards | ✅ |
| 🇺🇸 PayPal | ✅ |
| 🇨🇳 Alipay | ✅ |
| 🇪🇺 iDEAL | ✅ |
| 🇬🇧 Bancontact | ✅ |
| 🇸🇪 Klarna | ✅ |
| 🇺🇸 Afterpay | ✅ |
| 🌍 Crypto (BTC/ETH) | ✅ |
| 📱 Apple Pay | ✅ |
| 📱 Google Pay | ✅ |
| 🏦 SEPA | ✅ |
| 💸 12 Currencies | ✅ |

### 🔒 Enterprise Security
- [x] 2FA (Two-Factor Authentication)
- [x] Session management
- [x] API Keys with rotation
- [x] Security audit logs
- [x] GDPR ready

### 📊 Marketing & Sales
- [x] Loyalty program (points, tiers)
- [x] Affiliate management
- [x] Returns processing
- [x] Email marketing
- [x] Funnels & automation
- [x] SMS notifications

### 🏢 Management
- [x] Multi-admin dashboard
- [x] Advanced analytics
- [x] Reports generation
- [x] Super Admin panel
- [x] RESTful API

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+
PostgreSQL (optional, uses mock data in demo)
```

### Installation

```bash
# Clone the repository
git clone https://github.com/IlarionDossouyovo/E-Seller.git
cd E-Seller

# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Variables

Create `.env.local`:

```env
# Database (optional - uses mock data if not set)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Upload (optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
E-Seller/
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   ├── sw.js             # Service worker
│   └── robots.txt        # SEO protection
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── dashboard/   # Admin dashboard (46+ pages)
│   │   ├── store/       # Public store
│   │   ├── api/         # API routes (10+)
│   │   ├── auth/        # Authentication
│   │   └── maintenance/ # Maintenance mode
│   ├── components/       # React components
│   ├── lib/            # Utilities
│   │   ├── auth.ts     # NextAuth config
│   │   ├── prisma.ts   # Database
│   │   └── stripe.ts   # Payment config
│   └── styles/         # Global styles
├── prisma/
│   └── schema.prisma   # Database schema
└── package.json
```

---

## 📊 Dashboard Pages

| Category | Pages |
|----------|-------|
| **Core** | Dashboard, Products, Orders, Customers |
| **AI** | AI Products, AI Branding, AI Ads, AI Analytics, AI Assistant |
| **E-Commerce** | Store, Cart, Checkout |
| **Payments** | Electron-Pay, Stripe, Payment Settings |
| **Management** | Inventory, Shipping, Suppliers, Returns, Taxes |
| **CRM** | Customers, Loyalty, Affiliate |
| **Marketing** | Emails, Funnels, Promotions |
| **Analytics** | Analytics, Advanced Analytics, Reports |
| **Security** | Security Center, Environment, API Keys |
| **Settings** | Settings, Advanced Settings |
| **Admin** | Super Admin, Webhooks, API Docs |
| **Tools** | Templates, Reviews, Blog, Chat |

---

## 🔗 API Routes

```
GET/POST   /api/products
GET/POST   /api/orders
GET/POST   /api/customers
GET/POST   /api/settings
GET/POST   /api/reports
GET/POST   /api/email/templates
GET/POST   /api/upload
GET       /api/analytics/realtime
POST      /api/webhooks/stripe
GET/POST  /api/auth/[...nextauth]
```

---

## 🌍 International Support

| Feature | Languages |
|--------|----------|
| **UI Languages** | EN, FR, ES, DE, ZH, JA, PT, AR |
| **Currencies** | USD, EUR, GBP, CNY, JPY, +7 more |
| **Payment Methods** | 12+ (global coverage) |

---

## 🔒 Privacy & Protection

By default, the site is protected from search engines:

- `robots.txt` blocks all crawlers
- Meta tags prevent indexing
- Maintenance mode available

**To enable public access:**

1. Change `robots.txt`: `Disallow: /` → `Allow: /`
2. Update `layout.tsx`: `robots: 'noindex, nofollow'` → `'index, follow'`

---

## 🆚 Comparison

| Feature | E-Seller | Shopify | WooCommerce |
|---------|----------|---------|------------|
| **Price** | FREE | $29+/mo | $12+/mo + hosting |
| **AI Included** | ✅ 7 modules | ❌ Extra $ | ❌ Extra $ |
| **Electron-Pay** | ✅ Unique | ❌ | ❌ |
| **PWA Ready** | ✅ | ✅ (Shopify) | ⚠️ Plugin |
| **Open Source** | ✅ | ❌ | ✅ |
| **Modern Stack** | ✅ Next.js 14 | ❌ Liquid | ✅ WordPress |

---

## 🏆 License

MIT License - Free to use for commercial projects.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Lucide Icons](https://lucide.dev) - Icons
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

## 📞 Support

- 📧 Email: contact@e-seller.com
- 🐛 Issues: [GitHub Issues](https://github.com/IlarionDossouyovo/E-Seller/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/IlarionDossouyovo/E-Seller/discussions)

---

<p align="center">
  <strong>⭐ Star this repo if you find it useful!</strong>
</p>

<p align="center">
  <a href="https://github.com/IlarionDossouyovo/E-Seller">
    <img src="https://img.shields.io/github/stars/IlarionDossouyovo/E-Seller?style=social" alt="Stars">
  </a>
  <a href="https://github.com/IlarionDossouyovo/E-Seller/fork">
    <img src="https://img.shields.io/github/forks/IlarionDossouyovo/E-Seller?style=social" alt="Forks">
  </a>
</p>