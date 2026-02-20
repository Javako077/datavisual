const mongoose = require('mongoose');

const salesDataSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  region: {
    type: String,
    required: true,
    enum: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East']
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books']
  },
  revenue: {
    type: Number,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  target: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

salesDataSchema.index({ date: 1, region: 1, category: 1 });

module.exports = mongoose.model('SalesData', salesDataSchema);