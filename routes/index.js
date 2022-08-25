const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

const PageNotFoundError = require('../helpers/errors/PageNotFoundError');

router.use(userRouter);
router.use(cardRouter);

router.use((req, res, next) => next(new PageNotFoundError()));

module.exports = router;
