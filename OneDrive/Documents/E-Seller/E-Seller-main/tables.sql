CREATE TABLE IF NOT EXISTS "Supplier" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, email TEXT, phone TEXT, website TEXT, country TEXT,
  rating FLOAT DEFAULT 0, products TEXT[], notes TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(), "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "ShippingRate" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier TEXT NOT NULL, service TEXT NOT NULL, price FLOAT NOT NULL, currency TEXT DEFAULT 'USD',
  "estimatedDays" INT, countries TEXT[], active BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "BlogPost" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, content TEXT NOT NULL, excerpt TEXT,
  "featuredImage" TEXT, status TEXT DEFAULT 'DRAFT', author TEXT, tags TEXT[],
  "seoTitle" TEXT, "seoDesc" TEXT, "publishedAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(), "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Review" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" TEXT NOT NULL, rating INT NOT NULL, title TEXT, content TEXT,
  author TEXT, verified BOOLEAN DEFAULT false, helpful INT DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "LoyaltyAccount" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "customerId" TEXT UNIQUE NOT NULL, points INT DEFAULT 0, lifetime INT DEFAULT 0,
  tier TEXT DEFAULT 'BRONZE', redeemed INT DEFAULT 0, "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Coupon" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, type TEXT NOT NULL, value FLOAT NOT NULL,
  "minAmount" FLOAT, "maxUses" INT, "usedCount" INT DEFAULT 0,
  "startsAt" TIMESTAMP NOT NULL, "expiresAt" TIMESTAMP NOT NULL,
  active BOOLEAN DEFAULT true, "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Webhook" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL, events TEXT[] NOT NULL, secret TEXT NOT NULL,
  active BOOLEAN DEFAULT true, "lastTrigger" TIMESTAMP, failures INT DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "EmailTemplate" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL, subject TEXT NOT NULL, body TEXT NOT NULL,
  variables TEXT[], "createdAt" TIMESTAMP DEFAULT NOW(), "updatedAt" TIMESTAMP DEFAULT NOW()
);

INSERT INTO "Product" (name, description, price, sku, category, stock, status) VALUES
('iPhone 15 Pro', 'Latest Apple flagship', 999.99, 'IPH15PRO', 'Electronics', 50, 'ACTIVE'),
('MacBook Air M3', 'Powerful and lightweight', 1299.99, 'MBAIRM3', 'Electronics', 30, 'ACTIVE'),
('AirPods Pro', 'Active noise cancellation', 249.99, 'APP2GEN', 'Audio', 100, 'ACTIVE')
ON CONFLICT (sku) DO NOTHING;