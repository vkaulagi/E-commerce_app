const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../config/db');

// Create connection to database
const connection = mysql.createConnection(db);

// Get all books
router.get('/', (req, res) => {
    const query = 'SELECT * FROM books';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get book by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM books WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Add book
router.post('/', (req, res) => {
    const { title, author, price } = req.body;
    const query = `INSERT INTO books (title, author, price) VALUES ('${title}', '${author}', ${price})`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Book added', id: result.insertId });
    });
});

// Update book by id
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, author, price } = req.body;
    const query = `UPDATE books SET title='${title}', author='${author}', price=${price} WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Book updated', id });
    });
});

// Delete book by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM books WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Book deleted', id });
    });
});

module.exports = router;
