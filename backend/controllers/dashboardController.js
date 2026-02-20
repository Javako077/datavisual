const SalesData = require('../models/SalesData');
const UserMetrics = require('../models/UserMetrics');
const PerformanceMetrics = require('../models/PerformanceMetrics');

const getKPIs = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const [salesKPIs, userKPIs, performanceKPIs] = await Promise.all([
      SalesData.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$revenue' },
            totalUnits: { $sum: '$units' },
            avgRevenue: { $avg: '$revenue' }
          }
        }
      ]),
      UserMetrics.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: null,
            totalActiveUsers: { $sum: '$activeUsers' },
            totalNewUsers: { $sum: '$newUsers' },
            avgChurnRate: { $avg: '$churnRate' }
          }
        }
      ]),
      PerformanceMetrics.find(dateFilter).sort({ timestamp: -1 }).limit(10)
    ]);

    res.json({
      success: true,
      data: {
        sales: salesKPIs[0] || {},
        users: userKPIs[0] || {},
        performance: performanceKPIs
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const { region, category } = req.query;
    
    const matchFilter = {};
    if (region) matchFilter.region = region;
    if (category) matchFilter.category = category;

    const summary = await SalesData.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' }
          },
          totalRevenue: { $sum: '$revenue' },
          totalUnits: { $sum: '$units' },
          avgRevenue: { $avg: '$revenue' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrends = async (req, res) => {
  try {
    const trends = await SalesData.aggregate([
      {
        $group: {
          _id: {
            region: '$region',
            month: { $month: '$date' }
          },
          revenue: { $sum: '$revenue' },
          units: { $sum: '$units' }
        }
      },
      { $sort: { '_id.month': 1 } }
    ]);

    res.json({ success: true, data: trends });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getKPIs, getSummary, getTrends };