require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const notefulRouter = require('./noteful-router/noteful-router');

const app = express();

const morgainOption = NODE_ENV === 'production' ? 'tiny' : 'dev';

app.use(morgan(morgainOption));
app.use(helmet());
app.use(cors());

app.use('/api/noteful', notefulRouter);


app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } };
    } else {
      console.error(error);
      response = { message: error.message, error };
    }
    res.status(500).json(response);
});

module.exports = app;