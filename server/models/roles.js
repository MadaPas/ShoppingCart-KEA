/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

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
