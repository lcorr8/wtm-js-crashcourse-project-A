const BaseService = require('./base-service');
const EmployerModel = require('../models/employer');
const JobService = require('../services/job-service');

class EmployerService extends BaseService {
  model = EmployerModel;
}

module.exports = new EmployerService();
