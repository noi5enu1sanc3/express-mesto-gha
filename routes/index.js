const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');

const PageNotFoundError = require('../helpers/errors/PageNotFoundError');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(userRouter);
router.use(cardRouter);

router.use((req, res, next) => next(new PageNotFoundError()));

module.exports = router;
