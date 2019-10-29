const Moment = require('moment');
const Employer = require('./employer');
const JobSeeker = require('./jobSeeker');
const Database = require('./database');

// seed data
const employer1 = new Employer('employer1@email.com');
const job1 = employer1.createJobAd('Waiter wanted', 'Waiter to work in a cafe', '10117', 'floor', 'full time', 12, 12, true);

const jobSeeker1 = new JobSeeker('Tom', 'tom@email.com');
const application1 = jobSeeker1.submitApplication(job1, 4, 'English and Spanish', 'Social media skills', 'weekdays 9-11 am, and any time on weekends');
// console.log("both employer job and seeker account for the application")

const jobSeeker2 = new JobSeeker('Thalia', 'thalia@email.com');
const application2 = jobSeeker2.submitApplication(job1, 10, 'German, English and French', 'Kitchen management skills', 'anytime');


const jobSeeker3 = new JobSeeker('Tintin', 'tintin@email.com');
const application3 = jobSeeker3.submitApplication(job1, 2, 'German, English', 'bar license', 'anytime');


// employer likes an application and offers an interview
const interview1 = employer1.addInterview(application1, [Moment('Oct 28 2019, 9am', 'MMM DD YYYY, h:mm a'), Moment('Oct 29 2019, 9am', 'MMM DD YYYY, h:mm a'), Moment('Oct 30 2019, 9am', 'MMM DD YYYY, h:mm a')]);

const interview2 = employer1.addInterview(application2, [Moment('Oct 28 2019, 10am', 'MMM DD YYYY, h:mm a'), Moment('Oct 29 2019, 10am', 'MMM DD YYYY, h:mm a'), Moment('Oct 30 2019, 10am', 'MMM DD YYYY, h:mm a')]);

const interview3 = employer1.addInterview(application3, [Moment('Oct 28 2019, 11am', 'MMM DD YYYY, h:mm a'), Moment('Oct 29 2019, 11am', 'MMM DD YYYY, h:mm a'), Moment('Oct 30 2019, 11am', 'MMM DD YYYY, h:mm a')]);

// job seeker accepts an interview slot
jobSeeker1.acceptInterview(interview1, interview1.scheduleOptions[1]);

jobSeeker2.acceptInterview(interview2, interview1.scheduleOptions[0]);

jobSeeker3.acceptInterview(interview3, interview1.scheduleOptions[2]);

/** in the interview employer can update application status to
hire, maybe (think about it some more), decline. * */
employer1.updateApplicationStatus(interview1, 'declined');
employer1.updateApplicationStatus(interview2, 'maybe');
employer1.updateApplicationStatus(interview3, 'accepted');

// verify first applicant gets rejection notification
const notificationId = Database.load('jobseeker.json')[0].inbox[0].id;
// eslint-disable-next-line no-console
console.log(`notificationId: ${notificationId}`);
// eslint-disable-next-line no-console
console.log(`first applicant rejection notification: ${Database.load('notification.json').find((n) => n.id === notificationId).message}`);
