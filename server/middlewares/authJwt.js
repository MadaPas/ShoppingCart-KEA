/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const verifyToken = (req, res, next) => {
  const token = req.headers['auth-token'];
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.id = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.id).then(user => {
    if (user.role_id.toString() === '607d680424b72122ed6bcd82') {
      next();
      return;
    }
    return res.status(403).send({
      message: 'Require Admin Role!',
    });
  });
};

const isEmployeeOrAdmin = (req, res, next) => {
  User.findById(req.id).then(user => {
    if (user.role_id.toString() === '607d680424b72122ed6bcd82' || user.role_id.toString() === '607d67fe24b72122ed6bcd81') {
      next();
      return;
    }
    return res.status(403).send({
      message: 'Require Employee or Admin Role!',
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isEmployeeOrAdmin,
};
module.exports = authJwt;
