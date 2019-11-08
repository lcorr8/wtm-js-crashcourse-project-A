const BaseService = require('./base-service');
const JobModel = require('../models/job');

class JobService extends BaseService {
  constructor() {
    super(JobModel);
  }
}

module.exports = new JobService();
