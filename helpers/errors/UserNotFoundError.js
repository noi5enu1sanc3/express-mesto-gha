const HttpError = require('./HttpError');

class UserNotFoundError extends HttpError {
  constructor() {
    super(404, 'User with this id not found');
  }
}

module.exports = UserNotFoundError;
