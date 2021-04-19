const express = require('express');

const router = express.Router();

const {
  getAllUsers, getUser, registerUser,
} = require('../controllers/user');

router.get('/', getAllUsers); // TODO - isAdmin (with access to route)
router.get('/:id', getUser); // TODO - isAdmin (with access to route)
router.post('/', registerUser);

// TODO - post - login (include hashing also in registration)
// TODO - delete - deleteUser (isAdmin) (with access to route)
// TODO - put - updateUser (isAdmin) (with access to route)
// TODO - get - see user profile (with access to route)
// TODO - put - update user profile (with access to route)

module.exports = router;
