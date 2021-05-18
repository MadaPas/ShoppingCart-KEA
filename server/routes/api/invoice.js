const express = require('express');
const {
  authJwt,
  authParams,
} = require('../../middlewares/auth');

const router = express.Router();

const {
  getAllInvoices,
  getInvoice,
  //   addInvoice,
} = require('../../controllers/invoice');

router.get('/', [authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getAllInvoices]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getInvoice]);
// router.post('/', addInvoice); // under development -- transactions fix for mongo

module.exports = router;
