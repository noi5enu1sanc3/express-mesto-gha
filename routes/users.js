const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUserInfo, getUsers, findUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.use(auth);

router.get('/users/me', getUserInfo);
router.get('/users/', getUsers);
router.get('/users/:userId', findUserById);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
