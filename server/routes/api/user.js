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

router.get('/', [authJwt.verifyToken, authJwt.isAdmin, getAllUsers]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getUser]);
router.post('/signup', [authVerification.verifyNewUser, signUpUser]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteUser]);
router.post('/signin', [authVerification.verifyExistingUser, signInUser]);

module.exports = router;
