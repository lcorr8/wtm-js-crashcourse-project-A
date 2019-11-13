const BaseService = require('./base-service');
const JobSeekerModel = require('../models/job-seeker');

module.exports = new class JobSeekerService extends BaseService {
  model = JobSeekerModel
}();
