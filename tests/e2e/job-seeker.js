import test from 'ava';
import request from 'supertest';
import app from '../../app';

const jobSeekerToCreate = {
  name: 'Dobby',
  email: 'Dobby@freedom.com',
};

test('create new job seeker', async t => {
  t.plan(3);

  const res = await request(app)
    .post('/job-seeker')
    .send(jobSeekerToCreate);

  t.is(res.status, 200);
  t.is(res.body.name, jobSeekerToCreate.name);
  t.is(res.body.email, jobSeekerToCreate.email);
});

test('Fetch a job seeker', async t => {
  t.plan(2);

  const jobSeekerCreated = (await request(app)
    .post('/job-seeker')
    .send(jobSeekerToCreate)).body;

  const fetchRes = await request(app)
    .get(`/job-seeker/${jobSeekerCreated._id}`);

  const jobSeekerFetched = fetchRes.body;

  t.is(fetchRes.status, 200);
  t.deepEqual(jobSeekerFetched, jobSeekerCreated, 'fetched job seeker matched created job seeker');
});

test('Fetch all job seekers', async t => {
  t.plan(3);

  await request(app)
    .post('/job-seeker')
    .send(jobSeekerToCreate);

  const fetchRes = await request(app).get('/job-seeker/all');

  t.is(fetchRes.status, 200);
  t.true(Array.isArray(fetchRes.body), 'Body should be an array');
  t.true(fetchRes.body.length > 0);
});

test('update a job seeker', async t => {
  t.plan(2);

  const updatedEmail = {
    email: 'DobbyTheElf@freedom.com',
  };

  const jobSeekerCreated = (await request(app)
    .post('/job-seeker')
    .send(jobSeekerToCreate)).body;

  const updatedJobSeeker = await request(app)
    .put(`/job-seeker/${jobSeekerCreated._id}`)
    .send(updatedEmail);

  t.is(updatedJobSeeker.status, 200);
  t.deepEqual(updatedJobSeeker.body.email, updatedEmail.email);
});

test('delete a job seeker', async t => {
  t.plan(2);

  const jobSeekerCreated = (await request(app)
    .post('/job-seeker')
    .send(jobSeekerToCreate)).body;

  const deletionResponse = await request(app)
    .delete(`/job-seeker/${jobSeekerCreated._id}`);

  t.is(deletionResponse.status, 200);
  t.is(deletionResponse.text, 'job seeker deleted!');
});
