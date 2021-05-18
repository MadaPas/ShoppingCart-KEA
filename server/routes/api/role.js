const express = require('express');
const {
  authJwt,
  authParams,
} = require('../../middlewares/auth');

const router = express.Router();

const {
  getAllRoles,
  getRole,
  updateRole,
  addRole,
  deleteRole,
} = require('../../controllers/role');

router.get('/', [authJwt.verifyToken, authJwt.isAdmin, getAllRoles]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, getRole]);
router.post('/', [authJwt.isAdmin, authJwt.verifyToken, addRole]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, updateRole]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteRole]);

module.exports = router;
