-- E-Seller Complete Schema - Run all at once
-- Run this in Supabase SQL Editor

-- User & Auth
CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'CUSTOMER',
  avatar TEXT,
  emailVerified TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Customer Profile
CREATE TABLE IF NOT EXISTS "Customer" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT UNIQUE NOT NULL,
  segment TEXT,
  lifetime FLOAT DEFAULT 0,
  "ordersCount" INT DEFAULT 0,
  tags TEXT[],
  notes TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS "Product" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  "comparePrice" FLOAT,
  images TEXT[],
  category TEXT,
  sku TEXT UNIQUE NOT NULL,
  stock INT DEFAULT 0,
  status TEXT DEFAULT 'ACTIVE',
  "aiAnalysis" JSONB,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS "Order" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "orderNumber" TEXT UNIQUE NOT NULL,
  "userId" TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  total FLOAT NOT NULL,
  subtotal FLOAT NOT NULL,
  tax FLOAT DEFAULT 0,
  shipping FLOAT DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  "paymentMethod" TEXT,
  "paymentStatus" TEXT DEFAULT 'PENDING',
  "shippingAddress" JSONB,
  "billingAddress" JSONB,
  notes TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE IF NOT EXISTS "OrderItem" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "orderId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  quantity INT NOT NULL,
  price FLOAT NOT NULL,
  total FLOAT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Sessions
CREATE TABLE IF NOT EXISTS "Session" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  device TEXT NOT NULL,
  ip TEXT NOT NULL,
  location TEXT NOT NULL,
  "lastActive" TIMESTAMP DEFAULT NOW(),
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- API Keys
CREATE TABLE IF NOT EXISTS "ApiKey" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  name TEXT NOT NULL,
  key TEXT UNIQUE NOT NULL,
  permissions TEXT[],
  "lastUsed" TIMESTAMP,
  "expiresAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Activity Logs
CREATE TABLE IF NOT EXISTS "Activity" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  action TEXT NOT NULL,
  ip TEXT NOT NULL,
  location TEXT,
  metadata JSONB,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Suppliers
CREATE TABLE IF NOT EXISTS "Supplier" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  website TEXT,
  country TEXT,
  rating FLOAT DEFAULT 0,
  products TEXT[],
  notes TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Shipping Rates
CREATE TABLE IF NOT EXISTS "ShippingRate" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier TEXT NOT NULL,
  service TEXT NOT NULL,
  price FLOAT NOT NULL,
  currency TEXT DEFAULT 'USD',
  "estimatedDays" INT,
  countries TEXT[],
  active BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS "BlogPost" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  "featuredImage" TEXT,
  status TEXT DEFAULT 'DRAFT',
  author TEXT,
  tags TEXT[],
  "seoTitle" TEXT,
  "seoDesc" TEXT,
  "publishedAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Reviews
CREATE TABLE IF NOT EXISTS "Review" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" TEXT NOT NULL,
  rating INT NOT NULL,
  title TEXT,
  content TEXT,
  author TEXT,
  verified BOOLEAN DEFAULT false,
  helpful INT DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Loyalty Accounts
CREATE TABLE IF NOT EXISTS "LoyaltyAccount" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "customerId" TEXT UNIQUE NOT NULL,
  points INT DEFAULT 0,
  lifetime INT DEFAULT 0,
  tier TEXT DEFAULT 'BRONZE',
  redeemed INT DEFAULT 0,
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Coupons
CREATE TABLE IF NOT EXISTS "Coupon" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  value FLOAT NOT NULL,
  "minAmount" FLOAT,
  "maxUses" INT,
  "usedCount" INT DEFAULT 0,
  "startsAt" TIMESTAMP NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  active BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Webhooks
CREATE TABLE IF NOT EXISTS "Webhook" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  events TEXT[] NOT NULL,
  secret TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  "lastTrigger" TIMESTAMP,
  failures INT DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Email Templates
CREATE TABLE IF NOT EXISTS "EmailTemplate" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  variables TEXT[],
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Add sample products
INSERT INTO "Product" (name, description, price, sku, category, stock, status) VALUES
('iPhone 15 Pro', 'Latest Apple flagship', 999.99, 'IPH15PRO', 'Electronics', 50, 'ACTIVE'),
('MacBook Air M3', 'Powerful and lightweight', 1299.99, 'MBAIRM3', 'Electronics', 30, 'ACTIVE'),
('AirPods Pro', 'Active noise cancellation', 249.99, 'APP2GEN', 'Audio', 100, 'ACTIVE')
ON CONFLICT (sku) DO NOTHING;