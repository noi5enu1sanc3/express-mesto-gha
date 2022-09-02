const { ERROR_CODE_CONFLICT } = require('../constants');

class ConflictError extends Error {
  constructor(message) {
    super(ERROR_CODE_CONFLICT, message);
  }
}

module.exports = ConflictError;
