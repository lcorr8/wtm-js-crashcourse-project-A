const BaseService = require('./base-service');
const JobModel = require('../models/job');

module.exports = class JobService extends BaseService {
  constructor() {
    super(JobModel);
  }
};
