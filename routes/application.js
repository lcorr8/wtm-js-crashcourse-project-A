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

router.post('/', async (req, res) => {
  const application = await ApplicationService.add(req.body).catch((err) => console.log(err));
  res.send(application);
  console.log(req.body);
});

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
