-- Migration: Create E-Seller tables
-- Run: npx supabase db push

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User & Auth
CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'CUSTOMER',
  avatar TEXT,
  "emailVerified" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_product_category ON "Product"(category);
CREATE INDEX IF NOT EXISTS idx_product_sku ON "Product"(sku);
CREATE INDEX IF NOT EXISTS idx_order_user ON "Order"("userId");
CREATE INDEX IF NOT EXISTS idx_order_status ON "Order"(status);
CREATE INDEX IF NOT EXISTS idx_session_user ON "Session"("userId");
CREATE INDEX IF NOT EXISTS idx_activity_user ON "Activity"("userId");