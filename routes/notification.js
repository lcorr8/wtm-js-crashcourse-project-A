const express = require('express');
const router = express.Router();
const NotificationService = require('../services/notification-service');

router.get('/all', async (req, res) => {
  const notifications = await NotificationService.findAll().catch((err) => console.log(err));
  res.render('notifications', { notifications });
});
router.get('/all/json', async (req, res) => {
  const notifications = await NotificationService.findAll().catch((err) => console.log(err));
  res.send(notifications);
});

router.get('/:id', async (req, res) => {
  const notification = await NotificationService.find({ _id: req.params.id }).catch((err) => console.log(err));
  res.render('notification', { notification });
});
router.get('/:id/json', async (req, res) => {
  const notification = await NotificationService.find({ _id: req.params.id }).catch((err) => console.log(err));
  res.send(notification);
});

router.post('/', async (req, res) => {
  const notification = await NotificationService.add(req.body).catch((err) => console.log(err));
  res.send(notification);
  console.log(req.body);
});

router.put('/:id', async (req, res) => {
  const notification = await NotificationService.updateOne(req.params.id, req.body).catch((err) => console.log(err));
  res.send(notification);
  console.log(req.body);
});

router.delete('/:id', async (req, res) => {
  const notification = await NotificationService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  res.send('notification deleted!');
});

module.exports = router;
