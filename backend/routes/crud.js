const express = require('express');
const { salesData, performanceMetrics, userMetrics, users } = require('../controllers/crudController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Sales Data CRUD
router.post('/sales', auth, authorize('Admin', 'Analyst'), salesData.create);
router.get('/sales', auth, salesData.getAll);
router.get('/sales/:id', auth, salesData.getById);
router.put('/sales/:id', auth, authorize('Admin', 'Analyst'), salesData.update);
router.delete('/sales/:id', auth, authorize('Admin'), salesData.delete);

// Performance Metrics CRUD
router.post('/performance', auth, authorize('Admin', 'Analyst'), performanceMetrics.create);
router.get('/performance', auth, performanceMetrics.getAll);
router.get('/performance/:id', auth, performanceMetrics.getById);
router.put('/performance/:id', auth, authorize('Admin', 'Analyst'), performanceMetrics.update);
router.delete('/performance/:id', auth, authorize('Admin'), performanceMetrics.delete);

// User Metrics CRUD
router.post('/user-metrics', auth, authorize('Admin', 'Analyst'), userMetrics.create);
router.get('/user-metrics', auth, userMetrics.getAll);
router.get('/user-metrics/:id', auth, userMetrics.getById);
router.put('/user-metrics/:id', auth, authorize('Admin', 'Analyst'), userMetrics.update);
router.delete('/user-metrics/:id', auth, authorize('Admin'), userMetrics.delete);

// Users CRUD (Admin only)
router.post('/users', auth, authorize('Admin'), users.create);
router.get('/users', auth, authorize('Admin'), users.getAll);
router.get('/users/:id', auth, authorize('Admin'), users.getById);
router.put('/users/:id', auth, authorize('Admin'), users.update);
router.delete('/users/:id', auth, authorize('Admin'), users.delete);

module.exports = router;