/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  User,
} = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    await User.find({})
      .then(users => {
        res.status(200).json({
          message: 'Data retrieved successfully.',
          data: users,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

const getUser = (req, res) => User.findById(req.params.id, (err, user) => {
  if (user === null || user.length === 0) {
    return res.status(404).json({
      message: 'No user found. Please try again.',
    });
  }
  if (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
  return res.status(200).json({
    message: 'Data retrieved successfully.',
    data: user,
  });
});

const deleteUser = async (req, res) => {
  try {
    await User.findById(req.params.id, (err, user) => {
      if (user === null || user.length === 0) {
        return res.status(404).json({
          message: 'No user found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      User.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) {
            return res.status(500).json({
              message: `Internal server error: ${error}`,
            });
          }
          return res.status(200).json({
            message: 'User deleted successfully.',
            id: pr._id,
          });
        },
      );
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

const signUpUser = asyncHandler(async (req, res) => {
  const {
    role_id,
    first_name,
    last_name,
    email,
    password,
  } = req.body;
  try {
    const newUser = {
      role_id,
      first_name,
      last_name,
      email,
      password: bcrypt.hashSync(password, 12),
    };
    await User.create(newUser)
      .then(user => res.json({
        message: 'User created successfully.',
        data: user,
      }));
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
      error: err,
    });
  }
});

const signInUser = asyncHandler(async (req, res) => {
  const {
    email,
  } = req.body;
  try {
    User.findOne({
      email,
    })
      .then(data => {
        if (!bcrypt.compareSync(req.body.password, data.password)) {
          return res.status(401).json({
            message: 'Unauthorized user, credentials do not match. Try again. ',
          });
        }
        const token = jwt.sign({
          id: data._id,
        }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return res.status(200).json({
          message: 'Signed in successfully.',
          data: {
            id: data._id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role_id: data.role_id,
            accessToken: token,
          },
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
});

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.signInUser = signInUser;
module.exports.signUpUser = signUpUser;
