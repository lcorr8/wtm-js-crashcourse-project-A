// const BaseService = require('./base-service');
const NotificationModel = require('../models/notification');

module.exports = class NotificationService extends BaseService {
  constructor() {
    super(NotificationModel);
  }

  async add(item) {
    return this.model.create(item);
  }

  async delete(id) {
    return this.model.remove({ id });
  }

  async find(id) {
    return this.model.findOne(id);
  }

  async findAll() {
    return this.model.find();
  }

  async updateOne(id, options) {
    return this.model.findOneAndUpdate(id, options, { new: true });
  }
};
