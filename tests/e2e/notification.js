import test from 'ava';
import request from 'supertest';
import app from '../../app';

const NotificationToCreate = {
  message: 'Notification from e2e',
  time: new Date(),
  opened: false,
  application: '5dcf08bb0caab1999b3000a8',
};

test('create new notification', async t => {
  t.plan(3);

  const res = await request(app)
    .post('/notification')
    .send(NotificationToCreate);

  t.is(res.status, 200);
  t.is(res.body.message, NotificationToCreate.message);
  t.is(res.body.application, NotificationToCreate.application);
});

test('Fetch a notification', async t => {
  t.plan(2);

  const notificationCreated = (await request(app)
    .post('/notification')
    .send(NotificationToCreate)).body;
  
    const fetchRes = await request(app)
    .get(`/notification/${notificationCreated._id}/json`);

  const notificationFetched = fetchRes.body;

  t.is(fetchRes.status, 200);
  t.deepEqual(notificationFetched, notificationCreated, 'fetched notification matched created notification');
});

test('Fetch all notifications', async t => {
  t.plan(4);

  const notificationCreated = (await request(app)
    .post('/notification')
    .send(NotificationToCreate)).body;

  const fetchRes = await request(app).get('/notification/all/json');

  t.is(fetchRes.status, 200);
  t.true(Array.isArray(fetchRes.body), 'Body should be an array');
  t.true(fetchRes.body.length > 0);

  const filteredArray = fetchRes.body.filter(x => x._id === notificationCreated._id)
  t.true(filteredArray.length > 0);
});

test('update a notification', async t => {
  t.plan(2);

  const updatedMessage = {
    message: 'Updated notification from e2e',
  };

  const notificationCreated = (await request(app)
    .post('/notification')
    .send(NotificationToCreate)).body;

  const updatedNotification = await request(app)
    .put(`/notification/${notificationCreated._id}`)
    .send(updatedMessage);

  t.is(updatedNotification.status, 200);
  t.deepEqual(updatedNotification.body.message, updatedMessage.message);
});

test('delete a notification', async t => {
  t.plan(2);

  const notificationCreated = (await request(app)
    .post('/notification')
    .send(NotificationToCreate)).body;

    const deletionResponse = await request(app)
    .delete(`/notification/${notificationCreated._id}`);
    
    t.is(deletionResponse.status, 200);
    t.is(deletionResponse.text, 'notification deleted!');
});
