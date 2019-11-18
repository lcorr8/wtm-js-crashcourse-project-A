const express = require('express');
const router = express.Router();
const ApplicationService = require('../services/application-service');

router.get('/application/all', async (req, res) => {
  const applications = await ApplicationService.findAll().catch((err) => console.log(err));
  res.render('applications', { applications });
});
router.get('/application/all/json', async (req, res) => {
  const applications = await ApplicationService.findAll().catch((err) => console.log(err));
  res.send(applications);
});

router.get('/application/:id', async (req, res) => {
  const application = await ApplicationService.find({ _id: req.params.id }).catch((err) => console.log(err));
  res.render('application', { application });
});
router.get('/application/:id/json', async (req, res) => {
  const application = await ApplicationService.find({ _id: req.params.id }).catch((err) => console.log(err));
  res.send(application);
});

router.post('/application', async (req, res) => {
  const application = await ApplicationService.add(req.body).catch((err) => console.log(err));
  res.send(application);
  console.log(req.body);
});

router.put('/application/:id', async (req, res) => {
  const application = await ApplicationService.updateOne({ _id: req.params.id }, req.body).catch((err) => console.log(err));
  res.send(application);
  console.log(application);
});

router.delete('/application/:id', async (req, res) => {
  const application = await ApplicationService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  res.send('application deleted!');
});

module.exports = router;
