const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');
const { authorizationErrorMessage } = require('../helpers/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError(authorizationErrorMessage));
  } else {
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      next(new UnauthorizedError(authorizationErrorMessage));
    }
    req.user = payload;
    next();
  }
};
