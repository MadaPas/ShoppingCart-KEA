/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  Product,
} = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    Product.find({})
      .then(products => res.status(200).json({
        message: 'Data retrieved successfully.',
        data: products,
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

const getProduct = (req, res) => Product.findById(req.params.id, (err, product) => {
  if (product === null || product.length === 0) {
    return res.status(404).json({
      message: 'No product found. Please try again.',
    });
  }
  if (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
  return res.status(200).json({
    message: 'Data retrieved successfully.',
    data: product,
  });
});

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
  } = req.body;
  const exists = await Product.findOne({
    name,
  });

  if (exists) {
    return res.status(400).json({
      message: 'This product already exists.',
    });
  }

  const product = await Product.create(req.body);

  return res.status(200).json({
    message: 'product created successfully.',
    data: product,
  });
});

const updateProduct = async (req, res) => {
  try {
    await Product.findById(req.params.id, (err, product) => {
      if (product === null || product.length === 0) {
        return res.status(404).json({
          message: 'No product found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      Product.findByIdAndUpdate(
        req.params.id,
        req.body, {
          new: true,
        },
        (error, pr) => {
          if (error) {
            return res.status(500).json({
              message: `Internal server error: ${error}`,
            });
          }
          return res.status(200).json({
            message: 'Product updated successfully.',
            data: pr,
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

const deleteProduct = async (req, res) => {
  try {
    await Product.findById(req.params.id, (err, product) => {
      if (product === null || product.length === 0) {
        return res.status(404).json({
          message: 'No product found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      Product.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) {
            return res.status(500).json({
              message: `Internal server error: ${error}`,
            });
          }
          return res.status(200).json({
            message: 'Product deleted successfully.',
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

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
