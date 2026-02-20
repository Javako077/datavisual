const mongoose = require('mongoose');

const performanceMetricsSchema = new mongoose.Schema({
  kpiName: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: ''
  },
  trend: {
    type: String,
    enum: ['up', 'down', 'stable'],
    default: 'stable'
  },
  change: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

performanceMetricsSchema.index({ kpiName: 1, timestamp: 1 });

module.exports = mongoose.model('PerformanceMetrics', performanceMetricsSchema);