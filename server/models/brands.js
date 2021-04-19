/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
);

const Brand = mongoose.model('brands', brandSchema);

module.exports.Brand = Brand;
