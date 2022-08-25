const mongoose = require('mongoose');
const Card = require('../models/card');
const CardNotFoundError = require('../helpers/errors/CardNotFoundError');
const ValidationError = require('../helpers/errors/ValidationError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({})
      .populate('owner');
    res.send({ data: cards });
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(`Validation error: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);

    if (!card) {
      next(new CardNotFoundError());
    } else {
      res.send({ data: card });
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(`Validation error: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      {
        new: true,
        runValidators: true,
      },
    )
      .populate('likes');
    if (!card) {
      next(new CardNotFoundError());
    } else {
      res.send({ data: card });
    }
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
      || err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`Validation error: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      {
        new: true,
        runValidators: true,
      },
    )
      .populate('likes');
    if (!card) {
      next(new CardNotFoundError());
    } else {
      res.send({ data: card });
    }
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
      || err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`Validation error: ${err.message}`));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
