const express = require('express');

const router = express.Router();

const brandsRoutes = require('./api/brand.js');
const cardTypesRoutes = require('./api/cardType.js');
const cartItemsRoutes = require('./api/cartItem.js');
const favouriteProductsRoutes = require('./api/favouriteProduct.js');
const invoicesRoutes = require('./api/invoice.js');

const userRoutes = require('./api/user.js');
const productRoutes = require('./api/product.js');
const rolesRoutes = require('./api/role.js');

router.use('/brands', brandsRoutes);
router.use('/cards', cardTypesRoutes);
router.use('/cartItems', cartItemsRoutes);
router.use('/favourites', favouriteProductsRoutes);
router.use('/invoices', invoicesRoutes);

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/roles', rolesRoutes);

module.exports = router;
