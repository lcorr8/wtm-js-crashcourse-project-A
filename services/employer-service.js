const BaseService = require('./base-service');
const EmployerModel = require('../models/employer');

class EmployerService extends BaseService {
  model = EmployerModel;
}

module.exports = new EmployerService();
