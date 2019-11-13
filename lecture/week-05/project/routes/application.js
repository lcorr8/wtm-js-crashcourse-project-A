const express = require('express');
const router = express.Router();
const ApplicationService = require('../services/application-service');

router.get('/application/all', async (req, res) => {
  const applications = await ApplicationService.findAll();
  // res.send(application);
  res.render('applications', { applications });
});

router.get('/application/:id', async (req, res) => {
  const application = await ApplicationService.find({ _id: req.params.id });
  // res.send(application)
  res.render('application', { application });
});

router.post('/application', async (req, res) => {
  const application = await ApplicationService.add(req.body);
  res.send(application);
  console.log(req.body);
});

router.put('/application/:id', async (req, res) => {
  const application = await ApplicationService.updateOne({ _id: req.params.id }, req.body);
  res.send(application);
  console.log(application);
});

router.delete('/application/:id', async (req, res) => {
  const application = await ApplicationService.deleteOne({ _id: req.params.id });
  res.send(application);
});

module.exports = router;
