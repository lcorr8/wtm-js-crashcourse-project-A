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
const JobSeekerService = require('./services/jobseeker-service');

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

// -------------------------------------JobSeeker Endpoints --------------------------------
app.get('/jobseeker/all', async (req, res) => {
  const jobseekers = await JobSeekerService.findAll();
  // res.send(jobseekers);
  res.render('jobseekers', { jobseekers });
});

app.get('/jobseeker/:id', async (req, res) => {
  const jobseeker = await JobSeekerService.find({ _id: req.params.id });
  // res.send(jobseeker)
  res.render('jobseeker', { jobseeker });
});

app.post('/jobseeker', async (req, res) => {
  const jobseeker = await JobSeekerService.add(req.body);
  res.send(jobseeker);
  console.log(req.body);
});

app.put('/jobseeker/:id', async (req, res) => {
  const jobseeker = await JobSeekerService.updateOne(req.params.id, req.body);
  res.send(jobseeker);
  console.log(req.body);
});

app.delete('/jobseeker/:id', async (req, res) => {
  const jobseeker = await JobSeekerService.deleteOne({ _id: req.params.id });
  res.send(jobseeker);
});

// ------------------------------------Complex Interaction Endpoints -------------------------------

/**
 * user registers
 * user signs in
 * user logs out
 * user becomes employer or job seeker
 *
 * [DONE] employer creates a job listing
 * [DONE] job seeker starts application
 * - job seeker adds resume to application
 * [NOT WORKING] job seeker submits an application to a given job   <-------HELP
 *
 * - employer offers an interview
 * - job seeker accepts interview
 *
 * - employer updatetes application status
 *
 * - rejection notifications are sent out to non selected applicants
 */

// employer creates a job listing
app.post('/employer/:id/newJob', async (req, res) => {
  const employer = await EmployerService.find({ _id: req.params.id }).catch((err) => console.log(err));
  const updatedRequestBody = req.body;
  updatedRequestBody.employer = employer;
  const job = await JobService.add(updatedRequestBody).catch((err) => console.log(err));
  res.send(job);
  console.log(job);
});

// axios.post('/employer/5dc57b75c88a00e5aed4ac64/newJob', {
//   title: "title...",
//   description: "description...",
//   zipcode: "10117",
//   category: "kitchen",
//   jobType: "full-time",
//   compensationMin: 12,
//   compensationMax: 12,
//   tips: true,
// }).then(console.log)

// job seeker starts application
app.post('/jobseeker/:id/job/:jobId/application/new', async (req, res) => {
  const jobseeker = await JobSeekerService.find({ _id: req.params.id }).catch((err) => console.log(err));
  const job = await JobService.find({ _id: req.params.jobId }).catch((err) => console.log(err));
  const updatedRequestBody = req.body;
  updatedRequestBody.jobSeeker = jobseeker;
  updatedRequestBody.job = job;
  const application = await ApplicationService.add(updatedRequestBody).catch((err) => console.log(err));
  res.send(application);
  console.log(application);
});

// axios.post('/jobseeker/5dc5a77097fdf806d7a70d08/job/5dc5c28e4608550d4ebdad4e/application/new', {
//   yearsOfExperience: 4,
//   languagesSpoken: "languages...",
//   otherSkills: "skills...",
//   interviewAvailability: "available on...",
// }).then(console.log)


// job seeker submits an application to a given job
app.post('/application/:applicationId/submit', async (req, res) => {
  const application = await ApplicationService.find({ _id: req.params.applicationId }).catch((err) => console.log(err));
  const job = await JobService.find({ _id: application.job._id }).catch((err) => console.log(err)); // working
  const jobApplications = job.applications; // working
  jobApplications.push(application); // working
  const updatedJobFromDB = await JobService.updateOne(job, { applications: jobApplications }).catch((err) => console.log(err)); // this line not working
  /**
   * { Error: unknown top level operator: $__
    at Connection.<anonymous> (/Users/lola/Development/wtm-js-crashcourse/wtm-js-crashcourse-project-A/node_modules/mongodb/lib/core/connection/pool.js:454:61)
    at emitTwo (events.js:106:13)
    at Connection.emit (events.js:194:7)
    at processMessage (/Users/lola/Development/wtm-js-crashcourse/wtm-js-crashcourse-project-A/node_modules/mongodb/lib/core/connection/connection.js:368:10)
    at Socket.<anonymous> (/Users/lola/Development/wtm-js-crashcourse/wtm-js-crashcourse-project-A/node_modules/mongodb/lib/core/connection/connection.js:537:15)
    at emitOne (events.js:96:13)
    at Socket.emit (events.js:191:7)
    at readableAddChunk (_stream_readable.js:178:18)
    at Socket.Readable.push (_stream_readable.js:136:10)
    at TCP.onread (net.js:560:20)
  ok: 0,
  errmsg: 'unknown top level operator: $__',
  code: 2,
  codeName: 'BadValue',
  name: 'MongoError' }
undefined

   */
  // res.send(updatedJobFromDB);
  console.log(updatedJobFromDB);
});

// axios.post('/application/5dc5c64c6e56120e008f5c1c/submit').then(console.log);

// -------------------------------------Listen --------------------------------

app.listen(3000, () => {
  console.log('did i work?');
});
