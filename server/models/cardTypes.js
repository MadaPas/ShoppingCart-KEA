/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

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
