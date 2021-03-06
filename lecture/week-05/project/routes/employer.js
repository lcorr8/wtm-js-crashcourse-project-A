const express = require('express');
const router = express.Router();
const EmployerService = require('../services/employer-service');

// define middleware specific to this router

router.get('/employer/all', async (req, res) => {
  const employers = await EmployerService.findAll();
  // res.send(employers);
  res.render('employers', { employers });
});
// axios.get('/employer/all').then(console.log);

router.get('/employer/:id', async (req, res) => {
  const employer = await EmployerService.find({ _id: req.params.id });
  // res.send(employer);
  res.render('employer', { employer });
});
// axios.get('/employer/:id').then(console.log);

// create new
router.post('/employer', async (req, res) => {
  const employer = await EmployerService.add(req.body);
  res.send(employer);
  console.log(req.body);
});
// axios.post('/employer', { email: 'headmaster@hogwarts.edu' }).then(console.log);

// update
router.put('/employer/:id', async (req, res) => {
  const employer = await EmployerService.updateOne(req.params.id, req.body);
  res.send(employer);
  console.log(req.body);
});
// axios.put('/employer/:id', { email: 'HeadMaster@hogwarts.edu' }).then(console.log);

router.delete('/employer/:id', async (req, res) => {
  const employer = await EmployerService.deleteOne({ _id: req.params.id });
  res.send(employer);
  console.log(req.body);
});
// axios.delete('/employer/:id').then(console.log);

module.exports = router;
