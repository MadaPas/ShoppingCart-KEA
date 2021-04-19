const express = require('express');

const router = express.Router();

const {
  getAllProducts, getProduct,
} = require('../controllers/product');

router.get('/', getAllProducts);
router.get('/:id', getProduct);

// TODO - delete - deleteProduct (isAdmin) (with access to route)
// TODO - put - updateProduct

module.exports = router;
