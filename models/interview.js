const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const InterviewSchema = mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  },
  jobSeeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobSeeker',
  },
  scheduleOptions: [{
    type: Date,
  }],
  finalInterviewSlot: Date,
});

// InterviewSchema.plugin(AutoIncrement, {incl_field: 'id'});

module.exports = mongoose.model('Interview', InterviewSchema);
