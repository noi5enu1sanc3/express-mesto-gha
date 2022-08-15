const HttpError = require('./HttpError');

class CardNotFoundError extends HttpError {
  constructor() {
    super(404, 'Card with this id not found');
  }
}

module.exports = CardNotFoundError;
