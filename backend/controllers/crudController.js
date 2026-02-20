const SalesData = require('../models/SalesData');
const PerformanceMetrics = require('../models/PerformanceMetrics');
const UserMetrics = require('../models/UserMetrics');
const User = require('../models/User');

// Generic CRUD operations
const createCRUD = (Model) => ({
  // Create
  create: async (req, res) => {
    try {
      const item = new Model(req.body);
      await item.save();
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Read all
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
      const items = await Model.find()
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit);
      const total = await Model.countDocuments();
      
      res.json({
        success: true,
        data: items,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Read one
  getById: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update
  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Delete
  delete: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      res.json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
});

// Export CRUD operations for each model
module.exports = {
  salesData: createCRUD(SalesData),
  performanceMetrics: createCRUD(PerformanceMetrics),
  userMetrics: createCRUD(UserMetrics),
  users: {
    ...createCRUD(User),
    // Override create for users to handle password hashing
    create: async (req, res) => {
      try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const user = new User(req.body);
        await user.save();
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(201).json({ success: true, data: userWithoutPassword });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    },
    // Override getAll to exclude passwords
    getAll: async (req, res) => {
      try {
        const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
        const users = await User.find()
          .select('-password')
          .sort(sort)
          .limit(limit * 1)
          .skip((page - 1) * limit);
        const total = await User.countDocuments();
        
        res.json({
          success: true,
          data: users,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
          }
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
};