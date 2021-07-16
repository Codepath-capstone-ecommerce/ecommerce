CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  password    TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  address     TEXT, 
  is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
  rewards     INTEGER DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE orders(
  id                    SERIAL PRIMARY KEY,
  customer_id           INTEGER REFERENCES users(id) ON DELETE CASCADE,
  completed             BOOLEAN DEFAULT FALSE,
  delivery_address      TEXT NOT NULL,
  placed_at             TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT DEFAULT 'misc',
  image_url   TEXT,
  quantity    INTEGER DEFAULT 1,
  price       INTEGER NOT NULL,
  calories    INTEGER NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE order_detail (
  order_id    INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id  INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity    INTEGER NOT NULL,
  completed   BOOLEAN DEFAULT FALSE,
  discount    INTEGER DEFAULT 0,
  -- user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id,order_id),
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);