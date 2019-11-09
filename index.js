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
 * [DONE] job seeker submits an application to a given job
 *    [DONE] notification is sent to employer
 *
 * [DONE] employer offers an interview
 *    [DONE] notification is sent to jobseeker
 * [DONE] job seeker accepts interview
 *    [DONE] notification is sent to employer
 *
 * [DONE] employer updates application status
 *    [DONE] accepted: notifications sent to applicant
 * 
 * - rejection notifications are sent out to applicants when job listing runs out (a month after)
 */

// employer creates a job listing, job gets added to employer's jobs list
app.post('/employer/:id/newJob', async (req, res) => {
  const employer = await EmployerService.find({ _id: req.params.id }).catch((err) => console.log(err));
  const updatedRequestBody = req.body;
  updatedRequestBody.employer = employer;
  const job = await JobService.add(updatedRequestBody).catch((err) => console.log(err));

  const updatedEmployerJobs = employer.jobs;
  updatedEmployerJobs.push(job);
  const updatedEmployer = await EmployerService.updateOne({_id: employer._id}, { jobs: updatedEmployerJobs }).catch((err) => console.log(err));
  res.send(updatedEmployer);
  console.log(updatedEmployer);
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

// job seeker starts application, application gets added to job seeker
app.post('/jobseeker/:id/job/:jobId/application/new', async (req, res) => {
  const jobseeker = await JobSeekerService.find({ _id: req.params.id }).catch((err) => console.log(err));
  const job = await JobService.find({ _id: req.params.jobId }).catch((err) => console.log(err));
  const updatedRequestBody = req.body;
  updatedRequestBody.jobSeeker = jobseeker;
  updatedRequestBody.job = job;
  const application = await ApplicationService.add(updatedRequestBody).catch((err) => console.log(err));
  
  const updatedJobSeekerApplications = jobseeker.applications;
  updatedJobSeekerApplications.push(application);
  const updatedJobSeeker = await JobSeekerService.updateOne({_id: jobseeker._id}, { applications: updatedJobSeekerApplications }).catch((err) => console.log(err));

  res.send(application);
  console.log(updatedJobSeeker);
});

// axios.post('/jobseeker/5dc5a77097fdf806d7a70d08/job/5dc5c28e4608550d4ebdad4e/application/new', {
//   yearsOfExperience: 4,
//   languagesSpoken: "languages...",
//   otherSkills: "skills...",
//   interviewAvailability: "available on...",
// }).then(console.log)

// TODO: add path for editing application by adding resume photo

// job seeker submits an application, application gets added to job applications list, notification gets sent to employer
app.post('/application/:applicationId/submit', async (req, res) => {
  const application = await ApplicationService.find({ _id: req.params.applicationId }).catch((err) => console.log(err));
  const job = await JobService.find({ _id: application.job._id }).catch((err) => console.log(err));
  const updatedJobApplications = job.applications;
  updatedJobApplications.push(application);
  const updatedJobFromDB = await JobService.updateOne({_id: job._id}, { applications: updatedJobApplications }).catch((err) => console.log(err));
  
  // notification is sent to employer
  const employer = await EmployerService.find({ _id: job.employer._id }).catch((err) => console.log(err));

  const message = `You have received an application for the following job post: ${job._id}`
  const time = Date();
  const opened = false;
  const notification = await NotificationService.add({message: message, time: time, application: application, opened: opened}).catch((err) => console.log(err));
  const updatedNotifications = employer.inbox;
  updatedNotifications.push(notification);
  const updatedEmployer = await EmployerService.updateOne({ _id: employer._id }, { inbox: updatedNotifications }).catch((err) => console.log(err));

  res.send(updatedJobFromDB);
  console.log(updatedEmployer);
});

// axios.post('/application/5dc5c64c6e56120e008f5c1c/submit').then(console.log);


// employer offers an interview
app.post('/application/:id/interview/new', async (req, res) => {
  const application = await ApplicationService.find({ _id: req.params.id }).catch((err) => console.log(err));
  const jobId = application.job;
  const jobseekerId = application.jobSeeker;

  // add interview to db
  const updatedRequestBody = req.body;
  updatedRequestBody.jobSeeker = jobseekerId;
  updatedRequestBody.job = jobId;
  updatedRequestBody.application = application;
  const interview = await InterviewService.add(updatedRequestBody).catch((err) => console.log(err));

  // add interview to application
  const updatedApplication = await ApplicationService.updateOne({_id: application._id}, {interview: interview});

  // add interview to job interviews array
  const job = await JobService.find(jobId).catch((err) => console.log(err));
  job.interviews.push(interview);
  const updatedJob = await JobService.updateOne({_id: job._id}, {interviews: job.interviews}).catch((err) => console.log(err));;

  // add interview to jobseekers interviews array 
  const jobSeeker = await JobSeekerService.find(jobseekerId).catch((err) => console.log(err));
  const updatedJobseekerInterviews = jobSeeker.interviews;
  updatedJobseekerInterviews.push(interview);
  // notification is sent to jobseeker
  const message = `You have received an interview for the following job post: ${jobId}`
  const time = Date();
  const opened = false;
  const notification = await NotificationService.add({message: message, time: time, application: application, opened: opened}).catch((err) => console.log(err));
  const updatedNotifications = jobSeeker.inbox;
  updatedNotifications.push(notification);
  // update jobseeker
  const updatedJobSeeker = await JobSeekerService.updateOne({_id: jobseekerId}, {interviews: updatedJobseekerInterviews, inbox: updatedNotifications}).catch((err) => console.log(err));

  res.send(interview);
  console.log(updatedJobSeeker);
});

// axios.post('/application/5dc5eb18ef8725127c365f4a/interview/new', {
//   scheduleOptions: [new Date("december 3, 2019 11:30"), new Date("december 4, 2019 15:30"), new Date("december 5, 2019 17:30")],
// }).then(console.log);

// job seeker accepts interview by selecting a final interview slot and notification is sent to employer
app.post('/interview/:id/slot/:number/accept', async (req, res) => {
  const interview = await InterviewService.find({ _id: req.params.id }).catch((err) => console.log(err));
  const slotIndex = Number(req.params.number) - 1 //subtract one for index
  const finalInterviewTime = interview.scheduleOptions[slotIndex];
  const updatedInterview = await InterviewService.updateOne({ _id: interview._id }, { finalInterviewSlot: finalInterviewTime }).catch((err) => console.log(err));
  
  const job = await JobService.find({ _id: interview.job }).catch((err) => console.log(err));
  const employer = await EmployerService.find({ _id: job.employer }).catch((err) => console.log(err));
  const updatedInbox = employer.inbox;
  
  // notification is sent to employer
  const message = `An interview for the following job post: ${job._id} has been accepted. appointment time: ${finalInterviewTime}`;
  const time = Date();
  const opened = false;
  const notification = await NotificationService.add({message: message, time: time, application: interview.application, opened: opened}).catch((err) => console.log(err));
  
  updatedInbox.push(notification);
  const updatedEmployer = await EmployerService.updateOne({ _id: employer._id }, { inbox: updatedInbox }).catch((err) => console.log(err));

  res.send(updatedInterview);
  console.log(updatedEmployer);
});

// axios.post('/interview/5dc5fe1bb86c5716604c0a46/slot/1/accept').then(console.log);

// employer updates application status, notifications sent to applicant
app.post('/job/:id/application/:applicationId/status', async (req, res) => {
  const job = await JobService.find({ _id: req.params.id }).catch((err) => console.log(err));
  const application = await ApplicationService.find({ _id: req.params.applicationId }).catch((err) => console.log(err));
  const status = req.body.status
  const updatedApplication = await ApplicationService.updateOne({_id: application._id}, { status: status }).catch((err) => console.log(err));

  if (status === 'accepted') {
    const time = Date();
    const opened = false;
    const message = `Congratulations! your application for the following job post: ${job._id} has been accepted!`
    const notification = await NotificationService.add({ message: message, time: time, application: application, opened: opened }).catch((err) => console.log(err));

    const jobseeker = await JobSeekerService.find({ _id: application.jobSeeker }).catch((err) => console.log(err));
    const updatedInbox = jobseeker.inbox;
    updatedInbox.push(notification);
    const updatedJobSeeker = await JobSeekerService.updateOne({ _id: jobseeker._id }, { inbox: updatedInbox }).catch((err) => console.log(err));
  }

  res.send(updatedApplication);
  console.log(updatedJobSeeker);
});

// axios.post('/job/:id/application/:applicationId/status', {status: 'declined'}).then(console.log);
// axios.post('/job/:id/application/:applicationId/status', {status: 'maybe'}).then(console.log);
// axios.post('/job/:id/application/:applicationId/status', {status: 'accepted'}).then(console.log);


// -------------------------------------Listen --------------------------------

app.listen(3000, () => {
  console.log('did i work?');
});
