const express = require('express');
const {
  authJwt,
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

/**
 * @swagger
 * /api/brands:
 *   get:
 *     description: Use to request all brands
 *     tags:
 *       - brands
 *     responses:
 *       '200':
 *         description: A successful response, returned all brands
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add brand
 *     tags:
 *       - brands
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: brand
 *         description: The brand to create
 *         schema:
 *           type: object
 *           required:
 *            - name
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       '201':
 *         description: Created, added new brand
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require employee or admin role
 *       '500':
 *         description: Internal server error
 * /api/brands/{id}:
 *   get:
 *     description: Use to request brand
 *     tags:
 *       - brands
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand to return
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, returned brand
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 example:
 *                   id: 2
 *                   name: Zara
 *                   description: It is Spanish
 *       '400':
 *         description: Bad request, wrong id format
 *       '500':
 *         description: Internal server error
 *   put:
 *     description: Use to update brand
 *     tags:
 *       - brands
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand to update
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, updated brand
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require employee or admin role
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete brand
 *     tags:
 *       - brands
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand to delete
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: No content, deleted brand
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 */

router.get('/', getAllBrands);
router.get('/:id', [authParams.verifyIdParam, getBrand]);
router.post('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, addBrand]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, updateBrand]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteBrand]);

module.exports = router;
