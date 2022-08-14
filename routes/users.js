const router = require('express').Router();

const {
  getUsers, findUserById, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', findUserById);
router.post('/', createUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
