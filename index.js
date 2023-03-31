const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookstore',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with connection id ' + connection.threadId);
});

app.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error querying database: ' + error.stack);
            res.status(500).send('Error querying database');
            return;
        }
        res.send(results);
    });
});

module.exports = app;
