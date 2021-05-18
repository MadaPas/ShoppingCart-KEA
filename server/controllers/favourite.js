/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  FavouriteProduct,
} = require('../models/FavouriteProduct');

const getAllFavourites = async (req, res) => {
  try {
    FavouriteProduct.find({})
      .then(favourites => res.status(200).json({
        message: 'Data retrieved successfully.',
        data: favourites,
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

const getFavourite = (req, res) => FavouriteProduct.findById(req.params.id, (err, favourite) => {
  if (favourite === null || favourite.length === 0) {
    return res.status(404).json({
      message: 'No favourite product found. Please try again.',
    });
  }
  if (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
  return res.status(200).json({
    message: 'Data retrieved successfully.',
    data: favourite,
  });
});

const addFavourite = asyncHandler(async (req, res) => {
  const {
    user_id,
    product_id,
  } = req.body;
  const exists = await FavouriteProduct.findOne({ user_id, product_id });

  if (exists) {
    return res.status(400).json({
      message: 'This favourite product already exists.',
    });
  }

  const favourite = await FavouriteProduct.create(req.body);

  return res.status(200).json({
    message: 'Favourite product added successfully.',
    data: {
      user_id: favourite.user_id,
      product_id: favourite.product_id,
    },

  });
});

const deleteFavourite = async (req, res) => {
  try {
    await FavouriteProduct.findById(req.params.id, (err, favourite) => {
      if (favourite === null || favourite.length === 0) {
        return res.status(404).json({
          message: 'No favourite product found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      FavouriteProduct.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) {
            return res.status(500).json({
              message: `Internal server error: ${error}`,
            });
          }
          return res.status(200).json({
            message: 'Favourite product deleted successfully.',
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

module.exports.getAllFavourites = getAllFavourites;
module.exports.getFavourite = getFavourite;
module.exports.addFavourite = addFavourite;
module.exports.deleteFavourite = deleteFavourite;
