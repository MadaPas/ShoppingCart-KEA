/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  Brand,
} = require('../models/Brand');

const getAllBrands = async (req, res) => {
  try {
    Brand.find({})
      .then(brands => res.status(200).json({
        message: 'Data retrieved successfully.',
        data: brands,
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

const getBrand = (req, res) => Brand.findById(req.params.id, (err, brand) => {
  if (brand === null || brand.length === 0) {
    return res.status(404).json({
      message: 'No brand found. Please try again.',
    });
  }
  if (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
  return res.status(200).json({
    message: 'Data retrieved successfully.',
    data: brand,
  });
});

const addBrand = asyncHandler(async (req, res) => {
  const {
    name,
  } = req.body;
  const exists = await Brand.findOne({
    name,
  });

  if (exists) {
    return res.status(400).json({
      message: 'This brand already exists.',
    });
  }

  const brand = await Brand.create(req.body);

  return res.status(200).json({
    message: 'Brand created successfully.',
    data: brand,
  });
});

const updateBrand = async (req, res) => {
  try {
    await Brand.findById(req.params.id, (err, brand) => {
      if (brand === null || brand.length === 0) {
        return res.status(404).json({
          message: 'No brand type found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      Brand.findByIdAndUpdate(
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
            message: 'Brand updated successfully.',
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

const deleteBrand = async (req, res) => {
  try {
    await Brand.findById(req.params.id, (err, brand) => {
      if (brand === null || brand.length === 0) {
        return res.status(404).json({
          message: 'No brand type found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      Brand.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) {
            return res.status(500).json({
              message: `Internal server error: ${error}`,
            });
          }
          return res.status(200).json({
            message: 'Brand deleted successfully.',
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

module.exports.getAllBrands = getAllBrands;
module.exports.getBrand = getBrand;
module.exports.addBrand = addBrand;
module.exports.updateBrand = updateBrand;
module.exports.deleteBrand = deleteBrand;
