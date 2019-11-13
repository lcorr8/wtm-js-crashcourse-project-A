const BaseService = require('./base-service');
const JobModel = require('../models/job');

class JobService extends BaseService {
  model = JobModel
}

module.exports = new JobService();
