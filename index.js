/* eslint-disable no-console */

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const axios = require('axios').default;
const EmployerService = require('./services/employer-service');
const NotificationModel = require('./models/notification');

require('./database-connection');

app.set('view engine', 'pug');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('index');
});

// -------------------------------------Notification Endpoints --------------------------------
app.get('/employer/all', async (req, res) => {
  const employers = await EmployerService.findAll();
  // res.send(employers);
  res.render('employers', { employers });
});

app.get('/employer/:id', async (req, res) => {
  const employer = await EmployerService.find({ _id: req.params.id });
  // res.send(employer);
  res.render('employer', { employer });
});
// create new
app.post('/employer', async (req, res) => {
  const employer = await EmployerService.add(req.body);
  res.send(employer);
  console.log(req.body);
});
// update
app.put('/employer/:id', async (req, res) => {
  const employer = await EmployerService.updateOne(req.params.id, req.body);
  res.send(employer);
  console.log(req.body);
});

app.delete('/employer/:id', async (req, res) => {
  const employer = await EmployerService.deleteOne({ _id: req.params.id });
  res.send(employer);
  console.log(req.body);
});

// -------------------------------------Notification Endpoints --------------------------------
app.get('/notification/all', async (req, res) => {
  const notifications = await NotificationModel.find(); // works
  // res.send(notifications);
  res.render('notifications', { notifications });
});

app.get('/notification/:id', async (req, res) => {
  // req.params.id
  const notification = await NotificationModel.find({ _id: req.params.id }); // works
  // res.send(notification)
  res.render('notification', { notification });
});

app.post('/notification', async (req, res) => {
  const notification = await NotificationModel.create(req.body); // works
  // const notification = await NotificationModel.add(req.body); // throws error even if i define async function in notification service file: UnhandledPromiseRejectionWarning: TypeError: NotificationModel.add is not a function
  // const notification = await NotificationModel.add(req.body); // throws error even if i define async function in base service file as well: UnhandledPromiseRejectionWarning: TypeError: NotificationModel.add is not a function
  res.send(notification);
  // console.log(req.body);
});

app.delete('/notification/:id', async (req, res) => {
  const notification = await NotificationModel.remove({ _id: req.params.id }); // works
  res.send(notification);
});

// -------------------------------------Listen --------------------------------

app.listen(3000, () => {
  console.log('did i work?');
});
