const mysql = require('mysql');
const util = require('util');

// create connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'bookstore',
});

// promisify the pool query method
pool.query = util.promisify(pool.query);

// Book model methods
const Book = {};

Book.getAllBooks = async () => {
    const rows = await pool.query('SELECT * FROM books');
    return rows;
};

Book.getBookById = async (id) => {
    const rows = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
};

Book.createBook = async (book) => {
    const { title, author, description } = book;
    const rows = await pool.query('INSERT INTO books (title, author, description) VALUES (?, ?, ?)', [title, author, description]);
    return rows.insertId;
};

Book.updateBookById = async (id, book) => {
    const { title, author, description } = book;
    const rows = await pool.query('UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?', [title, author, description, id]);
    return rows.affectedRows;
};

Book.deleteBookById = async (id) => {
    const rows = await pool.query('DELETE FROM books WHERE id = ?', [id]);
    return rows.affectedRows;
};

module.exports = Book;
