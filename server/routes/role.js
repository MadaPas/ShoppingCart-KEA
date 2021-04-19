const express = require('express');

const router = express.Router();

const {
  getAllRoles, getRole, updateRole, addRole, deleteRole,
} = require('../controllers/role');

router.get('/', getAllRoles);
router.get('/:id', getRole);
router.post('/', addRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;
