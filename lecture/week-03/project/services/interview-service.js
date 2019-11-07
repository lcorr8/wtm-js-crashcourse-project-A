/* eslint-disable class-methods-use-this */
const BaseService = require('./base-service');
const InterviewModel = require('../models/interview');
const JobService = require('../services/job-service');
const JobSeekerService = require('../services/jobseeker-service');
const ApplicationService = require('../services/application-service');

module.exports = class InterviewService extends BaseService {
  constructor() {
    super(InterviewModel, `${__dirname}/../interview-database.json`);
  }

  // employer likes an application and wants to interview the candidate
  async addInterview(application, options) {
    // create an interview with optional times for the interview
    const interview = InterviewModel.create(application, options);

    // add the interview to the employer's job ad
    application.job.interviews.push(interview.id);
    await JobService.updateObject(application.job);
    // add the interview to the job seeker's list
    application.jobSeeker.interviews.push(interview.id);
    await JobSeekerService.updateObject(application.jobSeeker);
    // add interview to application
    // eslint-disable-next-line no-param-reassign
    application.interview = interview.id;
    await ApplicationService.updateObject(application);

    return interview;
  }

  // job seeker accepts an interview time
  async acceptInterview(interview, option) {
    // update the final interview time of the interview
    // eslint-disable-next-line no-param-reassign
    interview.finalInterviewSlot = option;
    await InterviewService.updateObject(interview);
  }
};

// module.exports = new InterviewService();
