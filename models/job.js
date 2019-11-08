const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

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
    enum: ['kitchen', 'bar', 'floor', 'management', 'office'],
    required: true,
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'temporary/seasonal', 'freelance'],
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

// JobSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Job', JobSchema);
