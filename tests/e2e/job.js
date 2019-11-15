import test from 'ava';
import request from 'supertest';
import app from '../../app';

const jobToCreate = {
  title: "Head Chef from e2e",
  description: "Creating new menus for each holiday feast and supervising kitchen",
  zipcode: "10117",
  category: "kitchen",
  jobType: "full-time",
  compensationMin: 12,
  compensationMax: 18,
  tips: false,
};

const employerToCreate = {
  email: 'headmaster@hogwarts.edu',
};

test('create new job', async t => {
  t.plan(10);

  const employerCreated = (await request(app)
    .post('/employer')
    .send(employerToCreate)).body;

  jobToCreate.employer = employerCreated._id

  const res = await request(app)
    .post('/job')
    .send(jobToCreate);
  
  t.is(res.status, 200);
  t.is(res.body.title, jobToCreate.title);
  t.is(res.body.description, jobToCreate.description);
  t.is(res.body.zipcode, jobToCreate.zipcode);
  t.is(res.body.category, jobToCreate.category);
  t.is(res.body.jobType, jobToCreate.jobType);
  t.is(res.body.compensationMin, jobToCreate.compensationMin);
  t.is(res.body.compensationMax, jobToCreate.compensationMax);
  t.is(res.body.tips, jobToCreate.tips);
  t.is(res.body.employer, employerCreated._id);
});

test('Fetch a job', async t => {
  t.plan(2);

  const employerCreated = (await request(app)
    .post('/employer')
    .send(employerToCreate)).body;

  jobToCreate.employer = employerCreated._id;

  const jobCreated = (await request(app)
    .post('/job')
    .send(jobToCreate)).body;

  const fetchRes = await request(app)
    .get(`/job/${jobCreated._id}/json`);

  const jobFetched = fetchRes.body;

  t.is(fetchRes.status, 200);
  t.deepEqual(jobFetched, jobCreated, 'fetched job matches created job');
});

test('Fetch all jobs', async t => {
  t.plan(3);

  const employerCreated = (await request(app)
    .post('/employer')
    .send(employerToCreate)).body;

  jobToCreate.employer = employerCreated._id;

  await request(app)
    .post('/job')
    .send(jobToCreate);

  const fetchRes = await request(app).get('/job/all/json');

  t.is(fetchRes.status, 200);
  t.true(Array.isArray(fetchRes.body), 'Body should be an array');
  t.true(fetchRes.body.length > 0);
});

test('update a job', async t => {
  t.plan(2);

  const jobUpdate = {
    jobType: 'freelance',
  };

  const employerCreated = (await request(app)
    .post('/employer')
    .send(employerToCreate)).body;

  jobToCreate.employer = employerCreated._id;

  const jobCreated = (await request(app)
    .post('/job')
    .send(jobToCreate)).body;

  const updatedJob = await request(app)
    .put(`/job/${jobCreated._id}`)
    .send(jobUpdate);

  t.is(updatedJob.status, 200);
  t.deepEqual(updatedJob.body.jobType, jobUpdate.jobType);
});

test('delete a job', async t => {
  t.plan(2);

  const employerCreated = (await request(app)
    .post('/employer')
    .send(employerToCreate)).body;

  jobToCreate.employer = employerCreated._id;

  const jobCreated = (await request(app)
    .post('/job')
    .send(jobToCreate)).body;

  const deletionResponse = await request(app)
    .delete(`/job/${jobCreated._id}`);

  t.is(deletionResponse.status, 200);
  t.is(deletionResponse.text, 'job deleted!');
});
