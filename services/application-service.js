const BaseService = require('./base-service');
const ApplicationModel = require('../models/application');

class ApplicationService extends BaseService {
  model = ApplicationModel;
}

module.exports = new ApplicationService();
