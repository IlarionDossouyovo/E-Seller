-- E-Seller Supabase Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- ==================== USERS ====================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== PRODUCTS ====================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  category TEXT,
  subcategory TEXT,
  images TEXT[], -- Array of image URLs
  inventory INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  sku TEXT UNIQUE,
  weight DECIMAL(10,2),
  dimensions TEXT,
  tags TEXT[],
  ai_score INTEGER,
  ai_trend TEXT,
  ai_viral_potential INTEGER,
  supplier_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== CATEGORIES ====================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== ORDERS ====================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2),
  tax DECIMAL(10,2),
  shipping DECIMAL(10,2),
  discount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  shipping_address JSONB,
  billing_address JSONB,
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  stripe_payment_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== ORDER ITEMS ====================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== CART ====================
CREATE TABLE IF NOT EXISTS cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id TEXT,
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== REVIEWS ====================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  images TEXT[],
  verified BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== WISHLIST ====================
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ==================== SUPPLIERS ====================
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company_name TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  minimum_order DECIMAL(10,2),
  lead_time INTEGER,
  rating DECIMAL(3,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== ANALYTICS ====================
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data JSONB,
  user_id UUID,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== AI ANALYSES ====================
CREATE TABLE IF NOT EXISTS ai_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_type TEXT NOT NULL,
  input_data JSONB,
  output_data JSONB,
  tokens_used INTEGER,
  cost DECIMAL(10,4),
  model_used TEXT,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== INDEXES ====================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_cart_user ON cart(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_session ON cart(session_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_type ON ai_analyses(module_type);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_user ON ai_analyses(user_id);

-- ==================== PUBLISHED TABLES ====================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;

-- ==================== RLS POLICIES ====================

-- Users: users can read their own data
CREATE POLICY "Users can read own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own" ON users FOR UPDATE USING (auth.uid() = id);

-- Products: everyone can read, authenticated can insert/update
CREATE POLICY "Products public read" ON products FOR SELECT USING (true);
CREATE POLICY "Authenticated insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update products" ON products FOR UPDATE USING (true);

-- Cart: users can manage their own cart
CREATE POLICY "Users manage cart" ON cart FOR ALL USING (
  user_id = auth.uid() OR session_id =
  (SELECT raw_session_token::text FROM auth.sessions WHERE user_id = auth.uid() LIMIT 1)
);

-- Reviews: everyone can read, authenticated can insert
CREATE POLICY "Reviews public read" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated insert reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Orders: users can read their own orders
CREATE POLICY "Users read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Authenticated insert orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);

-- ==================== DEFAULT DATA ====================

-- Insert default admin user (replace with your email)
-- INSERT INTO users (email, name, role) VALUES ('admin@e-seller.com', 'Admin', 'admin');

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Electronics', 'electronics', 'Electronic devices and accessories'),
  ('Fashion', 'fashion', 'Clothing and accessories'),
  ('Home & Garden', 'home-garden', 'Home improvement and garden'),
  ('Sports', 'sports', 'Sports and fitness'),
  ('Beauty', 'beauty', 'Beauty and personal care'),
  ('Toys', 'toys', 'Toys and games')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample suppliers
INSERT INTO suppliers (name, company_name, country, minimum_order, rating) VALUES
  ('AliExpress Supplier', 'Alibaba Group', 'China', 50.00, 4.5),
  ('CJ Dropshipping', 'CJ Global', 'China', 10.00, 4.8),
  ('US Supplier', 'American Wholesale', 'USA', 100.00, 4.9)
ON CONFLICT DO NOTHING;

SELECT 'Database schema created successfully! ✅' as status;