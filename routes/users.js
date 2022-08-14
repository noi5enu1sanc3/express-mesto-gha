const router = require('express').Router();

const { getUsers } = require('../controllers/users');
const { getUserById } = require('../controllers/users');
const { createUser } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
