const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUserInfo, getUsers, findUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
const { validateGetUserById, validateUpdateUserProfile, validateUpdateUserAvatar } = require('../middlewares/validation');

router.use(auth);

router.get('/users/me', validateGetUserById, getUserInfo);
router.get('/users/', getUsers);
router.get('/users/:userId', validateGetUserById, findUserById);
router.patch('/users/me', validateUpdateUserProfile, updateUserProfile);
router.patch('/users/me/avatar', validateUpdateUserAvatar, updateUserAvatar);

module.exports = router;
