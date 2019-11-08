const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const InterviewSchema = mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  jobSeeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobSeeker',
    required: true,
  },
  scheduleOptions: [{
    type: Date,
    required: true,
  }],
  finalInterviewSlot: Date,
});

// InterviewSchema.plugin(AutoIncrement, {incl_field: 'id'});

module.exports = mongoose.model('Interview', InterviewSchema);
