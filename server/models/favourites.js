/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands',
      required: true,
    },
  },
);

const Favourite = mongoose.model('favourites', favouriteSchema);

module.exports.Favourite = Favourite;
