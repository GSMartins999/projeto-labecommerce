-- Active: 1708618140938@@127.0.0.1@3306

-- Criando a tabela users:
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE, 
    name TEXT NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL, 
    created_at TEXT NOT NULL
);

-- Criar um novo user:
INSERT INTO users (id, name, email, password, created_at)
VALUES ('u003', 'Jairo', 'ja@gmail.com', 'PASS9512', CURRENT_TIMESTAMP)

-- Mostra todos os usuários:
SELECT * FROM users;

--Editar tabela pelo id(podemos editar por qualquer atributo porém pelo id é melhor por ser unico):
UPDATE users
SET email = 'jaja@gmail.com'
WHERE id = 'u003';

-- Deleta um usuário pelo id:
DELETE FROM users WHERE id = 'u003';



------------------------Users---------------------------------

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE, 
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    description TEXT NOT NULL, 
    image_url TEXT NOT NULL
);

--Criar um novo produto:
INSERT INTO products(id, name, price, description, image_url)
VALUES('prod003', 'teclado', 120.99, 'melhor teclado do mercado','image.jpg');

-- Selecionar todos os products:
SELECT * FROM products;

-- Retorna a palavra pesquisada
SELECT * FROM products
WHERE name LIKE 'gamer%';

--Editar tabela pelo id(podemos editar por qualquer atributo porém pelo id é melhor por ser unico):
UPDATE products
SET price = 230
WHERE id = 'prod003';

-- Deleta o produto pelo id:
DELETE FROM products WHERE id = 'prod003';