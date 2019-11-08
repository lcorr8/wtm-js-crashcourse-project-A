const BaseService = require('./base-service');
const EmployerModel = require('../models/employer');

module.exports = new class EmployerService extends BaseService {
  constructor() {
    super(EmployerModel);
  }
}();
