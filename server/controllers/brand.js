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
      .then(brands => res.status(200).json(brands))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json(`Internal server error: ${err}`);
  }
};

const getBrand = (req, res) => Brand.findById(req.params.id, (err, brand) => {
  if (brand === null || brand.length === 0) {
    return res.status(404).json('No brand found. Please try again.');
  }
  if (err) {
    return res.status(500).send(err);
  }
  return res.status(200).json(brand);
});

const addBrand = asyncHandler(async (req, res) => {
  const {
    name,
  } = req.body;
  const prooductExists = await Brand.findOne({ name });

  if (prooductExists) {
    return res.status(400).json('This brand already exists.');
  }

  const brand = await Brand.create(req.body);

  return res.status(200).json({
    message: 'Brand created.',
    brand,
  });
});

const updateBrand = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong brand id format. Try again.');
    }
    const newBrand = await Brand.findById(req.params.id, (err, brand) => {
      if (brand === null || brand.length === 0) {
        return res.status(404).json('No brand found');
      }
      if (err) {
        return res.status(500).send(err);
      }
      Brand.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, pr) => {
          if (error) return res.status(500).send(error);
          return res.send(pr);
        },
      );
    });
    return newBrand;
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

const deleteBrand = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong brand id format. Try again.');
    }
    await Brand.findById(req.params.id, (err, brand) => {
      if (brand === null || brand.length === 0) {
        return res.status(404).json('No brand found');
      }
      if (err) {
        return res.status(500).send(err);
      }
      Brand.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) return res.status(500).send(error);
          const response = {
            message: 'Brand successfully deleted',
            id: pr._id,
          };
          return res.status(200).send(response);
        },
      );
    });
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

module.exports.getAllBrands = getAllBrands;
module.exports.getBrand = getBrand;
module.exports.addBrand = addBrand;
module.exports.updateBrand = updateBrand;
module.exports.deleteBrand = deleteBrand;
