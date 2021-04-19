const express = require('express');

const router = express.Router();

const {
  getAllProducts, getProduct, updateProduct, addProduct,
} = require('../controllers/product');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);

// TODO - delete - deleteProduct (isAdmin) (with access to route)
// TODO - put - updateProduct

module.exports = router;
