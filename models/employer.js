const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// define schema
const EmployerSchema = mongoose.Schema({
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],
  inbox: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
  }],
  email: String,
});

// EmployerSchema.plugin(AutoIncrement, { inc_field: 'id' });

// define model
module.exports = mongoose.model('Employer', EmployerSchema);
