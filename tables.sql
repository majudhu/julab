CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO products (name) VALUES ('one');