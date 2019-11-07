const BaseService = require('./base-service');
const NotificationModel = require('../models/notification');

module.exports = class NotificationService extends BaseService {
  constructor() {
    super(NotificationModel, `${__dirname}/../notification-database.json`);
  }
};

// module.exports = new NotificationService();
