const express = require('express');

const router = express.Router();

const brandsRoutes = require('./api/brand.js');
const cardTypesRoutes = require('./api/cardType.js');

const userRoutes = require('./api/user.js');
const productRoutes = require('./api/product.js');
const rolesRoutes = require('./api/role.js');
const favouritesRoutes = require('./api/favourite.js');

router.use('/brands', brandsRoutes);
router.use('/cards', cardTypesRoutes);

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/roles', rolesRoutes);
router.use('/favourites', favouritesRoutes);

module.exports = router;
