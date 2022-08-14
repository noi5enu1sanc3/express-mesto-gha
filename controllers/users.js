const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Error while getting users' }));
};

const findUserById = (req, res) => {
  User.find(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error while getting user' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error while creating user' }));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  }).then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  }).then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getUsers, findUserById, createUser, updateUserProfile, updateUserAvatar,
};
