const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../helpers/errors/NotFoundError');
const { pageNotFoundMessage } = require('../helpers/constants');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(userRouter);
router.use(cardRouter);

router.use((req, res, next) => next(new NotFoundError(pageNotFoundMessage)));

module.exports = router;
