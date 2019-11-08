const BaseService = require('./base-service');
const InterviewModel = require('../models/interview');

module.exports = class InterviewService extends BaseService {
  constructor() {
    super(InterviewModel);
  }
};
