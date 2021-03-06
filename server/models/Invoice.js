/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  card_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'card_types',
    required: true,
  },
  card_number: {
    type: String,
    rewuired: true,
  },
  card_holder: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  total_price: {
    type: String,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  }],
});

const Invoice = mongoose.model('invoices', invoiceSchema);

module.exports.Invoice = Invoice;
