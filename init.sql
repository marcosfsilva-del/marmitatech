CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL -- Propositalmente em texto plano
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS marmitas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Aberto' -- Aberto, Cozinha, Entrega, Entregue
);

INSERT INTO users (username, password) VALUES ('admin', 'admin123');
INSERT INTO items (name, category) VALUES ('Arroz Branco', 'Base'), ('Feijão Preto', 'Grão'), ('Frango Grelhado', 'Proteína');
