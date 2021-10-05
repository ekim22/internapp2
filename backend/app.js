const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('First middleware')
  next()
})

app.use((req, res, next) => {
  console.log('Second middleware')
  // Send implicitly ends the response! No need for end()
  res.send('Hello from express!');
})

module.exports = app;
