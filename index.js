/* eslint-disable no-console */

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const axios = require('axios').default;
const EmployerService = require('./services/employer-service');
const NotificationService = require('./services/notification-service');
const ApplicationService = require('./services/application-service');
const InterviewService = require('./services/interview-service');
const JobService = require('./services/job-service');

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

// -------------------------------------Interview Endpoints --------------------------------
app.get('/interview/all', async (req, res) => {
  const interviews = await InterviewService.findAll();
  // res.send(interviews);
  res.render('interviews', { interviews });
});

app.get('/interview/:id', async (req, res) => {
  const interview = await InterviewService.find({ _id: req.params.id });
  // res.send(interview)
  res.render('interview', { interview });
});

app.post('/interview', async (req, res) => {
  const interview = await InterviewService.add(req.body);
  res.send(interview);
  console.log(req.body);
});

app.put('/interview/:id', async (req, res) => {
  const interview = await InterviewService.updateOne(req.params.id, req.body);
  res.send(interview);
  console.log(req.body);
});

app.delete('/interview/:id', async (req, res) => {
  const interview = await InterviewService.deleteOne({ _id: req.params.id });
  res.send(interview);
});

// -------------------------------------Job Endpoints --------------------------------
app.get('/job/all', async (req, res) => {
  const jobs = await JobService.findAll();
  // res.send(jobs);
  res.render('jobs', { jobs });
});

app.get('/job/:id', async (req, res) => {
  const job = await JobService.find({ _id: req.params.id });
  // res.send(job)
  res.render('job', { job });
});

app.post('/job', async (req, res) => {
  const job = await JobService.add(req.body);
  res.send(job);
  console.log(req.body);
});

app.put('/job/:id', async (req, res) => {
  const job = await JobService.updateOne(req.params.id, req.body);
  res.send(job);
  console.log(req.body);
});

app.delete('/job/:id', async (req, res) => {
  const job = await JobService.deleteOne({ _id: req.params.id });
  res.send(job);
});
// -------------------------------------Listen --------------------------------

app.listen(3000, () => {
  console.log('did i work?');
});
