const express = require('express');
const {
  authJwt,
  authParams,
} = require('../../middlewares/auth');

const router = express.Router();

const {
  getAllCardTypes,
  getCardType,
  updateCardType,
  addCardType,
  deleteCardType,
} = require('../../controllers/cardType');

/**
 * @swagger
 * /api/cards:
 *   get:
 *     description: Use to request all card types
 *     tags:
 *       - cards
 *     responses:
 *       '200':
 *         description: A successful response, returned all card types
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add card type
 *     tags:
 *       - cards
 *     security:
 *       -   bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            name: cardType
 *            description: The card type to create
 *            schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                  default: GOOGLECARD
 *     responses:
 *       '201':
 *         description: Created, added new card type
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 * /api/cards/{id}:
 *   get:
 *     description: Use to request card type
 *     tags:
 *       - cards
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the card type to return
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, returned card type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 example:
 *                   id: 1
 *                   name: MASTERCARD
 *       '400':
 *         description: Bad request, wrong id format
 *       '500':
 *         description: Internal server error
 *   put:
 *     description: Use to update card type
 *     tags:
 *       - cards
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the card type to update
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            name: cardType
 *            description: The card type to create
 *            schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                  default: SUPERCARD
 *     responses:
 *       '200':
 *         description: A successful response, updated card type
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete card type
 *     tags:
 *       - cards
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the card type to delete
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: No content, deleted card type
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 */

router.get('/', getAllCardTypes);
router.get('/:id', [authParams.verifyIdParam, getCardType]);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, addCardType]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, updateCardType]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteCardType]);

module.exports = router;
