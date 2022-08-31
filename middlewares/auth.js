const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // next(new UnauthorizedError());
    return res.status(401).send('auth required');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key'); // TODO env?
  } catch (err) {
    next(new UnauthorizedError(err));
  }
  req.user = payload;
  next();
};
