/* eslint-disable no-console */

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const axios = require('axios').default;
const EmployerService = require('./services/employer-service');
const NotificationService = require('./services/notification-service');
const ApplicationService = require('./services/application-service');

require('./database-connection');

app.set('view engine', 'pug');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('index');
});

// -------------------------------------Employer Endpoints --------------------------------
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
  const notifications = await NotificationService.findAll();
  // res.send(notifications);
  res.render('notifications', { notifications });
});

app.get('/notification/:id', async (req, res) => {
  const notification = await NotificationService.find({ _id: req.params.id });
  // res.send(notification)
  res.render('notification', { notification });
});

app.post('/notification', async (req, res) => {
  const notification = await NotificationService.add(req.body);
  res.send(notification);
  console.log(req.body);
});

app.put('/notification/:id', async (req, res) => {
  const notification = await NotificationService.updateOne(req.params.id, req.body);
  res.send(notification);
  console.log(req.body);
});

app.delete('/notification/:id', async (req, res) => {
  const notification = await NotificationService.deleteOne({ _id: req.params.id });
  res.send(notification);
});


// -------------------------------------Application Endpoints --------------------------------
app.get('/application/all', async (req, res) => {
  const applications = await ApplicationService.findAll();
  // res.send(application);
  res.render('applications', { applications });
});

app.get('/application/:id', async (req, res) => {
  const application = await ApplicationService.find({ _id: req.params.id });
  // res.send(application)
  res.render('application', { application });
});

app.post('/application', async (req, res) => {
  const application = await ApplicationService.add(req.body);
  res.send(application);
  console.log(req.body);
});

app.put('/application/:id', async (req, res) => {
  const application = await ApplicationService.updateOne(req.params.id, req.body);
  res.send(application);
  console.log(req.body);
});

app.delete('/application/:id', async (req, res) => {
  const application = await ApplicationService.deleteOne({ _id: req.params.id });
  res.send(application);
});

// -------------------------------------Listen --------------------------------

app.listen(3000, () => {
  console.log('did i work?');
});
