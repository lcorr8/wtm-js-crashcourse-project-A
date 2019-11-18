const express = require('express');
const router = express.Router();
const EmployerService = require('../services/employer-service');

// define middleware specific to this router

router.get('/employer/all', async (req, res) => {
  const employers = await EmployerService.findAll();
  res.render('employers', { employers });
});
router.get('/employer/all/json', async (req, res) => {
  const employers = await EmployerService.findAll().catch((err) => console.log(err));
  res.send(employers);
});
// axios.get('/employer/all').then(console.log);

router.get('/employer/:id', async (req, res) => {
  const employer = await EmployerService.find({ _id: req.params.id }).catch((err) => console.log(err));
  // res.send(employer);
  res.render('employer', { employer });
});
router.get('/employer/:id/json', async (req, res) => {
  const employer = await EmployerService.find({ _id: req.params.id }).catch((err) => console.log(err));
  res.send(employer);
});
// axios.get('/employer/:id').then(console.log);

// create new
router.post('/employer', async (req, res) => {
  const employer = await EmployerService.add(req.body).catch((err) => console.log(err));
  res.send(employer);
  console.log(req.body);
});
// axios.post('/employer', { email: 'headmaster@hogwarts.edu' }).then(console.log);

// update
router.put('/employer/:id', async (req, res) => {
  const employer = await EmployerService.updateOne(req.params.id, req.body).catch((err) => console.log(err));
  res.send(employer);
  console.log(req.body);
});
// axios.put('/employer/:id', { email: 'HeadMaster@hogwarts.edu' }).then(console.log);

router.delete('/employer/:id', async (req, res) => {
  const employer = await EmployerService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  res.send('employer deleted!');
  console.log(req.body);
});
// axios.delete('/employer/:id').then(console.log);

module.exports = router;
