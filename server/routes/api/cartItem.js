const express = require('express');

const router = express.Router();

const {
  getAllCartItems,
} = require('../../controllers/cartItem');

/**
 * @swagger
 * /api/cartItems:
 *   get:
 *     description: Use to request all cart items
 *     tags:
 *       - cart items
 *     responses:
 *       '200':
 *         description: A successful response, returned all cart items
 *       '500':
 *         description: Internal server error

 */
router.get('/', getAllCartItems);

module.exports = router;
