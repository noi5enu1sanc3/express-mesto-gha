module.exports.mockAuth = (req, res, next) => {
  req.user = {
    _id: '62f907f39bd4126de7d17c2f',
  };

  next();
};
