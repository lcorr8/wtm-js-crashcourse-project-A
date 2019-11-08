const BaseService = require('./base-service');
const JobSeekerModel = require('../models/jobSeeker');

module.exports = new class JobSeekerService extends BaseService {
  constructor() {
    super(JobSeekerModel);
  }
}();
