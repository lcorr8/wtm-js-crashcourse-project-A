const BaseService = require('./base-service');
const EmployerService = require('./employer-service');
const JobModel = require('../models/job');

module.exports = class JobService extends BaseService {
  constructor() {
    super(JobModel, `${__dirname}/../job-database.json`);
  }

  // create a job, and add to jobs list
  // eslint-disable-next-line max-len
  async createJobAd(title, description, zipcode, category, jobType, compensationMin, compensationMax, tips, employer) {
    // eslint-disable-next-line max-len
    const job = JobModel.create(title, description, zipcode, category, jobType, compensationMin, compensationMax, tips, employer);
    // add job to employer
    employer.jobs.push(job.id);
    // save job to db
    await this.saveAll(job);
    // update employer in db
    // await EmployerService.updateObject(employer);

    // return job;
    console.log(`hello from iside create a job ad function in sob service model${title}`);
  }
};
