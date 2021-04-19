/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  Brand,
} = require('../models/brands');

const getAllBrands = async (req, res) => {
  await Brand.find({}, (err, brands) => {
    if (err) res.status(500).send(err);
    res.status(200).json(brands);
  });
};

const getBrand = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('Wrong Brand id format. Try again.');
  }
  return Brand.findById(req.params.id, (err, brand) => {
    if (brand === null || brand.length === 0) {
      return res.status(404).json('No brand found');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(brand);
  });
};

const addBrand = asyncHandler(async (req, res) => {
  const {
    name,
    description,
  } = req.body;
  const prooductExists = await Brand.findOne({ name });

  if (prooductExists) {
    return res.status(400).json('This brand already exists.');
  }

  const brand = await Brand.create({
    name, description,
  });

  return res.status(201).json({
    name: brand.name,
    description: brand.description,
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

module.exports.getAllBrands = getAllBrands;
module.exports.getBrand = getBrand;
module.exports.addBrand = addBrand;
module.exports.updateBrand = updateBrand; // handle errors
