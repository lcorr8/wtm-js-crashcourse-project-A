const BaseService = require('./base-service');
const InterviewModel = require('../models/interview');

class InterviewService extends BaseService {
  constructor() {
    super(InterviewModel);
  }
}

module.exports = new InterviewService();
