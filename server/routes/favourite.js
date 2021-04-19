const express = require('express');

const router = express.Router();

const {
  getAllFavourites, getFavourite, addFavourite, deleteFavourite,
} = require('../controllers/favourite');

router.get('/', getAllFavourites);
router.get('/:id', getFavourite);
router.post('/', addFavourite);
router.delete('/:id', deleteFavourite);

module.exports = router;
