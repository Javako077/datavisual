require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/database');

const createDemoUser = async () => {
  try {
    await connectDB();
    
    // Check if demo user already exists
    const existingUser = await User.findOne({ email: 'admin@example.com' });
    if (existingUser) {
      console.log('Demo user already exists');
      return;
    }

    // Create demo user
    const demoUser = new User({
      name: 'Demo Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'Admin'
    });

    await demoUser.save();
    console.log('Demo user created successfully');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    
  } catch (error) {
    console.error('Error creating demo user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createDemoUser();