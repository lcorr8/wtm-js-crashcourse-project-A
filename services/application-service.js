const BaseService = require('./base-service');
const ApplicationModel = require('../models/application');

class ApplicationService extends BaseService {
  constructor() {
    super(ApplicationModel);
  }
}

module.exports = new ApplicationService();
