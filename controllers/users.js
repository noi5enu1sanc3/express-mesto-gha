const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserNotFoundError = require('../helpers/errors/UserNotFoundError');
const ValidationError = require('../helpers/errors/ValidationError');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');
const User = require('../models/user');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' }); // TODO env?
    console.log(token);
    //res.send(token);
    res
      .cookie('jwt', token, {
        maxAge: 3600 * 24 * 7,
        httpOnly: true,
      })
      .end();
  } catch (err) {
    next(new UnauthorizedError(err.message));
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    console.log(req.user, 'qqq');
    const user = await User.findById(req.user._id).orFail(() => next(new UserNotFoundError()));
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

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
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
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
  login, getUserInfo, getUsers, findUserById, createUser, updateUserProfile, updateUserAvatar,
};
