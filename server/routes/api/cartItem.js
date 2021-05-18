const express = require('express');

const router = express.Router();

const {
  getAllCartItems,
} = require('../../controllers/cartItem');

router.get('/', getAllCartItems);

module.exports = router;
