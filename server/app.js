const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'The server is still runnning' });
});

app.use('/api', api);

api.use(function(req, res) {
  res.status(404).json({
    message: 'URL does not exist'
  });
});

module.exports = app;
