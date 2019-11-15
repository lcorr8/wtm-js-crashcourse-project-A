import test from 'ava';
import request from 'supertest';
import app from '../../app';

const Enums = require('../../helpers/enums');

const employerToCreate = {
  email: 'headmaster-e2e@hogwarts.edu',
};

const jobToCreate = {
  title: 'Head Chef from e2e',
  description: 'Creating new menus for each holiday feast and supervising kitchen',
  zipcode: '10117',
  category: 'kitchen',
  jobType: 'full-time',
  compensationMin: 12,
  compensationMax: 18,
  tips: false,
};

const jobSeekerToCreate = {
  name: 'Dobby e2e',
  email: 'Dobby@freedom.com',
};

const applicationToCreate = {
  status: Enums.ApplicationStatuses.Started,
  yearsOfExperience: 25,
  languagesSpoken: 'English',
  otherSkills: 'Housekeeping',
  interviewAvailability: 'Available any time monday-saturday between 8am and 8pm',
};

async function testSetUp(employerParams, jobParams, jobSeekerParams, applicationParams) {
  const employerCreated = (await request(app)
    .post('/employer')
    .send(employerParams)).body;

  jobParams.employer = employerCreated._id;

  const jobCreated = (await request(app)
    .post('/job')
    .send(jobParams)).body;

  const jobSeekerCreated = (await request(app)
    .post('/jobseeker')
    .send(jobSeekerParams)).body;

  applicationParams.job = jobCreated._id;
  applicationParams.jobSeeker = jobSeekerCreated._id;

  const applicationCreated = await request(app)
    .post('/application')
    .send(applicationParams);

  console.log('b4each applicationCreated: ', applicationCreated.body)

  return applicationCreated;
}

test('create new application', async t => {
  t.plan(6);

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;

  console.log('application from setup: ', applicationCreated);
  t.is(applicationCreatedRes.status, 200);
  //   t.is(applicationCreated.job.title, jobToCreate.title); // TODO: activate when level one db entry parsing is activated
  //   t.is(applicationCreated.jobSeeker.email, jobSeekerToCreate.email); // TODO: activate when level one db entry parsing is activated
  t.is(applicationCreated.status, applicationToCreate.status);
  t.is(applicationCreated.yearsOfExperience, applicationToCreate.yearsOfExperience);
  t.is(applicationCreated.languagesSpoken, applicationToCreate.languagesSpoken);
  t.is(applicationCreated.otherSkills, applicationToCreate.otherSkills);
  t.is(applicationCreated.interviewAvailability, applicationToCreate.interviewAvailability);
});

test('Fetch an application', async t => {
  t.plan(2);

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;

  const fetchRes = await request(app)
    .get(`/application/${applicationCreated._id}/json`);

  const applicationFetched = fetchRes.body;

  t.is(fetchRes.status, 200);
  t.deepEqual(applicationFetched, applicationCreated, 'fetched app matches created app');
});

test('Fetch all applications', async t => {
  t.plan(3);

  await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);

  const fetchRes = await request(app).get('/application/all/json');

  t.is(fetchRes.status, 200);
  t.true(Array.isArray(fetchRes.body), 'Body should be an array');
  t.true(fetchRes.body.length > 0);
});

test('update an application', async t => {
  t.plan(2);

  const applicationUpdate = {
    status: Enums.ApplicationStatuses.Submitted,
  };

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;

  const updatedApplication = await request(app)
    .put(`/application/${applicationCreated._id}`)
    .send(applicationUpdate);

  t.is(updatedApplication.status, 200);
  t.deepEqual(updatedApplication.body.status, applicationUpdate.status);
});

test('delete an application', async t => {
  t.plan(2);

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;

  const deletionResponse = await request(app)
    .delete(`/application/${applicationCreated._id}`);

  t.is(deletionResponse.status, 200);
  t.is(deletionResponse.text, 'application deleted!');
});
