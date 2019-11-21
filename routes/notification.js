const express = require('express');
const router = express.Router();
const NotificationService = require('../services/notification-service');

router.get('/all', async (req, res) => {
  const notifications = await NotificationService.findAll().catch((err) => console.log(err));
  if (!notifications) res.status(404);
  res.send(notifications);
});

router.get('/:id', async (req, res) => {
  const notification = await NotificationService.find({ _id: req.params.id }).catch((err) => console.log(err));
  if (!notification) res.status(404);
  res.send(notification);
});

router.post('/', async (req, res) => {
  const notification = await NotificationService.add(req.body).catch((err) => console.log(err));
  if (!notification) res.status(404);
  res.send(notification);
});

router.put('/:id', async (req, res) => {
  const notification = await NotificationService.updateOne(req.params.id, req.body).catch((err) => console.log(err));
  if (!notification) res.status(404);
  res.send(notification);
});

router.delete('/:id', async (req, res) => {
  const notification = await NotificationService.deleteOne({ _id: req.params.id }).catch((err) => console.log(err));
  if (!notification) res.status(404);
  res.send('notification deleted!');
});

module.exports = router;
