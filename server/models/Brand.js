/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
// 607d4c93794dc0111bf2d0f2 ZARA
// 607d4ca0794dc0111bf2d0f3 H&M

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: {
        args: 'name',
        msg: 'This name is already taken!',
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
);

const Brand = mongoose.model('brands', brandSchema);

module.exports.Brand = Brand;
