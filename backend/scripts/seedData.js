const mongoose = require('mongoose');
require('dotenv').config();
const SalesData = require('../models/SalesData');
const UserMetrics = require('../models/UserMetrics');
const PerformanceMetrics = require('../models/PerformanceMetrics');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      SalesData.deleteMany({}),
      UserMetrics.deleteMany({}),
      PerformanceMetrics.deleteMany({}),
      User.deleteMany({})
    ]);

    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@dashboard.com',
      password: 'admin123',
      role: 'Admin'
    });

    // Generate sales data
    const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
    const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
    const salesData = [];

    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      regions.forEach(region => {
        categories.forEach(category => {
          salesData.push({
            date,
            region,
            category,
            revenue: Math.floor(Math.random() * 50000) + 10000,
            units: Math.floor(Math.random() * 500) + 50,
            target: Math.floor(Math.random() * 45000) + 15000
          });
        });
      });
    }

    await SalesData.insertMany(salesData);

    // Generate user metrics
    const userMetrics = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      userMetrics.push({
        date,
        activeUsers: Math.floor(Math.random() * 2000) + 1000,
        newUsers: Math.floor(Math.random() * 300) + 100,
        returningUsers: Math.floor(Math.random() * 800) + 400,
        churnRate: Math.random() * 10 + 2,
        sessionDuration: Math.random() * 300 + 180
      });
    }

    await UserMetrics.insertMany(userMetrics);

    // Generate performance metrics
    const kpis = ['Page Load Time', 'Bounce Rate', 'Session Duration', 'Conversion Rate'];
    const performanceMetrics = [];

    kpis.forEach(kpi => {
      for (let i = 0; i < 10; i++) {
        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() - i);
        
        performanceMetrics.push({
          kpiName: kpi,
          value: Math.random() * 100 + 10,
          unit: kpi.includes('Time') || kpi.includes('Duration') ? 's' : '%',
          trend: Math.random() > 0.5 ? 'up' : 'down',
          change: (Math.random() - 0.5) * 10,
          timestamp
        });
      }
    });

    await PerformanceMetrics.insertMany(performanceMetrics);

    console.log('Seed data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();