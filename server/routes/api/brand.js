/* eslint-disable max-len */
const express = require('express');
const {
  // authJwt,
  authParams,
} = require('../../middlewares/auth');

const router = express.Router();

const {
  getAllBrands,
  getBrand,
  updateBrand,
  addBrand,
  deleteBrand,
} = require('../../controllers/brand');

router.get('/', getAllBrands);
router.get('/:id', [authParams.verifyIdParam, getBrand]);
// router.post('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, addBrand]);
router.post('/', [addBrand]);
// router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, updateBrand]);
router.put('/:id', [authParams.verifyIdParam, updateBrand]);
// router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteBrand]);
router.delete('/:id', [authParams.verifyIdParam, deleteBrand]);

module.exports = router;
