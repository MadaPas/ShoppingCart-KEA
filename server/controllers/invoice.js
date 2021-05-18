/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */

const {
  Invoice,
} = require('../models/Invoice');

const getAllInvoices = async (req, res) => {
  await Invoice.find({}, (err, invoices) => {
    if (err) res.status(500).send(err);
    res.status(200).json(invoices);
  });
};

const getInvoice = async (req, res) => {
  try {
    await Invoice.findById(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

module.exports.getAllInvoices = getAllInvoices;
module.exports.getInvoice = getInvoice;
