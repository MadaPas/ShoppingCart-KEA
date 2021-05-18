const express = require('express');
const userRoutes = require('./api/user.js');
const productRoutes = require('./api/product.js');
const brandsRoutes = require('./api/brand.js');
const rolesRoutes = require('./api/role.js');
const cardTypesRoutes = require('./api/cardType.js');
const favouritesRoutes = require('./api/favourite.js');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/brands', brandsRoutes);
router.use('/roles', rolesRoutes);
router.use('/cards', cardTypesRoutes);
router.use('/favourites', favouritesRoutes);

module.exports = router;
