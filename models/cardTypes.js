/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
// 607d6e344b034d28ee501e76 VISA
// 607d6e384b034d28ee501e77 MASTERCARD

const cardTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
);

const CardType = mongoose.model('card_types', cardTypeSchema);

module.exports.CardType = CardType;
