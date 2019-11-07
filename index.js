/* eslint-disable no-console */
const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.listen(3000, () => {
  console.log('did i work?');
});

app.get('/', (req, res) => {
  // res.send(`${__dirname}/views/index.pug`);
  // to send multiple pug templates use the render function
  // res.render(`${__dirname}/views/layout.pug`);
  res.render('index');
});

app.get('/person/all', (req, res) => {
  res.render('people');
});

app.get('/person/:id', (req, res) => {
  res.render('person');
});

app.post('/person/:id', (req, res) => {
  res.render('person');
});

app.delete('/person/:id', (req, res) => {
  // res.send(person);
});
