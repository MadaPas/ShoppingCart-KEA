/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

const {
  Invoice,
} = require('../models/Invoice');

const getAllInvoices = async (req, res) => {
  try {
    Invoice.find({})
      .then(invoices => res.status(200).json({
        message: 'Data retrieved successfully.',
        data: invoices,
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

const getInvoice = (req, res) => Invoice.findById(req.params.id, (err, invoice) => {
  if (invoice === null || invoice.length === 0) {
    return res.status(404).json({
      message: 'No invoice found. Please try again.',
    });
  }
  if (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
  return res.status(200).json({
    message: 'Data retrieved successfully.',
    data: invoice,
  });
});

const addInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.create(req.body);

  return res.status(200).json({
    message: 'invoice created successfully.',
    data: invoice,
  });
});

// TODO - transactions (add an invioce)
module.exports.getAllInvoices = getAllInvoices;
module.exports.getInvoice = getInvoice;
module.exports.addInvoice = addInvoice;
