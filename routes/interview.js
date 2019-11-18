const express = require('express');
const router = express.Router();
const InterviewService = require('../services/interview-service');
const ApplicationService = require('../services/application-service');
const Enums = require('../helpers/enums');

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

// job seeker accepts interview by selecting a final interview slot, application status is updated, and notification is sent to employer
router.get('/:id/slot/:number', async (req, res) => {
  const interview = await InterviewService.find(req.params.id).catch((err) => console.log(err));
  const updatedInterview = await InterviewService.acceptAndFinalizeTime(interview, req.params.number);
  const updatedApplication = await ApplicationService.updateOne(interview.application, { status: Enums.ApplicationStatuses.InterviewAccepted }).catch((err) => console.log(err));
  console.log('updated application: ', updatedApplication);
  res.send(updatedInterview);
});
// axios.get('/interview/5dc5fe1bb86c5716604c0a46/slot/1').then(console.log);

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
