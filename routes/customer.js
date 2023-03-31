const express = require('express');
const router = express.Router();
const customerService = require('../services/customerService');

// GET all customers
router.get('/', async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific customer by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const customer = await customerService.getCustomerById(id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new customer
router.post('/', async (req, res) => {
    const newCustomer = req.body;
    try {
        const customer = await customerService.addCustomer(newCustomer);
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT (update) an existing customer
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedCustomer = req.body;
    try {
        const customer = await customerService.updateCustomer(id, updatedCustomer);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE a customer by id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const customer = await customerService.deleteCustomer(id);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
