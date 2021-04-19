/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  Product,
} = require('../models/products');

const getAllProducts = async (req, res) => {
  await Product.find({}, (err, products) => {
    if (err) res.status(500).send(err);
    res.status(200).json(products);
  });
};

const getProduct = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('Wrong product id format. Try again.');
  }
  return Product.findById(req.params.id, (err, product) => {
    if (product === null || product.length === 0) {
      return res.status(404).json('No product found');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(product);
  });
};

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand_id,
    unit_price,
    rating,
    description,
    size,
  } = req.body;
  const prooductExists = await Product.findOne({ name });

  if (prooductExists) {
    return res.status(400).json('This product already exists.');
  }

  const product = await Product.create({
    name, brand_id, unit_price, rating, description, size,
  });

  return res.status(201).json({
    name: product.name,
    brand_id: product.brand_id,
    unit_price: product.unit_price,
    rating: product.rating,
    description: product.description,
    size: product.size,
  });
});

const updateProduct = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong product id format. Try again.');
    }
    const newProduct = await Product.findById(req.params.id, (err, product) => {
      if (product === null || product.length === 0) {
        return res.status(404).json('No product found');
      }
      if (err) {
        return res.status(500).send(err);
      }
      Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, pr) => {
          if (error) return res.status(500).send(error);
          return res.send(pr);
        },
      );
    });
    return newProduct;
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct; // handle errors
