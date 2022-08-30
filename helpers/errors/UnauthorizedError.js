const HttpError = require('./HttpError');

class UnauthorizedError extends HttpError {
  constructor() {
    super(401, '...'); // TODO message
  }
}

module.exports = UnauthorizedError;
