/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const {
  CardType,
} = require('../models/cardTypes');

const getAllCardTypes = async (req, res) => {
  await CardType.find({}, (err, cardTypes) => {
    if (err) res.status(500).send(err);
    res.status(200).json(cardTypes);
  });
};

const getCardType = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('Wrong card type id format. Try again.');
  }
  return CardType.findById(req.params.id, (err, cardType) => {
    if (cardType === null || cardType.length === 0) {
      return res.status(404).json('No card type found');
    }
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(cardType);
  });
};

const addCardType = asyncHandler(async (req, res) => {
  const {
    name,
  } = req.body;
  const prooductExists = await CardType.findOne({ name });

  if (prooductExists) {
    return res.status(400).json('This card type already exists.');
  }

  const cardType = await CardType.create({
    name,
  });

  return res.status(201).json({
    name: cardType.name,
  });
});

const updateCardType = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong card type id format. Try again.');
    }
    const newCardType = await CardType.findById(req.params.id, (err, cardType) => {
      if (cardType === null || cardType.length === 0) {
        return res.status(404).json('No card type found');
      }
      if (err) {
        return res.status(500).send(err);
      }
      CardType.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, pr) => {
          if (error) return res.status(500).send(error);
          return res.send(pr);
        },
      );
    });
    return newCardType;
  } catch (err) {
    res.status(500).json('Internal server error');
  }
};

const deleteCardType = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong card type id format. Try again.');
    }
    await CardType.findById(req.params.id, (err, cardType) => {
      if (cardType === null || cardType.length === 0) {
        return res.status(404).json('No card type found');
      }
      if (err) {
        return res.status(500).send(err);
      }
      CardType.findByIdAndRemove(
        req.params.id,
        (error, pr) => {
          if (error) return res.status(500).send(error);
          const response = {
            message: 'Card type successfully deleted',
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

module.exports.getAllCardTypes = getAllCardTypes;
module.exports.getCardType = getCardType;
module.exports.addCardType = addCardType;
module.exports.updateCardType = updateCardType;
module.exports.deleteCardType = deleteCardType;
