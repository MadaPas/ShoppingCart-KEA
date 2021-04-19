/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
);

const Favourite = mongoose.model('favourite_products', favouriteSchema);

module.exports.Favourite = Favourite;
