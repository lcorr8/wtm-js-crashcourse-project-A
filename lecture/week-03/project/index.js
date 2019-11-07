const Moment = require('moment');
const EmployerModel = require('./models/employer');
const JobSeekerModel = require('./models/jobSeeker');
const JobService = require('./services/job-service');
const ApplicationService = require('./services/application-service');
const InterviewService = require('./services/interview-service');
const JobModel = require('./models/job');

async function main() {
// seed data
  const employer1 = EmployerModel.create('employer1@email.com');

  const job1 = JobModel.create('Waiter wanted', 'Waiter to work in a cafe', '10117', 'floor', 'full time', 12, 12, true, employer1);
  // const job1 = JobService.createJobAd('title', 'description', 'zipcode', 'category', 'jobType', 'compensationMin', 'compensationMax', 'tips', 'employer');


  const jobSeeker1 = JobSeekerModel.create('Tom', 'tom@email.com');
  const application1 = await ApplicationService.submitApplication(job1, 4, 'English and Spanish', 'Social media skills', 'weekdays 9-11 am, and any time on weekends', jobSeeker1);
  // console.log("both employer job and seeker account for the application")

  const jobSeeker2 = JobSeekerModel.create('Thalia', 'thalia@email.com');
  const application2 = await ApplicationService.submitApplication(job1, 10, 'German, English and French', 'Kitchen management skills', 'anytime', jobSeeker2);

  const jobSeeker3 = JobSeekerModel.create('Tintin', 'tintin@email.com');
  const application3 = await ApplicationService.submitApplication(job1, 2, 'German, English', 'bar license', 'anytime', jobSeeker3);

  // employer likes an application and offers an interview
  const interview1 = await InterviewService.addInterview(application1, [Moment('Oct 28 2019, 9am', 'MMM DD YYYY, h:mm a'), Moment('Oct 29 2019, 9am', 'MMM DD YYYY, h:mm a'), Moment('Oct 30 2019, 9am', 'MMM DD YYYY, h:mm a')]);
  const interview2 = await InterviewService.addInterview(application2, [Moment('Oct 28 2019, 10am', 'MMM DD YYYY, h:mm a'), Moment('Oct 29 2019, 10am', 'MMM DD YYYY, h:mm a'), Moment('Oct 30 2019, 10am', 'MMM DD YYYY, h:mm a')]);
  const interview3 = await InterviewService.addInterview(application3, [Moment('Oct 28 2019, 11am', 'MMM DD YYYY, h:mm a'), Moment('Oct 29 2019, 11am', 'MMM DD YYYY, h:mm a'), Moment('Oct 30 2019, 11am', 'MMM DD YYYY, h:mm a')]);

  // job seeker accepts an interview slot
  await InterviewService.acceptInterview(interview1, interview1.scheduleOptions[1]);
  await InterviewService.acceptInterview(interview2, interview1.scheduleOptions[0]);
  await InterviewService.acceptInterview(interview3, interview1.scheduleOptions[2]);

  /** in the interview employer can update application status to
hire, maybe (think about it some more), decline. * */
  await ApplicationService.updateApplicationStatus(interview1, 'declined');
  await ApplicationService.updateApplicationStatus(interview2, 'maybe');
  await ApplicationService.updateApplicationStatus(interview3, 'accepted');

  // verify first applicant gets rejection notification
  // const updatedJobSeeker1 = await JobSeekerService.find(0);
  // const notificationId = updatedJobSeeker1.inbox[0].id;

  // eslint-disable-next-line no-console
  // console.log(`notificationId: ${notificationId}`);
  // eslint-disable-next-line no-console
  // console.log(`first applicant rejection notification: ${await NotificationService.find(notificationId).message}`);
}

main();

// const employer1 = EmployerModel.create('employer1@email.com');

// const job1 = JobModel.create('Waiter wanted', 'Waiter to work in a cafe', '10117', 'floor', 'full time', 12, 12, true, employer1);

// add job to employer
// employer1.jobs.push(job1.id);
// save job to db
// try {
//   JobService.add(job1);
// } catch (e) {
//   console.error(e);
// } finally {
//   console.log('We do cleanup here');
// }

// update employer in db
// await EmployerService.updateObject(employer);
