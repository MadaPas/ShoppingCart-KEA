/* eslint-disable max-len */
const express = require('express');
const {
  authJwt,
  authParams,
  authVerification,
} = require('../../middlewares/auth');

const router = express.Router();

const {
  getAllUsers,
  getUser,
  signInUser,
  signUpUser,
  deleteUser,
} = require('../../controllers/user');

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Use to request all users
 *     tags:
 *       - users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response, returned all users
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '404':
 *         description: Page ot found
 *       '500':
 *         description: Internal server error
 * /api/users/{id}:
 *   get:
 *     description: Use to request user
 *     tags:
 *       - users
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to return
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, returned user
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or requires employee or admin role
 *       '404':
 *         description: Page not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete user
 *     tags:
 *       - users
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: No content, deleted user
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided or require admin role
 *       '404':
 *         description: Page not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     description: Use to update user
 *     tags:
 *       - users
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, updated user
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided
 *       '500':
 *         description: Internal server error
 * /api/users/profile/{id}:
 *   get:
 *     description: Use to request user profile
 *     tags:
 *       - users
 *     security:
 *       -   bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to return
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: A successful response, returned user
 *       '400':
 *         description: Bad request, wrong id format
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden, no token provided
 *       '404':
 *         description: Page not found
 *       '500':
 *         description: Internal server error
 * /api/users/signup:
 *   post:
 *     description: Use to add new user
 *     tags:
 *       - users
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            name: user
 *            description: The user to create
 *            schema:
 *              type: object
 *              required:
 *                - roleId
 *                - firstName
 *                - LastName
 *                - email
 *                - password
 *              properties:
 *                role_id:
 *                  type: integer
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       '201':
 *         description: Created, added new user
 *       '404':
 *         description: Page not found
 *       '409':
 *         description: Conflict, user already exists
 *       '500':
 *         description: Internal server error
 * /api/users/signin:
 *   post:
 *     description: Use to log in
 *     tags:
 *       - users
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            name: user
 *            description: The user to sign in
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  default: jamesjimick@mystore.com
 *                password:
 *                  type: string
 *                  default: JaJiPass
 *     responses:
 *       '200':
 *         description: A successful response, user logged in
 *       '401':
 *         description: Unauthorized user, credentials do not match
 *       '404':
 *         description: Page not found
 *       '500':
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken, authJwt.isAdmin, getAllUsers]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getUser]);
router.post('/signup', [authVerification.verifyNewUser, signUpUser]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteUser]);
router.post('/signin', [authVerification.verifyExistingUser, signInUser]);

module.exports = router;
