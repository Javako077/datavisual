const express = require('express');
const { getSalesAnalytics, getUserAnalytics, getPerformanceAnalytics, exportSalesCSV } = require('../controllers/analyticsController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/sales', auth, getSalesAnalytics);
router.get('/users', auth, getUserAnalytics);
router.get('/performance', auth, getPerformanceAnalytics);
router.get('/export/sales', auth, authorize('Admin', 'Analyst'), exportSalesCSV);

module.exports = router;