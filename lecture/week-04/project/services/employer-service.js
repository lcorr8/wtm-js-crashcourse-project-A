const BaseService = require('./base-service');
const EmployerModel = require('../models/employer');

module.exports = class EmployerService extends BaseService {
  constructor() {
    super(EmployerModel, `${__dirname}/../employer-database.json`);
  }

  // async declineOtherApplications(){

  // }
};
