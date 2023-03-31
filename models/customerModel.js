const mysql = require('mysql');
const connection = require('../config/db');

const Customer = function(customer) {
    this.name = customer.name;
    this.email = customer.email;
    this.address = customer.address;
};

Customer.create = (newCustomer, result) => {
    connection.query('INSERT INTO customers SET ?', newCustomer, (err, res) => {
        if (err) {
            console.error('Error: ', err);
            result(err, null);
            return;
        }

        console.log('Created customer: ', { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
};

Customer.findById = (customerId, result) => {
    connection.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
        if (err) {
            console.error('Error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Found customer: ', res[0]);
            result(null, res[0]);
            return;
        }

        // customer not found
        result({ kind: 'not_found' }, null);
    });
};

Customer.getAll = (result) => {
    connection.query('SELECT * FROM customers', (err, res) => {
        if (err) {
            console.error('Error: ', err);
            result(null, err);
            return;
        }

        console.log('Customers: ', res);
        result(null, res);
    });
};

Customer.updateById = (id, customer, result) => {
    connection.query(
        'UPDATE customers SET name = ?, email = ?, address = ? WHERE id = ?',
        [customer.name, customer.email, customer.address, id],
        (err, res) => {
            if (err) {
                console.error('Error: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // customer not found
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Updated customer: ', { id: id, ...customer });
            result(null, { id: id, ...customer });
        }
    );
};

Customer.remove = (id, result) => {
    connection.query('DELETE FROM customers WHERE id = ?', id, (err, res) => {
        if (err) {
            console.error('Error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // customer not found
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Deleted customer with id: ', id);
        result(null, res);
    });
};

module.exports = Customer;
