const express = require('express');
const router = express.Router();
const JobService = require('../services/job-service');
const EmployerService = require('../services/employer-service');

router.get('/?', async (req, res) => {
  const { query } = req;
  const jobs = await JobService.findAll(query);
  console.log(query);
  console.log('number of jobs: ', jobs.length);
  console.log(jobs);
  res.send(jobs);
  // res.render('jobs', { jobs });
});
// axios.get('/job/?zipcode=10117&jobType=full-time&tips=true&category=bar').catch(err => console.log(err));
// axios.get('/job/?zipcode[]=10117&zipcode[]=10118&jobType=part-time&tips=true&category=bar').catch(err => console.log(err));

router.get('/all', async (req, res) => {
  const jobs = await JobService.findAll().catch((err) => console.log(err));
  if (!jobs) res.status(404);
  res.send(jobs);
});

router.get('/:id', async (req, res) => {
  const job = await JobService.find({ _id: req.params.id }).catch((err) => console.log(err));
  if (!job) res.status(404);
  res.send(job);
});

// axios.post('/job', {title: "title", description: "description", zipcode: "10117", category: "kitchen", jobType: "full-time", tips: true, employer: "5dc495951aadb880e40e7fd1"}).catch( err => console.log(err))
router.post('/', async (req, res) => {
  const job = await JobService.add(req.body).catch((err) => console.log(err));
  const employer = await EmployerService.find(job.employer);
  employer.jobs.push(job);
  await employer.save();

  if (!job) res.status(404);
  res.send(job);
  // const updatedEmployer = await EmployerService.find(job.employer);
  // console.log(req.body);
  // console.log('job id: ', job._id)
  // console.log("updated employer's jobs: ", updatedEmployer.jobs);
});

router.put('/:id', async (req, res) => {
  const job = await JobService.updateOne(req.params.id, req.body).catch((err) => console.log(err));
  if (!job) res.status(404);
  res.send(job);
});

router.delete('/:id', async (req, res) => {
  const job = await JobService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  if (!job) res.status(404);
  res.send('job deleted!');
});

module.exports = router;
