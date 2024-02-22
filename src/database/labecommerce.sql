-- Active: 1708618140938@@127.0.0.1@3306

-- Criando a tabela users:
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE, 
    name TEXT NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL, 
    created_at TEXT NOT NULL
);

-- Mostrar tabela users:
PRAGMA table_info ('users');

-- Inserir dados:
INSERT INTO users (id, name, email, password, created_at)
VALUES ('u003', 'Jairo', 'ja@gmail.com', 'PASS9512','2023-02-08');

-- Selecionar todos os dados:
SELECT * FROM users;

--Editar tabela pelo id(podemos editar por qualquer atributo porém pelo id é melhor por ser unico):
UPDATE users
SET email = 'jaja@gmail.com'
WHERE id = 'u003';

DELETE FROM users WHERE id = 'u003';
------------------------Users---------------------------------

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE, 
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    description TEXT NOT NULL, 
    image_url TEXT NOT NULL
);

-- Mostrar tabela users:
PRAGMA table_info ('products');

-- Inserir dados:
INSERT INTO products (id, name, price, description, image_url)
VALUES ('prod001', 'mouse', 79.99, 'melhor mouse do mercado','image.jpg'), ('prod002', 'monitor', 250.99, 'melhor monitor do mercado','image.jpg'), ('prod003', 'teclado', 120.99, 'melhor teclado do mercado','image.jpg'), ('prod004', 'cabo USB', 25.99, 'melhor usb do mercado','image.jpg'), ('prod005', 'PS5', 3500, 'melhor console do mercado','image.jpg');


--Inserir dados de um por um:
INSERT INTO products(id, name, price, description, image_url)
VALUES('prod003', 'teclado', 120.99, 'melhor teclado do mercado','image.jpg');

-- Selecionar todos os dados:
SELECT * FROM products;

--Editar tabela pelo id(podemos editar por qualquer atributo porém pelo id é melhor por ser unico):
UPDATE products
SET price = 230
WHERE id = 'prod003';

DELETE FROM products WHERE id = 'prod003';