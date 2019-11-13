const BaseService = require('./base-service');
const InterviewModel = require('../models/interview');
const ApplicationService = require('./application-service');
const JobSeekerService = require('./job-seeker-service');
const NotificationService = require('./notification-service');
const EmployerService = require('./employer-service');
const JobService = require('./job-service');
const Enums = require('../helpers/enums');

class InterviewService extends BaseService {
  model = InterviewModel

  /**
   * Employer offers jobseeker an interview:
   * create interview in db,
   * add interview to application and update app status
   * notification is sent to jobseeker
   * @param {*} application application object
   * @param {*} scheduleOptions obj with array of 3 optional dates for interview
   */
  async addToApplication(application,scheduleOptions){
    const interviewParams = Object.assign(scheduleOptions,{job: application.job, application: application,jobSeeker: application.jobSeeker})
    const interview = await this.add(interviewParams);
    const updatedApplication = await ApplicationService.updateOne(application._id, {
      interview: interview, 
      status: Enums.ApplicationStatuses.InterviewOffered
    });

    const jobSeeker = await JobSeekerService.find(application.jobSeeker);
    const message = `You have received an interview for the following job post: ${application.job}`
    await NotificationService.sendNotification(jobSeeker, application, message);

    console.log(updatedApplication)
    return interview
  }

  /**
   * finalizes interview by selecting a final interview date and updating
   * send notification to employer
   * @param {*} interview interview object
   * @param {*} slotOption string of user selected slot option
   */
  async acceptAndFinalizeTime(interview, slotOption){
    const slotIndex = Number(slotOption) - 1;
    const finalInterviewTime = interview.scheduleOptions[slotIndex];
    const updatedInterview = await this.updateOne(interview._id, { finalInterviewSlot: finalInterviewTime });
    
    const job = await JobService.find(interview.job._id)
    const employer = await EmployerService.find(job.employer);
    const message = `An interview for the following job post: ${job._id} has been accepted. appointment time: ${finalInterviewTime}`
    await NotificationService.sendNotification(employer, interview.application, message);

    return updatedInterview
  }
}

module.exports = new InterviewService();
