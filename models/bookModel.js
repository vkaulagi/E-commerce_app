const db = require("../config/database");

// Get all books
exports.getBooks = async function () {
    try {
        const result = await db.query("SELECT * FROM books");
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Get book by id
exports.getBookById = async function (id) {
    try {
        const result = await db.query("SELECT * FROM books WHERE id = ?", [id]);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Create book
exports.createBook = async function (book) {
    try {
        const result = await db.query(
            "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
            [book.title, book.author, book.price]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Update book
exports.updateBook = async function (id, book) {
    try {
        const result = await db.query(
            "UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?",
            [book.title, book.author, book.price, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Delete book
exports.deleteBook = async function (id) {
    try {
        const result = await db.query("DELETE FROM books WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (error) {
        console.log(error);
        return null;
    }
};
