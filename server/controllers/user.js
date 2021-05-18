/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User } = require('../models/User');

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

const deleteUser = async (req, res) => {
  try {
    await User.findById(req.params.id, (err, user) => {
      if (user === null || user.length === 0) {
        return res.status(404).json('No user found');
      }
      if (err) {
        return res.status(500).send(err);
      }
      User.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) return res.status(500).send(error);
          const response = {
            message: 'User successfully deleted',
            id: pr._id,
          };
          return res.status(200).send(response);
        },
      );
    });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const signUpUser = asyncHandler(async (req, res) => {
  try {
    const newUser = {
      role_id: req.body.role_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, process.env.BCRYPT_SALT),
    };
    await User.create({ newUser })
      .then(data => res.json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});

const signInUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    User.findOne({ email })
      .then(data => {
        if (!bcrypt.compareSync(req.body.password, data.password)) {
          return res.status(401).send('Unauthorized user, credentials do not match!');
        }
        const token = jwt.sign({
          id: data.id,
        }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return res.status(200).send({
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          role_id: data.role_id,
          accessToken: token,
        });
      })
      .catch(err => res.status(404).send(err));
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
});

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.signInUser = signInUser;
module.exports.signUpUser = signUpUser;
