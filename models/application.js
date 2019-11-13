const mongoose = require('mongoose');
const Enums = require('../helpers/enums');

// define schema
const ApplicationSchema = mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  jobSeeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobSeeker',
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(Enums.ApplicationStatuses),
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  languagesSpoken: {
    type: String,
    required: true,
  },
  otherSkills: String,
  interviewAvailability: {
    type: String,
    required: true,
  },
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
  },
  // resume: {
  //   type: ,
  //   data: ,
  // }
});

// define model
module.exports = mongoose.model('Application', ApplicationSchema);
