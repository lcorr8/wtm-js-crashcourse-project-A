const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const JobSchema = mongoose.Schema({
  title: String,
  description: String,
  zipcode: String,
  category: String,
  jobType: String,
  compensationMin: Number,
  compensationMax: Number,
  tips: Boolean,
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
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
