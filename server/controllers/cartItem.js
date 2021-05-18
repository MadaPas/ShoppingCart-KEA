const {
  CartItem,
} = require('../models/CartItem');

const getAllCartItems = async (req, res) => {
  await CartItem.find({}, (err, cartItems) => {
    if (err) res.status(500).send(err);
    res.status(200).json(cartItems);
  });
};

// add cart item handled in controllers/invoice.js in the transaction in the object addInvoice

module.exports.getAllCartItems = getAllCartItems;
