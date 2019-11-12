const BaseService = require('./base-service');
const InterviewModel = require('../models/interview');

class InterviewService extends BaseService {
  model = InterviewModel
}

module.exports = new InterviewService();
