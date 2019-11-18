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

// job seeker accepts interview by selecting a final interview slot, application status is updated, and notification is sent to employer
app.post('/interview/:id/slot/:number', async (req, res) => {
  const interview = await InterviewService.find(req.params.id).catch((err) => console.log(err));
  const updatedInterview = await InterviewService.acceptAndFinalizeTime(interview, req.params.number);
  const updatedApplication = await ApplicationService.updateOne(interview.application, { status: Enums.ApplicationStatuses.InterviewAccepted });
  console.log(updatedApplication);
  res.send(updatedInterview);
});
// axios.post('/interview/5dc5fe1bb86c5716604c0a46/slot/1').then(console.log);

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
