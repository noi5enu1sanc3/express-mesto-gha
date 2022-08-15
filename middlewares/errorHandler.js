module.exports.errorHandler = (err, req, res, next) => {
  const message = err.message || 'Something went wrong. Please try again later.';
  const status = err.status || 500;
  res.status(status).send({ message });
  next();
};
