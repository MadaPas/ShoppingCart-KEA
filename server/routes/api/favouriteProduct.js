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

/**
 * @swagger
 * /api/favourites:
 *   get:
 *     description: Use to request all favourite products
 *     tags:
 *       - favourites
 *     security:
 *       -   bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response, returned all favourite products
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add favourite product
 *     tags:
 *       - favourites
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: favourite
 *         description: The favourite item to create
 *         schema:
 *           type: object
 *           required:
 *             - product_id
 *             - user_id
 *           properties:
 *             product_id:
 *               type: integer
 *             user_id:
 *               type: integer
 *     responses:
 *       '201':
 *         description: Created, added new favourite product
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 * /api/favourites/{id}:
 *   get:
 *     description: Use to request favourite product
 *     tags:
 *       - favourites
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the favourite item to return
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, returned favourite product
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete favourite product
 *     tags:
 *       - favourites
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the favourite item to delete
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: No content, deleted favourite product
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken, getAllFavourites]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, getFavourite]);
router.post('/', [authJwt.verifyToken, addFavourite]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, deleteFavourite]);

module.exports = router;
