const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.get('/', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (user.rows.length > 0) res.redirect('/dashboard');
    else res.send('Login falhou!');
});

app.get('/dashboard', async (req, res) => {
    const items = await pool.query('SELECT * FROM items');
    const orders = await pool.query('SELECT * FROM orders');
    res.render('dashboard', { items: items.rows, orders: orders.rows });
});

app.post('/add-item', async (req, res) => {
    const { name, category } = req.body;
    await pool.query('INSERT INTO items (name, category) VALUES ($1, $2)', [name, category]);
    res.redirect('/dashboard');
});

app.listen(3000, () => console.log('MarmitaTech rodando na porta 3000'));
