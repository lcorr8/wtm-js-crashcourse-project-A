const BaseService = require('./base-service');
const EmployerModel = require('../models/employer');
const JobService = require('../services/job-service');

class EmployerService extends BaseService {
  model = EmployerModel;

  async addJob(employer, jobParams) {
    jobParams.employer = employer
    const job = await JobService.add(jobParams)

    employer.jobs.push(job)
    await employer.save()
    return job
  }
}

module.exports = new EmployerService();
