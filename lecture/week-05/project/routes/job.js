const express = require('express');
const router = express.Router();
const JobService = require('../services/job-service');


router.get('/job/all', async (req, res) => {
  const jobs = await JobService.findAll();
  // res.send(jobs);
  res.render('jobs', { jobs });
});

router.get('/job/:id', async (req, res) => {
  const job = await JobService.find({ _id: req.params.id });
  // res.send(job)
  res.render('job', { job });
});

// axios.post('/job', {title: "title", description: "description", zipcode: "10117", category: "kitchen", jobType: "full-time", tips: true, employer: "5dc495951aadb880e40e7fd1"}).catch( err => console.log(err))
router.post('/job', async (req, res) => {
  const job = await JobService.add(req.body);
  res.send(job);
  console.log(req.body);
});

router.put('/job/:id', async (req, res) => {
  const job = await JobService.updateOne(req.params.id, req.body);
  res.send(job);
  console.log(req.body);
});

router.delete('/job/:id', async (req, res) => {
  const job = await JobService.deleteOne({ _id: req.params.id });
  res.send(job);
});

module.exports = router;
