const express = require('express');

const router = express.Router();

const brandsRoutes = require('./api/brand.js');
const cardTypesRoutes = require('./api/cardType.js');
const cartItemsRoutes = require('./api/cartItem.js');
const favouriteProductsRoutes = require('./api/favouriteProduct.js');
const invoicesRoutes = require('./api/invoice.js');
const productsRoutes = require('./api/product.js');
const rolesRoutes = require('./api/role.js');
const usersRoutes = require('./api/user.js');

router.use('/brands', brandsRoutes);
router.use('/cards', cardTypesRoutes);
router.use('/items', cartItemsRoutes);
router.use('/favourites', favouriteProductsRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/products', productsRoutes);
router.use('/roles', rolesRoutes);
router.use('/users', usersRoutes);

module.exports = router;
