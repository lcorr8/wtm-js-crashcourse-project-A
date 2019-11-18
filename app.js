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
const JobSeekerService = require('./services/job-seeker-service');

const EmployerRoutes = require('./routes/employer');
const NotificationRoutes = require('./routes/notification');
const ApplicationRoutes = require('./routes/application');
const InterviewRoutes = require('./routes/interview');
const JobRoutes = require('./routes/job');
const JobSeekerRoutes = require('./routes/job-seeker');

const Enums = require('./helpers/enums');

require('./database-connection');

app.set('view engine', 'pug');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

// registering basic CRUD routes for all models
app.use('/employer', EmployerRoutes);
app.use('/notification', NotificationRoutes);
app.use('/application', ApplicationRoutes);
app.use('/interview', InterviewRoutes);
app.use('/job', JobRoutes);
app.use('/job-seeker', JobSeekerRoutes);

// ------------------------------------Complex Interaction Endpoints -------------------------------

// employer updates application status, notifications sent to applicant if accepted
app.post('/application/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedApplication = await ApplicationService.updateOne(id, { status }).catch((err) => console.log(err));

  if (status === 'accepted') {
    const jobseeker = await JobSeekerService.find(updatedApplication.jobSeeker).catch((err) => console.log(err));
    const message = `Congratulations on your new Job! your application for the following job post: ${updatedApplication.job} has been accepted!`;
    await NotificationService.sendNotification(jobseeker, updatedApplication, message).catch((err) => console.log(err));
  }

  res.send(updatedApplication);
});
// axios.post('/application/:id/status', {status: 'declined'}).then(console.log);
// axios.post('/application/:id/status', {status: 'pending'}).then(console.log);
// axios.post('/application/:id/status', {status: 'accepted'}).then(console.log);

module.exports = app;
