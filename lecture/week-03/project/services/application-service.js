/* eslint-disable class-methods-use-this */
const BaseService = require('./base-service');
const JobSeekerService = require('./jobseeker-service');
const JobService = require('./job-service');
const ApplicationModel = require('../models/application');
const NotificationModel = require('../models/notification');

module.exports = class ApplicationService extends BaseService {
  constructor() {
    super(ApplicationModel, `${__dirname}/../application-database.json`);
  }

  // TODO: mmm...add image/pdf of a resume fuctionality to his profile perhaps?
  // addResume() {
  // }

  // job seeker can apply to a job
  async submitApplication(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability, jobSeeker) {
    // create application to the job
    // eslint-disable-next-line max-len
    // const application = new Application(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability);
    // new db call
    const application = ApplicationModel.create(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability, jobSeeker);
    await ApplicationService.add(application);
    // add jobseeker to the application
    // application.jobSeeker = this;
    // add application to the job seekers applications list
    // jobSeeker.applications.push(application.id);
    // await this.updateObject(jobSeeker);
    // add aplication to jobs list of applications
    // job.applications.push(application.id);
    // await JobService.updateObject(job);
    // save application to db
    // await ApplicationService.add(application);
    return application;
  }

  // after interview the employer can update an application
  async updateApplicationStatus(interview, status) {
    // if application status is accepted
    if (status === 'accepted') {
      // send notification to job seeker that they have been hired and accept application
      const message = 'You have been hired! see your application here (eventually)';
      const notification = NotificationModel.create(message, new Date(), interview.application.id);
      interview.jobSeeker.inbox.push(notification);
      await JobSeekerService.updateObject(interview.jobSeeker);

      const updatedInterview = { ...interview, status };
      await ApplicationService.updateObject(updatedInterview.application);

      // decline all other applications for the job
      // await declineOtherApplications(interview)
      // we loop through all job applications except the current one
      const allApplicationIds = interview.job.applications;
      const acceptedApplicationId = interview.application.id;
      const notAcceptedApplicationIds = allApplicationIds.filter((applicationId) => applicationId !== acceptedApplicationId);
      // const applications = await ApplicationService.findAll();

      notAcceptedApplicationIds.forEach(async (applicationId) => {
        // edit db entry
        // update app status to declined
        const application = await ApplicationService.find(applicationId);
        application.status = 'declined';
        await ApplicationService.updateObject(application);

        // send them some sort of notification
        const declineMessage = 'This position has been filled. Thank you for your application.';
        const declineNotification = NotificationModel.create(declineMessage, new Date(), applicationId);
        application.jobSeeker.inbox.push(declineNotification);
        await JobSeekerService.updateObject(application.jobSeeker);
      });
    } else {
      // define satus of the application ("maybe", "rejected")
      const updatedInterview = { ...interview, status };

      // interview.application.status = status;
      await ApplicationService.updateObject(updatedInterview.application);
    }
  }
};

// module.exports = new ApplicationService();
