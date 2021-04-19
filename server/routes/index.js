const express = require('express');
const userRoutes = require('./user.js');
const productRoutes = require('./product.js');
const brandsRoutes = require('./brand.js');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/brands', brandsRoutes);

module.exports = router;
