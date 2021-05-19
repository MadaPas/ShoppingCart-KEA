const express = require('express');
const {
  authJwt,
  authParams,
} = require('../../middlewares/auth');

const router = express.Router();

const {
  getAllFavourites,
  getFavourite,
  addFavourite,
  deleteFavourite,
} = require('../../controllers/favourite');

router.get('/', [authJwt.verifyToken, getAllFavourites]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, getFavourite]);
router.post('/', [authJwt.verifyToken, addFavourite]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, deleteFavourite]);

module.exports = router;
