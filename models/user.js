const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UserNotFoundError = require('../helpers/errors/UserNotFoundError');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, 'non-valid email'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema
  .statics
  .findUserByCredentials = async function findUserByCredentials(email, password, next) {
    const user = await this.findOne({ email });
    if (!user) {
      next(new UserNotFoundError()); // TODO universal NotFound class + wrong email or password
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      next(new UnauthorizedError());
    }
    return user;
  };

module.exports = mongoose.model('user', userSchema);
