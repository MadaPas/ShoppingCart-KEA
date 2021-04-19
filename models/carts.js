/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    products: {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
      unit_price: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  },
);

const Cart = mongoose.model('carts', cartSchema);

module.exports.Cart = Cart;
