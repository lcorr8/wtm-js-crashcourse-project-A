import test from 'ava';
import request from 'supertest';
import app from '../../app';
const moment = require('moment');

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
  status: Enums.ApplicationStatus.STARTED,
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
    .post('/job-seeker')
    .send(jobSeekerParams)).body;

  applicationParams.job = jobCreated._id;
  applicationParams.jobSeeker = jobSeekerCreated._id;

  const applicationCreated = await request(app)
    .post('/application')
    .send(applicationParams);

  console.log('b4each applicationCreated: ', applicationCreated.body);

  return applicationCreated;
}

async function generateScheduleOptions(day = 2) {
  const dayINeed = day; // for Tuesday
  const today = moment().isoWeekday();

  const upcomingTuesday = today <= dayINeed ? moment().isoWeekday(dayINeed) : moment().add(1, 'weeks').isoWeekday(dayINeed);
  upcomingTuesday.hour(11).minute(30).seconds(0).millisecond(0).utc();

  const upcomingWednesday = upcomingTuesday.add(1, 'days');
  const upcomingThursday = upcomingWednesday.add(1, 'days');
  //   console.log('upcoming thursd: ', upcomingThursday.format('MMMM Do YYYY, h:mm a'));

  const scheduleOptions = [
    upcomingTuesday.toDate(),
    upcomingWednesday.toDate(),
    upcomingThursday.toDate(),
  ];

  return scheduleOptions;
}

test('can generate an array of 3 different schedule options', async t => {
  t.plan(3);

  const scheduleOptionsArray = await generateScheduleOptions(2);

  t.true(Array.isArray(scheduleOptionsArray), 'Scheduled options should be an array.');
  t.true(scheduleOptionsArray.length === 3, 'Scheduled options should have at least 3 options.');
  t.true(scheduleOptionsArray[0] instanceof Date, 'Options should be of type date');
});

test('create new interview', async t => {
  t.plan(10);

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;
  t.is(applicationCreatedRes.status, 200, 'application should be created successfully.');

  const generatedScheduleOptions = await generateScheduleOptions();

  const interviewParams = {
    job: applicationCreated.job,
    application: applicationCreated._id,
    jobSeeker: applicationCreated.jobSeeker,
    scheduleOptions: generatedScheduleOptions,
  };

  const interviewCreatedRes = await request(app)
    .post('/interview/')
    .send(interviewParams).catch((err) => console.log(err));

  const interviewCreated = interviewCreatedRes.body;
  t.is(interviewCreatedRes.status, 200, 'interview should be created successfully.');

  t.is(interviewCreated.job, interviewParams.job);
  t.is(interviewCreated.application, interviewParams.application);
  t.is(interviewCreated.jobSeeker, interviewParams.jobSeeker);
  t.true(Array.isArray(interviewCreated.scheduleOptions), 'Scheduled options should be an array.');
  t.true(interviewCreated.scheduleOptions.length > 2, 'Scheduled options should have at least 3 options.');
  t.deepEqual(Date.parse(interviewCreated.scheduleOptions[0]), Date.parse(generatedScheduleOptions[0]));
  t.deepEqual(Date.parse(interviewCreated.scheduleOptions[1]), Date.parse(generatedScheduleOptions[1]));
  t.deepEqual(Date.parse(interviewCreated.scheduleOptions[2]), Date.parse(generatedScheduleOptions[2]));
});

test('Fetch an interview by id', async t => {
  t.plan(4);

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;
  t.is(applicationCreatedRes.status, 200, 'application should be created successfully.');
  const generatedScheduleOptions = await generateScheduleOptions();

  const interviewParams = {
    job: applicationCreated.job,
    application: applicationCreated._id,
    jobSeeker: applicationCreated.jobSeeker,
    scheduleOptions: generatedScheduleOptions,
  };

  const interviewCreatedRes = await request(app)
    .post('/interview/')
    .send(interviewParams).catch((err) => console.log(err));

  const interviewCreated = interviewCreatedRes.body;
  t.is(interviewCreatedRes.status, 200, 'interview should be created successfully.');

  const fetchRes = await request(app)
    .get(`/interview/${interviewCreated._id}`);
  const interviewFetched = fetchRes.body;

  t.is(fetchRes.status, 200, 'Interview should be fetched successfully.');
  t.deepEqual(interviewFetched, interviewCreated, 'fetched interview should match created interview');
});

test('Fetch all interviews', async t => {
  t.plan(5);

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;
  t.is(applicationCreatedRes.status, 200, 'application should be created successfully.');
  const generatedScheduleOptions = await generateScheduleOptions();

  const interviewParams = {
    job: applicationCreated.job,
    application: applicationCreated._id,
    jobSeeker: applicationCreated.jobSeeker,
    scheduleOptions: generatedScheduleOptions,
  };

  const interviewCreatedRes = await request(app)
    .post('/interview/')
    .send(interviewParams).catch((err) => console.log(err));

  t.is(interviewCreatedRes.status, 200, 'interview should be created successfully.');


  const fetchRes = await request(app).get('/interview/all');

  t.is(fetchRes.status, 200, 'Interviews should be fetched successfully.');
  t.true(Array.isArray(fetchRes.body), 'Body should be an array');
  t.true(fetchRes.body.length > 0, 'Interviews array should contain one or more interviews');
});

test('update an interview (general update of schedule options)', async t => {
  t.plan(11);

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;
  t.is(applicationCreatedRes.status, 200, 'application should be created successfully.');

  const generatedScheduleOptions = await generateScheduleOptions();

  const interviewParams = {
    job: applicationCreated.job,
    application: applicationCreated._id,
    jobSeeker: applicationCreated.jobSeeker,
    scheduleOptions: generatedScheduleOptions,
  };

  const interviewCreatedRes = await request(app)
    .post('/interview/')
    .send(interviewParams).catch((err) => console.log(err));

  const interviewCreated = interviewCreatedRes.body;
  t.is(interviewCreatedRes.status, 200, 'interview should be created successfully.');

  // --------------------------------
  const updatedScheduleOptions = await generateScheduleOptions(4);
  const interviewUpdate = {
    scheduleOptions: updatedScheduleOptions,
  };

  const updatedInterviewRes = await request(app)
    .put(`/interview/${interviewCreated._id}`)
    .send(interviewUpdate);
  const updatedInterview = updatedInterviewRes.body;

  t.is(updatedInterviewRes.status, 200, 'interview should be updated successfully.');
  t.is(updatedInterview.job, interviewParams.job);
  t.is(updatedInterview.application, interviewParams.application);
  t.is(updatedInterview.jobSeeker, interviewParams.jobSeeker);
  t.true(Array.isArray(updatedInterview.scheduleOptions), 'Scheduled options should be an array.');
  t.true(updatedInterview.scheduleOptions.length > 2, 'Scheduled options should have at least 3 options.');
  t.deepEqual(Date.parse(updatedInterview.scheduleOptions[0]), Date.parse(updatedScheduleOptions[0]));
  t.deepEqual(Date.parse(updatedInterview.scheduleOptions[1]), Date.parse(updatedScheduleOptions[1]));
  t.deepEqual(Date.parse(updatedInterview.scheduleOptions[2]), Date.parse(updatedScheduleOptions[2]));
});

test('update interview: Job seeker accpets/finalizes interview', async t => {
  t.plan(12);

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;
  t.is(applicationCreatedRes.status, 200, 'application should be created successfully.');

  const generatedScheduleOptions = await generateScheduleOptions();

  const interviewParams = {
    job: applicationCreated.job,
    application: applicationCreated._id,
    jobSeeker: applicationCreated.jobSeeker,
    scheduleOptions: generatedScheduleOptions,
  };

  const interviewCreatedRes = await request(app)
    .post('/interview/')
    .send(interviewParams).catch((err) => console.log(err));

  const interviewCreated = interviewCreatedRes.body;
  t.is(interviewCreatedRes.status, 200, 'interview should be created successfully.');

  // --------------------------------
  const updatedInterviewRes = await request(app)
    .get(`/interview/${interviewCreated._id}/slot/1`);
  const updatedInterview = updatedInterviewRes.body;

  t.is(updatedInterviewRes.status, 200, 'interview should be updated successfully.');
  // params that should still be the same:
  t.is(updatedInterview.job, interviewParams.job);
  t.is(updatedInterview.application, interviewParams.application);
  t.is(updatedInterview.jobSeeker, interviewParams.jobSeeker);
  t.true(Array.isArray(updatedInterview.scheduleOptions), 'Scheduled options should be an array.');
  t.true(updatedInterview.scheduleOptions.length > 2, 'Scheduled options should have at least 3 options.');
  t.deepEqual(Date.parse(updatedInterview.scheduleOptions[0]), Date.parse(generatedScheduleOptions[0]));
  t.deepEqual(Date.parse(updatedInterview.scheduleOptions[1]), Date.parse(generatedScheduleOptions[1]));
  t.deepEqual(Date.parse(updatedInterview.scheduleOptions[2]), Date.parse(generatedScheduleOptions[2]));
  // params that should be new:
  t.deepEqual(Date.parse(updatedInterview.finalInterviewSlot), Date.parse(updatedInterview.scheduleOptions[0]));

});

test('delete an interview', async t => {
  t.plan(4);

  const applicationCreatedRes = await testSetUp(employerToCreate, jobToCreate, jobSeekerToCreate, applicationToCreate);
  const applicationCreated = applicationCreatedRes.body;
  t.is(applicationCreatedRes.status, 200, 'application should be created successfully.');

  const generatedScheduleOptions = await generateScheduleOptions();

  const interviewParams = {
    job: applicationCreated.job,
    application: applicationCreated._id,
    jobSeeker: applicationCreated.jobSeeker,
    scheduleOptions: generatedScheduleOptions,
  };

  const interviewCreatedRes = await request(app)
    .post('/interview/')
    .send(interviewParams).catch((err) => console.log(err));

  const interviewCreated = interviewCreatedRes.body;
  t.is(interviewCreatedRes.status, 200, 'interview should be created successfully.');

  // --------------------------------

  const deletionResponse = await request(app)
    .delete(`/interview/${interviewCreated._id}`);

  t.is(deletionResponse.status, 200, 'Interview should be deleted successfully.');
  t.is(deletionResponse.text, 'interview deleted!');
});
