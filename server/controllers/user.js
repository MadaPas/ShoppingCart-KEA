/* eslint-disable no-console */
const asyncHandler = require('express-async-handler');

const { User } = require('../models/user');

const getAllUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) res.status(500).send(err);
    res.status(200).json(users);
  });
};

const getUser = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('No user found');
  }
  return User.findById(req.params.id, (err, user) => {
    if (user.length === 0) {
      return res.status(404).json('No user found');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(user);
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json('This user already exists.');
    // throw new Error('User already exists.');
  }

  const user = await User.create({ name, email, password });

  return res.status(201).json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.generateToken(),
  });
});

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.registerUser = registerUser;