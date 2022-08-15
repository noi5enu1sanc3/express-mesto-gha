const HttpError = require('./HttpError');

class ValidationError extends HttpError {
  constructor(message) {
    super(400, message);
  }
}

module.exports = ValidationError;
