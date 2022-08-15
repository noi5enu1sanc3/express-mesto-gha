const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(bodyParser.json());

const mockAuth = (req, res, next) => {
  req.user = {
    _id: '62f907f39bd4126de7d17c2f',
  };

  next();
};

app.use(mockAuth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
