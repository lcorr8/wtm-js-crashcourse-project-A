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

require('./database-connection');

app.set('view engine', 'pug');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

// registering basic CRUD routes for all models
app.use(EmployerRoutes);
app.use(NotificationRoutes);
app.use(ApplicationRoutes);
app.use(InterviewRoutes);
app.use(JobRoutes);
app.use(JobSeekerRoutes);


// ------------------------------------Complex Interaction Endpoints -------------------------------

/**
 * // TODO: user management
 * user registers
 * user signs in
 * user logs out
 * user becomes employer or job seeker
 *
 * [DONE] employer creates a job listing
 * [DONE] job search route
 * [DONE] jobseeker starts application
 *    [DONE]app gets added to jobseeker
 * - job seeker adds resume to application
 * [DONE] job seeker submits an application to a given job
 *    [DONE] application gets added to job applications list
 *    [DONE] notification is sent to employer
 * [DONE] employer offers an interview:
 *    [DONE] add interview to db
 *    [DONE] add interview to application, update status
 *    [DONE] notification is sent to jobseeker
 *
 * [-] job seeker accepts interview
 *    [-] notification is sent to employer
 *
 * [-] employer updates application status
 *    [-] accepted: notifications sent to applicant
 *
 * - rejection notifications are sent out to applicants when job listing runs out (a month after)
 */

// employer creates a job listing, job gets added to employer's jobs list
app.post('/employer/:id', async (req, res) => {
  const employer = await EmployerService.find(req.params.id).catch((err) => console.log(err));
  const jobParams = req.body;
  const job = await EmployerService.addJob(employer, jobParams);
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

// job search functionality
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

// TODO: add path for editing application by adding resume photo

// job seeker submits an application
app.post('/application/:applicationId/submit', async (req, res) => {
  const application = await ApplicationService.find(req.params.applicationId).catch((err) => console.log(err));
  const job = await JobService.find(application.job._id).catch((err) => console.log(err));
  await ApplicationService.submitApplication(application, job);

  const updatedApplication = await ApplicationService.find(application._id).catch((err) => console.log(err));
  res.send(updatedApplication);
});
// axios.post('/application/5dc5c64c6e56120e008f5c1c/submit').then(console.log);


// employer offers an interview
app.post('/application/:id/interview', async (req, res) => {
  const application = await ApplicationService.find(req.params.id).catch((err) => console.log(err));
  const scheduleOptions = req.body;
  const interview = await InterviewService.addToApplication(application, scheduleOptions);

  res.send(interview);
});
// axios.post('/application/5dc5eb18ef8725127c365f4a/interview', {
//   scheduleOptions: [new Date("december 3, 2019 11:30"), new Date("december 4, 2019 15:30"), new Date("december 5, 2019 17:30")],
// }).then(console.log);

// job seeker accepts interview by selecting a final interview slot and notification is sent to employer
app.post('/interview/:id/slot/:number/accept', async (req, res) => {
  const interview = await InterviewService.find(req.params.id).catch((err) => console.log(err));
  const slotIndex = Number(req.params.number) - 1 //subtract one for index
  const finalInterviewTime = interview.scheduleOptions[slotIndex];
  const updatedInterview = await InterviewService.updateOne(interview._id, { finalInterviewSlot: finalInterviewTime }).catch((err) => console.log(err));

  const job = await JobService.find(interview.job).catch((err) => console.log(err));
  const employer = await EmployerService.find(job.employer).catch((err) => console.log(err));
  const updatedInbox = employer.inbox;

  // notification is sent to employer
  const message = `An interview for the following job post: ${job._id} has been accepted. appointment time: ${finalInterviewTime}`;
  const time = Date();
  const opened = false;
  const notification = await NotificationService.add({message: message, time: time, application: interview.application, opened: opened}).catch((err) => console.log(err));

  updatedInbox.push(notification);
  const updatedEmployer = await EmployerService.updateOne(employer._id, { inbox: updatedInbox }).catch((err) => console.log(err));

  res.send(updatedInterview);
  console.log(updatedEmployer);
});

// axios.post('/interview/5dc5fe1bb86c5716604c0a46/slot/1/accept').then(console.log);

// employer updates application status, notifications sent to applicant
app.post('/job/:id/application/:applicationId/status', async (req, res) => {
  const job = await JobService.find(req.params.id).catch((err) => console.log(err));
  const application = await ApplicationService.find(req.params.applicationId).catch((err) => console.log(err));
  const status = req.body.status
  const updatedApplication = await ApplicationService.updateOne(application._id, { status: status }).catch((err) => console.log(err));

  if (status === 'accepted') {
    const time = Date();
    const opened = false;
    const message = `Congratulations! your application for the following job post: ${job._id} has been accepted!`
    const notification = await NotificationService.add({ message: message, time: time, application: application, opened: opened }).catch((err) => console.log(err));

    const jobseeker = await JobSeekerService.find(application.jobSeeker).catch((err) => console.log(err));
    const updatedInbox = jobseeker.inbox;
    updatedInbox.push(notification);
    const updatedJobSeeker = await JobSeekerService.updateOne(jobseeker._id, { inbox: updatedInbox }).catch((err) => console.log(err));
    console.log(updatedJobSeeker);
  }

  res.send(updatedApplication);
});

// axios.post('/job/:id/application/:applicationId/status', {status: 'declined'}).then(console.log);
// axios.post('/job/:id/application/:applicationId/status', {status: 'maybe'}).then(console.log);
// axios.post('/job/:id/application/:applicationId/status', {status: 'accepted'}).then(console.log);


// -------------------------------------Listen --------------------------------

app.listen(3000, () => {
  console.log('did i work?');
});
