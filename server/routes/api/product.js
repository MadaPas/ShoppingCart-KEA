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

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Use to request all products
 *     tags:
 *       - products
 *     security:
 *       -   bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response, returned all products
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add product
 *     tags:
 *       - products
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: product
 *         description: The product to create
 *         schema:
 *           type: object
 *           required:
 *             - brand_id
 *             - name
 *             - unit_price
 *             - size
 *           properties:
 *             brand_id:
 *               type: integer
 *             name:
 *               type: string
 *             unit_price:
 *               type: number
 *             description:
 *               type: string
 *             size:
 *               type: string
 *     responses:
 *       '201':
 *         description: Created, added new product
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin or employee role
 *       '500':
 *         description: Internal server error
 * /api/products/{id}:
 *   get:
 *     description: Use to request product
 *     tags:
 *       - products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to return
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, returned product
 *       '400':
 *         description: Bad request, wrong id format
 *       '500':
 *         description: Internal server error
 *   put:
 *     description: Use to update product
 *     tags:
 *       - products
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, updated product
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin or employee role
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete product
 *     tags:
 *       - products
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: No content, deleted product
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 * /api/products/views/products:
 *   get:
 *     description: Use to request all info about products and their brands for customers
 *     tags:
 *       - products
 *     responses:
 *       '200':
 *         description: A successful response, returned all products
 *       '500':
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getAllProducts]); //
router.get('/:id', [authParams.verifyIdParam, getProduct]);
router.post('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, addProduct]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, updateProduct]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteProduct]);
// router.get('/views/products', getProductsForUsers);

module.exports = router;
