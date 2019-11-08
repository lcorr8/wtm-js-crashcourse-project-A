const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// define schema
const ApplicationSchema = mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  jobSeeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobSeeker',
  },
  yearsOfExperience: {
    type: Number,
  },
  languagesSpoken: String,
  otherSkills: String,
  interviewAvailability: String,
  status: String,
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
  },
});

// ApplicationSchema.plugin(AutoIncrement, { inc_field: 'id' });

// define model
module.exports = mongoose.model('Application', ApplicationSchema);
