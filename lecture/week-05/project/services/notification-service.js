const BaseService = require('./base-service');
const NotificationModel = require('../models/notification');

class NotificationService extends BaseService {
  model = NotificationModel

  /**
   * Adds notification to model object's inbox
   * @param {*} modelObject whose inbox needs to be updated with a notification
   * @param {*} application application object
   * @param {*} message message for the notification
   */
  async sendNotification(modelObject, application, message){
    const time = Date();
    const opened = false;
    const notification = await this.add({message, time, application, opened}).catch((err) => console.log(err));

    modelObject.inbox.push(notification)
    modelObject.save()

    return notification
  }
}

module.exports = new NotificationService();
