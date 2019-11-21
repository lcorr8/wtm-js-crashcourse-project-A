const express = require('express');
const router = express.Router();
const JobSeekerService = require('../services/job-seeker-service');

router.get('/all', async (req, res) => {
  const jobseekers = await JobSeekerService.findAll();
  if (!jobseekers) res.status(404);
  res.send(jobseekers);
});
// axios.get('/job-seeker/all').then(console.log);

router.get('/:id', async (req, res) => {
  const jobseeker = await JobSeekerService.find({ _id: req.params.id }).catch((err) => console.log(err));
  if (!jobseeker) res.status(404);
  res.send(jobseeker);
});
// axios.get('/job-seeker/:id').then(console.log);

router.post('/', async (req, res) => {
  const jobseeker = await JobSeekerService.add(req.body).catch((err) => console.log(err));
  if (!jobseeker) res.status(404);
  res.send(jobseeker);
});
// axios.post('/job-seeker', { name: 'Dobby', email: 'Dobby@freedom.com' }).then(console.log);

router.put('/:id', async (req, res) => {
  const jobseeker = await JobSeekerService.updateOne(req.params.id, req.body).catch((err) => console.log(err));
  if (!jobseeker) res.status(404);
  res.send(jobseeker);
});
// axios.put('/job-seeker/:id', { name: 'Dobby The Elf' }).then(console.log);

router.delete('/:id', async (req, res) => {
  const jobseeker = await JobSeekerService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  if (!jobseeker) res.status(404);
  res.send('job seeker deleted!');
});
// axios.delete('/job-seeker/:id').then(console.log);

module.exports = router;
