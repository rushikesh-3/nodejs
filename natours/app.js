const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

const tourRoute = require('./route/tourRoutes');
const userRoute = require('./route/userRoutes');

// 1) Middle wares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('This is from middle ware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

// 4) Start Server
module.exports = app;
