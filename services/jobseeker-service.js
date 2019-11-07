const BaseService = require('./base-service');
const JobSeekerModel = require('../models/jobSeeker');

module.exports = class JobSeekerService extends BaseService {
  constructor() {
    super(JobSeekerModel);
  }
};
