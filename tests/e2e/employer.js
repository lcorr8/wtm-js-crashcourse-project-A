import test from 'ava';
import request from 'supertest';
import app from '../../app';

const employerToCreate = {
  email: 'headmaster@hogwarts.edu',
};

test('create new employer', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/employer')
    .send(employerToCreate);
  t.is(res.status, 200);
  t.is(res.body.email, employerToCreate.email);
});

test('Fetch an employer', async t => {
  t.plan(2);

  const employerCreated = (await request(app)
    .post('/employer')
    .send(employerToCreate)).body;

  const fetchRes = await request(app)
    .get(`/employer/${employerCreated._id}/json`);

  const employerFetched = fetchRes.body;

  t.is(fetchRes.status, 200);
  t.deepEqual(employerFetched, employerCreated, 'fetched employer matched created employer');
});

test('Fetch all employers', async t => {
  t.plan(3);

  await request(app)
    .post('/employer')
    .send(employerToCreate);

  const fetchRes = await request(app).get('/employer/all/json');

  t.is(fetchRes.status, 200);
  t.true(Array.isArray(fetchRes.body), 'Body should be an array');
  t.true(fetchRes.body.length > 0);
});

test('update an employer', async t => {
  t.plan(2);

  const updatedEmail = {
    email: 'HeadMaster@hogwarts.com',
  };

  const employerCreated = (await request(app)
    .post('/employer')
    .send(employerToCreate)).body;

  const updatedEmployer = await request(app)
    .put(`/employer/${employerCreated._id}`)
    .send(updatedEmail);

  t.is(updatedEmployer.status, 200);
  t.deepEqual(updatedEmployer.body.email, updatedEmail.email);
});

test('delete an employer', async t => {
  t.plan(3);

  const employerCreated = (await request(app)
    .post('/employer')
    .send(employerToCreate)).body;

  const deletionResponse = await request(app)
    .delete(`/employer/${employerCreated._id}`);

  const fetchedEmployers = (await request(app).get('/employer/all/json')).body;

  const fetchedEmployersFilteredArray = fetchedEmployers.filter(employer => {
    employer._id === employerCreated._id
  });

  t.is(deletionResponse.status, 200);
  t.true(Array.isArray(fetchedEmployersFilteredArray), 'should be an array');
  t.true(fetchedEmployersFilteredArray.length === 0);
});
