const express = require('express');
const router = express.Router();
const JobSeekerService = require('../services/job-seeker-service');

router.get('/jobseeker/all', async (req, res) => {
  const jobseekers = await JobSeekerService.findAll();
  // res.send(jobseekers);
  res.render('job-seekers', { jobseekers });
});
// axios.get('/jobseeker/all').then(console.log);

router.get('/jobseeker/:id', async (req, res) => {
  const jobseeker = await JobSeekerService.find({ _id: req.params.id });
  // res.send(jobseeker)
  res.render('job-seeker', { jobseeker });
});
// axios.get('/jobseeker/:id').then(console.log);

router.post('/jobseeker', async (req, res) => {
  const jobseeker = await JobSeekerService.add(req.body);
  res.send(jobseeker);
  console.log(req.body);
});
// axios.post('/jobseeker', { name: 'Dobby', email: 'Dobby@freedom.com' }).then(console.log);

router.put('/jobseeker/:id', async (req, res) => {
  const jobseeker = await JobSeekerService.updateOne(req.params.id, req.body);
  res.send(jobseeker);
  console.log(req.body);
});
// axios.put('/jobseeker/:id', { name: 'Dobby The Elf' }).then(console.log);

router.delete('/jobseeker/:id', async (req, res) => {
  const jobseeker = await JobSeekerService.deleteOne({ _id: req.params.id });
  res.send(jobseeker);
});
// axios.delete('/jobseeker/:id').then(console.log);

module.exports = router;
