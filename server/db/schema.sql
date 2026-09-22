CREATE TABLE IF NOT EXISTS stores (
  id SERIAL PRIMARY KEY,
  store_id VARCHAR(100) UNIQUE NOT NULL,
  store_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO stores (store_id, store_name)
VALUES ('store_fries_tangtang', 'ร้านเฟรนฟรายตังค์ตังค์')
ON CONFLICT (store_id) DO NOTHING;

CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(100) UNIQUE NOT NULL,
  store_id VARCHAR(100) NOT NULL REFERENCES stores(store_id),
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
  order_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
  line_total NUMERIC(10,2) NOT NULL CHECK (line_total >= 0)
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_store_id ON orders(store_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
