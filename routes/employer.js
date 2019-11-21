const express = require('express');
const router = express.Router();
const EmployerService = require('../services/employer-service');

// define middleware specific to this router

router.get('/all', async (req, res) => {
  const employers = await EmployerService.findAll().catch((err) => console.log(err));
  if (!employers) res.status(404);
  res.send(employers);
});
// axios.get('/employer/all').then(console.log);

router.get('/:id', async (req, res) => {
  const employer = await EmployerService.find({ _id: req.params.id }).catch((err) => console.log(err));
  if (!employer) res.status(404);
  res.send(employer);
});
// axios.get('/employer/:id').then(console.log);

// create new
router.post('/', async (req, res) => {
  const employer = await EmployerService.add(req.body).catch((err) => console.log(err));
  if (!employer) res.status(404);
  res.send(employer);
});
// axios.post('/employer', { email: 'headmaster@hogwarts.edu' }).then(console.log);

// update
router.put('/:id', async (req, res) => {
  const employer = await EmployerService.updateOne(req.params.id, req.body).catch((err) => console.log(err));
  if (!employer) res.status(404);
  res.send(employer);
});
// axios.put('/employer/:id', { email: 'HeadMaster@hogwarts.edu' }).then(console.log);

router.delete('/:id', async (req, res) => {
  const employer = await EmployerService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  if (!employer) res.status(404);
  res.send('employer deleted!');
});
// axios.delete('/employer/:id').then(console.log);

module.exports = router;
