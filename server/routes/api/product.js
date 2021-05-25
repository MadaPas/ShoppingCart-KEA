const express = require('express');
const {
  authJwt,
  authParams,
} = require('../../middlewares/auth');

const router = express.Router();

const {
  getAllProducts,
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct,
} = require('../../controllers/product');

router.get('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getAllProducts]); //
router.get('/:id', [authParams.verifyIdParam, getProduct]);
router.post('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, addProduct]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, updateProduct]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteProduct]);
// router.get('/views/products', getProductsForUsers);

module.exports = router;
