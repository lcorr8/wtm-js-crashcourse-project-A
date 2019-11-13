const mongoose = require('mongoose');
const Enums = require('../helpers/enums');

const JobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(Enums.JobCategories),
    required: true,
  },
  jobType: {
    type: String,
    enum: Object.values(Enums.JobTypes),
    required: true,
  },
  compensationMin: Number,
  compensationMax: Number,
  tips: {
    type: Boolean,
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }],
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
  }],
});

module.exports = mongoose.model('Job', JobSchema);
