const Customer = require('../models/customer');

// Get all customers
exports.getCustomers = (req, res) => {
    Customer.getAll((err, customers) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: "Failed to retrieve customers"
            });
        } else {
            res.status(200).json(customers);
        }
    });
};

// Get a customer by id
exports.getCustomerById = (req, res) => {
    Customer.getById(req.params.id, (err, customer) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: `Failed to retrieve customer with id ${req.params.id}`
            });
        } else {
            if (customer) {
                res.status(200).json(customer);
            } else {
                res.status(404).json({
                    message: `Customer with id ${req.params.id} not found`
                });
            }
        }
    });
};

// Add a customer
exports.addCustomer = (req, res) => {
    let newCustomer = new Customer(req.body);

    // Check required fields
    if (!newCustomer.name || !newCustomer.email) {
        res.status(400).json({
            message: "Name and email fields are required"
        });
    } else {
        Customer.add(newCustomer, (err, customer) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: "Failed to add customer"
                });
            } else {
                res.status(201).json(customer);
            }
        });
    }
};

// Update a customer
exports.updateCustomer = (req, res) => {
    let updatedCustomer = new Customer(req.body);
    updatedCustomer.id = req.params.id;

    // Check required fields
    if (!updatedCustomer.name || !updatedCustomer.email) {
        res.status(400).json({
            message: "Name and email fields are required"
        });
    } else {
        Customer.update(updatedCustomer, (err, customer) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: `Failed to update customer with id ${updatedCustomer.id}`
                });
            } else {
                if (customer) {
                    res.status(200).json(customer);
                } else {
                    res.status(404).json({
                        message: `Customer with id ${updatedCustomer.id} not found`
                    });
                }
            }
        });
    }
};

// Delete a customer
exports.deleteCustomer = (req, res) => {
    Customer.delete(req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: `Failed to delete customer with id ${req.params.id}`
            });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({
                    message: `Customer with id ${req.params.id} deleted successfully`
                });
            } else {
                res.status(404).json({
                    message: `Customer with id ${req.params.id} not found`
                });
            }
        }
    });
};
