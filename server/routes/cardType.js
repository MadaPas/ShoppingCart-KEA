const express = require('express');

const router = express.Router();

const {
  getAllCardTypes, getCardType, updateCardType, addCardType, deleteCardType,
} = require('../controllers/cardType');

router.get('/', getAllCardTypes);
router.get('/:id', getCardType);
router.post('/', addCardType);
router.put('/:id', updateCardType);
router.delete('/:id', deleteCardType);

module.exports = router;
