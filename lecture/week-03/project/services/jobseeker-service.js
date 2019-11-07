const BaseService = require('./base-service');
const JobSeekerModel = require('../models/jobSeeker');

module.exports = class JobSeekerService extends BaseService {
  constructor() {
    super(JobSeekerModel, `${__dirname}/../jobseeker-database.json`);
  }
};

// module.exports = new JobSeekerService();
