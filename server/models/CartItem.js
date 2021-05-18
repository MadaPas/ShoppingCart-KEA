/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

// Holds information about cart_items - stored into the sequelize object from our index.js
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
      primaryKey: true, // Setting two primary keys will create a 'composite key' in Sequelize
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
