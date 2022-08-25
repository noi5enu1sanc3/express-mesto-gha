const mongoose = require('mongoose');
const UserNotFoundError = require('../helpers/errors/UserNotFoundError');
const ValidationError = require('../helpers/errors/ValidationError');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      next(new UserNotFoundError());
    } else {
      res.send({ data: user });
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`Validation error: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const createUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(`Validation error: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const updateUserProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      next(new UserNotFoundError());
    } else {
      res.send({ data: user });
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError
      || err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`Validation error: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      next(new UserNotFoundError());
    } else {
      res.send({ data: user });
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError
      || err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`Validation error: ${err.message}`));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUsers, findUserById, createUser, updateUserProfile, updateUserAvatar,
};
