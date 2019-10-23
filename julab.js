const express = require('express');
const { Pool } = require('pg');

const port = 3000;

const app = express();
const pool = new Pool({
    host: '/var/run/postgresql',
    user: 'postgres',
    database: 'postgres'
});

app.use(express.json());

app.get( // static files
    [
        '/',
        '/index.html',
        '/style.css',
        '/main.js'
    ],
    (req, res) => res.sendFile(__dirname + (req.path == '' ? 'index.html' : req.path)));

app.get('/api/products', async (req, res) => {
    const { rows: products } = await pool.query('SELECT * FROM products');
    res.send(products);
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { rows: [product] } = await pool.query(
            'SELECT * FROM products WHERE product_id = $1',
            [req.params.id]
        );
        res.json(product);
    } catch (e) {
        res.status(404).send();
    }
});

app.post('/api/products', async (req, res) => {
    try {
        await pool.query('INSERT INTO products (name) VALUES ($1)', [req.body.name]);
        res.status(201).send();
    } catch (e) {
        res.status(400).send();
        console.log(e);
    }
});


app.listen(port, () => console.log(`julab on port ${port}!`));
