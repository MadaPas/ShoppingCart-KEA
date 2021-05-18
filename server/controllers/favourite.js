/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  Favourite,
} = require('../models/FavouriteProduct');

const getAllFavourites = async (req, res) => {
  await Favourite.find({}, (err, favourites) => {
    if (err) res.status(500).send(err);
    res.status(200).json(favourites);
  });
};

const getFavourite = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('Wrong favourite id format. Try again.');
  }
  return Favourite.findById(req.params.id, (err, favourite) => {
    if (favourite === null || favourite.length === 0) {
      return res.status(404).json('No favourite found');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(favourite);
  });
};

const addFavourite = asyncHandler(async (req, res) => {
  const {
    user_id,
    product_id,
  } = req.body;
  const prooductExists = await Favourite.findOne({ user_id, product_id });

  if (prooductExists) {
    return res.status(400).json('This favourite already exists.');
  }

  const favourite = await Favourite.create({
    user_id,
    product_id,
  });

  return res.status(201).json({
    user_id: favourite.user_id,
    product_id: favourite.product_id,
  });
});

const deleteFavourite = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong Favourite id format. Try again.');
    }
    await Favourite.findById(req.params.id, (err, favourite) => {
      if (favourite === null || favourite.length === 0) {
        return res.status(404).json('No favourite found');
      }
      if (err) {
        return res.status(500).send(err);
      }
      Favourite.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) return res.status(500).send(error);
          const response = {
            message: 'Favourite successfully deleted',
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

module.exports.getAllFavourites = getAllFavourites;
module.exports.getFavourite = getFavourite;
module.exports.addFavourite = addFavourite;
module.exports.deleteFavourite = deleteFavourite;
