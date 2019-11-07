/* eslint-disable no-console */
const express = require('express');

const app = express();

require('./database-connection');

const EmployerService = require('./services/employer-service');


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

app.get('/employer/all', async (req, res) => {
  // const employers = await EmployerService.findAll();
  const employers = [{ name: 'lola' }, { name: 'adam' }];
  // res.send(employers);
  res.render('employers', { employers });
});

app.get('/employer/:id', async (req, res) => {
  const person = await EmployerService.find(req.params.id);

  res.render('person', { person });
});

app.post('/employer/', async (req, res) => {
  const person = EmployerService.add(req.body);
  res.send(person);
  console.log(req.body);
  // res.render('person', {person});
});

app.put('/employer/:id', async (req, res) => {
  const person = EmployerService.updateObject(req.params.id, req.body);
  res.send(person);
  console.log(req.body);
});

app.delete('/employer/:id', async (req, res) => {
  const person = EmployerService.del(req.params.id);
  res.send(person);
  console.log(req.body);
});
