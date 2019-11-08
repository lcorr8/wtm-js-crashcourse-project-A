const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const NotificationSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  opened: {
    type: Boolean,
    required: true,
  },
});

// NotificationSchema.plugin(AutoIncrement, {inc_field: 'id});

module.exports = mongoose.model('Notification', NotificationSchema);
