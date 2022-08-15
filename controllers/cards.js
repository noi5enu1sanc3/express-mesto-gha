const mongoose = require('mongoose');
const Card = require('../models/card');
const CardNotFoundError = require('../helpers/errors/CardNotFoundError');
const ValidationError = require('../helpers/errors/ValidationError');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => (err instanceof mongoose.Error.ValidationError
      ? next(new ValidationError(`Validation error: ${err.message}`))
      : next(err)));
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => (!card._id ? next(new CardNotFoundError()) : res.send({ data: card })))
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .populate('likes')
    .then((card) => (!card ? next(new CardNotFoundError()) : res.send({ data: card })))
    .catch((err) => {
      if (
        err instanceof mongoose.Error.ValidationError
        || err instanceof mongoose.Error.CastError) {
        next(new ValidationError(`Validation error: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .populate('likes')
    .then((card) => (!card ? next(new CardNotFoundError()) : res.send({ data: card })))
    .catch((err) => {
      if (
        err instanceof mongoose.Error.ValidationError
        || err instanceof mongoose.Error.CastError) {
        next(new ValidationError(`Validation error: ${err.message}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
