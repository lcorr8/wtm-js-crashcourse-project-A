const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const Categories = Object.freeze({
  Bar: 'bar',
  Floor: 'floor',
  Kitchen: 'kitchen',
  Management: 'management',
  Office: 'office',
  Other: 'other',
});

const JobTypes = Object.freeze({
  FullTime: 'full-time',
  PArtTime: 'part-time',
  Internship: 'internship',
  TempOrSeasonal: 'temporary/seasonal',
  Freelance: 'freelance',
});

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
    enum: Object.values(Categories),
    required: true,
  },
  jobType: {
    type: String,
    enum: Object.values(JobTypes),
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
