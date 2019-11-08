const BaseService = require('./base-service');
const EmployerModel = require('../models/employer');

class EmployerService extends BaseService {
  constructor() {
    super(EmployerModel);
  }
}

module.exports = new EmployerService();
