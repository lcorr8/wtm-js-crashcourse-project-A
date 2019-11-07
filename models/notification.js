const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence'(mongoose));

const NotificationSchema = mongoose.Schema({
  message: String,
  time: Date,
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  },
  opened: Boolean,
});

// NotificationSchema.plugin(AutoIncrement, {inc_field: 'id});

module.exports = mongoose.model('Notification', NotificationSchema);
