/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, // createdAt. updatedAt
  },
  {
    versionKey: false, // https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose
  },
);

userSchema.methods.generateToken = () => {
  const { JWT_SECRET, JWT_EXPIRE } = process.env;

  const payload = {
    id: this._id,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};
const User = mongoose.model('users', userSchema);

module.exports.User = User;
