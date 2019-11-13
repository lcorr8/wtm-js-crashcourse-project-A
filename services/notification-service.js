const BaseService = require('./base-service');
const NotificationModel = require('../models/notification');

class NotificationService extends BaseService {
  model = NotificationModel
}

module.exports = new NotificationService();
