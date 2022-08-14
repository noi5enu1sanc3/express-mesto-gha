const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Error while getting users' }));
};

module.exports.findUserById = (req, res) => {
  User.find(req.params._id).then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error while getting user' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error while creating user' }));
};
