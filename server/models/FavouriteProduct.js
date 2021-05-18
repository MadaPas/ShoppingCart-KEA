/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const favouriteProductSchema = new mongoose.Schema(
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

const FavouriteProduct = mongoose.model('favourite_products', favouriteProductSchema);

module.exports.FavouriteProduct = FavouriteProduct;
