const express = require('express');
const { getKPIs, getSummary, getTrends } = require('../controllers/dashboardController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/kpis', auth, getKPIs);
router.get('/summary', auth, getSummary);
router.get('/trends', auth, authorize('Admin', 'Analyst'), getTrends);

module.exports = router;