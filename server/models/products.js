/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand_id: {
      type: Number,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
);

const Product = mongoose.model('products', productSchema);

module.exports.Product = Product;
