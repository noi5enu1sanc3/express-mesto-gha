const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { mockAuth } = require('./middlewares/mockAuth');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(bodyParser.json());

app.use(mockAuth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
