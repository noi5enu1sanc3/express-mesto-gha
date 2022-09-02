const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../helpers/errors/NotFoundError');
const ValidationError = require('../helpers/errors/ValidationError');
const ForbiddenError = require('../helpers/errors/ForbiddenError');
const { forbiddenErrorMessage, cardNotFoundMessage, validationErrorMessage } = require('../helpers/constants');

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
    const card = await (await Card.create({ name, link, owner: req.user._id })).populate('owner');
    res.send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(`${validationErrorMessage}: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  const requestedCard = await Card.findById(req.params.cardId)
    .orFail(() => next(new NotFoundError(cardNotFoundMessage)));
  if (req.user._id !== requestedCard.owner._id.toString()) {
    next(new ForbiddenError(forbiddenErrorMessage));
  } else {
    try {
      const card = await Card.findByIdAndRemove(req.params.cardId);

      if (!card) {
        next(new NotFoundError(cardNotFoundMessage));
      } else {
        res.send({ data: card });
      }
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError || mongoose.Error.CastError) {
        next(new ValidationError(`${validationErrorMessage}: ${err.message}`));
      } else {
        next(err);
      }
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
      next(new NotFoundError(cardNotFoundMessage));
    } else {
      res.send({ data: card });
    }
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
      || err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`${validationErrorMessage}: ${err.message}`));
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
      next(new NotFoundError(cardNotFoundMessage));
    } else {
      res.send({ data: card });
    }
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
      || err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`${validationErrorMessage}: ${err.message}`));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
