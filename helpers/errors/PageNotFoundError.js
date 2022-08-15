const HttpError = require('./HttpError');

class PageNotFoundError extends HttpError {
  constructor() {
    super(404, 'Page does not exist');
  }
}

module.exports = PageNotFoundError;
