const express = require('express');

const router = express.Router();

const {
  getAllProducts, getProduct, updateProduct, addProduct, deleteProduct,
} = require('../controllers/product');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
