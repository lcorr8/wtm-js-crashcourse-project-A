const express = require('express');
const router = express.Router();
const InterviewService = require('../services/interview-service');
const ApplicationService = require('../services/application-service');

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

// employer offers an interview, interview added to application and application status updated
router.post('/', async (req, res) => {
  const interview = await ApplicationService.addInterview(req.body);
  res.send(interview);
});
// axios.post('/interview', { application: "5dc5eb18ef8725127c365f4a", scheduleOptions: [new Date("december 3, 2019 11:30"), new Date("december 4, 2019 15:30"), new Date("december 5, 2019 17:30")] }).then(console.log);

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
