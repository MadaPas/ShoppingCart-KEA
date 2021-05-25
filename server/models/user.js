/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    date_joined: {
      type: Date,
    },
    last_active: {
      type: Date,
    },
  },
);

const User = mongoose.model('users', userSchema);

module.exports.User = User;
