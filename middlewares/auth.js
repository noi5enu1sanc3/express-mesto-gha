const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');
const { authorizationErrorMessage } = require('../helpers/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt; // cookies.jwt? use cookie parser
  // const { authorization } = req.headers;
  console.log(req.headers);
  if (!token) {
    next(new UnauthorizedError(authorizationErrorMessage));
  } else {
    // const token = authorization.replace('Bearer ', '');
    console.log(token);
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key'); // TODO env?
    } catch (err) {
      next(new UnauthorizedError(authorizationErrorMessage));
    }
    req.user = payload;
    next();
  }
};
