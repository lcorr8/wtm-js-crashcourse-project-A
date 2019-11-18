const BaseService = require('./base-service');
const ApplicationModel = require('../models/application');
const Enums = require('../helpers/enums');
const EmployerService = require('../services/employer-service')
const NotificationService = require('../services/notification-service')
const JobSeekerService = require('../services/job-seeker-service')

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
}

module.exports = new ApplicationService();
