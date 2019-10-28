const Employer = require('./employer')
const JobSeeker = require('./jobSeeker')
const Database = require('./database')

// seed data
em1 = new Employer("employer1@email.com")
job1 = em1.createJobAd("Waiter wanted", "Waiter to work in a cafe", "10117", "floor", "full time", 12, 12, true)

js1 = new JobSeeker("Tom", "tom@email.com")
ap1 = js1.apply(job1, 4, "English and Spanish", "Social media skills", "weekdays 9-11 am, and any time on weekends")
// console.log("both employer job and seeker account for the application")

js2 = new JobSeeker("Thalia", "thalia@email.com")
ap2 = js2.apply(job1, 10, "German, English and French", "Kitchen management skills", "anytime")


js3 = new JobSeeker("Tintin", "tintin@email.com")
ap3 = js3.apply(job1, 2, "German, English", "bar license", "anytime")


// employer likes an application and offers an interview
in1 = em1.addInterview(ap1, "Oct 28 2019, 9am", "Oct 29 2019, 9am", "Oct 30 2019, 9am")

in2 = em1.addInterview(ap2, "Oct 28 2019, 10am", "Oct 29 2019, 10am", "Oct 30 2019, 10am")

in3 = em1.addInterview(ap3, "Oct 28 2019, 11am", "Oct 29 2019, 11am", "Oct 30 2019, 11am")

// job seeker accepts an interview slot
js1.acceptInterview(in1, in1.option2)

js2.acceptInterview(in2, in2.option1)

js3.acceptInterview(in3, in3.option3)

//in the interview employer can update application status to hire, maybe (think about it some more), decline.
em1.updateApplicationStatus(in1, "declined")
em1.updateApplicationStatus(in2, "maybe")
em1.updateApplicationStatus(in3, "accepted")

// verify first applicant gets rejection notification
const notificationId = Database.load('jobseeker.json')[0].inbox[0].id
console.log("notificationId: " + notificationId)
console.log("first applicant rejection notification: " + Database.load('notification.json').find(n => n.id === notificationId).message)
