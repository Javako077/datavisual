const mongoose = require('mongoose');

const userMetricsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  activeUsers: {
    type: Number,
    required: true
  },
  newUsers: {
    type: Number,
    required: true
  },
  returningUsers: {
    type: Number,
    required: true
  },
  churnRate: {
    type: Number,
    default: 0
  },
  sessionDuration: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

userMetricsSchema.index({ date: 1 });

module.exports = mongoose.model('UserMetrics', userMetricsSchema);