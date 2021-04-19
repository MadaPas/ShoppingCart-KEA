const express = require('express');
const userRoutes = require('./user.js');
const productRoutes = require('./product.js');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
