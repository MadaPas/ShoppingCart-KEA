/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable max-len */
const { User } = require('../models/User');

const verifyExistingUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then(data => {
      if (!data) {
        return res.status(404).send('User not found!');
      }
      next();
    })
    .catch(err => console.log(err));
};

const verifyNewUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then(data => {
      if (data) {
        return res.status(409).send('User already exists!');
      }
      next();
    })
    .catch(err => console.log(err));
};

const authVerification = {
  verifyExistingUser,
  verifyNewUser,
};

module.exports = authVerification;
