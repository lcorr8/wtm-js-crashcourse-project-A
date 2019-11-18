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

// employer creates a job listing, job gets added to employer's list
app.post('/employer/:id', async (req, res) => {
  const employer = await EmployerService.find(req.params.id).catch((err) => console.log(err));
  const jobParams = req.body;
  const job = await EmployerService.addJob(employer, jobParams).catch((err) => console.log(err));
  res.send(job);
});
// axios.post('/employer/5dc57b75c88a00e5aed4ac64/', {
//   title: "title...",
//   description: "description...",
//   zipcode: "10117",
//   category: "kitchen",
//   jobType: "full-time",
//   compensationMin: 12,
//   compensationMax: 12,
//   tips: true,
// }).then(console.log)

// job search route
app.get('/jobs?', async (req, res) => {
  const { query } = req;
  const jobs = await JobService.findAll(query);
  console.log(query);
  console.log(jobs);
  res.send(query);
  // res.render('jobs', { jobs });
});
// axios.get('/jobs/?zipcode=10117&jobType=full-time&tips=true&category=bar').catch(err => console.log(err));
// axios.get('/jobs/?zipcode[]=10117&zipcode[]=10118&jobType=part-time&tips=true&category=bar').catch(err => console.log(err));

// job seeker starts application, application gets added to job seeker
app.post('/jobseeker/:id/job/:jobId/application/', async (req, res) => {
  const jobseeker = await JobSeekerService.find(req.params.id).catch((err) => console.log(err));
  const job = await JobService.find(req.params.jobId).catch((err) => console.log(err));
  const applicationParams = req.body;
  const application = await ApplicationService.startApplication(jobseeker, job, applicationParams);

  console.log(application);
  res.send(application);
});
// axios.post('/jobseeker/5dc5a77097fdf806d7a70d08/job/5dc5c28e4608550d4ebdad4e/application', {
//   yearsOfExperience: 4,
//   languagesSpoken: "languages...",
//   otherSkills: "skills...",
//   interviewAvailability: "available on...",
// }).then(console.log)

// job seeker submits an application, application gets added job's applications list and notification sent to employer
app.post('/application/:applicationId/submit', async (req, res) => {
  const application = await ApplicationService.find(req.params.applicationId).catch((err) => console.log(err));
  const job = await JobService.find(application.job._id).catch((err) => console.log(err));
  await ApplicationService.submitApplication(application, job);

  const updatedApplication = await ApplicationService.find(application._id).catch((err) => console.log(err));
  res.send(updatedApplication);
});
// axios.post('/application/5dc5c64c6e56120e008f5c1c/submit').then(console.log);


// employer offers an interview, interview added to application and application status updated
app.post('/application/:id/interview', async (req, res) => {
  const application = await ApplicationService.find(req.params.id).catch((err) => console.log(err));
  const scheduleOptions = req.body;
  const interview = await InterviewService.addToApplication(application, scheduleOptions);

  res.send(interview);
});
// axios.post('/application/5dc5eb18ef8725127c365f4a/interview', {
//   scheduleOptions: [new Date("december 3, 2019 11:30"), new Date("december 4, 2019 15:30"), new Date("december 5, 2019 17:30")],
// }).then(console.log);

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
