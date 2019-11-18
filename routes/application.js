const express = require('express');
const router = express.Router();
const ApplicationService = require('../services/application-service');

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
  const application = await ApplicationService.updateOne({ _id: req.params.id }, req.body).catch((err) => console.log(err));
  res.send(application);
  console.log(application);
});

router.delete('/:id', async (req, res) => {
  const application = await ApplicationService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  res.send('application deleted!');
});

module.exports = router;
