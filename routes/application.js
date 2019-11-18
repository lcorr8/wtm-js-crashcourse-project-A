const express = require('express');
const router = express.Router();
const ApplicationService = require('../services/application-service');
const JobService = require('../services/job-service');

router.get('/all', async (req, res) => {
  const applications = await ApplicationService.findAll().catch((err) => console.log(err));
  res.render('applications', { applications });
});
router.get('/all/json', async (req, res) => {
  const applications = await ApplicationService.findAll().catch((err) => console.log(err));
  res.send(applications);
});

router.get('/:id', async (req, res) => {
  const application = await ApplicationService.find({ _id: req.params.id }).catch((err) => console.log(err));
  res.render('application', { application });
});
router.get('/:id/json', async (req, res) => {
  const application = await ApplicationService.find({ _id: req.params.id }).catch((err) => console.log(err));
  res.send(application);
});

// job seeker starts application, application gets added to job seeker
router.post('/', async (req, res) => {
  const application = await ApplicationService.startApplication(req.body);
  res.send(application);
});
// axios.post('/', {
//   yearsOfExperience: 4,
//   languagesSpoken: "languages...",
//   otherSkills: "skills...",
//   interviewAvailability: "available on...",
//   jobSeeker: "5dc5a77097fdf806d7a70d08",
//   job: "5dc5c28e4608550d4ebdad4e",
// }).then(console.log)

router.put('/:id', async (req, res) => {
  const application = await ApplicationService.updateOne(req.params.id, req.body).catch((err) => console.log(err));
  res.send(application);
  console.log(application);
});

// employer updates application status, notifications sent to applicant if accepted
router.post('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedApplication = await ApplicationService.setApplicationStatus(id, status).catch((err) => console.log(err));
  console.log('updated application: ', updatedApplication);
  res.send(updatedApplication);
});
// axios.post('/application/:id/status', {status: 'declined'}).then(console.log);
// axios.post('/application/:id/status', {status: 'pending'}).then(console.log);
// axios.post('/application/:id/status', {status: 'accepted'}).then(console.log);

// job seeker submits an application, application gets added job's applications list and notification sent to employer
router.post('/:id/submit', async (req, res) => {
  const application = await ApplicationService.find(req.params.id).catch((err) => console.log(err));
  const job = await JobService.find(application.job).catch((err) => console.log(err));
  const updatedApplication = await ApplicationService.submitApplication(application, job);

  res.send(updatedApplication);
});
// axios.post('/application/5dc5c64c6e56120e008f5c1c/submit').then(console.log);

router.delete('/:id', async (req, res) => {
  const application = await ApplicationService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  res.send('application deleted!');
});

module.exports = router;
