const express = require('express');
const router = express.Router();
const InterviewService = require('../services/interview-service');

router.get('/interview/all', async (req, res) => {
  const interviews = await InterviewService.findAll();
  // res.send(interviews);
  res.render('interviews', { interviews });
});

router.get('/interview/:id', async (req, res) => {
  const interview = await InterviewService.find({ _id: req.params.id });
  // res.send(interview)
  res.render('interview', { interview });
});

router.post('/interview', async (req, res) => {
  const interview = await InterviewService.add(req.body);
  res.send(interview);
  console.log(req.body);
});

router.put('/interview/:id', async (req, res) => {
  const interview = await InterviewService.updateOne(req.params.id, req.body);
  res.send(interview);
  console.log(req.body);
});

router.delete('/interview/:id', async (req, res) => {
  const interview = await InterviewService.deleteOne({ _id: req.params.id });
  res.send(interview);
});

module.exports = router;
