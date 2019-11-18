const express = require('express');
const router = express.Router();
const InterviewService = require('../services/interview-service');

router.get('/all', async (req, res) => {
  const interviews = await InterviewService.findAll().catch((err) => console.log(err));
  // res.send(interviews);
  res.render('interviews', { interviews });
});

router.get('/:id', async (req, res) => {
  const interview = await InterviewService.find({ _id: req.params.id }).catch((err) => console.log(err));
  // res.send(interview)
  res.render('interview', { interview });
});

router.post('/', async (req, res) => {
  const interview = await InterviewService.add(req.body).catch((err) => console.log(err));
  res.send(interview);
  console.log(req.body);
});

router.put('/:id', async (req, res) => {
  const interview = await InterviewService.updateOne(req.params.id, req.body).catch((err) => console.log(err));
  res.send(interview);
  console.log(req.body);
});

router.delete('/:id', async (req, res) => {
  const interview = await InterviewService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  res.send(interview);
});

module.exports = router;
