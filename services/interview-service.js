const BaseService = require('./base-service');
const InterviewModel = require('../models/interview');
const NotificationService = require('./notification-service');
const EmployerService = require('./employer-service');
const JobService = require('./job-service');

class InterviewService extends BaseService {
  model = InterviewModel

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
