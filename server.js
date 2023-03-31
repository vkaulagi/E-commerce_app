const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'password',
    database: 'ecommerce',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

// Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/api/customers', (req, res) => {
    const query = 'SELECT * FROM customers';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/api/books', (req, res) => {
    const query = 'SELECT * FROM books';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/api/books', (req, res) => {
    const { title, author, price } = req.body;
    const query = `INSERT INTO books (title, author, price) VALUES ('${title}', '${author}', ${price})`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send('Book added successfully!');
    });
});

app.put('/api/books/:id', (req, res) => {
    const { title, author, price } = req.body;
    const bookId = req.params.id;
    const query = `UPDATE books SET title = '${title}', author = '${author}', price = ${price} WHERE id = ${bookId}`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send(`Book with ID: ${bookId} updated successfully!`);
    });
});

app.delete('/api/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = `DELETE FROM books WHERE id = ${bookId}`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send(`Book with ID: ${bookId} deleted successfully!`);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
