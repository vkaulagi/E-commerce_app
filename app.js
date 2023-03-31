const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customer');
const bookRoutes = require('./routes/book');
const app = require('./index');

const mainApp = express();

mainApp.use(bodyParser.json());
mainApp.use(bodyParser.urlencoded({ extended: true }));

mainApp.use('/customer', customerRoutes);
mainApp.use('/book', bookRoutes);

mainApp.use('/', app);

mainApp.listen(3000, () => console.log('Server started on port 3000.'));
