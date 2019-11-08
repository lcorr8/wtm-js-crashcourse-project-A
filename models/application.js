const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

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
    enum: ['accepted', 'maybe', 'declined'],
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
