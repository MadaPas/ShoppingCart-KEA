/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  CardType,
} = require('../models/CardType');

const getAllCardTypes = async (req, res) => {
  try {
    CardType.find({})
      .then(cardTypes => res.status(200).json({
        message: 'Data retrieved successfully.',
        data: cardTypes,
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

const getCardType = (req, res) => CardType.findById(req.params.id, (err, cardType) => {
  if (cardType === null || cardType.length === 0) {
    return res.status(404).json({
      message: 'No card type found. Please try again.',
    });
  }
  if (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
  return res.status(200).json({
    message: 'Data retrieved successfully.',
    data: cardType,
  });
});

const addCardType = asyncHandler(async (req, res) => {
  const {
    name,
  } = req.body;
  const prooductExists = await CardType.findOne({
    name,
  });

  if (prooductExists) {
    return res.status(400).json({
      message: 'This cardType already exists.',
    });
  }

  const cardType = await CardType.create(req.body);

  return res.status(200).json({
    message: 'CardType created successfully.',
    data: cardType,
  });
});

const updateCardType = async (req, res) => {
  try {
    await CardType.findById(req.params.id, (err, cardType) => {
      if (cardType === null || cardType.length === 0) {
        return res.status(404).json({
          message: 'No card type found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      CardType.findByIdAndUpdate(
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
            message: 'CardType updated successfully.',
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

const deleteCardType = async (req, res) => {
  try {
    await CardType.findById(req.params.id, (err, cardType) => {
      if (cardType === null || cardType.length === 0) {
        return res.status(404).json({
          message: 'No card type type found. Please try again.',
        });
      }
      if (err) {
        return res.status(500).json({
          message: `Internal server error: ${err}`,
        });
      }
      CardType.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) {
            return res.status(500).json({
              message: `Internal server error: ${error}`,
            });
          }
          return res.status(200).json({
            message: 'CardType deleted successfully.',
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

module.exports.getAllCardTypes = getAllCardTypes;
module.exports.getCardType = getCardType;
module.exports.addCardType = addCardType;
module.exports.updateCardType = updateCardType;
module.exports.deleteCardType = deleteCardType;
