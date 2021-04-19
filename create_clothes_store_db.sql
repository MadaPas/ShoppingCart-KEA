DROP DATABASE IF EXISTS clothes_store;
CREATE DATABASE IF NOT EXISTS clothes_store;

USE clothes_store;
-- done
CREATE TABLE brands (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);
-- done
CREATE TABLE products (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  brand_id INT(11) NOT NULL,
  name VARCHAR(120) NOT NULL,
  unit_price FLOAT(11) NOT NULL,
  rating INT(11) NOT NULL,
  description VARCHAR(255) NOT NULL,
  size VARCHAR(120) NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
       ON DELETE CASCADE
);
-- done
CREATE TABLE roles (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,

  PRIMARY KEY (id)
);
-- done
CREATE TABLE users (
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  role_id(11) NOT NULL,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  password VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL,
  date_joined DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  last_active DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE CASCADE
);

CREATE TABLE card_types (
  id INT(11) NOT NULL,
  name VARCHAR(120),

  PRIMARY KEY (id)
);

CREATE TABLE invoices(
  id INT(11) AUTO_INCREMENT NOT NULL UNIQUE,
  card_type_id INT(11) NOT NULL,
  card_number INT(16) NOT NULL,
  card_holder VARCHAR(120) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  total_price FLOAT(11) NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (card_type_id ) REFERENCES card_types(id)
        ON DELETE CASCADE
);

CREATE TABLE cart_items (
  cart_id INT(11) NOT NULL,
  product_id INT(11) NOT NULL,
  invoice_id (INT(11) NOT NULL
  quantity INT(11) NOT NULL,
  unit_price FLOAT(11) NOT NULL,

  PRIMARY KEY (cart_id, product_id),
  FOREIGN KEY (cart_id) REFERENCES carts(id)
        ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
	ON DELETE CASCADE

);

CREATE TABLE favourite_products (
  product_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,

  PRIMARY KEY (product_id, user_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
       ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
       ON DELETE CASCADE
);