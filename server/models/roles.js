/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
// 607d67fe24b72122ed6bcd81 CUSTOMER
// 607d680424b72122ed6bcd82 ADMIN

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
);

const Role = mongoose.model('roles', roleSchema);

module.exports.Role = Role;
