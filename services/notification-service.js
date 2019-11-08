const BaseService = require('./base-service');
const NotificationModel = require('../models/notification');

class NotificationService extends BaseService {
  constructor() {
    super(NotificationModel);
  }
}

module.exports = new NotificationService();
