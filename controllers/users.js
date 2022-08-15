const mongoose = require('mongoose');
const UserNotFoundError = require('../helpers/errors/UserNotFoundError');
const ValidationError = require('../helpers/errors/ValidationError');
const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

const findUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => (!user ? next(new UserNotFoundError()) : res.send({ data: user })))
    .catch((err) => (err instanceof mongoose.Error.CastError
      ? next(new ValidationError())
      : next(err)));
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => (err instanceof mongoose.Error.ValidationError
      ? next(new ValidationError(`Validation error: ${err.message}`))
      : next(err)));
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  }).then((user) => (!user ? next(new UserNotFoundError()) : res.send({ data: user })))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError
        || err instanceof mongoose.Error.CastError) {
        next(new ValidationError(`Validation error: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  }).then((user) => (!user ? next(new UserNotFoundError()) : res.send({ data: user })))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError
        || err instanceof mongoose.Error.CastError) {
        next(new ValidationError(`Validation error: ${err.message}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers, findUserById, createUser, updateUserProfile, updateUserAvatar,
};
