-- Active: 1708618140938@@127.0.0.1@3306

-- Criando a tabela users:
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, created_at TEXT NOT NULL
);

-- Criar um novo user:
INSERT INTO
    users (
        id, name, email, password, created_at
    )
VALUES (
        'u003', 'Jairo', 'ja@gmail.com', 'PASS9512', CURRENT_TIMESTAMP
    )
-- Mostra todos os usuários:
SELECT * FROM users;

--Editar tabela pelo id(podemos editar por qualquer atributo porém pelo id é melhor por ser unico):
UPDATE users SET email = 'jaja@gmail.com' WHERE id = 'u003';

-- Deleta um usuário pelo id:
DELETE FROM users WHERE id = 'u003';

------------------------Users---------------------------------

---Criando tabela products:
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE, name TEXT NOT NULL, price REAL NOT NULL, description TEXT NOT NULL, image_url TEXT NOT NULL
);

--Criar um novo produto:
INSERT INTO
    products (
        id, name, price, description, image_url
    )
VALUES (
        'prod005', 'notebook', 2500, 'melhor notebook do mercado', 'image.jpg'
    );

-- Selecionar todos os products:
SELECT * FROM products;

-- Retorna a palavra pesquisada
SELECT * FROM products WHERE name LIKE 'gamer%';

--Editar tabela pelo id(podemos editar por qualquer atributo porém pelo id é melhor por ser unico):
UPDATE products SET price = 230 WHERE id = 'prod003';

-- Deleta o produto pelo id:
DELETE FROM products WHERE id = 'prod003';

---------------------------purchases------------------------------------

---Criando tabela purchases:
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, buyer TEXT NOT NULL, total_price REAL NOT NULL, created_at TEXT NOT NULL, FOREIGN KEY (buyer) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE purchases;
---Inserindo produtos:
INSERT INTO
    purchases (
        id, total_price, created_at, buyer
    )
VALUES (
        'pur001', 40, CURRENT_TIMESTAMP, 'u002'
    ),
    (
        'pur002', 69.99, CURRENT_TIMESTAMP, 'u001'
    ),
    (
        'pur003', 100, CURRENT_TIMESTAMP, 'u002'
    ),
    (
        'pur004', 250, CURRENT_TIMESTAMP, 'u001'
    );

---Selecionando os produtos:
SELECT
    purchases.id AS idDaCompra,
    purchases.buyer AS idDoComprador,
    users.name AS nomeComprador,
    users.email,
    purchases.total_price AS valorTotal,
    purchases.created_at AS dataDaCompra
FROM purchases
    INNER JOIN users ON purchases.buyer = users.id

------------Purchases_products-----------

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL, product_id TEXT NOT NULL, quantity INTEGER NOT NULL, FOREIGN KEY (purchase_id) REFERENCES purchases (id), Foreign KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO
    purchases_products (
        purchase_id, product_id, quantity
    )
VALUES 
    ('pur001', 'prod003', 5),
    ('pur002', 'prod004', 8),
    ('pur003', 'prod002', 3);

SELECT *
FROM
    purchases_products
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id
    INNER JOIN users ON users.id = purchases.buyer;

