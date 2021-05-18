/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  connectDB,
} = require('./db/index');

const routes = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Our API is running...')
    .catch(() => {
      res.status(500).json('Internal server error');
    });
});

app.use('/api', routes);

connectDB();

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
