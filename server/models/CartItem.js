/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      allowNull: false,
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      allowNull: false,
      primaryKey: true,
    },
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'invoices',
      allowNull: false,
    },
    quantity: {
      type: Number,
    },
    unit_price: {
      type: String,
      allowNull: false,
    },
  },
);

const CardItem = mongoose.model('card_items', CartItemSchema);

module.exports.CardItem = CardItem;
