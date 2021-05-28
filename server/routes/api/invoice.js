/* eslint-disable max-len */
const express = require('express');
const {
  authJwt,
  authParams,
} = require('../../middlewares/auth');

const router = express.Router();

const {
  getAllInvoices,
  getInvoice,
  addInvoice,
} = require('../../controllers/invoice');

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     description: Use to request all invoices
 *     tags:
 *       - invoices
 *     security:
 *       -   bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response, returned all invoices
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or requires employee or admin role
 *       '500':
 *         description: Internal server error
 *   post:
 *     description: Use to add invoice
 *     tags:
 *       - invoices
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            name: invoice
 *            description: The invoice to be created
 *            schema:
 *              type: object
 *              required:
 *                - card_type_id
 *                - card_number
 *                - card_holder
 *                - products []
 *                - datee
 *                - total_price
 *              properties:
 *                invoice:
 *                  type: object
 *                  properties:
 *                    card_type_id:
 *                      type: integer
 *                    card_number:
 *                      type: integer
 *                    card_holder:
 *                      type: string
 *                    date:
 *                      type: string
 *                    total_price:
 *                        type: integer
 *                    products:
 *                        type: array
 *     responses:
 *       '201':
 *         description: Created, added new invoice
 *       '500':
 *         description: Internal server error
 * /api/invoices/{id}:
 *   get:
 *     description: Use to request invoice
 *     tags:
 *       - invoices
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the invoice to return
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, returned invoice
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '500':
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getAllInvoices]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getInvoice]);
router.post('/', addInvoice);

module.exports = router;
