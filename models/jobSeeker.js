const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const JobSeekerSchema = mongoose.Schema({
  name: String,
  email: String,
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }],
  resumes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  }],
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
  }],
  inbox: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
  }],
});

// JobSeekerSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('JobSeeker', JobSeekerSchema);
