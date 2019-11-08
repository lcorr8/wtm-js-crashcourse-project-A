const BaseService = require('./base-service');
const ApplicationModel = require('../models/application');

module.exports = class ApplicationService extends BaseService {
  constructor() {
    super(ApplicationModel);
  }
};
