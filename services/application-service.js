const BaseService = require('./base-service');
const ApplicationModel = require('../models/application');
const Enums = require('../helpers/enums');
const EmployerService = require('../services/employer-service')
const NotificationService = require('../services/notification-service')
const JobSeekerService = require('../services/job-seeker-service')
const InterviewService = require('../services/interview-service')

class ApplicationService extends BaseService {
  model = ApplicationModel;

  /**
   * JobSeeker starts an application:
   * application gets saved to jobseekers applications list only,
   * no notifications sent yet
   * @param {*} applicationParams 
   */
  async startApplication(applicationParams) {
    applicationParams.status = Enums.ApplicationStatuses.Started
    const application = await this.add(applicationParams);
    
    const jobseeker = await JobSeekerService.find(application.jobSeeker._id)
    jobseeker.applications.push(application._id);
    await jobseeker.save()
    return application
  }

  /**
   * job seeker submits an application: 
   * application gets added to job applications list, 
   * application status changes, 
   * notification gets sent to employer
   * @param {*} application 
   * @param {*} job 
   */
  async submitApplication(application, job) {
    job.applications.push(application);
    await job.save();

    const updatedApplication = await this.updateOne(application.id, { status: Enums.ApplicationStatuses.Submitted });
    
    const employer = await EmployerService.find(job.employer);
    const message = `You have received an application for the following job post: ${job._id}`
    await NotificationService.sendNotification(employer, application, message);

    return updatedApplication
  };

  /**
   * Employer offers jobseeker an interview:
   * create interview in db,
   * add interview to application and update app status
   * notification is sent to jobseeker
   * @param {*} interviewParams obj with array of 3 optional dates for interview, and the application id.
   */
  async addInterview(params){
    const application = await this.find(params.application).catch((err) => console.log(err));
    const interviewParams = { ...params, job: application.job, jobSeeker: application.jobSeeker};
    const interview = await InterviewService.add(interviewParams);
    
    const updatedApplication = await this.updateOne(application._id, {
      interview: interview, 
      status: Enums.ApplicationStatuses.InterviewOffered
    });

    const jobSeeker = await JobSeekerService.find(application.jobSeeker);
    const message = `You have received an interview for the following job post: ${application.job}`
    await NotificationService.sendNotification(jobSeeker, application, message);

    console.log('updated application: ', updatedApplication)
    return interview
  }

  async setApplicationStatus(application, status){
    console.log('application param: ', application);
    console.log('status param: ', status);

    if (status === Enums.ApplicationStatuses.Accepted) {
      const updatedApplication = await this.updateOne(application, { status: Enums.ApplicationStatuses.Accepted }).catch((err) => console.log(err));
      const jobseeker = await JobSeekerService.find(updatedApplication.jobSeeker).catch((err) => console.log(err));
      const message = `Congratulations on your new Job! your application for the following job post: ${updatedApplication.job} has been accepted!`;
      await NotificationService.sendNotification(jobseeker, updatedApplication, message).catch((err) => console.log(err));
      
      return updatedApplication

    } else if (status === Enums.ApplicationStatuses.Pending) {
      const updatedApplication = await this.updateOne(application, { status: Enums.ApplicationStatuses.Pending }).catch((err) => console.log(err));
      return updatedApplication
    } else if (status === Enums.ApplicationStatuses.Declined) {
      const updatedApplication = await this.updateOne(application, { status: Enums.ApplicationStatuses.Declined }).catch((err) => console.log(err));
      return updatedApplication
    } else {
      throw "Employer provided status is invalid";
    }
  }
  
}

module.exports = new ApplicationService();
