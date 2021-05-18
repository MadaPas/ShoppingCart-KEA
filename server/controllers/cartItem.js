/* eslint-disable consistent-return */
const {
  CartItem,
} = require('../models/CartItem');

const getAllCartItems = async (req, res) => {
  try {
    CartItem.find({})
      .then(cartItems => res.status(200).json({
        message: 'Data retrieved successfully.',
        data: cartItems,
      }))
      .catch(err => res.json({
        error: err,
      }));
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
};

module.exports.getAllCartItems = getAllCartItems;
