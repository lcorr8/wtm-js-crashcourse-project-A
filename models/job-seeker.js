const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const JobSeekerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }],
  resumes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  }],
  inbox: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
  }],
});

// JobSeekerSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('JobSeeker', JobSeekerSchema);
