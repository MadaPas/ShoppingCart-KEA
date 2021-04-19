const express = require('express');

const router = express.Router();

const {
  getAllBrands, getBrand, updateBrand, addBrand, deleteBrand,
} = require('../controllers/brand');

router.get('/', getAllBrands);
router.get('/:id', getBrand);
router.post('/', addBrand);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);

// TODO - delete - deleteBrand (isAdmin) (with access to route)
// TODO - put - updateBrand

module.exports = router;
