const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const ApplicationStatuses = Object.freeze({
  Accepted: 'accepted',
  Pending: 'pending',
  Declined: 'declined',
});
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
  status: {
    type: String,
    enum: Object.values(ApplicationStatuses),
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

// ApplicationSchema.plugin(AutoIncrement, { inc_field: 'id' });

// define model
module.exports = mongoose.model('Application', ApplicationSchema);
